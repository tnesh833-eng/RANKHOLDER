/**
 * ===============================================================
 * Rank-Holder — Intelligent Load Balancer & Traffic Manager
 * Provides:
 * 1. L4/L7 Reverse Proxy & Load Balancer Header Normalization
 * 2. In-Flight Request Tracking, Latency Metrics & Backpressure Guard
 * 3. Multi-Provider AI Engine Load Balancing with Auto-Failover
 * 4. Cluster / Container Node Awareness & Health Check Probes
 * ===============================================================
 */

const os = require("os");
const crypto = require("crypto");

// Unique node instance identifier (e.g., node-iad1-a8f2)
const NODE_ID = process.env.VERCEL_REGION
    ? `vercel-${process.env.VERCEL_REGION}-${process.pid}`
    : `node-${os.hostname().slice(0, 8)}-${process.pid}`;

// Load Balancer Configuration
const LB_CONFIG = {
    maxConcurrentRequests: parseInt(process.env.MAX_CONCURRENT_REQUESTS || "250"),
    sheddingThreshold: 0.90, // Shed traffic when 90% saturated
    windowSizeMinutes: 5,
    sampleWindowLimit: 100
};

// Real-time Traffic & Latency Metrics
const metrics = {
    nodeId: NODE_ID,
    startTime: Date.now(),
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    shedRequests: 0,
    inFlightRequests: 0,
    peakInFlight: 0,
    recentLatencies: [],
    lastCpuUsage: process.cpuUsage(),
    lastCpuTime: Date.now()
};

/**
 * Express Middleware: Load Balancing, Metrics & Traffic Shaping
 */
function loadBalancerMiddleware(req, res, next) {
    // 1. Check for server saturation / backpressure
    if (metrics.inFlightRequests >= LB_CONFIG.maxConcurrentRequests) {
        metrics.shedRequests++;
        res.set({
            "Retry-After": "2",
            "X-Load-Balancer-Action": "shed",
            "X-Load-Balancer-Node": NODE_ID
        });
        return res.status(503).json({
            error: "Service temporarily experiencing high traffic. Please retry in a moment.",
            code: "LB_CAPACITY_SHED",
            retry_after_seconds: 2
        });
    }

    // 2. Track in-flight load
    metrics.inFlightRequests++;
    metrics.totalRequests++;
    if (metrics.inFlightRequests > metrics.peakInFlight) {
        metrics.peakInFlight = metrics.inFlightRequests;
    }

    const startHrTime = process.hrtime();
    const requestId = crypto.randomUUID().slice(0, 12);
    req.loadBalancerRequestId = requestId;

    // 3. Resolve Client Real IP through Proxies/Load Balancers
    const forwardedFor = req.headers["x-forwarded-for"];
    req.realIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (req.headers["cf-connecting-ip"] || req.ip || req.connection.remoteAddress);

    // 4. Injected response headers for upstream load balancers & observability
    res.set({
        "X-Load-Balancer-Node": NODE_ID,
        "X-Request-Id": requestId,
        "X-In-Flight-Load": String(metrics.inFlightRequests)
    });

    // 5. Completion Hook to calculate latency & decrement active load
    res.on("finish", () => {
        metrics.inFlightRequests = Math.max(0, metrics.inFlightRequests - 1);
        if (res.statusCode >= 500) {
            metrics.failedRequests++;
        } else {
            metrics.successfulRequests++;
        }

        const diff = process.hrtime(startHrTime);
        const durationMs = Math.round((diff[0] * 1e3 + diff[1] * 1e-6) * 10) / 10;
        
        // Keep rolling sample of recent latencies
        metrics.recentLatencies.push(durationMs);
        if (metrics.recentLatencies.length > LB_CONFIG.sampleWindowLimit) {
            metrics.recentLatencies.shift();
        }
    });

    next();
}

/**
 * Calculates current CPU percentage and load status
 */
function calculateCpuUsage() {
    const currentCpu = process.cpuUsage(metrics.lastCpuUsage);
    const currentTime = Date.now();
    const timeDelta = (currentTime - metrics.lastCpuTime) * 1000; // in microseconds
    metrics.lastCpuUsage = process.cpuUsage();
    metrics.lastCpuTime = currentTime;

    if (timeDelta <= 0) return 0;
    const totalCpuTime = currentCpu.user + currentCpu.system;
    const cpuPercent = Math.min(100, Math.round((totalCpuTime / timeDelta) * 100));
    return cpuPercent;
}

/**
 * Returns comprehensive Load Balancer status for probes and admin panel
 */
function getLoadBalancerStatus() {
    const uptimeSec = Math.floor((Date.now() - metrics.startTime) / 1000);
    const avgLatency = metrics.recentLatencies.length > 0
        ? Math.round(metrics.recentLatencies.reduce((a, b) => a + b, 0) / metrics.recentLatencies.length)
        : 0;

    const sorted = [...metrics.recentLatencies].sort((a, b) => a - b);
    const p95Latency = sorted.length > 0
        ? sorted[Math.floor(sorted.length * 0.95)]
        : 0;

    const mem = process.memoryUsage();

    return {
        status: metrics.inFlightRequests >= (LB_CONFIG.maxConcurrentRequests * LB_CONFIG.sheddingThreshold) ? "high_load" : "healthy",
        node: {
            id: NODE_ID,
            hostname: os.hostname(),
            platform: process.platform,
            node_version: process.version,
            uptime_seconds: uptimeSec,
            cpus: os.cpus().length,
            load_average: os.loadavg()
        },
        traffic: {
            in_flight: metrics.inFlightRequests,
            peak_in_flight: metrics.peakInFlight,
            max_capacity: LB_CONFIG.maxConcurrentRequests,
            total_requests: metrics.totalRequests,
            successful_requests: metrics.successfulRequests,
            failed_requests: metrics.failedRequests,
            shed_requests: metrics.shedRequests,
            requests_per_second: uptimeSec > 0 ? (metrics.totalRequests / uptimeSec).toFixed(2) : "0.00"
        },
        performance: {
            avg_latency_ms: avgLatency,
            p95_latency_ms: p95Latency,
            memory_heap_used_mb: Math.round(mem.heapUsed / 1024 / 1024),
            memory_heap_total_mb: Math.round(mem.heapTotal / 1024 / 1024),
            memory_rss_mb: Math.round(mem.rss / 1024 / 1024),
            cpu_usage_percent: calculateCpuUsage()
        },
        ai_providers: aiLoadBalancer.getProviderHealth()
    };
}

/**
 * ═══════════════════════════════════════════════════════════════
 *  AI Provider Load Balancer & Dynamic Failover Pool
 *  Distributes AI queries across healthy providers with automatic
 *  circuit-breaking and weighted fallback.
 * ═══════════════════════════════════════════════════════════════
 */
class AiLoadBalancer {
    constructor() {
        this.providers = [
            { name: "gemini", weight: 10, healthy: true, failureCount: 0, lastFailure: 0, activeRequests: 0, keyEnv: "GEMINI_API_KEY" },
            { name: "openai", weight: 6, healthy: true, failureCount: 0, lastFailure: 0, activeRequests: 0, keyEnv: "OPENAI_API_KEY" },
            { name: "claude", weight: 6, healthy: true, failureCount: 0, lastFailure: 0, activeRequests: 0, keyEnv: "CLAUDE_API_KEY" },
            { name: "grok", weight: 4, healthy: true, failureCount: 0, lastFailure: 0, activeRequests: 0, keyEnv: "GROK_API_KEY" },
            { name: "perplexity", weight: 4, healthy: true, failureCount: 0, lastFailure: 0, activeRequests: 0, keyEnv: "PERPLEXITY_API_KEY" }
        ];
        this.cooldownMs = 60 * 1000; // 60 seconds circuit breaker cooldown
    }

    /**
     * Get the next best healthy AI provider based on configured API keys,
     * lowest active request load, and health state.
     */
    selectProvider(preferred = null) {
        const now = Date.now();

        // 1. Recover cooled-down providers
        this.providers.forEach(p => {
            if (!p.healthy && (now - p.lastFailure) > this.cooldownMs) {
                p.healthy = true;
                p.failureCount = 0;
                console.log(`[AI Load Balancer] Restored provider to healthy pool: ${p.name}`);
            }
        });

        // 2. Filter available providers that have an API key configured
        const available = this.providers.filter(p => {
            const hasKey = !!process.env[p.keyEnv];
            return hasKey && p.healthy;
        });

        if (available.length === 0) {
            // Default to Gemini even without explicit key check so built-in mock/server handling works
            return this.providers.find(p => p.name === "gemini") || this.providers[0];
        }

        // 3. If preferred provider is available and healthy, return it
        if (preferred) {
            const match = available.find(p => p.name.toLowerCase() === preferred.toLowerCase());
            if (match) return match;
        }

        // 4. Least-connections / load balancing algorithm
        available.sort((a, b) => {
            const loadA = a.activeRequests / (a.weight || 1);
            const loadB = b.activeRequests / (b.weight || 1);
            return loadA - loadB;
        });

        return available[0];
    }

    recordSuccess(providerName) {
        const p = this.providers.find(prov => prov.name === providerName);
        if (p) {
            p.failureCount = 0;
            p.healthy = true;
            p.activeRequests = Math.max(0, p.activeRequests - 1);
        }
    }

    recordFailure(providerName, error) {
        const p = this.providers.find(prov => prov.name === providerName);
        if (p) {
            p.failureCount++;
            p.activeRequests = Math.max(0, p.activeRequests - 1);
            p.lastFailure = Date.now();
            if (p.failureCount >= 3) {
                p.healthy = false;
                console.warn(`[AI Load Balancer] Tripped circuit breaker for ${p.name} after ${p.failureCount} errors:`, error?.message || error);
            }
        }
    }

    getProviderHealth() {
        return this.providers.map(p => ({
            name: p.name,
            configured: !!process.env[p.keyEnv],
            healthy: p.healthy,
            active_requests: p.activeRequests,
            failures: p.failureCount
        }));
    }
}

const aiLoadBalancer = new AiLoadBalancer();

module.exports = {
    NODE_ID,
    loadBalancerMiddleware,
    getLoadBalancerStatus,
    aiLoadBalancer
};

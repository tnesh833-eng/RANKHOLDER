/**
 * api-config.js — Centralized API base URL configuration
 *
 * This file is the single source of truth for the backend API URL.
 *
 * HOW IT WORKS:
 *  - If RANKHOLDER_BACKEND_URL is set in window, use it.
 *  - If RENDER_API_URL is configured (not placeholder), use it for Render backend.
 *  - If local development (file: or localhost:different-port), use http://127.0.0.1:3000/api.
 *  - Otherwise, default to relative "/api" (Vercel Serverless or same-origin).
 */

// ⬇️ UPDATE THIS with your Render backend URL (used only from external origins like Vercel):
const RENDER_API_URL = "https://placement-qjmu.onrender.com/api";

(function () {
    let resolvedBase;

    if (typeof RANKHOLDER_BACKEND_URL !== "undefined" && RANKHOLDER_BACKEND_URL) {
        resolvedBase = RANKHOLDER_BACKEND_URL;
    } else if (
        window.location.hostname === "placement-qjmu.onrender.com" ||
        window.location.hostname === "rank-placement.onrender.com"
    ) {
        // Already on Render — use relative /api (same origin, no CORS)
        resolvedBase = "/api";
    } else if (
        RENDER_API_URL &&
        !RENDER_API_URL.startsWith("REPLACE_WITH")
    ) {
        // External origin (Vercel, etc.) — use absolute Render backend URL
        resolvedBase = RENDER_API_URL.replace(/\/$/, "");
    } else if (
        window.location.protocol === "file:" ||
        ((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
            window.location.port !== "3000")
    ) {
        // Local dev
        resolvedBase = "http://127.0.0.1:3000/api";
    } else {
        // Same-origin fallback
        resolvedBase = "/api";
    }

    window.__RANKHOLDER_API_BASE__ = resolvedBase;
    console.log("🔗 RankHolder API Base:", window.__RANKHOLDER_API_BASE__);
})();

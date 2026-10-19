/**
 * ===============================================================
 * Rank-Holder Supabase Backend Service
 * Enables persistent PostgreSQL data storage on Supabase with
 * seamless fallback to embedded SQLite (sql.js).
 * ===============================================================
 */

const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "";
// Prioritize service role key if available for server-side operations, otherwise anon/publishable key
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ||
                     process.env.SUPABASE_ANON_KEY ||
                     process.env.SUPABASE_PUBLISHABLE_KEY || "";

let supabase = null;
let isConfigured = false;

if (SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes("your-project-ref")) {
    try {
        supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        isConfigured = true;
        console.log("⚡ [Supabase Backend] Connected to Supabase:", SUPABASE_URL);
    } catch (err) {
        console.warn("⚠️ [Supabase Backend] Init warning:", err.message);
    }
} else {
    console.log("ℹ️ [Supabase Backend] Remote Supabase not configured. Using encrypted SQLite (sql.js).");
}

const SupabaseService = {
    isConfigured: () => isConfigured && !!supabase,
    getClient: () => supabase,

    // Status & Diagnostics
    getStatus: async () => {
        if (!isConfigured || !supabase) {
            return {
                configured: false,
                message: "Supabase not connected. Set SUPABASE_URL and SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY.",
                tables: {}
            };
        }
        try {
            const results = {};
            const tablesToCheck = ["users", "jobs", "prospects", "feedbacks", "game_scores", "user_settings", "notifications"];
            for (const table of tablesToCheck) {
                const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
                results[table] = error ? { error: error.message } : { count: count ?? 0 };
            }
            return {
                configured: true,
                url: SUPABASE_URL,
                tables: results
            };
        } catch (e) {
            return {
                configured: true,
                error: e.message
            };
        }
    },

    // ── Jobs ───────────────────────────────────────────────────
    getJobs: async () => {
        if (!isConfigured) return null;
        try {
            const { data, error } = await supabase
                .from("jobs")
                .select("*")
                .order("id", { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] getJobs error:", err.message);
            return null;
        }
    },

    insertJob: async (jobData) => {
        if (!isConfigured) return null;
        try {
            const { data, error } = await supabase
                .from("jobs")
                .insert([jobData])
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] insertJob error:", err.message);
            return null;
        }
    },

    deleteJob: async (id) => {
        if (!isConfigured) return null;
        try {
            const { error } = await supabase.from("jobs").delete().eq("id", id);
            if (error) throw error;
            return true;
        } catch (err) {
            console.warn("[Supabase] deleteJob error:", err.message);
            return null;
        }
    },

    // ── Prospects ──────────────────────────────────────────────
    getProspects: async () => {
        if (!isConfigured) return null;
        try {
            const { data, error } = await supabase
                .from("prospects")
                .select("*")
                .order("id", { ascending: false });
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] getProspects error:", err.message);
            return null;
        }
    },

    insertProspect: async (prospectData) => {
        if (!isConfigured) return null;
        try {
            const { data, error } = await supabase
                .from("prospects")
                .insert([prospectData])
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] insertProspect error:", err.message);
            return null;
        }
    },

    deleteProspect: async (id) => {
        if (!isConfigured) return null;
        try {
            const { error } = await supabase.from("prospects").delete().eq("id", id);
            if (error) throw error;
            return true;
        } catch (err) {
            console.warn("[Supabase] deleteProspect error:", err.message);
            return null;
        }
    },

    // ── Feedbacks ──────────────────────────────────────────────
    insertFeedback: async (feedbackData) => {
        if (!isConfigured) return null;
        try {
            const { data, error } = await supabase
                .from("feedbacks")
                .insert([feedbackData])
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] insertFeedback error:", err.message);
            return null;
        }
    },

    // ── Notifications ──────────────────────────────────────────
    getNotifications: async () => {
        if (!isConfigured) return null;
        try {
            const { data, error } = await supabase
                .from("notifications")
                .select("*")
                .order("id", { ascending: false })
                .limit(20);
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] getNotifications error:", err.message);
            return null;
        }
    },

    insertNotification: async (notifData) => {
        if (!isConfigured) return null;
        try {
            await supabase.from("notifications").insert([notifData]);
            return true;
        } catch (err) {
            console.warn("[Supabase] insertNotification error:", err.message);
            return false;
        }
    },

    // ── Users ──────────────────────────────────────────────────
    syncUser: async (user) => {
        if (!isConfigured || !user) return null;
        try {
            const payload = {
                name: user.name || "User",
                email: (user.email || "").toLowerCase().trim(),
                email_hash: user.email_hash || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                phone: user.phone || "",
                purpose: user.purpose || "",
                github_link: user.github_link || "",
                score: user.score || 0,
                tokens: user.tokens || 100,
                terms_accepted: user.terms_accepted ? 1 : 0,
                is_verified: user.is_verified ? 1 : 0,
                status: user.status || "APPROVED",
                password_hash: user.password_hash || "",
                subscription_status: user.subscription_status || "trial",
                subscription_id: user.subscription_id || null
            };
            const { data, error } = await supabase
                .from("users")
                .upsert(payload, { onConflict: "email" })
                .select()
                .single();
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] syncUser error:", err.message);
            return null;
        }
    },

    findUserByEmail: async (email) => {
        if (!isConfigured || !email) return null;
        try {
            const clean = email.toLowerCase().trim();
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("email", clean)
                .maybeSingle();
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] findUserByEmail error:", err.message);
            return null;
        }
    },

    // ── Game Scores ────────────────────────────────────────────
    getGameScores: async (userId) => {
        if (!isConfigured || !userId) return null;
        try {
            const { data, error } = await supabase
                .from("game_scores")
                .select("*")
                .eq("user_id", userId);
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] getGameScores error:", err.message);
            return null;
        }
    },

    upsertGameScore: async (userId, gameName, score) => {
        if (!isConfigured || !userId || !gameName) return null;
        try {
            const { data, error } = await supabase
                .from("game_scores")
                .upsert(
                    { user_id: userId, game_name: gameName, high_score: score, updated_at: new Date().toISOString() },
                    { onConflict: "user_id,game_name" }
                );
            if (error) throw error;
            return data;
        } catch (err) {
            console.warn("[Supabase] upsertGameScore error:", err.message);
            return null;
        }
    },

    // ── Bulk Migration Utility from SQLite to Supabase ─────────
    syncAllFromSqlite: async (dbAll) => {
        if (!isConfigured) {
            throw new Error("Supabase is not configured. Provide SUPABASE_URL and keys first.");
        }
        const report = {};

        // 1. Sync Jobs
        try {
            const jobs = dbAll("SELECT title, company, location, type, experience, salary, skills, link, internship_link, hr_contact, badge FROM jobs");
            if (jobs && jobs.length > 0) {
                const { error } = await supabase.from("jobs").upsert(jobs, { onConflict: "title,company", ignoreDuplicates: true });
                report.jobs = error ? error.message : `Synced ${jobs.length} jobs`;
            }
        } catch (e) { report.jobs = e.message; }

        // 2. Sync Prospects
        try {
            const prospects = dbAll("SELECT name, company, linkedin, status, idea FROM prospects");
            if (prospects && prospects.length > 0) {
                const { error } = await supabase.from("prospects").upsert(prospects, { ignoreDuplicates: true });
                report.prospects = error ? error.message : `Synced ${prospects.length} prospects`;
            }
        } catch (e) { report.prospects = e.message; }

        // 3. Sync Settings
        try {
            const s = dbAll("SELECT id, name, email, mobile, theme, ai_mode, comm_mode, default_tab FROM user_settings WHERE id = 1");
            if (s && s.length > 0) {
                const { error } = await supabase.from("user_settings").upsert(s[0]);
                report.settings = error ? error.message : "Settings synced";
            }
        } catch (e) { report.settings = e.message; }

        // 4. Sync Users
        try {
            const users = dbAll("SELECT name, email, email_hash, first_name, last_name, phone, photo_url, score, tokens, password_hash, purpose, github_link, terms_accepted, status, is_verified, subscription_status, subscription_id FROM users");
            if (users && users.length > 0) {
                const { error } = await supabase.from("users").upsert(users, { onConflict: "email", ignoreDuplicates: true });
                report.users = error ? error.message : `Synced ${users.length} users`;
            }
        } catch (e) { report.users = e.message; }

        return report;
    }
};

module.exports = SupabaseService;

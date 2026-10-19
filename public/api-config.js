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

// ⬇️ UPDATE THIS with your Render backend URL once deployed on Render:
const RENDER_API_URL = "https://rankholder-backend.onrender.com/api";

(function () {
    let resolvedBase;

    if (typeof RANKHOLDER_BACKEND_URL !== "undefined" && RANKHOLDER_BACKEND_URL) {
        resolvedBase = RANKHOLDER_BACKEND_URL;
    } else if (
        RENDER_API_URL &&
        !RENDER_API_URL.startsWith("REPLACE_WITH")
    ) {
        // Deployed backend on Render
        resolvedBase = RENDER_API_URL.replace(/\/$/, "");
    } else if (
        window.location.protocol === "file:" ||
        ((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
            window.location.port !== "3000")
    ) {
        // Local dev
        resolvedBase = "http://127.0.0.1:3000/api";
    } else {
        // Same-origin (e.g., Vercel serverless or same-domain backend)
        resolvedBase = "/api";
    }

    window.__RANKHOLDER_API_BASE__ = resolvedBase;
    console.log("🔗 RankHolder API Base:", window.__RANKHOLDER_API_BASE__);
})();

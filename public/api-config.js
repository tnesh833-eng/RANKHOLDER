/**
 * api-config.js — Centralized API base URL configuration
 *
 * This file is the single source of truth for the backend API URL.
 *
 * HOW IT WORKS:
 *  - If RANKHOLDER_API_URL is set (injected via window global by Vercel env), use it.
 *  - If running from file:// or localhost (dev mode), use http://127.0.0.1:3000/api.
 *  - Otherwise (same-origin production), use /api.
 *
 * VERCEL SETUP:
 *  In your Vercel project settings → Environment Variables, set:
 *    NEXT_PUBLIC_API_URL = https://your-render-app.onrender.com/api
 *  Then in vercel.json headers or via a _api_url.js script injection, expose it.
 *  OR: just update the RENDER_API_URL constant below with your Render backend URL.
 */

// ⬇️  UPDATE THIS with your Render backend URL once deployed:
const RENDER_API_URL = "REPLACE_WITH_YOUR_RENDER_URL/api";

(function () {
    let resolvedBase;

    if (typeof RANKHOLDER_BACKEND_URL !== "undefined" && RANKHOLDER_BACKEND_URL) {
        // Injected at deploy time (e.g., via a <script> tag in HTML)
        resolvedBase = RANKHOLDER_BACKEND_URL;
    } else if (
        window.location.protocol === "file:" ||
        ((window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") &&
            window.location.port !== "3000")
    ) {
        // Local dev
        resolvedBase = "http://127.0.0.1:3000/api";
    } else if (
        window.location.hostname.endsWith(".vercel.app") ||
        RENDER_API_URL !== "REPLACE_WITH_YOUR_RENDER_URL/api"
    ) {
        // Deployed on Vercel — use the Render backend
        resolvedBase = RENDER_API_URL;
    } else {
        // Same-origin production (e.g., Render hosting both frontend and backend)
        resolvedBase = "/api";
    }

    window.__RANKHOLDER_API_BASE__ = resolvedBase;
})();

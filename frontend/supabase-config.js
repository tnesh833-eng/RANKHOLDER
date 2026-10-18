/**
 * Rank-Holder Supabase Client Configuration
 * Exposes window.RankHolderSupabase and window.supabaseClient
 */
(function() {
    const SUPABASE_DEFAULT_KEY = "sb_publishable_-newRs_kuToUhqmXSvTcNA_e3RVbDPV";

    window.RankHolderSupabase = {
        key: SUPABASE_DEFAULT_KEY,
        url: "",
        client: null,

        init: async function() {
            try {
                const res = await fetch("/api/supabase/config");
                if (res.ok) {
                    const data = await res.json();
                    if (data.url) this.url = data.url;
                    if (data.publishableKey) this.key = data.publishableKey;
                }
            } catch (_) {}

            if (window.supabase && typeof window.supabase.createClient === "function" && this.url && this.key && !this.url.includes("your-project-ref")) {
                try {
                    this.client = window.supabase.createClient(this.url, this.key);
                    window.supabaseClient = this.client;
                    console.log("⚡ Supabase Client initialized successfully");
                } catch (e) {
                    console.warn("⚠️ Supabase Client init error:", e.message);
                }
            }
            return this.client;
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function() {
            window.RankHolderSupabase.init();
        });
    } else {
        window.RankHolderSupabase.init();
    }
})();

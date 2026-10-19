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

                    // Automatically capture Supabase Auth JWT and sync to rh_auth_token
                    if (this.client.auth && typeof this.client.auth.onAuthStateChange === "function") {
                        this.client.auth.onAuthStateChange((event, session) => {
                            if (session && session.access_token) {
                                localStorage.setItem("rh_auth_token", session.access_token);
                                if (session.user) {
                                    localStorage.setItem("rh_registered_email", (session.user.email || "").toLowerCase());
                                    const userInfo = {
                                        id: session.user.id,
                                        email: session.user.email,
                                        name: (session.user.user_metadata && session.user.user_metadata.full_name) || (session.user.email || "").split("@")[0],
                                        role: (session.user.email === "tnesh833@gmail.com") ? "admin" : "user",
                                        status: "APPROVED"
                                    };
                                    localStorage.setItem("rh_user", JSON.stringify(userInfo));
                                }
                            } else if (event === "SIGNED_OUT") {
                                localStorage.removeItem("rh_auth_token");
                            }
                        });
                    }
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

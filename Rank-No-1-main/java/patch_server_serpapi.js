const fs = require('fs');

let server = fs.readFileSync('server.js', 'utf8');

const lldEndpoint = `
// ── LLD Daily Updates (SerpApi) ──────────────────────────────────────────────
app.get("/api/lld-daily-updates", async (req, res) => {
    try {
        const apiKey = process.env.SERP_API_KEY;
        if (!apiKey) {
            return res.status(400).json({ error: "No SerpApi key configured." });
        }
        
        // Use node-fetch natively or global fetch if Node > 18
        const query = encodeURIComponent("site:leetcode.com/discuss/interview-question \\"low level design\\" OR \\"LLD\\" (Google OR Amazon OR Microsoft OR Meta OR Uber)");
        const url = \`https://serpapi.com/search.json?engine=google&q=\${query}&api_key=\${apiKey}&num=5&sort=date\`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const results = (data.organic_results || []).map(r => ({
            title: r.title,
            link: r.link,
            snippet: r.snippet,
            date: r.date || "Recent"
        }));
        
        res.json({ success: true, questions: results });
    } catch (error) {
        console.error("SerpApi Error:", error);
        res.status(500).json({ error: "Failed to fetch LLD updates." });
    }
});
`;

if (!server.includes('/api/lld-daily-updates')) {
    // Add right before app.listen or at the end
    server = server.replace('app.listen(PORT', lldEndpoint + '\napp.listen(PORT');
    fs.writeFileSync('server.js', server);
    console.log('Added /api/lld-daily-updates to server.js');
} else {
    console.log('Endpoint already exists');
}

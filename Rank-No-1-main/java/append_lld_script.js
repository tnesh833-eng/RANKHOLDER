const fs = require('fs');
const jsCode = `
// Fetch SerpApi LLD Daily Updates
async function fetchLLDDailyUpdates() {
    const feed = document.getElementById('lldDailyQuestionsFeed');
    if (!feed) return;

    try {
        const _API = window.location.protocol === "file:" ? "http://127.0.0.1:5000/api" : "/api";
        const res = await fetch(\`\${_API}/lld-daily-updates\`);
        const data = await res.json();
        
        if (data.success && data.questions && data.questions.length > 0) {
            feed.innerHTML = ''; // clear loading
            
            data.questions.slice(0, 4).forEach(q => {
                const qDiv = document.createElement('div');
                qDiv.style.cssText = "background: rgba(0,0,0,0.25); border: 1px solid rgba(245,158,11,0.2); padding: 10px; border-radius: 8px; cursor: pointer;";
                qDiv.innerHTML = \`
                    <a href="\${q.link}" target="_blank" style="text-decoration:none;">
                        <h5 style="margin:0 0 4px 0; color:#fbbf24; font-size:0.9rem;">\${q.title}</h5>
                        <p style="margin:0; font-size:0.75rem; color:#fde68a; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">
                            \${q.snippet}
                        </p>
                    </a>
                \`;
                
                // Add hover effect
                qDiv.addEventListener('mouseenter', () => { qDiv.style.borderColor = 'rgba(245,158,11,0.6)'; qDiv.style.background = 'rgba(245,158,11,0.05)'; });
                qDiv.addEventListener('mouseleave', () => { qDiv.style.borderColor = 'rgba(245,158,11,0.2)'; qDiv.style.background = 'rgba(0,0,0,0.25)'; });
                
                feed.appendChild(qDiv);
            });
        } else {
            feed.innerHTML = '<span style="color:#fcd34d; font-size:0.8rem; text-align:center;">No updates found today. Check back later.</span>';
        }
    } catch (err) {
        console.error("Error fetching LLD daily updates:", err);
        feed.innerHTML = '<span style="color:#ef4444; font-size:0.8rem; text-align:center;">Error fetching live questions. Please try again later.</span>';
    }
}

// Ensure it runs when we switch to LLD tab or on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fetchLLDDailyUpdates);
} else {
    fetchLLDDailyUpdates();
}

// Re-fetch when clicking the tab if needed
document.addEventListener('click', (e) => {
    if(e.target.closest('button') && e.target.closest('button').getAttribute('onclick') && e.target.closest('button').getAttribute('onclick').includes('tab-lld')) {
        setTimeout(fetchLLDDailyUpdates, 200);
    }
});
`;
fs.appendFileSync('frontend/lld-code.js', jsCode);
console.log('Appended to lld-code.js');

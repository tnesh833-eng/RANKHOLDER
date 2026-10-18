const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');

// 1. Add Github button next to Tools Hub
const btnTarget = 'data-i18n="nav.toolsHub">Tools Hub</span>';
const githubBtn = `

            </button>

            <!-- GITHUB UPDATES -->
            <button class="pill-btn primary" onclick="openGithubUpdatesModal()" style="height:40px; padding:0 18px; border-radius:20px;
                background:linear-gradient(135deg, #24292e, #43484f); margin-left:12px;
                color:#fff; font-weight:700; border:1px solid #1b1f23; font-size:0.85rem; display:flex; align-items:center; gap:8px;
                box-shadow:0 4px 18px rgba(0,0,0,0.3); transition:all 0.25s; white-space:nowrap; cursor:pointer;"
                onmouseover="this.style.boxShadow='0 6px 24px rgba(0,0,0,0.5)';this.style.transform='translateY(-1px)'"
                onmouseout="this.style.boxShadow='0 4px 18px rgba(0,0,0,0.3)';this.style.transform='translateY(0)'">
                <svg height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                <span>GitHub Updates</span>`;

// Replace first instance of </button> after Tools hub
const targetIndex = html.indexOf(btnTarget);
if (targetIndex !== -1) {
    const endButtonIndex = html.indexOf('</button>', targetIndex);
    if (endButtonIndex !== -1 && !html.includes('GITHUB UPDATES')) {
        html = html.slice(0, endButtonIndex) + githubBtn + html.slice(endButtonIndex + 9);
    }
}

// 2. Add Modal and script tag at the end
const modalHTML = `
    <!-- GITHUB UPDATES MODAL -->
    <div id="githubUpdatesModal" class="modal-overlay" style="display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); z-index:9999; justify-content:center; align-items:center; backdrop-filter:blur(5px);">
        <div style="background:var(--bg-surface, #1e1e2d); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:24px; width:90%; max-width:600px; box-shadow:0 12px 48px rgba(0,0,0,0.5); display:flex; flex-direction:column; max-height:80vh;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h2 style="font-size:1.4rem; margin:0; display:flex; align-items:center; gap:10px;">
                    <svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                    Daily GitHub Updates
                </h2>
                <button onclick="closeGithubUpdatesModal()" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-secondary);">&times;</button>
            </div>
            <p style="font-size:0.9rem; color:var(--text-secondary); margin-top:0; margin-bottom:16px;">Latest commits and updates from the project repository.</p>
            <div id="githubUpdatesContainer" style="overflow-y:auto; flex:1; padding-right:8px; display:flex; flex-direction:column; gap:12px;">
                <div style="text-align:center; padding:20px; color:var(--text-secondary);">Loading updates from GitHub...</div>
            </div>
        </div>
    </div>
    
    <script src="github.js"></script>
`;

if (html.includes('</body>') && !html.includes('githubUpdatesModal')) {
    html = html.replace('</body>', modalHTML + '\n</body>');
}
fs.writeFileSync('frontend/app.html', html);
console.log('GitHub feature injected into app.html.');

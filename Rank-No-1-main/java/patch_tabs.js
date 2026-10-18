const fs = require('fs');
let js = fs.readFileSync('frontend/app.js', 'utf8');
const lines = js.split('\n');

const startIdx = lines.findIndex(l => l.includes('// Hide disabled/blocked tabs and their sections for normal users, admin sees all'));
const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes('// Activate the admin-chosen default tab (if it is still visible)'));

if (startIdx !== -1 && endIdx !== -1) {
    const replacement = `        // Hide disabled tabs completely, but for blocked tabs, show the button and a blocked message
        APP_TAB_DEFS.forEach(t => {
            const isVisible = tabFlags.hasOwnProperty(t.flag) ? tabFlags[t.flag] : true;
            const isBlocked = tabFlags.hasOwnProperty(t.flag + '_blocked') ? tabFlags[t.flag + '_blocked'] : false;
            
            const btn = document.getElementById(t.btnId);
            const section = document.getElementById(t.sectionId);

            if (!isAdmin) {
                if (!isVisible) {
                    if (btn) btn.style.display = 'none';
                    if (section) section.style.display = 'none';
                } else if (isBlocked) {
                    if (btn) {
                        btn.style.display = '';
                        if (!btn.innerHTML.includes('🔒')) {
                            btn.innerHTML = '🔒 ' + btn.innerHTML;
                        }
                    }
                    if (section) {
                        section.innerHTML = \`
                            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:60vh; text-align:center;">
                                <div style="font-size:4rem; margin-bottom:20px;">🔒</div>
                                <h2 style="color:#ef4444; font-size:1.8rem; margin-bottom:10px;">Access Denied</h2>
                                <p style="color:var(--text-secondary); font-size:1.1rem; max-width:400px; line-height:1.6;">The admin has blocked this tab. Please contact the administrator if you require access.</p>
                            </div>
                        \`;
                    }
                    if (!firstVisibleTabId) firstVisibleTabId = t.sectionId;
                } else {
                    if (btn) btn.style.display = '';
                    if (!firstVisibleTabId) firstVisibleTabId = t.sectionId;
                }
            } else {
                if (btn) btn.style.display = '';
                if (!firstVisibleTabId) firstVisibleTabId = t.sectionId;
            }
        });
`;

    // Remove the old block and insert the new one
    // endIdx is the index of "// Activate the admin-chosen default tab"
    // So we replace from startIdx up to endIdx - 1
    lines.splice(startIdx, endIdx - startIdx, replacement);
    fs.writeFileSync('frontend/app.js', lines.join('\n'));
    console.log('Successfully updated applyTabConditions');
} else {
    console.log('Could not find the target block indices.');
}

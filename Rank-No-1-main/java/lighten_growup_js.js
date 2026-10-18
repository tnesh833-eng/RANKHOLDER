const fs = require('fs');
let appJs = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/app.js', 'utf8');

const startIdx = appJs.indexOf('const GROWUP_CURRICULUM = [');
const endIdx = appJs.indexOf('/* ==========================================================================', startIdx + 100);

if (startIdx !== -1 && endIdx !== -1) {
    let growup = appJs.substring(startIdx, endIdx);
    
    // Text colors
    growup = growup.replace(/color:\s*#fff/gi, 'color:#1e293b');
    growup = growup.replace(/color:\s*#f0f4ff/gi, 'color:#1e293b');
    growup = growup.replace(/color:\s*#e2e8f0/gi, 'color:#1e293b');
    growup = growup.replace(/color:\s*#cbd5e1/gi, 'color:#334155');
    growup = growup.replace(/color:\s*#94a3b8/gi, 'color:#475569');
    // For backgrounds
    growup = growup.replace(/background:\s*rgba\(0,0,0,0\.3\)/g, 'background:rgba(241,245,249,0.8)');
    growup = growup.replace(/background:\s*rgba\(0,0,0,0\.25\)/g, 'background:rgba(241,245,249,0.7)');
    growup = growup.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.2\)/g, 'background:rgba(241,245,249,0.6)');
    growup = growup.replace(/background:\s*rgba\(0,\s*0,\s*0,\s*0\.5\)/g, 'background:rgba(241,245,249,0.9)');
    growup = growup.replace(/background:\s*#0f172a/gi, 'background:#f1f5f9');
    growup = growup.replace(/background:\s*rgba\(15,23,42,0\.8\)/g, 'background:rgba(255,255,255,0.9)');
    
    // Apply changes
    appJs = appJs.substring(0, startIdx) + growup + appJs.substring(endIdx);
    fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/app.js', appJs);
    console.log('Updated app.js colors for growup.');
}

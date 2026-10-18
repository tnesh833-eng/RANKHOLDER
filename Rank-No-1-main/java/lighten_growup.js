const fs = require('fs');
let appHtml = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/app.html', 'utf8');

const startIdx = appHtml.indexOf('<section id="growup"');
const endIdx = appHtml.indexOf('<section id="corporate"', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let growup = appHtml.substring(startIdx, endIdx);
    
    // Make text dark
    growup = growup.replace(/color:\s*#fff/g, 'color:#1e293b');
    growup = growup.replace(/color:\s*#f0f4ff/g, 'color:#1e293b');
    growup = growup.replace(/color:\s*var\(--text-secondary\)/g, 'color:#475569');
    growup = growup.replace(/color:\s*#cbd5e1/g, 'color:#334155');
    growup = growup.replace(/color:\s*#e2e8f0/g, 'color:#1e293b');
    growup = growup.replace(/color:\s*#94a3b8/g, 'color:#475569');
    growup = growup.replace(/color:\s*#64748b/g, 'color:#64748b'); // keep somewhat dark
    
    // Lighten backgrounds
    growup = growup.replace(/background:\s*rgba\(15,23,42,0\.7\)/g, 'background:rgba(255,255,255,0.85)');
    growup = growup.replace(/background:\s*rgba\(15,23,42,0\.85\)/g, 'background:rgba(255,255,255,0.9)');
    growup = growup.replace(/background:\s*rgba\(15,23,42,0\.9\)/g, 'background:rgba(255,255,255,0.95)');
    growup = growup.replace(/background:\s*rgba\(15,23,42,0\.8\)/g, 'background:rgba(255,255,255,0.9)');
    growup = growup.replace(/background:\s*rgba\(0,0,0,0\.3\)/g, 'background:rgba(241,245,249,0.8)');
    growup = growup.replace(/background:\s*rgba\(0,0,0,0\.25\)/g, 'background:rgba(241,245,249,0.7)');
    growup = growup.replace(/background:\s*rgba\(10,14,35,0\.5\)/g, 'background:rgba(255,255,255,0.7)');
    growup = growup.replace(/background:linear-gradient\(145deg,\s*rgba\(15,23,42,0\.85\),\s*rgba\(26,35,70,0\.45\)\)/g, 'background:linear-gradient(145deg, rgba(255,255,255,0.9), rgba(248,250,252,0.9))');
    growup = growup.replace(/background:linear-gradient\(145deg,\s*rgba\(13,18,37,0\.7\),\s*rgba\(26,35,70,0\.4\)\)/g, 'background:linear-gradient(145deg, rgba(255,255,255,0.8), rgba(241,245,249,0.8))');
    
    appHtml = appHtml.substring(0, startIdx) + growup + appHtml.substring(endIdx);
    fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/app.html', appHtml);
    console.log('Updated app.html');
}

// Also update CSS in style.css for growup
let styleCss = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/style.css', 'utf8');
styleCss = styleCss.replace(/\.growup-stage-card {\s*background:\s*rgba\(15,\s*23,\s*42,\s*0\.65\)/g, '.growup-stage-card { background: rgba(255, 255, 255, 0.85)');
styleCss = styleCss.replace(/\.growup-stage-card:hover {\s*[\s\S]*?background:\s*rgba\(26,\s*35,\s*70,\s*0\.5\)/g, '.growup-stage-card:hover { transform: translateY(-3px); border-color: rgba(99, 102, 241, 0.5); box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.25); background: rgba(248, 250, 252, 0.95)');
styleCss = styleCss.replace(/\.growup-quiz-opt {\s*[\s\S]*?background:\s*rgba\(0,\s*0,\s*0,\s*0\.25\)/g, (match) => match.replace('background: rgba(0, 0, 0, 0.25)', 'background: rgba(241, 245, 249, 0.8)').replace('color: #cbd5e1', 'color: #334155'));

fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/style.css', styleCss);
console.log('Updated style.css');

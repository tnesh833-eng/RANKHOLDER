const fs = require('fs');

function fixColors(content) {
    // Colors
    content = content.replace(/#cbd5e1/gi, '#334155'); // slate-300 to slate-700
    content = content.replace(/#a5b4fc/gi, '#4338ca'); // indigo-300 to indigo-700
    content = content.replace(/#38bdf8/gi, '#0369a1'); // sky-400 to sky-700
    content = content.replace(/#f0f4ff/gi, '#0f172a'); // very light to slate-900
    content = content.replace(/#e2e8f0/gi, '#1e293b'); // slate-200 to slate-800
    content = content.replace(/#94a3b8/gi, '#475569'); // slate-400 to slate-600
    content = content.replace(/#ffffff/gi, '#0f172a'); // white to slate-900
    content = content.replace(/#fff/gi, '#0f172a'); // white to slate-900
    
    // specifically for the active tabs or colored text
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.8\)/g, 'color: rgba(0,0,0,0.8)');
    content = content.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.6\)/g, 'color: rgba(0,0,0,0.6)');

    // Backgrounds and borders that use white-transparent (invisible on light bg)
    content = content.replace(/rgba\(255,255,255,0\.05\)/g, 'rgba(0,0,0,0.05)');
    content = content.replace(/rgba\(255,255,255,0\.08\)/g, 'rgba(27, 24, 24, 0.08)');
    content = content.replace(/rgba\(255,255,255,0\.1\)/g, 'rgba(0,0,0,0.1)');
    content = content.replace(/rgba\(255,255,255,0\.15\)/g, 'rgba(0,0,0,0.15)');
    content = content.replace(/rgba\(255,255,255,0\.2\)/g, 'rgba(0,0,0,0.2)');
    content = content.replace(/rgba\(255,255,255,0\.25\)/g, 'rgba(0,0,0,0.25)');
    content = content.replace(/rgba\(255,255,255,0\.3\)/g, 'rgba(0,0,0,0.3)');
    content = content.replace(/rgba\(255, 255, 255, 0\.08\)/g, 'rgba(0, 0, 0, 0.08)');
    content = content.replace(/rgba\(255, 255, 255, 0\.1\)/g, 'rgba(0, 0, 0, 0.1)');
    content = content.replace(/rgba\(255, 255, 255, 0\.03\)/g, 'rgba(0, 0, 0, 0.03)');
    content = content.replace(/rgba\(255, 255, 255, 0\.07\)/g, 'rgba(0, 0, 0, 0.07)');
    
    // specific borders
    content = content.replace(/border:1px solid rgba\(255,255,255,0\.1\)/g, 'border:1px solid rgba(0,0,0,0.2)');
    content = content.replace(/border:1px solid rgba\(255,255,255,0\.05\)/g, 'border:1px solid rgba(0,0,0,0.15)');

    return content;
}

// 1. Fix app.html
let appHtml = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/app.html', 'utf8');
const startIdxHtml = appHtml.indexOf('<section id="growup"');
const endIdxHtml = appHtml.indexOf('<section id="corporate"', startIdxHtml);

if (startIdxHtml !== -1 && endIdxHtml !== -1) {
    let growupHtml = appHtml.substring(startIdxHtml, endIdxHtml);
    growupHtml = fixColors(growupHtml);
    appHtml = appHtml.substring(0, startIdxHtml) + growupHtml + appHtml.substring(endIdxHtml);
    fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/app.html', appHtml);
    console.log('Fixed app.html');
}

// 2. Fix app.js
let appJs = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/app.js', 'utf8');
const startIdxJs = appJs.indexOf('const GROWUP_CURRICULUM = [');
const endIdxJs = appJs.indexOf('/* ==========================================================================', startIdxJs + 100);

if (startIdxJs !== -1 && endIdxJs !== -1) {
    let growupJs = appJs.substring(startIdxJs, endIdxJs);
    growupJs = fixColors(growupJs);
    appJs = appJs.substring(0, startIdxJs) + growupJs + appJs.substring(endIdxJs);
    fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/app.js', appJs);
    console.log('Fixed app.js');
}

// 3. Fix style.css
let styleCss = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/style.css', 'utf8');
// The appended styles at the bottom
const styleStart = styleCss.indexOf('.growup-stage-card {');
if (styleStart !== -1) {
    let growupCss = styleCss.substring(styleStart);
    growupCss = fixColors(growupCss);
    
    // also change color of text in quiz options directly
    growupCss = growupCss.replace(/color: #cbd5e1/g, 'color: #334155');
    
    styleCss = styleCss.substring(0, styleStart) + growupCss;
    fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/style.css', styleCss);
    console.log('Fixed style.css');
}

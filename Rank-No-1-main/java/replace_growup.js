const fs = require('fs');
const appHtmlPath = 'd:/Rankes/Rank-No-1-main/frontend/app.html';
let appHtml = fs.readFileSync(appHtmlPath, 'utf8');

const startStr = '<section id="growup"';
const endStr = '</section>';

const startIdx = appHtml.indexOf(startStr);
// Find the closing tag for this section. Since there might be nested sections, we should be careful.
// Let's assume the next </section> at the same indentation or just match the exact section ending right before corporate tab.
// But actually, we know it ends right before:
// "NEW: CORPORATE READINESS TAB (3 Sections)" or "<section id="corporate"".

const endIdxTemp = appHtml.indexOf('<section id="corporate"');
const endIdx = appHtml.lastIndexOf('</section>', endIdxTemp) + '</section>'.length;

const newGrowup = fs.readFileSync('d:/Rankes/Rank-No-1-main/growup_new.html', 'utf8');

if (startIdx !== -1 && endIdx !== -1 && startIdx < endIdx) {
    appHtml = appHtml.substring(0, startIdx) + newGrowup + appHtml.substring(endIdx);
    fs.writeFileSync(appHtmlPath, appHtml);
    console.log("Successfully replaced growup tab in app.html");
} else {
    console.log("Could not find bounds", startIdx, endIdx);
}

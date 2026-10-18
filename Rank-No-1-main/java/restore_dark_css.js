const fs = require('fs');

// 1. Read original style.css from fetched content
const originalStyles = fs.readFileSync('C:/Users/THARUNESH/.gemini/antigravity-ide/brain/d3963f7b-3d05-4b9c-8644-879cf8d10593/.system_generated/steps/167/content.md', 'utf8');
const lines = originalStyles.split('\n');
const growupOriginalCss = lines.slice(2500, 2624).join('\n'); // The lines containing the GrowUp CSS

// 2. Read local style.css
let localCss = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/style.css', 'utf8');
const startIdx = localCss.indexOf('.growup-stage-card {');

if (startIdx !== -1) {
    localCss = localCss.substring(0, startIdx) + growupOriginalCss + '\n';
    fs.writeFileSync('d:/Rankes/Rank-No-1-main/frontend/style.css', localCss);
    console.log('Restored original dark-mode Grow Up CSS in style.css');
} else {
    console.log('Could not find .growup-stage-card in style.css');
}

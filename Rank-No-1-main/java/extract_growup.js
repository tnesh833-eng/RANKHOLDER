const fs = require('fs');
const content = fs.readFileSync('C:/Users/THARUNESH/.gemini/antigravity-ide/brain/d3963f7b-3d05-4b9c-8644-879cf8d10593/.system_generated/steps/62/content.md', 'utf8');
const start = content.indexOf('<section id="growup"');
const end = content.indexOf('</section>', start) + 10;
const growUpContent = content.substring(start, end);
fs.writeFileSync('d:/Rankes/Rank-No-1-main/growup_new.html', growUpContent);

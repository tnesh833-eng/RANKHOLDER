const fs = require('fs');
let html = fs.readFileSync('frontend/app.html','utf8');
const lines = html.split('\n');

const mainIdx = lines.findIndex(l => l.includes('id="mainPortal"'));
let removed = 0;
for (let i = mainIdx - 1; i >= 0 && removed < 2; i--) {
    if (lines[i].includes('</div>')) {
        lines[i] = lines[i].replace('</div>', '');
        removed++;
    }
}

fs.writeFileSync('frontend/app.html', lines.join('\n'));
console.log('Removed ' + removed + ' closing divs near mainPortal');

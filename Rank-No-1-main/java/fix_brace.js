const fs = require('fs');
let js = fs.readFileSync('frontend/app.js', 'utf8');
const lines = js.split('\n');
const startIdx = lines.findIndex(l => l.includes('else if (filterType === "internship")'));
if (startIdx !== -1) {
    lines.splice(startIdx+3, 1);
    fs.writeFileSync('frontend/app.js', lines.join('\n'));
    console.log('Fixed extra brace');
} else {
    console.log('Not found');
}

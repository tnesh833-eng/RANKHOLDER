const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');
const lines = html.split('\n');

// Find the adminNavBtn line
const idx = lines.findIndex(l => l.includes('id="adminNavBtn"'));
if (idx === -1) { console.log('Not found'); process.exit(1); }
console.log('Found at line', idx + 1, ':', JSON.stringify(lines[idx]));

// Check next 5 lines for the style
for (let i = idx; i < idx + 6; i++) {
    console.log(i+1, ':', JSON.stringify(lines[i]));
}

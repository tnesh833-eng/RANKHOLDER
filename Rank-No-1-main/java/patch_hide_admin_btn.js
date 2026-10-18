const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');
const lines = html.split('\n');

const idx = lines.findIndex(l => l.includes('id="adminNavBtn"'));
if (idx === -1) { console.log('Not found'); process.exit(1); }

// Replace the style line that has display:flex with display:none
// Line 226 (idx+5) has: display:flex; align-items:center...
const styleLine = lines[idx + 5];
if (styleLine.includes('display:flex')) {
    lines[idx + 5] = styleLine.replace('display:flex;', 'display:none;');
    fs.writeFileSync('frontend/app.html', lines.join('\n'));
    console.log('✅ adminNavBtn hidden by default.');
} else {
    console.log('⚠️  style line not as expected:', JSON.stringify(styleLine));
}

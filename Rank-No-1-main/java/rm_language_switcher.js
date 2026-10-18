const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');
const lines = html.split('\n');

const startIdx = lines.findIndex(l => l.includes('<select id="languageSwitcher"'));

if (startIdx !== -1) {
    // Find the enclosing <div> before the select, which is at startIdx - 1
    const divStartIdx = startIdx - 1;
    // Find the closing </div> after the select, which is at startIdx + 7
    const divEndIdx = startIdx + 7;
    
    // Validate we're removing the right block
    if (lines[divStartIdx].includes('<div') && lines[divEndIdx].includes('</div>')) {
        lines.splice(divStartIdx, divEndIdx - divStartIdx + 1);
        fs.writeFileSync('frontend/app.html', lines.join('\n'));
        console.log('Language switcher removed successfully.');
    } else {
        console.log('Block validation failed, please check line offsets.');
    }
} else {
    console.log('Language switcher select tag not found.');
}

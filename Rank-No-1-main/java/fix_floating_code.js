const fs = require('fs');
let js = fs.readFileSync('frontend/app.js', 'utf8');
const lines = js.split('\n');

const endIdx = lines.findIndex(l => l.includes('async function searchGlobalCollege()'));
let startIdx = -1;
for (let i = endIdx - 1; i >= 0; i--) {
    if (lines[i].includes('researchMeta = backendData.sources')) {
        startIdx = i;
        break;
    }
}

if (startIdx !== -1 && endIdx !== -1) {
    if (endIdx - startIdx < 20) {
        lines.splice(startIdx, endIdx - startIdx);
        fs.writeFileSync('frontend/app.js', lines.join('\n'));
        console.log('Removed ' + (endIdx - startIdx) + ' broken lines');
    } else {
        console.log('Bounds are too far apart! ' + (endIdx - startIdx) + ' lines.');
    }
} else {
    console.log('Could not find bounds: start=' + startIdx + ' end=' + endIdx);
}

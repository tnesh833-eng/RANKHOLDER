const fs = require('fs');
const html = fs.readFileSync('frontend/app.html', 'utf8');

let depth = 0;
let minDepth = 0;
let lineOfMinDepth = -1;
let currentLine = 1;
let index = 0;

while (index < html.length) {
    const nextOpen = html.indexOf('<div', index);
    const nextClose = html.indexOf('</div', index);
    const nextNewline = html.indexOf('\n', index);
    
    // Find what comes next: open, close, or newline
    const events = [];
    if (nextOpen !== -1) events.push({type: 'open', idx: nextOpen});
    if (nextClose !== -1) events.push({type: 'close', idx: nextClose});
    if (nextNewline !== -1) events.push({type: 'newline', idx: nextNewline});
    
    if (events.length === 0) break;
    
    events.sort((a, b) => a.idx - b.idx);
    const ev = events[0];
    
    if (ev.type === 'newline') {
        currentLine++;
        index = ev.idx + 1;
    } else if (ev.type === 'open') {
        depth++;
        index = ev.idx + 4; // skip '<div'
    } else if (ev.type === 'close') {
        depth--;
        if (depth < minDepth) {
            minDepth = depth;
            lineOfMinDepth = currentLine;
            console.log(`Unmatched </div found around line ${currentLine}`);
        }
        index = ev.idx + 5; // skip '</div'
    }
}
console.log('Final depth:', depth);

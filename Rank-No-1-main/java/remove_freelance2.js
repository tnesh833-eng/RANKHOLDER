const fs = require('fs');

// ── app.html: remove lines 571-596 (0-indexed 570-595) ──────────
let html = fs.readFileSync('frontend/app.html', 'utf8');
const lines = html.split('\n');

// Find the block: starts with the <div with border-top purple (just after line ~570)
// and ends with the closing </div> at line ~596
// We'll find by content
let startLine = -1, endLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('rgba(168,85,247,0.2)') && lines[i].includes('border-top')) {
        startLine = i;
    }
    if (startLine !== -1 && i > startLine && lines[i].trim() === '</div>' ) {
        // check if this closes our block (look for freelance text in range)
        const blockText = lines.slice(startLine, i+1).join('');
        if (blockText.includes('freelance') || blockText.includes('Freelance')) {
            endLine = i;
            break;
        }
    }
}

if (startLine !== -1 && endLine !== -1) {
    console.log(`Removing lines ${startLine+1} to ${endLine+1}`);
    lines.splice(startLine, endLine - startLine + 1);
    fs.writeFileSync('frontend/app.html', lines.join('\n'));
    console.log('SUCCESS: freelance block removed from app.html');
} else {
    console.log('ERROR: could not find block. startLine=' + startLine + ' endLine=' + endLine);
    // Fallback: remove specific line ranges (571-596 = 0-indexed 570-595)
    console.log('Trying direct line removal...');
    let html2 = fs.readFileSync('frontend/app.html', 'utf8');
    const l2 = html2.split('\n');
    // Find the freelance div start
    for (let i = 0; i < l2.length; i++) {
        if (l2[i].includes('Freelance & Project Development') || l2[i].includes('Freelance &amp; Project Development')) {
            // go back to find the opening div
            let start = i;
            while (start > 0 && !l2[start].trim().startsWith('<div')) start--;
            // go forward to find the matching closing div
            let depth = 0;
            let end = start;
            for (let j = start; j < l2.length; j++) {
                const cnt = (l2[j].match(/<div/g)||[]).length;
                const cntClose = (l2[j].match(/<\/div>/g)||[]).length;
                depth += cnt - cntClose;
                if (depth <= 0 && j > start) { end = j; break; }
            }
            console.log('Fallback: removing lines', start+1, 'to', end+1);
            l2.splice(start, end - start + 1);
            fs.writeFileSync('frontend/app.html', l2.join('\n'));
            console.log('SUCCESS via fallback');
            break;
        }
    }
}

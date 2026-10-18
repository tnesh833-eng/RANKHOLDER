const fs = require('fs');

// ── Find JS syntax error ─────────────────────────────────────────
const js = fs.readFileSync('frontend/app.js', 'utf8');
const lines = js.split('\n');

// Binary search: find which line has the syntax error
const vm = require('vm');

// Split file in half, keep testing to narrow down
let lo = 0, hi = lines.length;
let errorLine = -1;

// Fast approach: try to find by locating unmatched brackets/parens
let parenDepth = 0, bracketDepth = 0, braceDepth = 0;
let inString = false, stringChar = '';
let inTemplate = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
        const ch = line[j];
        const prev = j > 0 ? line[j-1] : '';
        
        // Skip escaped chars
        if (prev === '\\') continue;
        
        // String handling
        if (!inString && (ch === '"' || ch === "'" || ch === '`')) {
            inString = true; stringChar = ch;
        } else if (inString && ch === stringChar) {
            inString = false;
        }
        
        if (!inString) {
            if (ch === '(') parenDepth++;
            if (ch === ')') parenDepth--;
            if (ch === '{') braceDepth++;
            if (ch === '}') braceDepth--;
            if (ch === '[') bracketDepth++;
            if (ch === ']') bracketDepth--;
        }
    }
}
console.log('Final paren depth:', parenDepth, '(should be 0)');
console.log('Final brace depth:', braceDepth, '(should be 0)');
console.log('Final bracket depth:', bracketDepth, '(should be 0)');

// Find the actual error line using Node's own parser on chunks
const chunk = 500;
for (let start = 0; start < lines.length; start += chunk) {
    const portion = lines.slice(0, start + chunk).join('\n');
    try {
        new vm.Script(portion);
    } catch(e) {
        if (e.constructor.name === 'SyntaxError') {
            console.log('Syntax error occurs by line', start + chunk, ':', e.message);
            // Narrow down more
            for (let i = Math.max(0, start); i < Math.min(start + chunk, lines.length); i++) {
                const p2 = lines.slice(0, i+1).join('\n');
                try { new vm.Script(p2); } catch(e2) {
                    if (e2.constructor.name === 'SyntaxError') {
                        console.log('Error first appears at line', i+1, ':', lines[i].trim());
                        errorLine = i;
                        break;
                    }
                }
            }
            break;
        }
    }
}

if (errorLine !== -1) {
    console.log('\nContext around error:');
    for (let i = Math.max(0, errorLine - 5); i <= Math.min(lines.length-1, errorLine + 5); i++) {
        console.log((i+1) + (i === errorLine ? ' >>> ' : '     ') + lines[i]);
    }
}

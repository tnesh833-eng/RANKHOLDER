const fs = require('fs');

// ─── 1. app.html ─────────────────────────────────────────────────
let html = fs.readFileSync('frontend/app.html', 'utf8');
const lines = html.split('\n');

// Remove lines 571-598 (0-indexed: 570-597) — the freelance block in profile panel
// Find the exact block by marker comment and closing div
const startMarker = '<!-- Freelance & Project Needs -->';
const startIdx = lines.findIndex(l => l.includes('Freelance & Project Needs'));
if (startIdx !== -1) {
    // find the closing </div> that closes the surrounding <div> (the one with border-top)
    let depth = 0;
    let endIdx = startIdx;
    let inBlock = false;
    for (let i = startIdx; i < lines.length; i++) {
        const l = lines[i];
        if (l.includes('<div')) depth++;
        if (l.includes('</div>')) depth--;
        if (depth <= 0 && i > startIdx) {
            endIdx = i;
            break;
        }
    }
    console.log(`Removing app.html freelance block: lines ${startIdx+1} to ${endIdx+1}`);
    lines.splice(startIdx, endIdx - startIdx + 1);
    fs.writeFileSync('frontend/app.html', lines.join('\n'));
    console.log('app.html: freelance block removed');
} else {
    console.log('app.html: freelance block not found');
}

// ─── 2. app.js — remove the entire freelance chat section ────────
let js = fs.readFileSync('frontend/app.js', 'utf8');

// Remove the freelance modal block from freelanceModal definition through end of all freelance functions
const freelanceModalStart = js.indexOf('/*  Freelance Chat (User Side)  */');
const freelanceModalEnd = js.indexOf('// Send message in Freelance Chat');

if (freelanceModalStart !== -1) {
    // Remove from "/* Freelance Chat */" to the end of sendFreelanceMessage function
    // Find end of sendFreelanceMessage by matching closing brace
    let searchFrom = js.indexOf('async function sendFreelanceMessage');
    if (searchFrom === -1) searchFrom = freelanceModalEnd;
    
    // Find the end of that function
    let depth = 0;
    let i = searchFrom;
    let inFunc = false;
    while (i < js.length) {
        if (js[i] === '{') { depth++; inFunc = true; }
        if (js[i] === '}') { depth--; }
        if (inFunc && depth === 0) { i++; break; }
        i++;
    }
    
    const removed = js.substring(freelanceModalStart, i);
    js = js.substring(0, freelanceModalStart) + js.substring(i);
    fs.writeFileSync('frontend/app.js', js);
    console.log('app.js: freelance chat functions removed');
} else {
    console.log('app.js: freelance section not found');
}

// Also remove freelance from job filter logic in app.js
js = fs.readFileSync('frontend/app.js', 'utf8');
// Remove the freelance filter condition lines
js = js.replace(/} else if \(filterType === "internship" \|\| filterType === "freelance"\) \{[\s\S]*?card\.style\.display = \(cat\.includes\("intern"\) \|\| cat\.includes\("freelance"\)\) \? "block" : "none";[\s\S]*?\}/gm, 
    `} else if (filterType === "internship") {\n            card.style.display = cat.includes("intern") ? "block" : "none";\n        }`);

// Remove the freelance job card from app.js
js = js.replace(/\{ id: 4, title: "Startup Web App Contract".*?freelance.*?\},?\n?/gms, '');

fs.writeFileSync('frontend/app.js', js);
console.log('app.js: freelance filter logic cleaned');

// ─── 3. login.html ───────────────────────────────────────────────
let login = fs.readFileSync('frontend/login.html', 'utf8');
const loginLines = login.split('\n');

const loginFreelanceIdx = loginLines.findIndex(l => l.includes('Freelance & Project Needs'));
if (loginFreelanceIdx !== -1) {
    let depth = 0;
    let endIdx = loginFreelanceIdx;
    for (let i = loginFreelanceIdx; i < loginLines.length; i++) {
        const l = loginLines[i];
        if (l.includes('<div')) depth++;
        if (l.includes('</div>')) depth--;
        if (depth <= 0 && i > loginFreelanceIdx) {
            endIdx = i;
            break;
        }
    }
    console.log(`Removing login.html freelance block: lines ${loginFreelanceIdx+1} to ${endIdx+1}`);
    loginLines.splice(loginFreelanceIdx, endIdx - loginFreelanceIdx + 1);
    fs.writeFileSync('frontend/login.html', loginLines.join('\n'));
    console.log('login.html: freelance block removed');
} else {
    console.log('login.html: freelance block not found');
}

// ─── 4. backend.js — remove freelance notification ───────────────
let backend = fs.readFileSync('frontend/backend.js', 'utf8');
backend = backend.replace(/\{ id: 3, title: "Freelance Project Match".*?\},?\n?/gms, '');
fs.writeFileSync('frontend/backend.js', backend);
console.log('backend.js: freelance notification removed');

console.log('\n✅ All frontend freelance references removed!');

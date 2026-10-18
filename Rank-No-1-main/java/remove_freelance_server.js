const fs = require('fs');
let s = fs.readFileSync('server.js','utf8');

const routeMarkers = [
    'app.get("/api/admin/freelance-chats",',
    'app.get("/api/admin/freelance-chats/:userId",',
    'app.post("/api/admin/freelance-chats/reply",',
    'app.get("/api/freelance/chat",',
    'app.post("/api/freelance/chat",',
];

const lines = s.split('\n');
const toRemove = new Set();

routeMarkers.forEach(route => {
    const idx = lines.findIndex(l => l.includes(route));
    if (idx === -1) { console.log('NOT FOUND:', route); return; }
    let depth = 0;
    let end = idx;
    for(let i = idx; i < lines.length; i++) {
        const opens  = (lines[i].match(/\{/g) || []).length;
        const closes = (lines[i].match(/\}/g) || []).length;
        depth += opens - closes;
        if (depth <= 0 && i > idx) { end = i; break; }
    }
    console.log(`Removing: ${route} [lines ${idx+1}-${end+1}]`);
    for (let i = idx; i <= end; i++) toRemove.add(i);
});

const filtered = lines.filter((_, i) => !toRemove.has(i));
fs.writeFileSync('server.js', filtered.join('\n'));
console.log(`SUCCESS: removed ${toRemove.size} lines from server.js`);

// Verify
const remaining = filtered.filter(l => l.toLowerCase().includes('freelance'));
console.log('Remaining freelance refs in server.js:', remaining.length);
remaining.forEach((l, i) => console.log(' -', l.trim()));

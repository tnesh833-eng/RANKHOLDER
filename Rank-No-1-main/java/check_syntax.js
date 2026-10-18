// Use Node's actual parser to get the real error
const fs = require('fs');
const js = fs.readFileSync('frontend/app.js', 'utf8');

// Use acorn or just check node --check
const { execSync } = require('child_process');
try {
    execSync('node --check frontend/app.js', { cwd: process.cwd(), encoding: 'utf8' });
    console.log('No syntax error found by node --check');
} catch(e) {
    console.log('SYNTAX ERROR:\n', e.stderr || e.stdout || e.message);
}

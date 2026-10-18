const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');

if (!html.includes('lld-code.js')) {
    html = html.replace('</body>', '    <script src="/frontend/lld-code.js"></script>\n</body>');
    fs.writeFileSync('frontend/app.html', html);
    console.log("Successfully added lld-code.js to app.html");
} else {
    console.log("lld-code.js is already linked");
}

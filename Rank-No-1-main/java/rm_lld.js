const fs = require('fs');
let html = fs.readFileSync('frontend/app.html','utf8');
html = html.replace('<script src="/frontend/lld.js"></script>', '');
fs.writeFileSync('frontend/app.html', html);
console.log('Removed lld.js');

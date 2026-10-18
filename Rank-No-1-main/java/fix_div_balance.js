const fs = require('fs');
let html = fs.readFileSync('frontend/app.html','utf8');
const allDivOpen = (html.match(/<div/g)||[]).length;
const allDivClose = (html.match(/<\/div>/g)||[]).length;
let diff = allDivOpen - allDivClose;

if (diff < 0) {
    // Too many closing divs, let's remove them from just before mainPortal
    for (let i=0; i < Math.abs(diff); i++) {
        html = html.replace('</div>\n</div>\n            <main id="mainPortal"', '</div>\n            <main id="mainPortal"');
        html = html.replace('</div>\n            <main id="mainPortal"', '            <main id="mainPortal"');
    }
    fs.writeFileSync('frontend/app.html', html);
    console.log('Removed ' + Math.abs(diff) + ' excess closing divs');
} else if (diff > 0) {
    console.log('Need to add ' + diff + ' divs');
} else {
    console.log('Balanced!');
}

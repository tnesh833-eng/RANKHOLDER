const fs = require('fs');
let html = fs.readFileSync('frontend/app.html','utf8');
const pStart = html.indexOf('id="profilePanel"');
const pEnd = html.indexOf('id="mainPortal"', pStart);
const section = html.substring(pStart, pEnd);
const o = (section.match(/<div/g)||[]).length;
const c = (section.match(/<\/div>/g)||[]).length;
if (o > c) {
    const diff = o - c;
    const closingDivs = '</div>\n'.repeat(diff);
    html = html.substring(0, pEnd) + closingDivs + html.substring(pEnd);
    fs.writeFileSync('frontend/app.html', html);
    console.log(`Added ${diff} closing divs`);
} else {
    console.log('Balanced!');
}

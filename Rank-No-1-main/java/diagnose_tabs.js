const fs = require('fs');
const html = fs.readFileSync('frontend/app.html', 'utf8');
const js   = fs.readFileSync('frontend/app.js',   'utf8');

// Check 1: switchTab defined
console.log('1. switchTab defined in app.js:', js.includes('function switchTab'));

// Check 2: tab-content sections
const tabSections = (html.match(/class="tab-content/g) || []).length;
console.log('2. tab-content sections:', tabSections);

// Check 3: active section
const activeSections = (html.match(/tab-content active/g) || []).length;
console.log('3. active tab-content:', activeSections);

// Check 4: div balance
const divOpen  = (html.match(/<div/g)  || []).length;
const divClose = (html.match(/<\/div>/g) || []).length;
console.log('4. DIV balance: opens=' + divOpen + ' closes=' + divClose + ' diff=' + (divOpen - divClose));

// Check 5: freelance modal still referenced?
const modalRefs = (html.match(/freelanceModal/g) || []).length;
console.log('5. freelanceModal refs in HTML:', modalRefs);

// Check 6: openFreelanceModal still called in HTML?
const openRefs = (html.match(/openFreelanceModal/g) || []).length;
console.log('6. openFreelanceModal calls in HTML:', openRefs);

// Check 7: switchTab function body
const stIdx = js.indexOf('function switchTab');
if (stIdx !== -1) {
    console.log('7. switchTab fn:', js.substring(stIdx, stIdx + 300).replace(/\n/g, ' '));
} else {
    console.log('7. switchTab NOT FOUND in app.js');
}

// Check 8: look for unclosed tags in tab area
const tabBarIdx = html.indexOf('class="tab-bar"');
const mainPortalIdx = html.indexOf('id="mainPortal"');
if (tabBarIdx !== -1 && mainPortalIdx !== -1) {
    const between = html.substring(tabBarIdx, mainPortalIdx);
    const bOpen  = (between.match(/<div/g)  || []).length;
    const bClose = (between.match(/<\/div>/g) || []).length;
    console.log('8. DIV balance in tab-bar to mainPortal: opens=' + bOpen + ' closes=' + bClose + ' diff=' + (bOpen - bClose));
}

// Check 9: JS syntax check
try {
    require('vm').compileFunction(js, [], {});
    console.log('9. app.js syntax: OK');
} catch(e) {
    console.log('9. app.js SYNTAX ERROR:', e.message.substring(0, 200));
}

// Check 10: List all tab sections
const tabIds = [];
let match;
const re = /id="([^"]+)" class="tab-content/g;
while ((match = re.exec(html)) !== null) tabIds.push(match[1]);
console.log('10. Tab section IDs:', tabIds.join(', '));

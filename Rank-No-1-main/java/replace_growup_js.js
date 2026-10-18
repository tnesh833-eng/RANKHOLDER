const fs = require('fs');
const appJsPath = 'd:/Rankes/Rank-No-1-main/frontend/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

const startIdx = appJs.indexOf('const GROWUP_CURRICULUM = [');
const endIdx = appJs.indexOf('/* ==========================================================================', startIdx + 100);

const growupNewJs = fs.readFileSync('d:/Rankes/Rank-No-1-main/frontend/growup.js', 'utf8');

if (startIdx !== -1 && endIdx !== -1) {
    appJs = appJs.substring(0, startIdx) + growupNewJs + '\n' + appJs.substring(endIdx);
    fs.writeFileSync(appJsPath, appJs);
    console.log("Successfully replaced growup section in app.js");
} else {
    console.log("Could not find boundaries in app.js", startIdx, endIdx);
}

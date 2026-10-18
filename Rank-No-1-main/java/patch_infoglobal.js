const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');
const lines = html.split('\n');

// Find line index of "<!-- Loader -->" near infoglobal (around line 5552)
let loaderLine = -1, resultsEnd = -1;
for (let i = 5500; i < lines.length; i++) {
    if (lines[i].includes('<!-- Loader -->') && loaderLine === -1) loaderLine = i;
    if (loaderLine > -1 && lines[i].includes('</div>') && i > 5630 && resultsEnd === -1) {
        // check for the closing div of #results
        if (lines[i].trim() === '</div>') {
            resultsEnd = i;
            break;
        }
    }
}

console.log('Loader line:', loaderLine + 1);
console.log('Results end line:', resultsEnd + 1);

// Patch: replace from loaderLine to resultsEnd (inclusive)
const newBlock = `<!-- Loader -->
<div id="loader" style="display:none; text-align:center; padding:4rem 1rem;">
    <div class="pulse-ring" style="margin:0 auto 1.2rem;"></div>
    <p style="color:var(--muted); margin-bottom:1rem;">Fetching comprehensive college profile…</p>
    <div class="loader-steps">
        <span class="step-chip"><i class="fas fa-globe"></i> Official Site</span>
        <span class="step-chip"><i class="fab fa-instagram"></i> Social Media</span>
        <span class="step-chip"><i class="fas fa-map-marker-alt"></i> Maps</span>
        <span class="step-chip"><i class="fas fa-image"></i> Images</span>
        <span class="step-chip"><i class="fab fa-youtube"></i> Videos</span>
        <span class="step-chip"><i class="fas fa-chalkboard-teacher"></i> Staff</span>
        <span class="step-chip"><i class="fas fa-comments"></i> Feedback</span>
        <span class="step-chip"><i class="fas fa-trophy"></i> Achievements</span>
    </div>
</div>

<!-- Results -->
<div id="results">

    <!-- College Hero Card -->
    <div class="college-hero">
        <div id="heroAvatar" class="college-avatar-placeholder">&#127963;</div>
        <div class="college-meta">
            <h2 id="resName">&#8212;</h2>
            <p id="resDescription">&#8212;</p>
            <div class="facts-row" id="resFacts"></div>
        </div>
    </div>

    <!-- Top 3-col row: Social | Location | Official -->
    <div class="info-grid">

        <!-- Social Media -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon icon-pink"><i class="fas fa-share-nodes"></i></div>
                <span class="card-title">Social Profiles</span>
            </div>
            <div class="social-grid" id="socialGrid"></div>
        </div>

        <!-- Location -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon icon-amber"><i class="fas fa-map-location-dot"></i></div>
                <span class="card-title">Location &amp; Contact</span>
            </div>
            <div class="location-row" id="locationInfo"></div>
        </div>

        <!-- Official Links -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon icon-green"><i class="fas fa-link"></i></div>
                <span class="card-title">Quick Links</span>
            </div>
            <div class="social-grid" id="quickLinks"></div>
        </div>

    </div>

    <!-- Image Gallery -->
    <div class="gallery-section">
        <div class="section-heading"><span></span> Campus Gallery</div>
        <div class="gallery-grid" id="galleryGrid"></div>
    </div>

    <!-- Videos -->
    <div style="margin-bottom:1.5rem;">
        <div class="section-heading"><span></span> Related Videos</div>
        <div class="video-grid" id="videoGrid"></div>
    </div>

    <!-- Placements & Affiliations -->
    <div class="two-col">
        <div>
            <div class="section-heading"><span></span> &#128188; Placement &amp; Career Intel</div>
            <div class="info-list" id="placementList"></div>
        </div>
        <div>
            <div class="section-heading"><span></span> &#127979; Affiliation &amp; Accreditation</div>
            <div class="info-list" id="affiliationList"></div>
        </div>
    </div>

    <!-- Staff & Student Feedback -->
    <div class="two-col">
        <div>
            <div class="section-heading"><span></span> &#128104;&#8205;&#127979; Staff &amp; Faculty Details</div>
            <div class="info-list" id="staffList"></div>
        </div>
        <div>
            <div class="section-heading"><span></span> &#128172; Student Reviews &amp; Feedback</div>
            <div class="info-list" id="feedbackList"></div>
        </div>
    </div>

    <!-- Achievements -->
    <div style="margin-bottom:2rem;">
        <div class="section-heading"><span></span> &#127942; Achievements &amp; Rankings</div>
        <div class="info-list" id="achievementList"></div>
    </div>

</div>`;

if (loaderLine !== -1 && resultsEnd !== -1) {
    lines.splice(loaderLine, resultsEnd - loaderLine + 1, newBlock);
    fs.writeFileSync('frontend/app.html', lines.join('\n'));
    console.log('SUCCESS: Patched app.html');
} else {
    console.log('ERROR: Could not find target lines. loaderLine=' + loaderLine + ' resultsEnd=' + resultsEnd);
}

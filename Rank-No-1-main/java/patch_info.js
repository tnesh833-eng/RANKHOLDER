const fs = require('fs');
let html = fs.readFileSync('frontend/app.html', 'utf8');

const newResults = `
<!-- Results -->
<div id="results" style="display: block;">

    <!-- College Hero Card -->
    <div class="college-hero">
        <img id="heroAvatar" class="college-avatar" src="Rank Holder cerficated.png" alt="College Logo">
        <div class="college-meta">
            <h2 id="resName" style="text-transform: lowercase;">psv college of enginnering and technology, krishnagiri</h2>
            <p id="resDescription">P.S.V College of Engineering and Technology is committed to provide quality education to the students enabling them to excel in the fields of Science, ...</p>
            <div class="facts-row" id="resFacts">
                <span class="fact-chip"><i class="fas fa-university"></i> Type: Kolledžas, Indija</span>
            </div>
        </div>
    </div>

    <!-- Top 3-col row: Social | Location | Official -->
    <div class="info-grid">

        <!-- Social Media -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon icon-pink"><i class="fas fa-share-nodes"></i></div>
                <span class="card-title">SOCIAL PROFILES</span>
            </div>
            <div class="social-grid" id="socialGrid">
                <a href="#" class="social-btn ig"><i class="fab fa-instagram"></i> Instagram</a>
                <a href="#" class="social-btn fb"><i class="fab fa-facebook-f"></i> Facebook</a>
            </div>
        </div>

        <!-- Location -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon icon-amber"><i class="fas fa-map-location-dot"></i></div>
                <span class="card-title">LOCATION & CONTACT</span>
            </div>
            <div class="location-row" id="locationInfo">
                <div class="row-item"><i class="fas fa-map-marker-alt"></i><span>Mittapalli, Balinayanapalli, Elathagiri, Tamil Nadu 635108, India</span></div>
                <div class="row-item"><i class="fas fa-phone"></i><span>+91 94444 94360</span></div>
                <div class="row-item"><i class="fas fa-star" style="color: #fbbf24;"></i><span>4 (520 reviews)</span></div>
                <div class="row-item"><i class="fas fa-map"></i><a href="#" target="_blank">Open in Google Maps</a></div>
            </div>
        </div>

        <!-- Official Links -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon icon-green"><i class="fas fa-link"></i></div>
                <span class="card-title">QUICK LINKS</span>
            </div>
            <div class="social-grid" id="quickLinks">
                <a href="#" class="social-btn web"><i class="fas fa-globe"></i> Official Website</a>
                <a href="#" class="social-btn maps"><i class="fas fa-map"></i> View on Maps</a>
            </div>
        </div>

    </div>

    <!-- Image Gallery -->
    <div class="gallery-section">
        <div class="section-heading"><span></span> Campus Gallery</div>
        <div class="gallery-grid" id="galleryGrid">
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Campus+1" alt="Campus"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Logo" alt="Logo"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Students" alt="Students"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Gate" alt="Gate"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Event" alt="Event"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Building+2" alt="Building"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Building+3" alt="Building"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Aerial" alt="Aerial"></div>
            <div class="gallery-item"><img src="https://via.placeholder.com/300x200?text=Hostel" alt="Hostel"></div>
        </div>
    </div>

    <!-- Videos -->
    <div style="margin-bottom:1.5rem;">
        <div class="section-heading"><span></span> Related Videos</div>
        <div class="video-grid" id="videoGrid">
            <a href="#" class="video-card">
                <div class="video-thumb">
                    <img src="https://via.placeholder.com/300x170?text=Video+1" alt="Video">
                    <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                    <span class="video-duration">1:07</span>
                </div>
                <div class="video-info">
                    <div class="video-title">PSV College of engineering & Technologies Krishnagiri</div>
                    <div class="video-meta">VIJAY ANANTH • 11y ago</div>
                </div>
            </a>
            <a href="#" class="video-card">
                <div class="video-thumb">
                    <img src="https://via.placeholder.com/300x170?text=Video+2" alt="Video">
                    <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                    <span class="video-duration">2:58</span>
                </div>
                <div class="video-info">
                    <div class="video-title">P.S.V College Of Engineering And Technology Cutoff Detail And Eligibility</div>
                    <div class="video-meta">Information Of Education • 2y ago</div>
                </div>
            </a>
            <a href="#" class="video-card">
                <div class="video-thumb">
                    <img src="https://via.placeholder.com/300x170?text=Video+3" alt="Video">
                    <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                    <span class="video-duration">1:12</span>
                </div>
                <div class="video-info">
                    <div class="video-title">P.S.V College of Engineering and Technology</div>
                    <div class="video-meta">P.S.V College of Engineering & Technology • 6y ago</div>
                </div>
            </a>
            <a href="#" class="video-card">
                <div class="video-thumb">
                    <img src="https://via.placeholder.com/300x170?text=Video+4" alt="Video">
                    <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                    <span class="video-duration">4:24</span>
                </div>
                <div class="video-info">
                    <div class="video-title">PSV College of Engineering and Technology (Autonomous), Krishnagiri | Full Reviews in Tamil</div>
                    <div class="video-meta">SR Educational Guidance Centre • 5mo ago</div>
                </div>
            </a>
            <a href="#" class="video-card">
                <div class="video-thumb">
                    <img src="https://via.placeholder.com/300x170?text=Video+5" alt="Video">
                    <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                    <span class="video-duration">2:58</span>
                </div>
                <div class="video-info">
                    <div class="video-title">P.S.V. College of Engineering and Technology - PSVCET</div>
                    <div class="video-meta">ProfSam • 4mo ago</div>
                </div>
            </a>
            <a href="#" class="video-card">
                <div class="video-thumb">
                    <img src="https://via.placeholder.com/300x170?text=Video+6" alt="Video">
                    <div class="play-btn"><i class="fas fa-play-circle"></i></div>
                    <span class="video-duration">1:02</span>
                </div>
                <div class="video-info">
                    <div class="video-title">PSV COLLEGE OF NURSING KRISHNAGIRI | NURSE'S PONGAL CELEBRATION - 2026</div>
                    <div class="video-meta">SRK_creation... • 8mo ago</div>
                </div>
            </a>
        </div>
    </div>

    <!-- Placements & Affiliations -->
    <div class="two-col">
        <div>
            <div class="section-heading"><span></span> Placement & Career Intel</div>
            <div class="info-list" id="placementList">
                <div class="info-item">
                    <h4>PSV College Of Engineering and Technology ...</h4>
                    <p>Salary Package : 3.5 LPA. Package: ₹2.76 CTC per annum</p>
                </div>
                <div class="info-item">
                    <h4>PSV College of Engineering and Technology Placement</h4>
                    <p>The highest salary package offered is 12 LPA. The lowest salary package offered is 2.5 LPA. The average salary package offered is approximately 4.5 LPA.</p>
                </div>
                <div class="info-item">
                    <h4>PSV College – Educational Trust</h4>
                    <p>Welcome to P.S.V College of Engineering & Technology. To provide state of the art education with strong Engineering basics and managerial skills.</p>
                </div>
            </div>
        </div>
        <div>
            <div class="section-heading"><span></span> Affiliation & Accreditation</div>
            <div class="info-list" id="affiliationList">
                <div class="info-item">
                    <h4>PSV College – Educational Trust</h4>
                    <p>Accredited by NBA (CSE) | Accredited by NAAC with 'A' Grade. BUS ROUTE | SPORTS| NSS | YRC | NCC | NIRF</p>
                </div>
                <div class="info-item">
                    <h4>PSV College of Engineering and Technology, Krishnagiri</h4>
                    <p>... Autonomous ... affiliated to Anna University, Chennai. The College is accredited by National Assessment and Accreditation Council (NAAC) with "A" Grade.</p>
                </div>
                <div class="info-item">
                    <h4>P.S.V Group of Institutions (Official) (@psvcet_official)</h4>
                    <p>P.S.V College of Engineering & Technology An Autonomous Institution | Accredited by NAAC & NBA | Krishnagiri - 635108. Follow. Message ...</p>
                </div>
            </div>
        </div>
    </div>

</div>`;

const startIdx = html.indexOf('<!-- Results -->');
if (startIdx !== -1) {
    const endStr = '</div>\n            </div>\n        </section>';
    const endStr2 = '</div>\r\n            </div>\r\n        </section>';
    let endIdx = html.indexOf(endStr, startIdx);
    if(endIdx === -1) {
        endIdx = html.indexOf(endStr2, startIdx);
    }
    
    if (endIdx !== -1) {
        html = html.substring(0, startIdx) + newResults + "\n            " + html.substring(endIdx);
        // Change background
        html = html.replace('--bg:       transparent;', '--bg:       #fef4f8;');
        fs.writeFileSync('frontend/app.html', html);
        console.log('Successfully updated app.html');
    } else {
        console.log('Could not find end of results div');
    }
} else {
    console.log('Could not find <!-- Results -->');
}

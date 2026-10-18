const GROWUP_CURRICULUM = [
    {
        id: "soft_skills_intro",
        stage: 1,
        title: "Introduction of Soft Skill & Communication",
        category: "Foundational Soft Skills",
        icon: "🌱",
        tagline: "Personal & interpersonal abilities that help you succeed in professional environments.",
        summary: "Soft skills are personal and interpersonal abilities that help a person work effectively with others, communicate clearly, and excel in competitive corporate environments. While technical skills get you the interview, soft skills determine your promotions, leadership potential, and long-term career fulfillment.",
        attached_software: [
            { icon: "▶️", name: "YouTube Masterclass", role: "Video Lecture & Real-world Examples" },
            { icon: "🤖", name: "Gemini AI Coach", role: "Live Roleplay & Scenario Evaluation" },
            { icon: "📝", name: "Google Docs", role: "Journaling & Reflection Notes" }
        ],
        pillars: [
            { name: "Improves Confidence & Self Esteem", icon: "💪", description: "Develops strong inner conviction, overcoming imposter syndrome, and asserting ideas clearly in high-stakes meetings." },
            { name: "Helps to Work in Team", icon: "🤝", description: "Enables seamless collaboration, active listening, sharing credit, and building psychological safety across diverse teams." },
            { name: "Develops Leadership Quality", icon: "👑", description: "Inspires accountability, proactive problem solving, mentoring peers, and taking ownership without waiting for instructions." },
            { name: "Improves Problem Solving & Decision Making", icon: "🧩", description: "Transforms complex workplace friction into structured actionable solutions with sound rational judgment." },
            { name: "Manage Time and Stress", icon: "⏱️", description: "Prioritizes high-impact tasks, maintains emotional composure under tight deadlines, and avoids burnout." },
            { name: "Career Growth Acceleration", icon: "🚀", description: "Unlocks faster promotions, executive visibility, leadership roles, and valuable professional networks." },
            { name: "Positive Attitude & Growth Mindset", icon: "☀️", description: "Approaches challenges as learning opportunities and spreads optimism during stressful project sprints." },
            { name: "Professional Behaviour & Ethics", icon: "👔", description: "Adheres to corporate etiquette, reliability, confidentiality, punctual delivery, and transparent communication." }
        ],
        workplace_scenario: {
            context: "Your team is facing a high-priority deadline tomorrow, but unexpected API breaking changes cause critical tests to fail.",
            best_approach: "Stay calm, gather the team for a 5-minute sync, split debugging tasks using root-cause analysis, and proactively send a 2-line status update to the manager with estimated resolution time.",
            common_mistake: "Panicking, blaming external team APIs publicly in Slack, or hiding the issue until the morning of the demo."
        },
        golden_rules: [
            "Soft skills determine your career ceiling — cultivate them daily.",
            "Always link your personal work to the team's shared mission.",
            "Take 100% accountability for outcomes, not excuses."
        ],
        voice_script: "Welcome to your first masterclass on Soft Skills and Personal Growth. Soft skills are personal and interpersonal abilities that help you work effectively with others and thrive in any corporate environment. Let's master the 8 foundational pillars together!",
        quiz: [
            {
                question: "Why do top recruiters prioritize candidates with strong soft skills?",
                options: [
                    "Technical skills can be taught quickly, but professional attitude & collaboration are built over time",
                    "Soft skills are only required for HR and management roles",
                    "Companies want employees who never ask questions"
                ],
                answer: 0,
                explanation: "Recruiters know that technical stacks evolve rapidly, but strong communicators and team players can adapt and lead anywhere."
            },
            {
                question: "What is the best way to demonstrate professional behavior when a project milestone is delayed?",
                options: [
                    "Blame external vendors and keep quiet",
                    "Communicate early with stakeholders, explain root causes, and provide 2 actionable mitigation plans",
                    "Work overnight silently without telling anyone"
                ],
                answer: 1,
                explanation: "Early, transparent communication with mitigation options builds lasting executive trust."
            },
            {
                question: "How does a growth mindset directly boost career growth?",
                options: [
                    "It guarantees you never fail at any task",
                    "It reframes critical feedback and setbacks as data to level up your capabilities",
                    "It allows you to skip technical fundamentals"
                ],
                answer: 1,
                explanation: "A growth mindset views every challenge as a stepping stone to higher performance."
            }
        ],
        scenario_challenge: "Imagine you are working on a team project where a peer is consistently missing deadlines due to stress. How do you approach them with leadership, empathy, and professional accountability to get the project back on track?"
    },
    {
        id: "communication_mastery",
        stage: 2,
        title: "Communication & Articulation Mastery",
        category: "Executive Communication",
        icon: "🎙️",
        tagline: "The ability to express our ideas clearly and understand others.",
        summary: "Communication is the lifeblood of corporate engineering and leadership. It is the art of expressing complex technical thoughts with simplicity, listening actively, and aligning diverse stakeholders.",
        pillars: [
            { name: "Useful for Interviews & Placements", icon: "🎯", description: "Delivering structured, persuasive answers (STAR framework) that leave a memorable impression on interview panels." },
            { name: "Presentations & Public Speaking", icon: "📢", description: "Commanding attention with voice modulation, slide economy, and clear narrative structure in front of clients or senior leadership." },
            { name: "Improves Relationships with Colleagues & Clients", icon: "🤝", description: "Active listening, empathy, and rapport that turn transactional relationships into high-trust partnerships." },
            { name: "Builds Trust and Teamwork", icon: "🛡️", description: "Clear expectations, psychological safety, and transparent status updates eliminate misunderstandings." },
            { name: "Writing Professional Emails & Reports", icon: "📝", description: "Drafting executive-ready summaries: Bottom Line Up Front (BLUF), bulleted action items, and crisp call-to-actions." },
            { name: "Why Companies Look For It", icon: "🏢", description: "Companies can train technical tools in weeks, but they rely on strong communicators to represent the company to clients and lead teams!" }
        ],
        workplace_scenario: {
            context: "A client disagrees with your proposed software architecture during a Zoom presentation and challenges your technical decision.",
            best_approach: "Acknowledge their perspective respectfully ('That is a great consideration, let me walk through the trade-offs'), present data-driven pros and cons, and offer a small pilot comparison.",
            common_mistake: "Becoming defensive, speaking over the client, or dismissing their concern as technically uninformed."
        },
        golden_rules: [
            "Listen to understand, not just to reply.",
            "Use BLUF (Bottom Line Up Front) when emailing executives.",
            "Match your technical depth to your audience's background."
        ],
        voice_script: "Communication is your highest leverage career superpower. In this stage, we master interview articulation, public presentations, client relationships, and executive email writing.",
        quiz: [
            {
                question: "What does the BLUF communication technique stand for in business writing?",
                options: [
                    "Bottom Line Up Front — putting key findings/requests at the very top",
                    "Basic Level Unified Formatting",
                    "Bullet Lists Underline Features"
                ],
                answer: 0,
                explanation: "BLUF saves busy managers and clients time by providing the core verdict before the detailed breakdown."
            },
            {
                question: "In an interview, what is the most effective way to answer 'Tell me about a time you solved a difficult problem'?",
                options: [
                    "Use the STAR method: Situation, Task, Action, and measurable Result",
                    "Talk for 10 minutes about the whole project history without numbers",
                    "Say you never faced any difficult problems"
                ],
                answer: 0,
                explanation: "STAR provides a compelling, concise story with measurable impact."
            },
            {
                question: "Why do MNC companies specifically test communication in group discussions (GD)?",
                options: [
                    "To see who can speak the loudest and interrupt others",
                    "To evaluate active listening, synthesizing diverse opinions, and persuasive articulation",
                    "To test English vocabulary only"
                ],
                answer: 1,
                explanation: "GDs evaluate how effectively you collaborate, respect others' views, and guide a group toward consensus."
            }
        ],
        scenario_challenge: "You need to email your project manager to request an extension on a deliverable because unexpected edge-case bugs were discovered during QA. Write your professional email following the BLUF structure."
    },
    {
        id: "problem_solving",
        stage: 3,
        title: "Problem Solving & Critical Decision Making",
        category: "Analytical Excellence",
        icon: "🧠",
        tagline: "Structured thinking, root cause analysis, and sound judgment under pressure.",
        summary: "Top performers don't jump to hasty conclusions — they isolate root causes using proven mental models like the 5 Whys, First Principles Thinking, and Decision Matrices to build resilient solutions.",
        pillars: [
            { name: "5 Whys Root Cause Analysis", icon: "🔍", description: "Drilling beneath surface symptoms to identify the true underlying breakdown and prevent recurrence." },
            { name: "First Principles Thinking", icon: "🧱", description: "Breaking down complex problems into foundational truths rather than relying on outdated assumptions." },
            { name: "Data-Driven Tradeoff Evaluation", icon: "📊", description: "Weighing speed vs scalability vs cost with measurable criteria before making irreversible technical decisions." },
            { name: "Maintaining Calm Under Pressure", icon: "🧘", description: "Regulating emotional stress during production incidents to think clearly and execute systematically." }
        ],
        workplace_scenario: {
            context: "A database query spike crashes the staging server 2 hours before a major product demo.",
            best_approach: "Execute standard rollback, run slow query logs to identify the unindexed join, apply indexing fix, and document a 1-page Post-Mortem without blame.",
            common_mistake: "Randomly restarting servers repeatedly while hoping the issue resolves itself."
        },
        golden_rules: [
            "Never treat symptoms when you can cure the root cause.",
            "Separate facts from assumptions with data.",
            "Write blameless post-mortems after resolving critical issues."
        ],
        voice_script: "Welcome to Problem Solving and Critical Decision Making. In this module, you will learn how senior software engineers and leaders systematically diagnose failures and make confident decisions.",
        quiz: [
            {
                question: "What is the primary objective of a 'Blameless Post-Mortem' in corporate engineering?",
                options: [
                    "To identify systemic process & tool flaws so the failure never happens again, without punishing individuals",
                    "To decide which developer receives a warning letter",
                    "To hide production bugs from clients"
                ],
                answer: 0,
                explanation: "Psychological safety encourages engineers to report mistakes early and build stronger safeguards."
            },
            {
                question: "When applying First Principles thinking to a high computing cost issue, you should:",
                options: [
                    "Upgrade to the most expensive cloud tier immediately",
                    "Break down the actual memory and CPU cycles consumed per request and optimize the algorithmic bottleneck",
                    "Ignore the cost until finance complains"
                ],
                answer: 1,
                explanation: "First principles breaks problems down to fundamental resource constraints."
            }
        ],
        scenario_challenge: "Your web app's loading time suddenly jumped from 1.2s to 6.8s after a new release. Outline your 4-step systematic troubleshooting plan to identify and fix the bottleneck."
    },
    {
        id: "time_management",
        stage: 4,
        title: "Time Management & Stress Resilience",
        category: "Peak Productivity",
        icon: "⚡",
        tagline: "Eisenhower priority matrix, deep work flow, and sustainable workplace calm.",
        summary: "Productivity is not about working 16 hours a day; it is about ruthless prioritization, protecting uninterrupted focus blocks, and maintaining emotional resilience.",
        pillars: [
            { name: "Eisenhower Decision Matrix", icon: "📐", description: "Categorizing tasks into Urgent vs Important to focus on high-leverage goals rather than reactive firefighting." },
            { name: "Deep Work & Flow State", icon: "🌊", description: "Scheduling 90-minute blocks without Slack, emails, or notifications for high-concentration coding/design." },
            { name: "Managing Workplace Anxiety", icon: "🛡️", description: "Techniques like box breathing, proactive calendar blocking, and realistic commitments." },
            { name: "Sustainable Boundary Setting", icon: "🛑", description: "Saying no gracefully to low-value distractions while aligning with organizational priorities." }
        ],
        workplace_scenario: {
            context: "You have 3 simultaneous requests from different managers: bug fixes, documentation, and a new prototype.",
            best_approach: "List the tasks with estimated hours, align the 3 managers on priority order based on business impact, and commit to realistic delivery dates.",
            common_mistake: "Saying yes to all 3 secretly, working overnight, and delivering all three poorly and late."
        },
        golden_rules: [
            "If everything is a priority, nothing is a priority.",
            "Protect your morning hours for deep, uninterrupted work.",
            "Saying no to low-impact tasks is saying yes to high-impact results."
        ],
        voice_script: "Time is your most non-renewable resource. In Stage 4, we master the Eisenhower Matrix, deep work habits, and workplace stress resilience.",
        quiz: [
            {
                question: "In the Eisenhower Matrix, which quadrant produces the highest long-term career growth?",
                options: [
                    "Quadrant 2: Not Urgent, but Highly Important (Skill building, architecture planning, relationship building)",
                    "Quadrant 1: Urgent and Important (Constant emergencies)",
                    "Quadrant 4: Not Urgent and Not Important (Social media browsing)"
                ],
                answer: 0,
                explanation: "Quadrant 2 activities build compounding long-term value before they turn into emergencies."
            },
            {
                question: "What is the recommended approach to managing constant Slack or email notification distractions?",
                options: [
                    "Reply to every message within 5 seconds all day",
                    "Batch email/Slack checks into 3 dedicated windows daily and use status indicators during deep work",
                    "Delete all communication tools permanently"
                ],
                answer: 1,
                explanation: "Batching prevents context-switching penalty and protects deep focus."
            }
        ],
        scenario_challenge: "Describe how you would organize your weekly schedule to balance completing daily team deliverables while allocating 5 hours for self-learning and upskilling."
    },
    {
        id: "leadership_synergy",
        stage: 5,
        title: "Leadership Dynamics & Team Synergy",
        category: "Influential Leadership",
        icon: "🤝",
        tagline: "Inspiring peers, constructive feedback, empathy, and conflict de-escalation.",
        summary: "Leadership is not defined by your title; it is defined by your influence, empathy, and ability to elevate everyone around you to perform at their best.",
        pillars: [
            { name: "Empathy & Active Listening", icon: "❤️", description: "Understanding teammate motivations, personal challenges, and unspoken concerns to build deep loyalty." },
            { name: "Radical Candor Feedback", icon: "💬", description: "Caring personally while challenging directly — giving feedback that is specific, timely, and actionable." },
            { name: "Conflict Resolution & Negotiation", icon: "⚖️", description: "Reframing debates from 'Me vs You' to 'Us vs The Problem' to find win-win solutions." },
            { name: "Delegation & Empowerment", icon: "🚀", description: "Trusting team members with ownership and supporting them rather than micromanaging." }
        ],
        workplace_scenario: {
            context: "Two senior developers on your team have an aggressive argument over which frontend framework to use for a new product.",
            best_approach: "Schedule a structured technical spike meeting with clear evaluation metrics (learning curve, performance, community support) and decide based on data.",
            common_mistake: "Taking one person's side based on friendship or letting the conflict fester in team channels."
        },
        golden_rules: [
            "Praise in public, give constructive feedback in private.",
            "Focus on 'Us vs The Problem' rather than personal blame.",
            "Great leaders create more leaders, not followers."
        ],
        voice_script: "Welcome to Leadership Dynamics and Team Synergy. Leadership is the ability to inspire, resolve conflicts with empathy, and elevate team performance.",
        quiz: [
            {
                question: "According to the Radical Candor framework, the most effective feedback combines:",
                options: [
                    "Caring personally while challenging directly",
                    "Ruinous empathy (being too nice to mention mistakes)",
                    "Aggressive criticism without personal care"
                ],
                answer: 0,
                explanation: "Radical Candor shows you genuinely care about their growth while providing clear, honest feedback."
            },
            {
                question: "When mediating a team disagreement, what is the best opening question?",
                options: [
                    "Who is to blame for this conflict?",
                    "What shared objective are we both trying to achieve for our users?",
                    "Why can't you both just agree with management?"
                ],
                answer: 1,
                explanation: "Refocusing on shared user/business goals unites conflicting viewpoints."
            }
        ],
        scenario_challenge: "A junior teammate on your project is feeling discouraged after receiving harsh code review comments. How do you coach them and address the review culture constructively?"
    },
    {
        id: "career_mastery",
        stage: 6,
        title: "Placement, Interviews & Executive Presence",
        category: "Career Acceleration",
        icon: "🏆",
        tagline: "Acing high-package campus & MNC placement drives with executive polish.",
        summary: "Transform into a top 1% candidate who commands top compensation packages through exceptional interview storytelling, executive presence, and long-term career positioning.",
        pillars: [
            { name: "STAR Interview Storytelling", icon: "⭐", description: "Crafting structured 90-second impact stories for behavioral questions that highlight initiative and metric results." },
            { name: "Executive Body Language & Presence", icon: "👔", description: "Maintaining steady eye contact, authoritative posture, thoughtful pauses, and genuine enthusiasm." },
            { name: "Salary & Offer Negotiation", icon: "💼", description: "Anchoring your value with market data, counter-offering professionally, and evaluating total compensation." },
            { name: "Building a 5-Year Career Roadmap", icon: "🗺️", description: "Strategic skill compounding, high-impact mentorship, and establishing your industry personal brand." }
        ],
        workplace_scenario: {
            context: "An interviewer asks you: 'What is your biggest weakness?'",
            best_approach: "Share a genuine professional area you identified in the past, explain the specific corrective systems you implemented, and share the positive results.",
            common_mistake: "Giving fake answers like 'I'm too much of a perfectionist' or naming a fatal flaw without any improvement steps."
        },
        golden_rules: [
            "Every interview answer should highlight personal initiative and measurable outcomes.",
            "You are evaluating the company just as much as they are evaluating you.",
            "Negotiate respectfully — your value is backed by your preparation."
        ],
        voice_script: "Congratulations on reaching Stage 6: Placement, Interviews and Career Mastery. Let's polish your interview storytelling, salary negotiation, and executive presence!",
        quiz: [
            {
                question: "At the end of an interview when asked 'Do you have any questions for us?', what should you ask?",
                options: [
                    "'How does your team define high performance in the first 90 days for this role?'",
                    "'No, you answered everything.'",
                    "'When do I get my first vacation?'"
                ],
                answer: 0,
                explanation: "Asking about 90-day success demonstrates high initiative, proactive mindset, and executive drive."
            },
            {
                question: "How should you respond to a low initial salary offer during campus or lateral placement?",
                options: [
                    "Reject the offer angrily on the spot",
                    "Express enthusiasm for the role, cite verified market benchmarks, highlight your specific skills, and ask if there is flexibility in base or joining bonus",
                    "Accept immediately without asking any questions"
                ],
                answer: 1,
                explanation: "Polite, data-backed negotiation almost always improves terms without risk."
            }
        ],
        scenario_challenge: "Prepare your 90-second answer to 'Why should we hire you over other candidates for this software engineering role?' using structured metrics and unique value."
    }
];

let _currentGrowUpCurriculum = [...GROWUP_CURRICULUM];
let _activeGrowUpTopic = _currentGrowUpCurriculum[0];
let _growUpScoresMap = {};
let _activeGrowUpMode = "lecture";
let _growUpVoiceUtterance = null;
let _isGrowUpSpeaking = false;
let _growUpQuizAnswers = {};
let _autoSpeakGrowUp = true;

window.initGrowUpTab = async function() {
    console.log("[GrowUp] Initializing Grow Up AI Roadmap tab...");
    loadGrowUpLocalScores();
    try {
        if (window.Backend && window.Backend.GrowUp) {
            const serverScores = await window.Backend.GrowUp.getScores();
            if (serverScores && serverScores.length > 0) {
                serverScores.forEach(s => {
                    _growUpScoresMap[s.topic_id] = s;
                });
                saveGrowUpLocalScores();
            }
        }
    } catch(e) {
        console.warn("[GrowUp] Server score load fallback:", e);
    }
    
    renderGrowUpRoadmap();
    if (_currentGrowUpCurriculum && _currentGrowUpCurriculum.length > 0) {
        selectGrowUpTopic(_currentGrowUpCurriculum[0].id, false);
    }
    updateGrowUpOverallStats();
};

function loadGrowUpLocalScores() {
    try {
        const local = localStorage.getItem("rh_growup_scores");
        if (local) {
            _growUpScoresMap = JSON.parse(local);
        } else {
            // Default first topic unlocked with baseline demo score
            _growUpScoresMap["soft_skills_intro"] = {
                topic_id: "soft_skills_intro",
                score: 85,
                completed: 1,
                clarity_score: 88,
                problem_score: 82,
                professionalism_score: 92,
                confidence_score: 86,
                feedback: "Strong initial grasp of soft skills and corporate mindset."
            };
            saveGrowUpLocalScores();
        }
    } catch(e) {
        _growUpScoresMap = {};
    }
}

function saveGrowUpLocalScores() {
    try {
        localStorage.setItem("rh_growup_scores", JSON.stringify(_growUpScoresMap));
    } catch(e){}
}

function renderGrowUpRoadmap() {
    const track = document.getElementById("growupRoadmapTrack");
    if (!track) return;

    let html = "";
    _currentGrowUpCurriculum.forEach((topic, idx) => {
        const isUnlocked = idx === 0 || (_growUpScoresMap[_currentGrowUpCurriculum[idx-1]?.id]?.completed === 1) || topic.unlockedByDefault;
        const scoreData = _growUpScoresMap[topic.id];
        const isCompleted = scoreData && scoreData.completed === 1;
        const isActive = _activeGrowUpTopic && _activeGrowUpTopic.id === topic.id;

        let statusClass = isActive ? "active" : "";
        if (isCompleted) statusClass += " completed";
        if (!isUnlocked) statusClass += " locked";

        let scoreBadge = "";
        if (isCompleted && scoreData) {
            scoreBadge = `<span style="background:rgba(16,185,129,0.2); color:#34d399; font-size:0.68rem; font-weight:700; padding:2px 6px; border-radius:10px; border:1px solid rgba(16,185,129,0.3);">✓ ${scoreData.score}%</span>`;
        } else if (isUnlocked) {
            scoreBadge = `<span style="background:rgba(56,189,248,0.15); color:#38bdf8; font-size:0.68rem; font-weight:600; padding:2px 6px; border-radius:10px;">Ready</span>`;
        } else {
            scoreBadge = `<span style="background:rgba(255,255,255,0.06); color:#64748b; font-size:0.68rem; padding:2px 6px; border-radius:10px;">🔒 Locked</span>`;
        }

        html += `
            <div class="growup-stage-card ${statusClass}" onclick="handleGrowUpNodeClick('${topic.id}', ${isUnlocked})">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:1.3rem;">${topic.icon}</span>
                    ${scoreBadge}
                </div>
                <div style="font-size:0.72rem; font-weight:700; color:#818cf8; text-transform:uppercase; margin-top:4px;">STAGE ${topic.stage}</div>
                <div style="font-size:0.82rem; font-weight:700; color:#f0f4ff; line-height:1.2;">${topic.title.split('&')[0].trim()}</div>
            </div>
        `;
    });

    track.innerHTML = html;
}

window.handleGrowUpNodeClick = function(topicId, isUnlocked) {
    if (!isUnlocked) {
        alert("🔒 Complete the previous roadmap stage with a score of 60% or higher to unlock this topic!");
        return;
    }
    selectGrowUpTopic(topicId, true);
};

window.selectGrowUpTopic = function(topicId, shouldAutoSpeak = true) {
    const found = _currentGrowUpCurriculum.find(t => t.id === topicId) || GROWUP_CURRICULUM.find(t => t.id === topicId);
    if (!found) return;

    _activeGrowUpTopic = found;
    stopGrowUpVoice();
    _growUpQuizAnswers = {};

    // Update active header tags
    const stageTag = document.getElementById("growupActiveStageTag");
    const categoryTag = document.getElementById("growupActiveTopicCategory");
    const titleTag = document.getElementById("growupActiveTopicTitle");
    const taglineTag = document.getElementById("growupActiveTopicTagline");

    if (stageTag) stageTag.textContent = `STAGE ${found.stage}`;
    if (categoryTag) categoryTag.textContent = found.category || "Skill Mastery";
    if (titleTag) titleTag.textContent = found.title;
    if (taglineTag) taglineTag.textContent = `"${found.tagline}"`;

    renderGrowUpRoadmap();
    renderGrowUpLesson();
    renderGrowUpQuiz();
    resetGrowUpScorePanel();

    // Compulsory Voice Speaking for every user
    if (shouldAutoSpeak && _autoSpeakGrowUp) {
        setTimeout(() => {
            speakGrowUpLesson();
        }, 500);
    }

    // Scroll slightly if on mobile
    const mainGrid = document.querySelector(".growup-main-grid");
    if (mainGrid && window.innerWidth < 768) {
        mainGrid.scrollIntoView({ behavior: 'smooth' });
    }
};


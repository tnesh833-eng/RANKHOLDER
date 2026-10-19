-- ===============================================================
-- Rank-Holder — Complete Supabase PostgreSQL Schema
-- Copy and paste this script into your Supabase SQL Editor:
-- https://app.supabase.com/project/_/sql
-- ===============================================================

-- 1. Enable UUID Extension (standard in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id                  BIGSERIAL PRIMARY KEY,
    name                TEXT NOT NULL,
    email               TEXT UNIQUE NOT NULL,
    email_hash          TEXT UNIQUE,
    first_name          TEXT,
    last_name           TEXT,
    phone               TEXT,
    photo_url           TEXT,
    score               INTEGER DEFAULT 0,
    tokens              INTEGER DEFAULT 100,
    password_hash       TEXT,
    purpose             TEXT,
    github_link         TEXT,
    terms_accepted      INTEGER DEFAULT 0,
    status              TEXT DEFAULT 'PENDING',
    last_login          TIMESTAMPTZ,
    is_verified         INTEGER DEFAULT 0,
    subscription_status TEXT DEFAULT 'trial',
    subscription_id     TEXT,
    subscribed_at       TIMESTAMPTZ,
    blocked_at          TIMESTAMPTZ,
    blocked_reason      TEXT,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 3. OTP Codes (Verification & Passwordless Auth)
CREATE TABLE IF NOT EXISTS public.otp_codes (
    id         BIGSERIAL PRIMARY KEY,
    email      TEXT NOT NULL,
    otp_code   TEXT NOT NULL,
    purpose    TEXT NOT NULL DEFAULT 'register',
    expires_at TIMESTAMPTZ NOT NULL,
    is_used    INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Sessions (Tokens & Auth Expiration)
CREATE TABLE IF NOT EXISTS public.sessions (
    id            BIGSERIAL PRIMARY KEY,
    user_id       BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    expires_at    TIMESTAMPTZ NOT NULL,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User Settings
CREATE TABLE IF NOT EXISTS public.user_settings (
    id          INTEGER PRIMARY KEY CHECK (id = 1),
    name        TEXT DEFAULT 'Rank Holder',
    email       TEXT DEFAULT '',
    mobile      TEXT DEFAULT '',
    theme       TEXT DEFAULT 'dark',
    ai_mode     TEXT DEFAULT 'builtin',
    comm_mode   TEXT DEFAULT 'friendly',
    default_tab TEXT DEFAULT 'jobs',
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id         BIGSERIAL PRIMARY KEY,
    title      TEXT NOT NULL,
    message    TEXT NOT NULL,
    category   TEXT DEFAULT 'general',
    company    TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Jobs (Direct Hiring & Internships)
CREATE TABLE IF NOT EXISTS public.jobs (
    id              BIGSERIAL PRIMARY KEY,
    title           TEXT NOT NULL,
    company         TEXT NOT NULL,
    location        TEXT NOT NULL,
    type            TEXT DEFAULT 'Full-time',
    experience      TEXT,
    salary          TEXT,
    skills          TEXT,
    link            TEXT NOT NULL,
    internship_link TEXT,
    hr_contact      TEXT,
    badge           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Prospects (Corporate Networking)
CREATE TABLE IF NOT EXISTS public.prospects (
    id         BIGSERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    company    TEXT NOT NULL,
    linkedin   TEXT NOT NULL,
    status     TEXT DEFAULT 'Pending',
    idea       TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Game Scores
CREATE TABLE IF NOT EXISTS public.game_scores (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    game_name  TEXT NOT NULL,
    high_score INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_game UNIQUE (user_id, game_name)
);

-- 10. Knowledge Progress
CREATE TABLE IF NOT EXISTS public.knowledge_progress (
    user_id    BIGINT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    state_json JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Story Searches (Wikipedia & Concepts)
CREATE TABLE IF NOT EXISTS public.story_searches (
    id             BIGSERIAL PRIMARY KEY,
    user_id        BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    query          TEXT NOT NULL,
    resolved_title TEXT,
    extract        TEXT,
    page_url       TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Feature Flags
CREATE TABLE IF NOT EXISTS public.feature_flags (
    feature_name TEXT PRIMARY KEY,
    is_enabled   INTEGER DEFAULT 1
);

-- 13. Feedbacks
CREATE TABLE IF NOT EXISTS public.feedbacks (
    id         BIGSERIAL PRIMARY KEY,
    user_name  TEXT NOT NULL,
    user_email TEXT NOT NULL,
    rating     INTEGER DEFAULT 5,
    message    TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Admin Activity Log
CREATE TABLE IF NOT EXISTS public.admin_activity (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    action     TEXT NOT NULL,
    details    TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Infoglobal Permissions
CREATE TABLE IF NOT EXISTS public.infoglobal_permissions (
    id         BIGSERIAL PRIMARY KEY,
    email      TEXT UNIQUE NOT NULL,
    granted_by TEXT DEFAULT 'admin',
    granted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Freelance Chats
CREATE TABLE IF NOT EXISTS public.freelance_chats (
    id         BIGSERIAL PRIMARY KEY,
    user_id    BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    sender     TEXT NOT NULL,
    message    TEXT NOT NULL,
    location   TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Interview Contexts
CREATE TABLE IF NOT EXISTS public.interview_contexts (
    user_id    BIGINT PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    company    TEXT NOT NULL,
    context    TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================================================
-- Enable Row Level Security (RLS) & Policies
-- ===============================================================
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Allow public read for general platform data (jobs, notifications, flags)
CREATE POLICY "Public read jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Public read notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Public read flags" ON public.feature_flags FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.user_settings FOR SELECT USING (true);

-- Allow full access for server service role or authenticated backend
CREATE POLICY "Service full access jobs" ON public.jobs FOR ALL USING (true);
CREATE POLICY "Service full access users" ON public.users FOR ALL USING (true);
CREATE POLICY "Service full access sessions" ON public.sessions FOR ALL USING (true);
CREATE POLICY "Service full access otp" ON public.otp_codes FOR ALL USING (true);
CREATE POLICY "Service full access feedbacks" ON public.feedbacks FOR ALL USING (true);
CREATE POLICY "Service full access prospects" ON public.prospects FOR ALL USING (true);
CREATE POLICY "Service full access game_scores" ON public.game_scores FOR ALL USING (true);

-- ===============================================================
-- Initial Data Seeding
-- ===============================================================

INSERT INTO public.user_settings (id, name, email, mobile, theme, ai_mode, comm_mode, default_tab)
VALUES (1, 'Rank Holder', 'tnesh8833@gmail.com', '+91 8610017559', 'dark', 'builtin', 'friendly', 'jobs')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.feature_flags (feature_name, is_enabled) VALUES
('tab_jobs', 1),
('tab_growup', 1),
('tab_corporate', 1),
('tab_english', 1),
('tab_projects', 1),
('tab_games', 1),
('tab_refresh_games', 1),
('tab_knowledge_lab', 1)
ON CONFLICT (feature_name) DO UPDATE SET is_enabled = 1;

INSERT INTO public.jobs (title, company, location, type, experience, salary, skills, link, internship_link, hr_contact, badge)
VALUES 
('Software Engineering & Student Internships', 'Google India', 'Bengaluru / Hyderabad / Gurugram', 'Full-time & Internship', 'Fresher - 2 Yrs', '₹18 - ₹25 LPA', 'Python, C++, Java, Data Structures, Cloud', 'https://careers.google.com', 'https://buildyourfuture.withgoogle.com/internships', 'google-earlycareers@google.com', 'MNC Tech Giant'),
('Member of Technical Staff & Campus Hire', 'Zoho Corporation', 'Chennai (Estancia / Guduvanchery / Tenkasi)', 'Full-time & Internship', 'Fresher - 1 Yr', '₹5.5 - ₹8.5 LPA', 'Java, C++, JavaScript, SQL, Web Dev', 'https://www.zoho.com/careers/', 'https://www.zoho.com/schools/', 'careers@zohocorp.com', 'Chennai IT Hub'),
('TCS Digital & Ninja Hiring Drive', 'Tata Consultancy Services', 'Chennai (Tidel Park) / Pan India', 'Full-time & Internship', 'Fresher (2026 Batch)', '₹7.5 - ₹11.5 LPA', 'Python, Cloud, Data Analytics, Fullstack', 'https://www.tcs.com/careers', 'https://onboarding.tcs.com', 'campus.hiring@tcs.com', 'National Driver'),
('AI Research & GPU Systems Engineer', 'Nvidia India', 'Bengaluru / Pune', 'Full-time & Internship', '0 - 3 Yrs', '₹24 - ₹32 LPA', 'CUDA, PyTorch, C++, Deep Learning', 'https://www.nvidia.com/en-in/about-nvidia/careers/', 'https://www.nvidia.com/en-us/about-nvidia/careers/university-recruiting/', 'university-hiring@nvidia.com', 'AI World Leader'),
('Software Engineer - Early Careers', 'Microsoft India', 'Hyderabad / Bengaluru / Noida', 'Full-time & Internship', 'Fresher - 2 Yrs', '₹20 - ₹28 LPA', 'C#, Python, Azure, Systems Design', 'https://careers.microsoft.com', 'https://careers.microsoft.com/students/us/en', 'msindia-recruiters@microsoft.com', 'Tech Giant'),
('Graduate Engineer Trainee & Intern', 'Cognizant (CTS)', 'Chennai (Elcot SEZ) / Coimbatore / HYD', 'Full-time & Internship', 'Fresher', '₹4.5 - ₹6.8 LPA', 'Java, Python, SQL, Cloud Fundamentals', 'https://www.cognizant.com/in/en/careers', 'https://www.cognizant.com/in/en/careers/campus-hiring', 'genc-campus@cognizant.com', 'Global IT Leader'),
('Frontend & Product Dev Engineer', 'Freshworks', 'Chennai (Guindy / OMR)', 'Full-time & Internship', 'Fresher - 2 Yrs', '₹9 - ₹14 LPA', 'JavaScript, React, Node.js, SaaS', 'https://www.freshworks.com/careers/', 'https://www.freshworks.com/careers/early-careers/', 'careers@freshworks.com', 'SaaS Unicorn')
ON CONFLICT DO NOTHING;

INSERT INTO public.notifications (title, message, category, company) VALUES
('Direct Hiring Openings', 'Google & Zoho updated direct recruiter contacts and 2026 internship links.', 'job', 'Google India'),
('Bio AI Scanner Upgrade', 'Uploaded image concept analysis and live Wikipedia history active.', 'system', 'Rank-Holder System')
ON CONFLICT DO NOTHING;

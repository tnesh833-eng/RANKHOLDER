# 🏆 Rank-Holder — Premium Corporate Career & Talent Intelligence Platform

[![Platform](https://img.shields.io/badge/Platform-Node.js%20%7C%20Express-blue.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-SQL.js%20%28SQLite%29-green.svg)](https://sql.js.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-gold.svg)]()

> Direct recruiter reach, diagnostic resume scanning, and real-time executive communication coaching engineered to accelerate your trajectory into high-impact corporate roles.

---

## ✨ Features

- **🎯 Corporate Talent Intelligence**: Verified enterprise recruiter directory, bypassing legacy ATS black holes.
- **📄 Diagnostic Resume Scanner (ATS Bio-Scan)**: Instant ATS scoring, keyword match percentage, and executive impact analysis.
- **💬 Executive Communication Coaching**: Real-time AI-powered speech, interview, and GD voice preparation.
- **💼 Placements & Career Uplift**: Direct recruiter connections, compensation benchmarks, and executive roadmaps.
- **🔐 Secure Architecture**: Built-in AES-256 encrypted database (`sql.js`), rate limiting, secure cookie session auth, and Razorpay integration support.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (included with Node.js)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/tnesh833-eng/RANKHOLDER.git
cd RANKHOLDER
npm install
```

### 3. Environment Variables
Create a `.env` file from the example template:
```bash
cp .env.example .env
```
*(Configure Razorpay keys, Nodemailer SMTP, and Admin Email as required).*

### 4. Run the Server

**On Windows:**
Double-click `START-SERVER.bat` or run:
```bash
npm start
```

**Development Mode:**
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

---

## 📁 Project Structure

```
RANKHOLDER/
├── database/
│   └── rankholder.db          # Encrypted local database
├── frontend/
│   ├── index.html             # Landing page
│   ├── app.html               # Main candidate dashboard
│   ├── admin.html             # Executive admin panel
│   ├── login.html             # Authentication portal
│   ├── learn.html             # Curriculum & skills
│   ├── college-search.html    # Academic portal
│   ├── style.css              # Glassmorphism design system
│   ├── theme.css              # Dark luxury theme tokens
│   └── [assets]               # Optimized images & client scripts
├── server.js                  # Production Express & sql.js backend
├── START-SERVER.bat           # Windows quick launch script
├── package.json               # Dependencies & scripts
└── .env.example               # Environment template
```

---

## 🛡️ License
Private / Proprietary — All rights reserved by **Rank-Holder**.

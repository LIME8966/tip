# GrowShell - AI-Powered Job Discovery Platform

## Product Requirements Document (PRD)

### Original Problem Statement
Build a complete, production-ready web application UI called "GrowShell", an AI-powered job discovery and application platform. The design should be original, premium, and comparable in quality to modern job platforms like LinkedIn.

### User Personas
- **Job Seekers**: Users looking for job opportunities that match their skills and experience
- **Career Changers**: Professionals exploring new career paths
- **New Graduates**: Entry-level candidates seeking their first job

### Core Requirements

#### Branding
- Primary color: #7348C6
- Modern and clean aesthetic
- Inter/Manrope fonts

#### Pages Implemented

1. **Landing Page** ✅
   - Sticky navigation
   - Hero section with search bar
   - Trust metrics, hiring ticker
   - Video explanation section
   - Feature highlights
   - Social proof & pricing
   - Footer

2. **Authentication** ✅
   - Sign In Page
   - Sign Up Page
   - Forgot/Reset Password
   - Premium design with social login options (Google, GitHub)

3. **Onboarding Flow** ✅
   - Multi-step wizard (7 steps)
   - Resume upload
   - Preference setting
   - Skills confirmation

4. **Main Application (Logged In)** ✅
   - Dashboard with summary cards
   - Job Matches Feed with filters
   - Job Details with tabbed view
   - Resume Manager
   - Application Tracker
   - Notifications
   - Settings

### Jobs Page - Filter System (Latest Update: Jan 2025)

#### Layout Changes
- **Search Bar**: Full-width at top, Job Title and Location inputs span horizontally
- **Filters**: Positioned BELOW search bar in horizontal dropdown buttons
- **Removed**: Vertical sidebar filter panel (replaced with horizontal filters)

#### Filter Features Implemented
1. ✅ Date Posted (Past 24 hours, 2 days, 3 days, week, month)
2. ✅ Experience Level (Intern/New Grad, Entry, Mid, Senior, Lead, Director)
3. ✅ Job Type (Full-time, Part-time, Contract, Internship, Temporary)
4. ✅ Remote/On-site/Hybrid
5. ✅ Salary Estimate ($50k+ to $200k+)
6. ✅ Sponsorship (H1B, Green Card, PERM, E-Verify, US Citizen, No Sponsorship)
7. ✅ Industry (Technology, Design, Cloud, AI, Data Analytics)
8. ✅ Applicants (Under 10, 20, 30, 50)
9. ✅ Company (with open positions count)
10. ✅ Search Radius (10, 25, 50, 100, 200+ miles)
11. ✅ Match Score Slider (0-100%)
12. ✅ Save Filters (localStorage persistence)
13. ✅ Reset Filters

#### Job Card Design (Combined Layout - Jan 2025 Update)
**Card Structure (top to bottom):**

1. **Top Badges Row:**
   - "Just posted" (green) + "Be an early applicant" (gray)

2. **Header Section:**
   - Company logo (48px) + Job Title + Company • Industry • ★ Rating

3. **Location Row:**
   - Pin icon + Location + Work mode badge (Remote/Hybrid/Onsite)

4. **Details Row (with icons):**
   - $ Salary | Briefcase Full-time | Cap Senior | Calendar 5+ years

5. **Tags Row:**
   - Purple "Remote" | Blue "H1B Sponsor" | Green "E-Verify"

6. **Resume Match Bar:**
   - Gradient progress bar with "11 of 13" keywords

7. **HR Contact Row:**
   - Mail icon + HR Name: email (clickable)

8. **Footer Row:**
   - Users icon + applicants | Clock icon + posted time

9. **Match Score Section (gray background):**
   - Circular score (72px) with animated ring
   - "Match Score" title + "Based on your profile"
   - 3 breakdown bars with icons (Experience, Skills, Industry)
   - Heart save button (bordered)
   - Purple "Apply Now" button

#### Job Details Panel (480px width - Feb 2025 Update) ✅ REDESIGNED
- **Header**: Company logo (56px), Job title, company name with rating, close button
- **Quick Info Rows (icon-driven layout)**:
  - Row 1: Location + Work Mode + Job Type (with icons)
  - Row 2: Salary (bold) + Experience Level with years e.g. "Mid Level (5+)"
  - Row 3: Posted time + Applicants count
- **Tags**: H1B Sponsor, E-Verify badges
- **Action Buttons**: Apply Now (full-width purple) + Save/Bookmark
- **About This Role Section**:
  - Job description text
  - Key Responsibilities list with green checkmarks
  - Benefits & Perks with emoji tags (Health, PTO, Remote, 401k)
- **Match Analysis Section**:
  - Circular score (80px) with animated ring
  - 3 breakdown bars (Experience, Skills, Industry) with icons
  - Resume Tailor + Cover Letter quick action buttons
- **Required Skills**: Color-coded badges (green = matched, orange = missing)
- **HR Contact Card**: With avatar, name, email, and Email button
- **Company Info Grid**: Industry, Company Size, Revenue, Website

### Technical Stack
- **Frontend**: React.js
- **Styling**: Tailwind CSS with design tokens
- **UI Components**: shadcn/ui
- **Animations**: framer-motion
- **State Management**: React Context API
- **Routing**: react-router-dom
- **Data**: Mock data (no backend yet)

### Profile Page (Jan 2025)
- Multi-tabbed interface: Personal, Education, Work Experience, Skills, Equal Employment
- Accessible via sidebar navigation (/profile)
- Full profile editing capabilities

### Resume Tailor Page (Jan 2025) ✅ REDESIGNED
- **Route**: `/resume-tailor`
- **Navigation**: Click "Resume Tailor" button in Job Details panel on Jobs page
- **Design**: 3-step wizard flow inspired by competitor UX patterns

**Step 1: See Your Match**
- Semi-circular rainbow gradient score gauge (like competitor Jobright)
- Score from 0-10 with qualitative label (Fair, Good, Excellent)
- Side-by-side comparison cards for each match category
- Keyword badges with thumbs-up (matched) and X (missing)
- Color-coded match rows: Green (match), Amber (partial), Orange (warning)
- "Improve My Resume" prominent CTA

**Step 2: Customize**
- Section selection with checkboxes (Summary, Skills, Experience)
- Missing keywords selection with "Select all" option
- Info tooltip explaining how keywords are integrated
- "Generate Optimized Resume" CTA

**Step 3: Review & Download**
- Success state with score improvement visualization (6.5 → 9.2)
- Checklist of enhanced sections
- Resume preview with highlighted keywords
- Download Resume and Apply Now buttons

- **Features**:
  - Animated step transitions using framer-motion
  - Progress indicator with completed checkmarks
  - Persistent job card visible throughout flow
  - Back navigation between steps

### Authentication State Persistence (Jan 2025) ✅ FIXED
- Auth state now persists in localStorage
- Key: `growshell_auth` stores `{isAuthenticated, user, onboardingComplete}`
- Login/logout/completeOnboarding functions update localStorage
- Initial state loads from localStorage on app start

### JobDetailsPanel Bug Fix (Feb 2025) ✅ FIXED
- Fixed syntax error in JobsPage.jsx (orphaned JSX elements causing build failure)
- Removed duplicate/corrupt code block that was causing "Adjacent JSX elements" error
- Panel now renders correctly with all sections

### File Structure
```
/app/frontend/src/
├── pages/
│   ├── JobsPage.jsx (main jobs page with filters)
│   ├── DashboardPage.jsx
│   ├── LandingPage.jsx
│   ├── OnboardingPage.jsx
│   ├── ApplicationsPage.jsx
│   ├── ResumesPage.jsx
│   ├── ResumeTailorPage.jsx ✅ NEW
│   ├── ProfilePage.jsx ✅ NEW
│   ├── NotificationsPage.jsx
│   ├── SettingsPage.jsx
│   └── auth/
│       ├── SignInPage.jsx
│       └── SignUpPage.jsx
├── context/
│   └── AppContext.js (now with localStorage persistence)
├── data/
│   └── mockData.js
└── components/
    ├── ui/ (shadcn components)
    └── layout/
```

### What's MOCKED
- ⚠️ All authentication (mock login/signup)
- ⚠️ All job data (enhancedJobs array in JobsPage.jsx)
- ⚠️ User profile data
- ⚠️ Resume parsing
- ⚠️ Application tracking

### Upcoming Tasks (P1)
1. Backend integration for real authentication
2. Real job data from API/database
3. Resume parsing with AI
4. Payment integration for subscription plans
5. Real application tracking

### Future/Backlog (P2)
- Production deployment
- Real-time notifications
- Email integration
- Mobile responsive improvements
- Performance optimization

// Mock Data for GrowShell - AI Job Discovery Platform

export const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "https://ui-avatars.com/api/?name=TC&background=7348C6&color=fff&size=48",
    location: "San Francisco, CA",
    type: "Full-time",
    workMode: "Remote",
    salary: "$140,000 - $180,000",
    postedAt: "2 hours ago",
    matchScore: 94,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    description: "We're looking for a Senior Frontend Developer to join our growing team and help build the next generation of our platform.",
    benefits: ["Health Insurance", "401k", "Unlimited PTO", "Remote Work"],
    applied: false,
    saved: false
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignFlow",
    companyLogo: "https://ui-avatars.com/api/?name=DF&background=623AB3&color=fff&size=48",
    location: "New York, NY",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$120,000 - $150,000",
    postedAt: "5 hours ago",
    matchScore: 89,
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    description: "Join our design team to create beautiful, user-centered experiences for millions of users.",
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Learning Budget"],
    applied: false,
    saved: true
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "CloudScale",
    companyLogo: "https://ui-avatars.com/api/?name=CS&background=4CAF50&color=fff&size=48",
    location: "Austin, TX",
    type: "Full-time",
    workMode: "Remote",
    salary: "$130,000 - $170,000",
    postedAt: "1 day ago",
    matchScore: 92,
    skills: ["Python", "React", "AWS", "PostgreSQL"],
    description: "Build scalable cloud infrastructure and user-facing applications for our enterprise clients.",
    benefits: ["Health Insurance", "Remote Work", "Equity", "Conference Budget"],
    applied: true,
    saved: false
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "AI Labs",
    companyLogo: "https://ui-avatars.com/api/?name=AL&background=FF5722&color=fff&size=48",
    location: "Seattle, WA",
    type: "Full-time",
    workMode: "Onsite",
    salary: "$160,000 - $200,000",
    postedAt: "3 days ago",
    matchScore: 85,
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    description: "Work on cutting-edge AI models that power our recommendation engine.",
    benefits: ["Health Insurance", "Gym Membership", "Catered Meals", "Stock Options"],
    applied: false,
    saved: false
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "InfraCore",
    companyLogo: "https://ui-avatars.com/api/?name=IC&background=2196F3&color=fff&size=48",
    location: "Denver, CO",
    type: "Full-time",
    workMode: "Remote",
    salary: "$125,000 - $160,000",
    postedAt: "2 days ago",
    matchScore: 88,
    skills: ["Kubernetes", "Docker", "Terraform", "AWS"],
    description: "Manage and optimize our cloud infrastructure to ensure 99.99% uptime.",
    benefits: ["Health Insurance", "Remote Work", "Learning Budget", "Flexible PTO"],
    applied: false,
    saved: false
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataDriven",
    companyLogo: "https://ui-avatars.com/api/?name=DD&background=9C27B0&color=fff&size=48",
    location: "Boston, MA",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$135,000 - $175,000",
    postedAt: "4 hours ago",
    matchScore: 91,
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
    description: "Turn complex data into actionable insights for our business intelligence platform.",
    benefits: ["Health Insurance", "401k Match", "Professional Development", "Hybrid Work"],
    applied: false,
    saved: true
  }
];

export const mockTickerData = [
  { company: "Google", role: "Software Engineer", time: "2 min ago" },
  { company: "Microsoft", role: "Product Manager", time: "5 min ago" },
  { company: "Apple", role: "UX Designer", time: "8 min ago" },
  { company: "Meta", role: "Data Scientist", time: "12 min ago" },
  { company: "Amazon", role: "DevOps Engineer", time: "15 min ago" },
  { company: "Netflix", role: "Frontend Developer", time: "18 min ago" },
  { company: "Spotify", role: "Backend Engineer", time: "22 min ago" },
  { company: "Airbnb", role: "Full Stack Developer", time: "25 min ago" },
  { company: "Stripe", role: "Security Engineer", time: "28 min ago" },
  { company: "Slack", role: "Mobile Developer", time: "32 min ago" },
  { company: "Dropbox", role: "Cloud Architect", time: "35 min ago" },
  { company: "Uber", role: "ML Engineer", time: "38 min ago" },
];

export const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Software Engineer at Google",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content: "GrowShell's AI matching found me my dream job in just 2 weeks. The resume tailoring feature was a game-changer!",
    rating: 5
  },
  {
    id: 2,
    name: "James Chen",
    role: "Product Manager at Meta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content: "The auto-apply feature saved me hours every day. I applied to 50+ relevant jobs while focusing on interview prep.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer at Airbnb",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content: "Best job search platform I've ever used. The AI understood exactly what I was looking for and delivered perfect matches.",
    rating: 5
  }
];

export const mockCompanyLogos = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png" },
];

export const mockFeatures = [
  {
    icon: "Brain",
    title: "AI Job Matching",
    description: "Our AI analyzes your skills, experience, and preferences to find jobs that truly match your career goals."
  },
  {
    icon: "FileText",
    title: "Resume Tailoring",
    description: "Automatically customize your resume for each application to maximize your chances of getting noticed."
  },
  {
    icon: "Zap",
    title: "Smart Autofill",
    description: "Save hours with our intelligent autofill that completes applications accurately in seconds."
  },
  {
    icon: "LayoutDashboard",
    title: "Job Tracker",
    description: "Keep all your applications organized with our intuitive Kanban-style tracking board."
  },
  {
    icon: "Bell",
    title: "Personalized Alerts",
    description: "Get notified instantly when new jobs matching your criteria are posted."
  },
  {
    icon: "TrendingUp",
    title: "Career Insights",
    description: "Receive data-driven insights about salary trends, skills in demand, and market opportunities."
  }
];

export const mockPricing = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "5 AI-matched jobs daily",
      "Basic resume builder",
      "Job tracker (up to 10 jobs)",
      "Email notifications",
      "Community support"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious job seekers",
    features: [
      "Unlimited AI-matched jobs",
      "Advanced resume tailoring",
      "Smart autofill (50/month)",
      "Priority job alerts",
      "Application analytics",
      "Interview prep tools",
      "Priority support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Premium",
    price: "$49",
    period: "per month",
    description: "Maximum job search power",
    features: [
      "Everything in Pro",
      "Unlimited smart autofill",
      "AI cover letter generator",
      "Salary negotiation insights",
      "Recruiter visibility boost",
      "1-on-1 career coaching",
      "Dedicated account manager"
    ],
    cta: "Start Free Trial",
    popular: false
  }
];

export const mockFAQs = [
  {
    question: "How does the AI job matching work?",
    answer: "Our AI analyzes your resume, skills, experience, and preferences to understand your ideal job. It then scans thousands of job postings daily, scoring each one based on how well it matches your profile. You only see the most relevant opportunities."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-level encryption to protect your data. Your resume and personal information are never shared without your explicit consent. We're SOC 2 Type II certified and GDPR compliant."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel your subscription at any time with no questions asked. If you cancel, you'll still have access to your plan features until the end of your billing period."
  },
  {
    question: "How does the auto-apply feature work?",
    answer: "Our smart autofill uses AI to accurately complete job applications on your behalf. It learns from your previous applications and can fill out forms, upload your resume, and even craft personalized cover letters - all while you focus on interview prep."
  },
  {
    question: "What types of jobs are available?",
    answer: "We index jobs across all industries and experience levels - from entry-level to executive positions. Our platform covers tech, finance, healthcare, marketing, design, and many more sectors, with both remote and on-site opportunities."
  },
  {
    question: "How accurate is the resume tailoring?",
    answer: "Our AI has been trained on millions of successful job applications. It identifies key requirements from job descriptions and highlights relevant skills and experiences from your resume, resulting in a 40% higher callback rate on average."
  }
];

export const mockStats = {
  usersJoined: 125000,
  dailyJobs: 15000,
  totalJobs: 2500000
};

export const mockUser = {
  id: 1,
  name: "Alex Thompson",
  email: "alex.thompson@email.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
  title: "Senior Software Engineer",
  location: "San Francisco, CA",
  phone: "+1 (555) 123-4567",
  linkedin: "linkedin.com/in/alexthompson",
  github: "github.com/alexthompson",
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "GraphQL", "PostgreSQL", "Docker"],
  experience: "5+ years",
  education: "B.S. Computer Science, Stanford University",
  preferredRoles: ["Senior Frontend Developer", "Full Stack Engineer", "Tech Lead"],
  preferredLocations: ["San Francisco, CA", "Remote"],
  preferredSalary: "$150,000 - $200,000",
  workType: "Remote",
  applications: {
    total: 45,
    pending: 12,
    interviews: 8,
    offers: 3
  }
};

export const mockResumes = [
  {
    id: 1,
    name: "Software Engineer Resume",
    lastModified: "2024-01-15",
    atsScore: 92,
    isDefault: true
  },
  {
    id: 2,
    name: "Full Stack Developer Resume",
    lastModified: "2024-01-10",
    atsScore: 88,
    isDefault: false
  },
  {
    id: 3,
    name: "Tech Lead Resume",
    lastModified: "2024-01-05",
    atsScore: 85,
    isDefault: false
  }
];

export const mockApplications = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedDate: "2024-01-14",
    status: "interview",
    nextStep: "Technical Interview on Jan 20",
    notes: "Recruiter mentioned team is looking for React expertise"
  },
  {
    id: 2,
    jobTitle: "Full Stack Engineer",
    company: "CloudScale",
    appliedDate: "2024-01-12",
    status: "applied",
    nextStep: "Awaiting response",
    notes: ""
  },
  {
    id: 3,
    jobTitle: "Product Designer",
    company: "DesignFlow",
    appliedDate: "2024-01-10",
    status: "offer",
    nextStep: "Review offer by Jan 25",
    notes: "Great culture fit, competitive salary"
  },
  {
    id: 4,
    jobTitle: "DevOps Engineer",
    company: "InfraCore",
    appliedDate: "2024-01-08",
    status: "saved",
    nextStep: "Complete application",
    notes: "Interesting company, need to tailor resume"
  }
];

export const mockNotifications = [
  {
    id: 1,
    type: "match",
    title: "New Job Match!",
    message: "Senior Frontend Developer at TechCorp matches 94% with your profile",
    time: "2 hours ago",
    read: false
  },
  {
    id: 2,
    type: "application",
    title: "Application Update",
    message: "Your application at CloudScale has moved to the interview stage",
    time: "1 day ago",
    read: false
  },
  {
    id: 3,
    type: "alert",
    title: "New Jobs Alert",
    message: "15 new jobs matching your criteria were posted today",
    time: "2 days ago",
    read: true
  },
  {
    id: 4,
    type: "system",
    title: "Resume Score Improved",
    message: "Your resume ATS score increased from 85 to 92",
    time: "3 days ago",
    read: true
  }
];

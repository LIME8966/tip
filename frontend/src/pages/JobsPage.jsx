import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/sonner';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign,
  Building2,
  BookmarkPlus,
  Bookmark,
  Check,
  Sparkles,
  ArrowLeft,
  Send,
  Users,
  GraduationCap,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
  FileText,
  User,
  MessageSquare,
  HelpCircle,
  Settings,
  PenLine,
  Bell,
  Heart,
  Save,
  RotateCcw,
  Globe,
  Building,
  TrendingUp,
  Shield,
  CircleDot,
  Mail,
  Target,
  Award,
  Layers,
  RefreshCw,
  Menu,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';

// Enhanced Mock Job Data with more details
const enhancedJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    companyLogo: "https://ui-avatars.com/api/?name=TC&background=7348C6&color=fff&size=48",
    location: "San Francisco, CA",
    type: "Full-time",
    workMode: "Remote",
    salary: "$140K - $180K",
    salaryMin: 140000,
    postedAt: "just now",
    postedDays: 0,
    matchScore: 94,
    experienceMatch: 95,
    skillsMatch: 92,
    industryMatch: 96,
    resumeKeywords: 11,
    totalKeywords: 13,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    description: "We're looking for a Senior Frontend Developer to join our growing team and help build the next generation of our platform.",
    benefits: ["Health Insurance", "401k", "Unlimited PTO", "Remote Work"],
    applied: false,
    saved: false,
    experience: "5+ years",
    experienceYears: 5,
    experienceLevel: "Senior",
    applicants: 8,
    companyRating: 4.5,
    companySize: "500-1000",
    companyRevenue: "$50M - $100M",
    industry: "Technology",
    sponsorship: "H1B Sponsor",
    isSponsorship: true,
    radius: 0,
    hrEmail: "careers@techcorp.com",
    hrName: "Sarah Johnson"
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignFlow",
    companyLogo: "https://ui-avatars.com/api/?name=DF&background=623AB3&color=fff&size=48",
    location: "New York, NY",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$120K - $150K",
    salaryMin: 120000,
    postedAt: "2 hours ago",
    postedDays: 0,
    matchScore: 89,
    experienceMatch: 88,
    skillsMatch: 91,
    industryMatch: 87,
    resumeKeywords: 9,
    totalKeywords: 12,
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    description: "Join our design team to create beautiful, user-centered experiences for millions of users worldwide.",
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Learning Budget"],
    applied: false,
    saved: true,
    experience: "3+ years",
    experienceYears: 3,
    experienceLevel: "Mid-Senior",
    applicants: 25,
    companyRating: 4.2,
    companySize: "100-500",
    companyRevenue: "$10M - $50M",
    industry: "Design",
    sponsorship: "E-Verify",
    isSponsorship: false,
    radius: 15,
    hrEmail: "hr@designflow.io",
    hrName: "Mike Chen"
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "CloudScale",
    companyLogo: "https://ui-avatars.com/api/?name=CS&background=4CAF50&color=fff&size=48",
    location: "Austin, TX",
    type: "Full-time",
    workMode: "Remote",
    salary: "$130K - $170K",
    salaryMin: 130000,
    postedAt: "1 day ago",
    postedDays: 1,
    matchScore: 92,
    experienceMatch: 90,
    skillsMatch: 94,
    industryMatch: 91,
    resumeKeywords: 10,
    totalKeywords: 11,
    skills: ["Python", "React", "AWS", "PostgreSQL"],
    description: "Build scalable cloud infrastructure and user-facing applications for our enterprise clients.",
    benefits: ["Health Insurance", "Remote Work", "Equity", "Conference Budget"],
    applied: true,
    saved: false,
    experience: "4+ years",
    experienceYears: 4,
    experienceLevel: "Senior",
    applicants: 45,
    companyRating: 4.7,
    companySize: "1000+",
    companyRevenue: "$100M+",
    industry: "Cloud Computing",
    sponsorship: "H1B Sponsor",
    isSponsorship: true,
    radius: 0,
    hrEmail: "talent@cloudscale.com",
    hrName: "Emily Davis"
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    company: "AI Labs",
    companyLogo: "https://ui-avatars.com/api/?name=AL&background=FF5722&color=fff&size=48",
    location: "Seattle, WA",
    type: "Contract",
    workMode: "Onsite",
    salary: "$160K - $200K",
    salaryMin: 160000,
    postedAt: "3 days ago",
    postedDays: 3,
    matchScore: 85,
    experienceMatch: 82,
    skillsMatch: 88,
    industryMatch: 84,
    resumeKeywords: 7,
    totalKeywords: 10,
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    description: "Work on cutting-edge AI models that power our recommendation engine.",
    benefits: ["Health Insurance", "Gym Membership", "Catered Meals", "Stock Options"],
    applied: false,
    saved: false,
    experience: "6+ years",
    experienceYears: 6,
    experienceLevel: "Lead",
    applicants: 18,
    companyRating: 4.8,
    companySize: "50-100",
    companyRevenue: "$5M - $10M",
    industry: "Artificial Intelligence",
    sponsorship: "PERM",
    isSponsorship: true,
    radius: 25,
    hrEmail: "jobs@ailabs.ai",
    hrName: "Alex Kim"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "InfraCore",
    companyLogo: "https://ui-avatars.com/api/?name=IC&background=2196F3&color=fff&size=48",
    location: "Denver, CO",
    type: "Full-time",
    workMode: "Remote",
    salary: "$125K - $160K",
    salaryMin: 125000,
    postedAt: "5 hours ago",
    postedDays: 0,
    matchScore: 88,
    experienceMatch: 86,
    skillsMatch: 90,
    industryMatch: 87,
    resumeKeywords: 8,
    totalKeywords: 10,
    skills: ["Kubernetes", "Docker", "Terraform", "AWS"],
    description: "Manage and optimize our cloud infrastructure to ensure 99.99% uptime.",
    benefits: ["Health Insurance", "Remote Work", "Learning Budget", "Flexible PTO"],
    applied: false,
    saved: false,
    experience: "4+ years",
    experienceYears: 4,
    experienceLevel: "Senior",
    applicants: 12,
    companyRating: 4.3,
    companySize: "100-500",
    companyRevenue: "$10M - $50M",
    industry: "Infrastructure",
    sponsorship: "H1B Sponsor",
    isSponsorship: true,
    radius: 0,
    hrEmail: "recruiting@infracore.io",
    hrName: "Lisa Wang"
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataDriven",
    companyLogo: "https://ui-avatars.com/api/?name=DD&background=9C27B0&color=fff&size=48",
    location: "Boston, MA",
    type: "Part-time",
    workMode: "Hybrid",
    salary: "$135K - $175K",
    salaryMin: 135000,
    postedAt: "1 week ago",
    postedDays: 7,
    matchScore: 91,
    experienceMatch: 89,
    skillsMatch: 93,
    industryMatch: 90,
    resumeKeywords: 9,
    totalKeywords: 11,
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
    description: "Turn complex data into actionable insights for our BI platform.",
    benefits: ["Health Insurance", "401k Match", "Professional Development", "Hybrid Work"],
    applied: false,
    saved: true,
    experience: "3+ years",
    experienceYears: 3,
    experienceLevel: "Mid-Senior",
    applicants: 35,
    companyRating: 4.4,
    companySize: "500-1000",
    companyRevenue: "$50M - $100M",
    industry: "Data Analytics",
    sponsorship: "US Citizen Only",
    isSponsorship: false,
    radius: 30,
    hrEmail: "careers@datadriven.com",
    hrName: "Tom Brown"
  },
  {
    id: 7,
    title: "Junior Software Developer",
    company: "StartupXYZ",
    companyLogo: "https://ui-avatars.com/api/?name=SX&background=00BCD4&color=fff&size=48",
    location: "Remote",
    type: "Internship",
    workMode: "Remote",
    salary: "$60K - $80K",
    salaryMin: 60000,
    postedAt: "2 days ago",
    postedDays: 2,
    matchScore: 78,
    experienceMatch: 75,
    skillsMatch: 80,
    industryMatch: 78,
    resumeKeywords: 6,
    totalKeywords: 10,
    skills: ["JavaScript", "React", "Node.js", "Git"],
    description: "Great opportunity for new graduates to learn and grow.",
    benefits: ["Health Insurance", "Remote Work", "Mentorship Program"],
    applied: false,
    saved: false,
    experience: "0-1 years",
    experienceYears: 0,
    experienceLevel: "Entry",
    applicants: 55,
    companyRating: 4.0,
    companySize: "10-50",
    companyRevenue: "$1M - $5M",
    industry: "Technology",
    sponsorship: "Green Card",
    isSponsorship: true,
    radius: 0,
    hrEmail: "hello@startupxyz.co",
    hrName: "Jessica Lee"
  },
  {
    id: 8,
    title: "Engineering Manager",
    company: "BigTech Corp",
    companyLogo: "https://ui-avatars.com/api/?name=BT&background=E91E63&color=fff&size=48",
    location: "San Jose, CA",
    type: "Full-time",
    workMode: "Onsite",
    salary: "$200K - $250K",
    salaryMin: 200000,
    postedAt: "2 weeks ago",
    postedDays: 14,
    matchScore: 72,
    experienceMatch: 70,
    skillsMatch: 74,
    industryMatch: 71,
    resumeKeywords: 5,
    totalKeywords: 12,
    skills: ["Leadership", "Agile", "System Design", "Team Management"],
    description: "Lead a team of 10+ engineers building our core platform.",
    benefits: ["Health Insurance", "Stock Options", "401k", "Bonus"],
    applied: false,
    saved: false,
    experience: "10+ years",
    experienceYears: 10,
    experienceLevel: "Director",
    applicants: 22,
    companyRating: 4.6,
    companySize: "1000+",
    companyRevenue: "$500M+",
    industry: "Technology",
    sponsorship: "No Sponsorship",
    isSponsorship: false,
    radius: 50,
    hrEmail: "exec-recruiting@bigtech.com",
    hrName: "David Miller"
  }
];

// Filter options data
const filterOptions = {
  datePosted: [
    { id: 'past24h', label: 'Past 24 hours', days: 1 },
    { id: 'past2days', label: 'Past 2 days', days: 2 },
    { id: 'past3days', label: 'Past 3 days', days: 3 },
    { id: 'pastWeek', label: 'Past week', days: 7 },
    { id: 'pastMonth', label: 'Past month', days: 30 },
  ],
  experienceLevel: [
    { id: 'intern', label: 'Intern/New Grad', years: '0-1', count: 1 },
    { id: 'entry', label: 'Entry Level (0-2 years)', years: '0-2', count: 2 },
    { id: 'mid', label: 'Mid Level (3-5 years)', years: '3-5', count: 3 },
    { id: 'senior', label: 'Senior (6-10 years)', years: '6-10', count: 2 },
    { id: 'lead', label: 'Lead/Manager (10+ years)', years: '10+', count: 1 },
    { id: 'director', label: 'Director/Executive (15+ years)', years: '15+', count: 1 },
  ],
  jobType: [
    { id: 'fulltime', label: 'Full-time', count: 5 },
    { id: 'parttime', label: 'Part-time', count: 1 },
    { id: 'contract', label: 'Contract', count: 1 },
    { id: 'internship', label: 'Internship', count: 1 },
    { id: 'temporary', label: 'Temporary', count: 0 },
  ],
  workMode: [
    { id: 'onsite', label: 'On-site', count: 2 },
    { id: 'remote', label: 'Remote', count: 4 },
    { id: 'hybrid', label: 'Hybrid', count: 2 },
  ],
  salary: [
    { id: '50k', label: '$50,000+', min: 50000 },
    { id: '75k', label: '$75,000+', min: 75000 },
    { id: '100k', label: '$100,000+', min: 100000 },
    { id: '125k', label: '$125,000+', min: 125000 },
    { id: '150k', label: '$150,000+', min: 150000 },
    { id: '200k', label: '$200,000+', min: 200000 },
  ],
  industry: [
    { id: 'tech', label: 'Technology', count: 4 },
    { id: 'design', label: 'Design', count: 1 },
    { id: 'cloud', label: 'Cloud Computing', count: 1 },
    { id: 'ai', label: 'Artificial Intelligence', count: 1 },
    { id: 'data', label: 'Data Analytics', count: 1 },
  ],
  sponsorship: [
    { id: 'h1b', label: 'H1B Sponsor', count: 4 },
    { id: 'greencard', label: 'Green Card', count: 1 },
    { id: 'perm', label: 'PERM', count: 1 },
    { id: 'everify', label: 'E-Verify', count: 1 },
    { id: 'uscitizen', label: 'US Citizen Only', count: 1 },
    { id: 'nosponsor', label: 'No Sponsorship', count: 1 },
  ],
  applicants: [
    { id: 'under10', label: 'Under 10 applicants', max: 10 },
    { id: 'under20', label: 'Under 20 applicants', max: 20 },
    { id: 'under30', label: 'Under 30 applicants', max: 30 },
    { id: 'under50', label: 'Under 50 applicants', max: 50 },
  ],
  companies: [
    { id: 'techcorp', label: 'TechCorp Inc.', positions: 3 },
    { id: 'designflow', label: 'DesignFlow', positions: 2 },
    { id: 'cloudscale', label: 'CloudScale', positions: 4 },
    { id: 'ailabs', label: 'AI Labs', positions: 2 },
    { id: 'infracore', label: 'InfraCore', positions: 1 },
  ],
  radius: [
    { id: '10', label: '10 miles', value: 10 },
    { id: '25', label: '25 miles', value: 25 },
    { id: '50', label: '50 miles', value: 50 },
    { id: '100', label: '100 miles', value: 100 },
    { id: '200', label: '200+ miles', value: 200 },
  ],
};

// Left Sidebar Component (collapsible)
const LeftSidebar = ({ activeItem = 'jobs', isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { unreadCount } = useApp();
  
  const menuItems = [
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs' },
    { id: 'resume', label: 'Resume', icon: FileText, href: '/resumes' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
    { id: 'applications', label: 'Applications', icon: Send, href: '/applications' },
  ];

  const bottomItems = [
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '/notifications', badge: unreadCount || null },
    { id: 'feedback', label: 'Feedback', icon: HelpCircle, href: '#' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <motion.div 
      initial={false}
      animate={{ width: isCollapsed ? 72 : 224 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="bg-background border-r border-border flex flex-col h-[calc(100vh-64px)] sticky top-16 lg:top-20 shrink-0"
    >
      {/* Toggle Button */}
      <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'} px-3 pt-3`}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 hover:bg-muted"
          onClick={() => setIsCollapsed(!isCollapsed)}
          data-testid="sidebar-toggle"
        >
          {isCollapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Main Menu */}
      <div className="flex-1 py-2">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeItem === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-foreground/70 hover:bg-muted hover:text-foreground'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Menu */}
      <div className="py-4 border-t border-border">
        <nav className="space-y-1 px-3">
          {bottomItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/70 hover:bg-muted hover:text-foreground transition-colors ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              <div className="relative">
                <item.icon className="w-5 h-5 shrink-0" />
                {item.badge && isCollapsed && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </div>
              {!isCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-destructive text-destructive-foreground text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

// Filter Section Component
const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-border pb-4">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground hover:text-primary">
        {title}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2 space-y-2">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// Checkbox Filter Item
const FilterCheckbox = ({ id, label, count, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
        {label}
      </Label>
    </div>
    {count !== undefined && (
      <span className="text-xs text-muted-foreground">({count})</span>
    )}
  </div>
);

// Combined Job Card Component - Narrower Width, Normal Height
const JobCard = ({ job, onSave, onApply, isSelected, onSelect }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return { text: 'text-emerald-500', bg: 'bg-emerald-500' };
    if (score >= 80) return { text: 'text-primary', bg: 'bg-primary' };
    if (score >= 70) return { text: 'text-amber-500', bg: 'bg-amber-500' };
    return { text: 'text-orange-500', bg: 'bg-orange-500' };
  };
  
  const scoreColors = getScoreColor(job.matchScore);
  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (job.matchScore / 100) * circumference;

  // Get experience level text with years
  const getExperienceLevel = () => {
    const years = job.experienceYears || 0;
    if (years <= 1) return `Intern (${years}+)`;
    if (years <= 2) return `Junior Level (${years}+)`;
    if (years <= 5) return `Mid Level (${years}+)`;
    if (years <= 8) return `Senior Level (${years}+)`;
    return `Lead Level (${years}+)`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-background rounded-xl border transition-all cursor-pointer overflow-hidden ${
        isSelected 
          ? 'border-primary shadow-lg ring-2 ring-primary/20' 
          : 'border-border hover:border-primary/30 hover:shadow-md'
      }`}
      onClick={() => onSelect(job)}
      data-testid={`job-card-${job.id}`}
    >
      <div className="flex">
        {/* Left Side - Job Details */}
        <div className="flex-1 p-4 min-w-0">
          {/* Top Badges */}
          <div className="flex items-center gap-2 mb-3">
            {job.postedDays === 0 && (
              <Badge className="bg-emerald-500 text-white border-0 text-[11px] px-2 py-0.5 gap-1">
                <Zap className="w-3 h-3" />
                Just posted
              </Badge>
            )}
            {job.applicants < 15 && (
              <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                Be an early applicant
              </Badge>
            )}
          </div>

          {/* Header Row */}
          <div className="flex items-start gap-3">
            <img 
              src={job.companyLogo} 
              alt={job.company}
              className="w-12 h-12 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base text-foreground">{job.title}</h3>
              <div className="flex items-center gap-2 text-sm text-foreground/70 mt-0.5">
                <span className="font-medium text-foreground">{job.company}</span>
                <span>•</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-foreground/80">{job.companyRating}</span>
              </div>
            </div>
          </div>

          {/* Info Row 1 - Location, Work Mode, Job Type, Salary */}
          <div className="flex items-center gap-4 mt-3 text-sm text-foreground/70">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              {job.workMode}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {job.type}
            </span>
          </div>

          {/* Info Row 2 - Salary, Experience Level */}
          <div className="flex items-center gap-4 mt-2 text-sm text-foreground/70">
            <span className="flex items-center gap-1.5 font-semibold text-foreground">
              <DollarSign className="w-4 h-4 text-emerald-500" />
              {job.salary}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              {getExperienceLevel()}
            </span>
          </div>

          {/* Tags - Only Sponsorship & E-Verify */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.isSponsorship && (
              <Badge className="text-[10px] px-2 h-5 bg-blue-100 text-blue-700 border-0">{job.sponsorship}</Badge>
            )}
            <Badge className="text-[10px] px-2 h-5 bg-emerald-100 text-emerald-700 border-0">E-Verify</Badge>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border text-sm text-foreground/70">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {job.applicants} applicants
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {job.postedAt}
            </span>
          </div>
        </div>

        {/* Right Side - Match Score */}
        <div className="w-[160px] shrink-0 bg-muted/30 border-l border-border p-4 flex flex-col items-center justify-center">
          {/* Circular Score */}
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted/50" />
              <circle 
                cx="32" cy="32" r="24" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
                className={scoreColors.text}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-lg font-bold ${scoreColors.text}`}>{job.matchScore}%</span>
            </div>
          </div>
          
          <p className="text-xs text-foreground/60 mt-1 text-center font-medium">Match Score</p>

          {/* Actions */}
          <div className="w-full mt-4 space-y-2" onClick={(e) => e.stopPropagation()}>
            <Button 
              className="w-full h-9"
              onClick={() => onApply(job)}
              disabled={job.applied}
            >
              {job.applied ? <><Check className="w-4 h-4 mr-1" />Applied</> : 'Apply Now'}
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-9"
              onClick={() => onSave(job.id)}
            >
              {job.saved ? <><Heart className="w-4 h-4 mr-1.5 fill-current text-rose-500" />Saved</> : <><Heart className="w-4 h-4 mr-1.5" />Save</>}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Job Details Panel with Match Breakdown & HR Info (Wider)
const JobDetailsPanel = ({ job, onApply, onSave, onClose }) => {
  const navigate = useNavigate();
  
  if (!job) return null;

  const getScoreColor = (score) => {
    if (score >= 90) return { text: 'text-emerald-500', bg: 'bg-emerald-500' };
    if (score >= 80) return { text: 'text-primary', bg: 'bg-primary' };
    if (score >= 70) return { text: 'text-amber-500', bg: 'bg-amber-500' };
    return { text: 'text-orange-500', bg: 'bg-orange-500' };
  };

  const scoreColors = getScoreColor(job.matchScore);
  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (job.matchScore / 100) * circumference;

  const handleResumeTailor = () => {
    navigate('/resume-tailor', { state: { job } });
  };

  // Mock user skills (skills user has)
  const userSkills = ['React', 'TypeScript', 'Node.js', 'JavaScript', 'HTML', 'CSS', 'Git', 'REST APIs'];
  
  // Categorize skills
  const matchedSkills = job.skills.filter(skill => 
    userSkills.some(us => us.toLowerCase() === skill.toLowerCase())
  );
  const missingSkills = job.skills.filter(skill => 
    !userSkills.some(us => us.toLowerCase() === skill.toLowerCase())
  );

  // Get experience level text with years
  const getExperienceLevel = () => {
    const years = job.experienceYears || 0;
    if (years <= 1) return `Intern (${years}+)`;
    if (years <= 2) return `Junior Level (${years}+)`;
    if (years <= 5) return `Mid Level (${years}+)`;
    if (years <= 8) return `Senior Level (${years}+)`;
    return `Lead Level (${years}+)`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-background rounded-xl border border-border overflow-hidden"
    >
      {/* Header with Close Button */}
      <div className="p-5 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <img src={job.companyLogo} alt={job.company} className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <h2 className="font-heading text-xl font-bold text-foreground">{job.title}</h2>
              <div className="flex items-center gap-2 text-sm text-foreground/70 mt-0.5">
                <span className="font-semibold text-foreground">{job.company}</span>
                <span>•</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="text-foreground/80">{job.companyRating}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Job Details - Icon Based like Job Card */}
        <div className="mt-4 space-y-2.5">
          {/* Row 1: Location, Work Mode, Job Type */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/80">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 shrink-0" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-4 h-4 shrink-0" />
              {job.workMode}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 shrink-0" />
              {job.type}
            </span>
          </div>
          
          {/* Row 2: Salary, Experience Level */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/80">
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
              {job.salary}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-4 h-4 shrink-0" />
              {getExperienceLevel()}
            </span>
          </div>

          {/* Row 3: Posted, Applicants */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-foreground/80">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 shrink-0" />
              Posted {job.postedAt}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 shrink-0" />
              {job.applicants} applicants
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.isSponsorship && (
            <Badge className="text-[10px] px-2 h-5 bg-blue-100 text-blue-700 border-0">{job.sponsorship}</Badge>
          )}
          <Badge className="text-[10px] px-2 h-5 bg-emerald-100 text-emerald-700 border-0">E-Verify</Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <Button className="flex-1 h-10" onClick={() => onApply(job)} disabled={job.applied}>
            {job.applied ? <><Check className="w-4 h-4 mr-2" />Applied</> : <><Send className="w-4 h-4 mr-2" />Apply Now</>}
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => onSave(job.id)}>
            {job.saved ? <Bookmark className="w-4 h-4 fill-current" /> : <BookmarkPlus className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Match Analysis + HR Contact - Top Section */}
      <div className="p-5 border-b border-border bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5">
        <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          Match Analysis
        </h3>
        
        <div className="flex items-start gap-5">
          {/* Main Circular Score */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="5" fill="none" className="text-muted/30" />
                <circle 
                  cx="40" cy="40" r="32" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  fill="none" 
                  className={scoreColors.text}
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={2 * Math.PI * 32 - (job.matchScore / 100) * 2 * Math.PI * 32}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-xl font-bold ${scoreColors.text}`}>{job.matchScore}%</span>
                <span className="text-[9px] text-foreground/60 font-medium">Match</span>
              </div>
            </div>
          </div>
          
          {/* Score Breakdown - Progress Bars */}
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground/80 flex items-center gap-1.5 font-medium">
                  <GraduationCap className="w-4 h-4" />
                  Experience
                </span>
                <span className={`text-sm font-bold ${getScoreColor(job.experienceMatch).text}`}>{job.experienceMatch}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${getScoreColor(job.experienceMatch).bg} rounded-full`} style={{ width: `${job.experienceMatch}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground/80 flex items-center gap-1.5 font-medium">
                  <Target className="w-4 h-4" />
                  Skills
                </span>
                <span className={`text-sm font-bold ${getScoreColor(job.skillsMatch).text}`}>{job.skillsMatch}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${getScoreColor(job.skillsMatch).bg} rounded-full`} style={{ width: `${job.skillsMatch}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground/80 flex items-center gap-1.5 font-medium">
                  <Layers className="w-4 h-4" />
                  Industry
                </span>
                <span className={`text-sm font-bold ${getScoreColor(job.industryMatch).text}`}>{job.industryMatch}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${getScoreColor(job.industryMatch).bg} rounded-full`} style={{ width: `${job.industryMatch}%` }} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 text-xs gap-2"
            onClick={handleResumeTailor}
            data-testid="resume-tailor-btn"
          >
            <FileText className="w-4 h-4" />
            Resume Tailor
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs gap-2">
            <PenLine className="w-4 h-4" />
            Cover Letter
          </Button>
        </div>

        {/* HR Contact - Inline in top section */}
        {job.hrEmail && (
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground/60 font-medium">Hiring Manager</p>
                <p className="text-sm font-semibold text-foreground">{job.hrName}</p>
              </div>
              <Button size="sm" className="h-8" asChild>
                <a href={`mailto:${job.hrEmail}`}>
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  Email
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* About This Role */}
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">About This Role</h3>
        <p className="text-sm text-foreground/80 leading-relaxed">{job.description}</p>
        
        {/* Key Responsibilities */}
        <div className="mt-4">
          <h4 className="text-sm font-bold text-foreground mb-2">Key Responsibilities</h4>
          <ul className="space-y-1.5 text-sm text-foreground/80">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              Design and develop scalable web applications
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              Collaborate with cross-functional teams
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              Mentor junior developers and conduct code reviews
            </li>
          </ul>
        </div>

        {/* Benefits */}
        <div className="mt-4">
          <h4 className="text-sm font-bold text-foreground mb-2">Benefits & Perks</h4>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-muted rounded-md text-foreground/80 font-medium">🏥 Health Insurance</span>
            <span className="text-xs px-2 py-1 bg-muted rounded-md text-foreground/80 font-medium">🏖️ Unlimited PTO</span>
            <span className="text-xs px-2 py-1 bg-muted rounded-md text-foreground/80 font-medium">💻 Remote Friendly</span>
            <span className="text-xs px-2 py-1 bg-muted rounded-md text-foreground/80 font-medium">📈 401(k) Match</span>
          </div>
        </div>
      </div>

      {/* Required Skills with Color Highlighting */}
      <div className="p-5 border-b border-border">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Required Skills 
          <span className="ml-2 text-xs font-medium text-foreground/70">
            ({matchedSkills.length}/{job.skills.length} matched)
          </span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {/* Matched Skills - Green */}
          {matchedSkills.map((skill) => (
            <Badge 
              key={skill} 
              className="text-xs px-3 py-1.5 bg-emerald-100 text-emerald-700 border border-emerald-200"
            >
              <Check className="w-3 h-3 mr-1.5" />
              {skill}
            </Badge>
          ))}
          {/* Missing Skills - Orange */}
          {missingSkills.map((skill) => (
            <Badge 
              key={skill} 
              className="text-xs px-3 py-1.5 bg-orange-100 text-orange-700 border border-orange-200"
            >
              <X className="w-3 h-3 mr-1.5" />
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Company Info - At Bottom */}
      <div className="p-5">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Company Details</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Building className="w-4 h-4 text-foreground/60" />
            <div>
              <p className="text-xs text-foreground/70 font-medium">Industry</p>
              <p className="font-bold text-foreground">{job.industry}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-foreground/60" />
            <div>
              <p className="text-xs text-foreground/70 font-medium">Company Size</p>
              <p className="font-bold text-foreground">{job.companySize}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-foreground/60" />
            <div>
              <p className="text-xs text-foreground/70 font-medium">Revenue</p>
              <p className="font-bold text-foreground">{job.companyRevenue}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Globe className="w-4 h-4 text-foreground/60" />
            <div>
              <p className="text-xs text-foreground/70 font-medium">Website</p>
              <p className="font-bold text-primary">company.com</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Horizontal Filter Bar Component (LinkedIn style)
const HorizontalFilterBar = ({ filters, setFilters, matchThreshold, setMatchThreshold, saveFilters, resetFilters, toggleFilter, setSingleFilter }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const getActiveCount = (category) => {
    if (Array.isArray(filters[category])) return filters[category].length;
    return filters[category] ? 1 : 0;
  };

  const FilterDropdown = ({ id, title, children }) => (
    <div className="relative">
      <Button
        variant={getActiveCount(id) > 0 ? "default" : "outline"}
        size="sm"
        className={`h-9 gap-1.5 ${getActiveCount(id) > 0 ? '' : ''}`}
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
      >
        {title}
        {getActiveCount(id) > 0 && (
          <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary-foreground text-primary">
            {getActiveCount(id)}
          </Badge>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === id ? 'rotate-180' : ''}`} />
      </Button>
      
      {openDropdown === id && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
          <div className="absolute top-full left-0 mt-2 z-50 bg-background border border-border rounded-lg shadow-xl min-w-[220px] p-3 max-h-[320px] overflow-y-auto">
            {children}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Date Posted */}
      <FilterDropdown id="datePosted" title="Date Posted">
        <div className="space-y-2">
          {filterOptions.datePosted.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`date-${option.id}`}
              label={option.label}
              checked={filters.datePosted.includes(option.id)}
              onChange={() => toggleFilter('datePosted', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Experience Level */}
      <FilterDropdown id="experienceLevel" title="Experience Level">
        <div className="space-y-2">
          {filterOptions.experienceLevel.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`exp-${option.id}`}
              label={option.label}
              count={option.count}
              checked={filters.experienceLevel.includes(option.id)}
              onChange={() => toggleFilter('experienceLevel', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Job Type */}
      <FilterDropdown id="jobType" title="Job Type">
        <div className="space-y-2">
          {filterOptions.jobType.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`type-${option.id}`}
              label={option.label}
              count={option.count}
              checked={filters.jobType.includes(option.id)}
              onChange={() => toggleFilter('jobType', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Work Mode */}
      <FilterDropdown id="workMode" title="Remote / On-site">
        <div className="space-y-2">
          {filterOptions.workMode.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`mode-${option.id}`}
              label={option.label}
              count={option.count}
              checked={filters.workMode.includes(option.id)}
              onChange={() => toggleFilter('workMode', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Salary */}
      <FilterDropdown id="salary" title="Salary">
        <div className="space-y-2">
          {filterOptions.salary.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`salary-${option.id}`}
              label={option.label}
              checked={filters.salary === option.id}
              onChange={() => setSingleFilter('salary', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Sponsorship */}
      <FilterDropdown id="sponsorship" title="Sponsorship">
        <div className="space-y-2">
          {filterOptions.sponsorship.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`sponsor-${option.id}`}
              label={option.label}
              count={option.count}
              checked={filters.sponsorship.includes(option.id)}
              onChange={() => toggleFilter('sponsorship', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Industry */}
      <FilterDropdown id="industry" title="Industry">
        <div className="space-y-2">
          {filterOptions.industry.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`industry-${option.id}`}
              label={option.label}
              count={option.count}
              checked={filters.industry.includes(option.id)}
              onChange={() => toggleFilter('industry', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Applicants */}
      <FilterDropdown id="applicants" title="Applicants">
        <div className="space-y-2">
          {filterOptions.applicants.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`applicants-${option.id}`}
              label={option.label}
              checked={filters.applicants === option.id}
              onChange={() => setSingleFilter('applicants', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Company */}
      <FilterDropdown id="companies" title="Company">
        <div className="space-y-2">
          {filterOptions.companies.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`company-${option.id}`}
              label={option.label}
              count={option.positions}
              checked={filters.companies.includes(option.id)}
              onChange={() => toggleFilter('companies', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Search Radius */}
      <FilterDropdown id="radius" title="Radius">
        <div className="space-y-2">
          {filterOptions.radius.map(option => (
            <FilterCheckbox
              key={option.id}
              id={`radius-${option.id}`}
              label={option.label}
              checked={filters.radius === option.id}
              onChange={() => setSingleFilter('radius', option.id)}
            />
          ))}
        </div>
      </FilterDropdown>

      {/* Match Score */}
      <FilterDropdown id="matchScore" title={`Match ${matchThreshold[0]}%+`}>
        <div className="px-2 py-1 w-48">
          <Label className="text-xs text-muted-foreground mb-3 block">Minimum Match Score</Label>
          <Slider
            value={matchThreshold}
            onValueChange={setMatchThreshold}
            max={100}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span className="font-medium text-foreground">{matchThreshold[0]}%</span>
            <span>100%</span>
          </div>
        </div>
      </FilterDropdown>

      {/* Divider */}
      <div className="h-6 w-px bg-border mx-1" />

      {/* Save & Reset */}
      <Button variant="ghost" size="sm" onClick={saveFilters} className="h-9 gap-1.5 text-muted-foreground hover:text-foreground">
        <Save className="w-4 h-4" />
        Save
      </Button>
      <Button variant="ghost" size="sm" onClick={resetFilters} className="h-9 gap-1.5 text-muted-foreground hover:text-foreground">
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>
    </div>
  );
};

// Main Jobs Page
const JobsPage = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState(enhancedJobs);
  const [selectedJob, setSelectedJob] = useState(enhancedJobs[0]);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [applyingJob, setApplyingJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  
  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(location.state?.searchQuery || '');
  const [locationQuery, setLocationQuery] = useState(location.state?.location || '');
  const [matchThreshold, setMatchThreshold] = useState([0]);
  
  const [filters, setFilters] = useState({
    datePosted: [],
    experienceLevel: [],
    jobType: [],
    workMode: [],
    salary: null,
    industry: [],
    sponsorship: [],
    applicants: null,
    companies: [],
    radius: null,
  });

  // Load saved filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem('growshell_filters');
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters));
      } catch (e) {
        console.error('Failed to load saved filters');
      }
    }
  }, []);

  // Save filters
  const saveFilters = () => {
    localStorage.setItem('growshell_filters', JSON.stringify(filters));
    toast.success('Filters saved successfully!');
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      datePosted: [],
      experienceLevel: [],
      jobType: [],
      workMode: [],
      salary: null,
      industry: [],
      sponsorship: [],
      applicants: null,
      companies: [],
      radius: null,
    });
    setMatchThreshold([0]);
    setSearchQuery('');
    setLocationQuery('');
    localStorage.removeItem('growshell_filters');
    toast.success('Filters reset');
  };

  const toggleFilter = (category, id) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(id)
        ? prev[category].filter(item => item !== id)
        : [...prev[category], id]
    }));
  };

  const setSingleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    // Search
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = !locationQuery ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase());
    
    // Match threshold
    const matchesThreshold = job.matchScore >= matchThreshold[0];

    // Date posted
    const matchesDate = filters.datePosted.length === 0 || 
      filters.datePosted.some(id => {
        const option = filterOptions.datePosted.find(o => o.id === id);
        return option && job.postedDays <= option.days;
      });

    // Experience level
    const matchesExperience = filters.experienceLevel.length === 0 ||
      filters.experienceLevel.some(id => {
        if (id === 'intern' || id === 'entry') return job.experienceYears <= 2;
        if (id === 'mid') return job.experienceYears >= 3 && job.experienceYears <= 5;
        if (id === 'senior') return job.experienceYears >= 6 && job.experienceYears <= 10;
        if (id === 'lead') return job.experienceYears >= 10;
        if (id === 'director') return job.experienceYears >= 15;
        return true;
      });

    // Job type
    const matchesJobType = filters.jobType.length === 0 ||
      filters.jobType.some(id => {
        if (id === 'fulltime') return job.type === 'Full-time';
        if (id === 'parttime') return job.type === 'Part-time';
        if (id === 'contract') return job.type === 'Contract';
        if (id === 'internship') return job.type === 'Internship';
        return true;
      });

    // Work mode
    const matchesWorkMode = filters.workMode.length === 0 ||
      filters.workMode.some(id => job.workMode.toLowerCase() === id);

    // Salary
    const matchesSalary = !filters.salary ||
      job.salaryMin >= filterOptions.salary.find(s => s.id === filters.salary)?.min;

    // Industry
    const matchesIndustry = filters.industry.length === 0 ||
      filters.industry.some(id => job.industry.toLowerCase().includes(id));

    // Sponsorship
    const matchesSponsorship = filters.sponsorship.length === 0 ||
      filters.sponsorship.some(id => {
        if (id === 'h1b') return job.sponsorship.includes('H1B');
        if (id === 'greencard') return job.sponsorship.includes('Green Card');
        if (id === 'perm') return job.sponsorship.includes('PERM');
        if (id === 'everify') return job.sponsorship.includes('E-Verify');
        if (id === 'uscitizen') return job.sponsorship.includes('US Citizen');
        if (id === 'nosponsor') return job.sponsorship.includes('No Sponsorship');
        return true;
      });

    // Applicants
    const matchesApplicants = !filters.applicants ||
      job.applicants <= filterOptions.applicants.find(a => a.id === filters.applicants)?.max;

    // Company
    const matchesCompany = filters.companies.length === 0 ||
      filters.companies.some(id => job.company.toLowerCase().includes(id.replace('techcorp', 'techcorp').replace('designflow', 'designflow')));

    return matchesSearch && matchesLocation && matchesThreshold && matchesDate && 
           matchesExperience && matchesJobType && matchesWorkMode && matchesSalary && 
           matchesIndustry && matchesSponsorship && matchesApplicants && matchesCompany;
  });

  const handleApply = (job) => {
    setApplyingJob(job);
    setShowApplyDialog(true);
  };

  const submitApplication = async () => {
    setIsApplying(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setJobs(prev => prev.map(j => j.id === applyingJob.id ? { ...j, applied: true } : j));
    if (selectedJob?.id === applyingJob.id) {
      setSelectedJob({ ...selectedJob, applied: true });
    }
    setIsApplying(false);
    setShowApplyDialog(false);
    toast.success('Application submitted successfully!');
  };

  const handleSave = (jobId) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, saved: !j.saved } : j));
    if (selectedJob?.id === jobId) {
      setSelectedJob({ ...selectedJob, saved: !selectedJob.saved });
    }
    toast.success('Job saved!');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">G</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">GrowShell</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">2</span>
            </Button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/settings')}>
              <img src={user?.avatar || 'https://i.pravatar.cc/32?img=12'} alt="Avatar" className="w-8 h-8 rounded-full" />
              <span className="hidden md:inline text-sm font-medium">{user?.name?.split(' ')[0] || 'User'}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex pt-16 lg:pt-20">
        {/* Left Sidebar - Navigation */}
        <LeftSidebar 
          activeItem="jobs" 
          isCollapsed={isSidebarCollapsed} 
          setIsCollapsed={setIsSidebarCollapsed} 
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Simple Search Bar */}
          <div className="sticky top-16 lg:top-20 z-30 bg-background border-b border-border">
            <div className="p-4 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                    data-testid="job-search-input"
                  />
                </div>
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="City, state, or remote"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="pl-12 h-12 text-base"
                    data-testid="location-search-input"
                  />
                </div>
                <Button size="lg" className="h-12 px-6" data-testid="search-jobs-btn">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
            
            {/* Filters Row */}
            <div className="px-4 pb-3 overflow-x-auto">
              <HorizontalFilterBar
                filters={filters}
                setFilters={setFilters}
                matchThreshold={matchThreshold}
                setMatchThreshold={setMatchThreshold}
                saveFilters={saveFilters}
                resetFilters={resetFilters}
                toggleFilter={toggleFilter}
                setSingleFilter={setSingleFilter}
              />
            </div>
            
            {/* Results Count */}
            <div className="px-4 pb-3 flex items-center justify-between border-t border-border pt-3">
              <p className="text-sm">
                {filteredJobs.length > 0 ? (
                  <span>
                    Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> matching jobs
                    {searchQuery && <span className="text-muted-foreground"> for "{searchQuery}"</span>}
                  </span>
                ) : (
                  <span className="text-warning">
                    0 jobs match your filters. Try adjusting filters.
                  </span>
                )}
              </p>
              <span className="text-sm text-muted-foreground">
                Sort by: <span className="font-medium text-foreground">Best Match</span>
              </span>
            </div>
          </div>

          {/* Job Listings + Details */}
          <div className={`flex p-4 ${selectedJob ? 'gap-5 justify-start' : 'justify-center'}`}>
            {/* Job List - Centered when panel closed */}
            <div className={`${selectedJob ? 'w-[540px]' : 'w-[700px]'} shrink-0 space-y-3 transition-all duration-300`}>
              {filteredJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onSave={handleSave}
                  onApply={handleApply}
                  isSelected={selectedJob?.id === job.id}
                  onSelect={(job) => {
                    // Toggle: if same job clicked, close panel
                    if (selectedJob?.id === job.id) {
                      setSelectedJob(null);
                    } else {
                      setSelectedJob(job);
                    }
                  }}
                />
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-xl border border-border">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg text-foreground">No jobs found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                  <Button variant="outline" className="mt-4" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Job Details Panel - Fixed Width */}
            {selectedJob && (
              <div className="w-[670px] shrink-0">
                <div className="sticky top-52 max-h-[calc(100vh-220px)] overflow-y-auto rounded-xl">
                  <JobDetailsPanel 
                    job={selectedJob} 
                    onApply={handleApply}
                    onSave={handleSave}
                    onClose={() => setSelectedJob(null)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply Now</DialogTitle>
          </DialogHeader>
          
          {applyingJob && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={applyingJob.companyLogo} alt={applyingJob.company} className="w-12 h-12 rounded-lg" />
                <div>
                  <h3 className="font-semibold">{applyingJob.title}</h3>
                  <p className="text-sm text-muted-foreground">{applyingJob.company}</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-foreground mb-2">Application will include:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" />Your default resume</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" />AI-tailored cover letter</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-success" />Profile information</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>Cancel</Button>
            <Button onClick={submitApplication} disabled={isApplying}>
              {isApplying ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster position="top-right" />
    </div>
  );
};

// Job Details Page (simplified)
const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = enhancedJobs.find(j => j.id === parseInt(id)) || enhancedJobs[0];

  if (!job) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Job not found</h1>
          <Link to="/jobs"><Button className="mt-4">Back to Jobs</Button></Link>
        </div>
      </div>
    );
  }

  const matchColor = job.matchScore >= 90 ? 'text-success' : job.matchScore >= 80 ? 'text-primary' : 'text-warning';

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" onClick={() => navigate('/jobs')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />Back to Jobs
        </Button>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <img src={job.companyLogo} alt={job.company} className="w-16 h-16 rounded-xl" />
              <div className="flex-1">
                <h1 className="font-heading text-2xl font-bold text-foreground">{job.title}</h1>
                <p className="text-lg text-muted-foreground">{job.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{job.companyRating}</span>
                  <span className="text-muted-foreground">• {job.companySize} employees</span>
                </div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${matchColor}`}>{job.matchScore}%</div>
                <div className="text-sm text-muted-foreground">Match</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="flex-1"><Send className="w-4 h-4 mr-2" />Apply Now</Button>
              <Button variant="outline"><FileText className="w-4 h-4 mr-2" />Resume Tailor</Button>
              <Button variant="outline"><PenLine className="w-4 h-4 mr-2" />Cover Letter</Button>
              <Button variant="outline" size="icon"><BookmarkPlus className="w-4 h-4" /></Button>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="match">Why You Match</TabsTrigger>
                <TabsTrigger value="company">Company</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Job Details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><span>{job.location}</span></div>
                    <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-muted-foreground" /><span>{job.salary}</span></div>
                    <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground" /><span>{job.type} • {job.workMode}</span></div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /><span>{job.experience} experience</span></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (<Badge key={skill} variant="secondary">{skill}</Badge>))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="match" className="mt-6">
                <div className="text-center p-6 bg-muted/30 rounded-xl mb-6">
                  <div className={`text-5xl font-bold ${matchColor} mb-2`}>{job.matchScore}%</div>
                  <p className="text-muted-foreground">Match Score</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Resume Keywords</h4>
                  <p className="text-sm text-muted-foreground">{job.resumeKeywords} of {job.totalKeywords} keywords present</p>
                  <Progress value={(job.resumeKeywords / job.totalKeywords) * 100} className="mt-2" />
                </div>
              </TabsContent>

              <TabsContent value="company" className="mt-6">
                <div className="flex items-center gap-4 mb-6">
                  <img src={job.companyLogo} alt={job.company} className="w-16 h-16 rounded-xl" />
                  <div>
                    <h3 className="font-semibold text-xl">{job.company}</h3>
                    <p className="text-muted-foreground">{job.industry}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold">{job.companySize}</p>
                    <p className="text-sm text-muted-foreground">Employees</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <p className="text-2xl font-bold">{job.companyRevenue}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg text-center">
                    <Badge className={job.isSponsorship ? 'bg-success/20 text-success' : ''}>{job.sponsorship}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">Sponsorship</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { JobsPage, JobDetailsPage };

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Check, X, AlertCircle, Sparkles, FileText, Building,
  MapPin, Clock, DollarSign, Briefcase, ChevronRight, Download,
  RefreshCw, Zap, Target, Award, TrendingUp, Edit2, Copy, Star,
  GraduationCap, Users, Bell, ChevronDown, Info, CheckCircle2,
  XCircle, AlertTriangle, Lightbulb, ChevronUp, Eye, Wand2,
  FileCheck, ThumbsUp, PenLine
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useApp } from '../context/AppContext';
import { Toaster, toast } from 'sonner';

// Mock job data for demo
const mockJob = {
  id: 1,
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  companyLogo: "https://ui-avatars.com/api/?name=TC&background=7348C6&color=fff&size=48",
  location: "San Francisco, CA",
  type: "Full-time",
  workMode: "Remote",
  salary: "$140K - $180K",
  postedAt: "15 hours ago",
  applicants: 47,
};

// Mock resume data
const mockResumes = [
  { id: 1, name: "Software Engineer Resume", isDefault: true },
  { id: 2, name: "Frontend Developer Resume", isDefault: false },
  { id: 3, name: "Full Stack Resume", isDefault: false },
];

// Match analysis data
const matchAnalysis = {
  currentScore: 65,  // Now in percentage (0-100)
  potentialScore: 92,
  
  sections: {
    jobTitle: {
      status: 'match',
      jobValue: 'Senior Frontend Developer',
      resumeValue: 'Senior Frontend Developer',
    },
    industry: {
      status: 'partial',
      matched: ['Technology', 'Software'],
      missing: ['SaaS', 'E-Commerce'],
    },
    keywords: {
      matched: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'Agile', 'CI/CD', 'AWS'],
      missing: ['GraphQL', 'Microservices', 'Docker', 'Kubernetes'],
      total: 12,
    },
    experience: {
      status: 'match',
      required: '5+ years',
      actual: '6 years',
    },
    education: {
      status: 'match',
      required: "Bachelor's in CS",
      actual: "Master's in Computer Science",
    },
    summary: {
      status: 'warning',
      message: 'Your summary could better highlight frontend expertise and leadership experience.',
    },
  },

  sectionsToEnhance: [
    { id: 'summary', label: 'Professional Summary', description: 'Add job-specific keywords', checked: true },
    { id: 'skills', label: 'Technical Skills', description: 'Include missing technologies', checked: true },
    { id: 'experience', label: 'Work Experience', description: 'Highlight relevant achievements', checked: true },
  ],
};

// Semi-circular Score Gauge Component - Now with percentage (0-100%)
const ScoreGauge = ({ score, size = 180 }) => {
  const percentage = Math.min(100, Math.max(0, score)); // Clamp between 0-100
  
  const getScoreInfo = (score) => {
    if (score >= 90) return { label: 'Excellent Match', color: '#10B981' };
    if (score >= 70) return { label: 'Good Match', color: '#7348C6' };
    if (score >= 50) return { label: 'Fair Match', color: '#F59E0B' };
    return { label: 'Needs Work', color: '#EF4444' };
  };

  const info = getScoreInfo(score);
  
  // SVG arc calculation for semi-circle
  const radius = 70;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size / 2 + 30} viewBox="0 0 180 120">
        {/* Background gradient arc */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="25%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="75%" stopColor="#7348C6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        
        {/* Background arc */}
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Colored progress arc */}
        <path
          d="M 20 100 A 70 70 0 0 1 160 100"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        
        {/* Score indicator dot */}
        <circle
          cx={90 + 70 * Math.cos(Math.PI - (percentage / 100) * Math.PI)}
          cy={100 - 70 * Math.sin((percentage / 100) * Math.PI)}
          r="8"
          fill="white"
          stroke={info.color}
          strokeWidth="3"
        />
      </svg>
      
      {/* Score display */}
      <div className="absolute bottom-4 flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color: info.color }}>{Math.round(score)}%</span>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          {info.label}
          <Info className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

// Keyword Badge Component
const KeywordBadge = ({ keyword, isMatched, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
      isMatched 
        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200' 
        : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
    }`}
    onClick={onClick}
  >
    {isMatched ? (
      <ThumbsUp className="w-3.5 h-3.5" />
    ) : (
      <X className="w-3.5 h-3.5" />
    )}
    {keyword}
  </motion.div>
);

// Step Indicator Component
const StepIndicator = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center gap-2 mb-6">
    {steps.map((step, index) => (
      <React.Fragment key={step.id}>
        <div className={`flex items-center gap-2 ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
            index < currentStep 
              ? 'bg-primary text-white' 
              : index === currentStep 
              ? 'bg-primary/10 text-primary border-2 border-primary' 
              : 'bg-muted text-muted-foreground'
          }`}>
            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
          </div>
          <span className={`text-sm hidden sm:inline ${index === currentStep ? 'font-semibold' : ''}`}>
            {step.label}
          </span>
        </div>
        {index < steps.length - 1 && (
          <div className={`w-8 h-0.5 ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

// Match Row Component
const MatchRow = ({ icon: Icon, title, status, children }) => {
  const getStatusStyles = () => {
    if (status === 'match') return { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> };
    if (status === 'partial') return { bg: 'bg-amber-50', border: 'border-amber-200', icon: <AlertTriangle className="w-5 h-5 text-amber-500" /> };
    return { bg: 'bg-orange-50', border: 'border-orange-200', icon: <AlertCircle className="w-5 h-5 text-orange-500" /> };
  };

  const styles = getStatusStyles();

  return (
    <div className={`p-4 rounded-xl border ${styles.border} ${styles.bg} transition-all hover:shadow-sm`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm`}>
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground">{title}</h4>
        </div>
        {styles.icon}
      </div>
      {children}
    </div>
  );
};

// Section Enhancement Checkbox
const EnhancementCheckbox = ({ section, onToggle }) => (
  <div 
    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
      section.checked 
        ? 'border-primary bg-primary/5' 
        : 'border-border bg-background hover:border-primary/50'
    }`}
    onClick={() => onToggle(section.id)}
  >
    <div className="flex items-start gap-3">
      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
        section.checked ? 'bg-primary text-white' : 'bg-muted'
      }`}>
        {section.checked && <Check className="w-4 h-4" />}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-foreground">{section.label}</h4>
        <p className="text-sm text-muted-foreground">{section.description}</p>
      </div>
    </div>
  </div>
);

const ResumeTailorPage = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedResume, setSelectedResume] = useState(mockResumes[0].id.toString());
  const [currentStep, setCurrentStep] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [sectionsToEnhance, setSectionsToEnhance] = useState(matchAnalysis.sectionsToEnhance);
  const [selectedMissingKeywords, setSelectedMissingKeywords] = useState(
    matchAnalysis.sections.keywords.missing.slice(0, 2)
  );
  const [optimizationComplete, setOptimizationComplete] = useState(false);

  const job = location.state?.job || mockJob;

  const steps = [
    { id: 'analyze', label: 'See Your Match' },
    { id: 'customize', label: 'Customize' },
    { id: 'review', label: 'Review & Download' },
  ];

  const toggleSectionEnhance = (id) => {
    setSectionsToEnhance(prev => 
      prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s)
    );
  };

  const toggleKeyword = (keyword) => {
    setSelectedMissingKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsOptimizing(false);
    setOptimizationComplete(true);
    setCurrentStep(2);
    toast.success('Resume optimized successfully!');
  };

  const handleDownload = () => {
    toast.success('Resume downloaded!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} data-testid="back-btn">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">G</span>
              </div>
              <span className="font-heading font-bold text-lg">GrowShell</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <img 
              src={user?.avatar || 'https://i.pravatar.cc/32?img=12'} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {currentStep === 0 && "Your Resume Match Analysis"}
            {currentStep === 1 && "Customize Your Resume"}
            {currentStep === 2 && "Your Optimized Resume"}
          </h1>
          <p className="text-muted-foreground">
            {currentStep === 0 && "See how your resume matches this job's requirements"}
            {currentStep === 1 && "Select sections to enhance and keywords to add"}
            {currentStep === 2 && "Review and download your tailored resume"}
          </p>
        </div>

        {/* Job Card - Always Visible */}
        <Card className="mb-6 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-transparent">
              <img 
                src={job.companyLogo} 
                alt={job.company} 
                className="w-14 h-14 rounded-xl shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">{job.title}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="font-medium text-foreground/80">{job.company}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {job.salary}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="secondary">{job.workMode}</Badge>
                <Badge variant="secondary">{job.type}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {/* Step 1: Match Analysis */}
          {currentStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Left: Match Score */}
              <Card className="lg:col-span-1">
                <CardContent className="pt-6">
                  <ScoreGauge score={matchAnalysis.currentScore} />
                  
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-800 flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>
                        <strong>Your resume is a partial match.</strong> Let's make it great! 
                        We can help improve your score to <strong className="text-primary">92%</strong>.
                      </span>
                    </p>
                  </div>

                  <div className="mt-6">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Select Resume
                    </label>
                    <Select value={selectedResume} onValueChange={setSelectedResume}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select resume" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockResumes.map((resume) => (
                          <SelectItem key={resume.id} value={resume.id.toString()}>
                            {resume.name} {resume.isDefault && '(Default)'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    className="w-full mt-6 h-12 gap-2 text-base"
                    onClick={() => setCurrentStep(1)}
                    data-testid="improve-resume-btn"
                  >
                    <Wand2 className="w-5 h-5" />
                    Improve My Resume
                  </Button>
                </CardContent>
              </Card>

              {/* Right: Match Details */}
              <div className="lg:col-span-2 space-y-4">
                {/* Job Title Match */}
                <MatchRow icon={Briefcase} title="Job Title" status="match">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Job Requirement</p>
                      <p className="text-sm font-medium">{matchAnalysis.sections.jobTitle.jobValue}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Your Resume</p>
                      <p className="text-sm font-medium text-emerald-600">{matchAnalysis.sections.jobTitle.resumeValue}</p>
                    </div>
                  </div>
                </MatchRow>

                {/* Industry Match */}
                <MatchRow icon={Building} title="Industry Experience" status="partial">
                  <div className="flex flex-wrap gap-2">
                    {matchAnalysis.sections.industry.matched.map((item) => (
                      <KeywordBadge key={item} keyword={item} isMatched={true} />
                    ))}
                    {matchAnalysis.sections.industry.missing.map((item) => (
                      <KeywordBadge key={item} keyword={item} isMatched={false} />
                    ))}
                  </div>
                </MatchRow>

                {/* Keywords Match */}
                <MatchRow icon={Target} title={`Job Keywords (${matchAnalysis.sections.keywords.matched.length}/${matchAnalysis.sections.keywords.total})`} status="partial">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {matchAnalysis.sections.keywords.matched.map((keyword) => (
                        <KeywordBadge key={keyword} keyword={keyword} isMatched={true} />
                      ))}
                    </div>
                    <div className="pt-3 border-t border-amber-200">
                      <p className="text-xs text-muted-foreground mb-2 font-medium">Missing Keywords:</p>
                      <div className="flex flex-wrap gap-2">
                        {matchAnalysis.sections.keywords.missing.map((keyword) => (
                          <KeywordBadge key={keyword} keyword={keyword} isMatched={false} />
                        ))}
                      </div>
                    </div>
                  </div>
                </MatchRow>

                {/* Experience Match */}
                <MatchRow icon={Clock} title="Years of Experience" status="match">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Required</p>
                      <p className="text-sm font-medium">{matchAnalysis.sections.experience.required}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Your Experience</p>
                      <p className="text-sm font-medium text-emerald-600">{matchAnalysis.sections.experience.actual}</p>
                    </div>
                  </div>
                </MatchRow>

                {/* Summary Warning */}
                <MatchRow icon={FileText} title="Professional Summary" status="warning">
                  <div className="p-3 bg-white rounded-lg flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">{matchAnalysis.sections.summary.message}</p>
                  </div>
                </MatchRow>
              </div>
            </motion.div>
          )}

          {/* Step 2: Customize */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Left: Sections to Enhance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
                    Choose sections to enhance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {sectionsToEnhance.map((section) => (
                    <EnhancementCheckbox 
                      key={section.id} 
                      section={section} 
                      onToggle={toggleSectionEnhance}
                    />
                  ))}
                </CardContent>
              </Card>

              {/* Right: Missing Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
                      Add missing keywords ({selectedMissingKeywords.length}/{matchAnalysis.sections.keywords.missing.length})
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedMissingKeywords(matchAnalysis.sections.keywords.missing)}
                    >
                      Select all
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {matchAnalysis.sections.keywords.missing.map((keyword) => (
                      <div
                        key={keyword}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all cursor-pointer ${
                          selectedMissingKeywords.includes(keyword)
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border bg-background hover:border-primary/50'
                        }`}
                        onClick={() => toggleKeyword(keyword)}
                      >
                        <div className={`w-5 h-5 rounded flex items-center justify-center ${
                          selectedMissingKeywords.includes(keyword) ? 'bg-primary text-white' : 'bg-muted'
                        }`}>
                          {selectedMissingKeywords.includes(keyword) && <Check className="w-3 h-3" />}
                        </div>
                        <span className="font-medium">{keyword}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                    <p className="text-sm text-muted-foreground flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      Selected keywords will be naturally integrated into your resume's summary and skills sections.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Actions */}
              <div className="lg:col-span-2 flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => setCurrentStep(0)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  size="lg" 
                  className="h-12 px-8 gap-2"
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  data-testid="generate-resume-btn"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Optimized Resume
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Left: Success & Score */}
              <Card className="lg:col-span-1">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-1">Resume Optimized!</h3>
                    <p className="text-sm text-muted-foreground">Your resume is now tailored for this job</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-primary/5 rounded-xl border border-emerald-200 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Score Improvement</span>
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-emerald-500">{matchAnalysis.potentialScore}%</span>
                      <span className="text-sm text-muted-foreground">from {matchAnalysis.currentScore}%</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
                      <Badge className="bg-emerald-500 hover:bg-emerald-500">+{matchAnalysis.potentialScore - matchAnalysis.currentScore}%</Badge>
                      <span>match increase</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">Summary Enhanced</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">Missing Skills Added</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm">Experience Enhanced</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Center: Resume Preview */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex-row items-center justify-between pb-4 border-b">
                  <CardTitle className="text-lg">Resume Preview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Full Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Mock Resume Preview */}
                  <div className="bg-white border rounded-xl p-6 shadow-sm min-h-[400px]">
                    <div className="border-b pb-4 mb-4">
                      <h2 className="text-xl font-bold text-foreground">John Doe</h2>
                      <p className="text-sm text-muted-foreground">Senior Frontend Developer</p>
                      <p className="text-xs text-muted-foreground mt-1">john@example.com • San Francisco, CA</p>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-sm text-foreground mb-2">PROFESSIONAL SUMMARY</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Senior Frontend Developer with <span className="bg-emerald-100 text-emerald-700 px-1 rounded">6+ years</span> of experience building 
                        scalable web applications. Expert in <span className="bg-emerald-100 text-emerald-700 px-1 rounded">React</span>, 
                        <span className="bg-emerald-100 text-emerald-700 px-1 rounded">TypeScript</span>, and 
                        <span className="bg-emerald-100 text-emerald-700 px-1 rounded">GraphQL</span>. Experienced with 
                        <span className="bg-emerald-100 text-emerald-700 px-1 rounded">Docker</span> and 
                        <span className="bg-emerald-100 text-emerald-700 px-1 rounded">Kubernetes</span> for 
                        <span className="bg-emerald-100 text-emerald-700 px-1 rounded">microservices</span> deployment.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-sm text-foreground mb-2">TECHNICAL SKILLS</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-center py-4 text-muted-foreground text-sm">
                      ... more content ...
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bottom Actions */}
              <div className="lg:col-span-3 flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Customize
                </Button>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  <Button 
                    size="lg" 
                    className="h-12 px-8 gap-2 bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => {
                      toast.success('Navigating to apply...');
                      navigate('/jobs');
                    }}
                    data-testid="apply-now-btn"
                  >
                    <Zap className="w-5 h-5" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Toaster position="top-right" />
    </div>
  );
};

export default ResumeTailorPage;

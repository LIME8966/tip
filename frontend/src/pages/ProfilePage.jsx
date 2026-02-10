import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Mail, Phone, Linkedin, Edit2, Plus, Check, ChevronRight,
  Briefcase, GraduationCap, Star, User, FileText, MessageSquare,
  HelpCircle, Settings, Gift, Bell, ChevronDown, Shield, Sparkles,
  Building, Calendar, ExternalLink, Target, Award, Users, Bot
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { useApp } from '../context/AppContext';
import { Toaster, toast } from 'sonner';

// Left Sidebar Component
const LeftSidebar = ({ activeItem }) => {
  const navItems = [
    { id: 'jobs', label: 'Jobs', icon: Briefcase, href: '/jobs' },
    { id: 'resume', label: 'Resume', icon: FileText, href: '/resumes' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
    { id: 'agent', label: 'Agent', icon: Bot, badge: 'Beta', href: '#' },
    { id: 'coaching', label: 'Coaching', icon: Award, badge: 'NEW', href: '#' },
  ];

  const bottomItems = [
    { id: 'refer', label: 'Refer & Earn', icon: Gift, href: '#', description: 'Invite friends or share on LinkedIn to earn extra rewards!' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, href: '#' },
    { id: 'feedback', label: 'Feedback', icon: HelpCircle, href: '#' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="w-[200px] shrink-0 border-r border-border h-[calc(100vh-64px)] sticky top-16 lg:top-20 flex flex-col bg-background">
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeItem === item.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.badge && (
              <Badge className={`ml-auto text-[9px] px-1.5 h-4 ${item.badge === 'NEW' ? 'bg-emerald-500' : 'bg-muted-foreground'}`}>
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        {bottomItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              activeItem === item.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
            {item.id === 'refer' && <ChevronRight className="w-4 h-4 ml-auto" />}
          </Link>
        ))}
        {/* Refer description */}
        <p className="text-xs text-muted-foreground px-3 mt-1">
          Invite friends or share on LinkedIn to earn extra rewards!
        </p>
      </div>
    </div>
  );
};

// Right Sidebar Component
const RightSidebar = () => {
  return (
    <div className="w-[280px] shrink-0 p-4 space-y-4">
      {/* Profile Complete Card */}
      <Card className="bg-background border-border">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Great job! Your profile is complete and your extension is installed. Start applying effortlessly!
              </p>
            </div>
          </div>
          <Button className="w-full mt-4 bg-foreground text-background hover:bg-foreground/90">
            Explore Jobs
          </Button>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="bg-background border-border">
        <CardContent className="p-0">
          <Link to="/resumes" className="flex items-center justify-between p-4 hover:bg-muted transition-colors border-b border-border">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Manage My Resume</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
          <Link to="#" className="flex items-center justify-between p-4 hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium">Update LinkedIn URL</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

// Mock Profile Data
const mockProfile = {
  personal: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94102',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  education: [
    {
      id: 1,
      school: 'Stanford University',
      degree: 'Master of Science',
      field: 'Computer Science',
      startDate: '2018',
      endDate: '2020',
    },
    {
      id: 2,
      school: 'UC Berkeley',
      degree: 'Bachelor of Science',
      field: 'Software Engineering',
      startDate: '2014',
      endDate: '2018',
    },
  ],
  workExperience: [
    {
      id: 1,
      company: 'TechCorp Inc.',
      title: 'Senior Frontend Developer',
      startDate: '2022-01',
      endDate: 'Present',
      description: [
        'Led development of React-based dashboard serving 100K+ users',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Mentored junior developers and conducted code reviews',
        'Architected micro-frontend solution for scalability',
      ],
    },
    {
      id: 2,
      company: 'StartupXYZ',
      title: 'Full Stack Developer',
      startDate: '2020-06',
      endDate: '2021-12',
      description: [
        'Built RESTful APIs using Node.js and Express',
        'Developed responsive web applications with React and TypeScript',
        'Integrated third-party payment systems (Stripe, PayPal)',
      ],
    },
  ],
  skills: [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes',
    'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'CI/CD', 'Git', 'Agile',
    'REST APIs', 'Microservices', 'System Design', 'TDD', 'JavaScript', 'HTML/CSS'
  ],
  equalEmployment: {
    authorizedToWork: 'Yes',
    hasDisability: 'No',
    gender: 'Male',
    requiresSponsorship: 'No',
    isLGBTQ: 'Prefer not to say',
    isVeteran: 'No',
    race: 'Asian',
    isHispanicLatino: 'No',
    sexualOrientation: 'Prefer not to say',
  },
};

const ProfilePage = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState({});

  const handleSave = (section) => {
    setIsEditing({ ...isEditing, [section]: false });
    toast.success('Changes saved successfully!');
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
        {/* Left Sidebar */}
        <LeftSidebar activeItem="profile" />

        {/* Main Content */}
        <div className="flex-1 min-w-0 p-6">
          {/* Page Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">PROFILE</h1>
          
          {/* Privacy Notice */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>Your profile data is kept private and secure.</span>
            <HelpCircle className="w-4 h-4 cursor-pointer hover:text-foreground" />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0 h-auto mb-6">
              {['Personal', 'Education', 'Work Experience', 'Skills', 'Equal Employment'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(' ', '-')}
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Personal Tab */}
            <TabsContent value="personal" className="mt-0">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl font-semibold">{profile.personal.name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing({ ...isEditing, personal: !isEditing.personal })}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {profile.personal.address}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm">
                      <Mail className="w-4 h-4" />
                      {profile.personal.email}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm">
                      <Phone className="w-4 h-4" />
                      {profile.personal.phone}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm w-fit">
                    <Linkedin className="w-4 h-4" />
                    {profile.personal.linkedin}
                  </Badge>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      Add your education history for better job matches tailored to your background
                    </p>
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Education
                    </Button>
                  </div>

                  {/* Work Experience Preview */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Work Experience</h3>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {profile.workExperience.map((exp) => (
                      <div key={exp.id} className="mb-6">
                        <div className="flex items-start gap-3">
                          <div className="w-3 h-3 rounded-full border-2 border-foreground mt-1.5" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">{exp.startDate} → {exp.endDate}</p>
                            <h4 className="font-semibold text-foreground mt-1">{exp.company}</h4>
                            <p className="text-sm text-muted-foreground">{exp.title}</p>
                            <ul className="mt-2 space-y-1">
                              {exp.description.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-foreground">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="mt-0">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{edu.school}</h4>
                          <p className="text-sm text-muted-foreground">{edu.degree} in {edu.field}</p>
                          <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Work Experience Tab */}
            <TabsContent value="work-experience" className="mt-0">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.workExperience.map((exp) => (
                    <div key={exp.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{exp.company}</h4>
                            <p className="text-sm font-medium text-foreground/80">{exp.title}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.startDate} - {exp.endDate}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <ul className="mt-4 ml-16 space-y-2">
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="mt-0">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Skills</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 gap-2">
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Equal Employment Tab */}
            <TabsContent value="equal-employment" className="mt-0">
              <Card className="border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Equal Employment</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { question: 'Are you authorized to work in the US?', value: profile.equalEmployment.authorizedToWork },
                    { question: 'Do you have a disability?', value: profile.equalEmployment.hasDisability },
                    { question: 'What is your gender?', value: profile.equalEmployment.gender },
                    { question: 'Will you now or in the future require sponsorship for employment visa status?', value: profile.equalEmployment.requiresSponsorship },
                    { question: 'Do you identify as LGBTQ+?', value: profile.equalEmployment.isLGBTQ },
                    { question: 'Are you a veteran?', value: profile.equalEmployment.isVeteran },
                    { question: 'How would you identify your race?', value: profile.equalEmployment.race },
                    { question: 'Are you Hispanic or Latino?', value: profile.equalEmployment.isHispanicLatino },
                    { question: 'How would you describe your sexual orientation? (mark all that apply)', value: profile.equalEmployment.sexualOrientation },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <p className="text-sm text-foreground max-w-md">{item.question}</p>
                      <Badge variant="secondary" className="px-3 py-1">{item.value}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default ProfilePage;

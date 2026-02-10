import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Upload Resume', icon: Upload },
  { id: 2, title: 'Review Details', icon: FileText },
  { id: 3, title: 'Job Preferences', icon: Briefcase },
  { id: 4, title: 'Location', icon: MapPin },
  { id: 5, title: 'Salary & Work', icon: DollarSign },
  { id: 6, title: 'Skills', icon: Sparkles },
  { id: 7, title: 'Complete', icon: Check },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { updateOnboardingData, completeOnboarding, onboardingData } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    // Parsed resume data (mock)
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    phone: '+1 (555) 123-4567',
    summary: 'Experienced software engineer with 5+ years in full-stack development...',
    
    // Preferences
    roles: [],
    experience: '',
    locations: [],
    remotePreference: '',
    salaryMin: '',
    salaryMax: '',
    workType: '',
    skills: []
  });

  const availableRoles = [
    'Software Engineer', 'Frontend Developer', 'Backend Developer', 
    'Full Stack Developer', 'DevOps Engineer', 'Data Scientist',
    'Product Manager', 'UX Designer', 'Tech Lead'
  ];

  const availableLocations = [
    'San Francisco, CA', 'New York, NY', 'Austin, TX', 
    'Seattle, WA', 'Boston, MA', 'Denver, CO', 'Remote'
  ];

  const availableSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'PostgreSQL',
    'MongoDB', 'Redis', 'Git', 'CI/CD', 'Agile'
  ];

  const progress = (currentStep / STEPS.length) * 100;

  const handleFileUpload = (file) => {
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setUploadedFile(file);
      toast.success('Resume uploaded successfully!');
    } else {
      toast.error('Please upload a PDF or DOC file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    updateOnboardingData({
      preferences: {
        roles: formData.roles,
        experience: formData.experience,
        locations: formData.locations,
        salary: `${formData.salaryMin} - ${formData.salaryMax}`,
        workType: formData.workType
      },
      skills: formData.skills
    });
    completeOnboarding();
    toast.success('Setup complete! Let\'s find your dream job.');
    navigate('/dashboard');
  };

  const toggleArrayItem = (array, item, setter) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Upload Your Resume
              </h2>
              <p className="text-muted-foreground">
                Our AI will parse your resume and extract key information
              </p>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-success/20 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      Drag and drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse (PDF, DOC, DOCX)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Review Parsed Information
              </h2>
              <p className="text-muted-foreground">
                Verify the details we extracted from your resume
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Professional Summary</Label>
                <textarea 
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full h-32 px-3 py-2 rounded-lg border border-input bg-transparent text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Job Preferences
              </h2>
              <p className="text-muted-foreground">
                What roles are you interested in?
              </p>
            </div>

            <div className="space-y-4">
              <Label>Select roles (choose up to 3)</Label>
              <div className="flex flex-wrap gap-2">
                {availableRoles.map((role) => (
                  <Badge
                    key={role}
                    variant={formData.roles.includes(role) ? 'default' : 'outline'}
                    className="cursor-pointer py-2 px-4 text-sm"
                    onClick={() => {
                      if (formData.roles.length < 3 || formData.roles.includes(role)) {
                        toggleArrayItem(formData.roles, role, (roles) => setFormData({ ...formData, roles }));
                      } else {
                        toast.error('Maximum 3 roles allowed');
                      }
                    }}
                  >
                    {formData.roles.includes(role) && <Check className="w-3 h-3 mr-1" />}
                    {role}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 pt-4">
                <Label>Experience Level</Label>
                <Select 
                  value={formData.experience} 
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                    <SelectItem value="lead">Lead/Staff (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Location Preferences
              </h2>
              <p className="text-muted-foreground">
                Where would you like to work?
              </p>
            </div>

            <div className="space-y-4">
              <Label>Select preferred locations</Label>
              <div className="flex flex-wrap gap-2">
                {availableLocations.map((location) => (
                  <Badge
                    key={location}
                    variant={formData.locations.includes(location) ? 'default' : 'outline'}
                    className="cursor-pointer py-2 px-4 text-sm"
                    onClick={() => toggleArrayItem(formData.locations, location, (locations) => setFormData({ ...formData, locations }))}
                  >
                    {formData.locations.includes(location) && <Check className="w-3 h-3 mr-1" />}
                    {location}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 pt-4">
                <Label>Remote Work Preference</Label>
                <Select 
                  value={formData.remotePreference} 
                  onValueChange={(value) => setFormData({ ...formData, remotePreference: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote-only">Remote Only</SelectItem>
                    <SelectItem value="remote-preferred">Remote Preferred</SelectItem>
                    <SelectItem value="hybrid">Open to Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site Preferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Salary & Work Type
              </h2>
              <p className="text-muted-foreground">
                Set your compensation expectations
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Minimum Salary (USD)</Label>
                  <Input 
                    type="number"
                    placeholder="100,000"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Salary (USD)</Label>
                  <Input 
                    type="number"
                    placeholder="150,000"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Employment Type</Label>
                <Select 
                  value={formData.workType} 
                  onValueChange={(value) => setFormData({ ...formData, workType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Confirm Your Skills
              </h2>
              <p className="text-muted-foreground">
                Select skills that match your expertise
              </p>
            </div>

            <div className="space-y-4">
              <Label>Select your skills</Label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? 'default' : 'outline'}
                    className="cursor-pointer py-2 px-4 text-sm"
                    onClick={() => toggleArrayItem(formData.skills, skill, (skills) => setFormData({ ...formData, skills }))}
                  >
                    {formData.skills.includes(skill) && <Check className="w-3 h-3 mr-1" />}
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-success/20 flex items-center justify-center">
              <Check className="w-10 h-10 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                You're All Set!
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your profile is ready. Our AI will now find the best job matches for you based on your preferences.
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-6 text-left space-y-3">
              <h3 className="font-semibold text-foreground">Profile Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Roles:</span> {formData.roles.join(', ') || 'Not specified'}</p>
                <p><span className="text-muted-foreground">Experience:</span> {formData.experience || 'Not specified'}</p>
                <p><span className="text-muted-foreground">Locations:</span> {formData.locations.join(', ') || 'Not specified'}</p>
                <p><span className="text-muted-foreground">Skills:</span> {formData.skills.slice(0, 5).join(', ')}{formData.skills.length > 5 ? ` +${formData.skills.length - 5} more` : ''}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-primary">
              <span className="text-primary-foreground font-bold text-xl">G</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              GrowShell
            </span>
          </div>
          <p className="text-muted-foreground">Complete your profile setup</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm font-medium text-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4 overflow-x-auto pb-2">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isComplete = currentStep > step.id;
              
              return (
                <div 
                  key={step.id}
                  className={`flex flex-col items-center gap-1 min-w-[60px] ${
                    isActive ? 'text-primary' : isComplete ? 'text-success' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-primary text-primary-foreground' : 
                    isComplete ? 'bg-success text-success-foreground' : 
                    'bg-muted'
                  }`}>
                    {isComplete ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className="text-xs hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-background rounded-2xl border border-border shadow-lg p-8"
        >
          {renderStep()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < STEPS.length ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleComplete} className="shadow-primary">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  Zap, 
  Video, 
  Bell, 
  TrendingUp,
  Check,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Mic
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Brain,
    title: "AI Job Matching",
    tagline: "Find jobs that truly fit you",
    description: "Our advanced AI analyzes your skills and preferences to match you with perfect opportunities.",
    gradient: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    highlights: [
      "Smart skill-to-job matching",
      "Daily personalized recommendations",
      "Match score (0-100%)",
      "Preference learning AI",
      "Advanced filters",
      "Industry insights"
    ],
    metric: { value: "94%", label: "Match Rate" }
  },
  {
    icon: FileText,
    title: "Resume Tailoring",
    tagline: "One resume, infinite possibilities",
    description: "Automatically customize your resume for each application to maximize interview chances.",
    gradient: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    popular: true,
    highlights: [
      "AI keyword optimization",
      "ATS-friendly formats",
      "Job-specific versions",
      "Skills gap analysis",
      "Summary generator",
      "Premium templates"
    ],
    metric: { value: "3x", label: "More Interviews" }
  },
  {
    icon: Zap,
    title: "Auto Apply",
    tagline: "Apply while you sleep",
    description: "Set preferences and let AI apply to matching jobs automatically, saving hours of work.",
    gradient: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    highlights: [
      "One-click bulk apply",
      "Smart timing optimization",
      "Custom cover letters",
      "Status tracking",
      "Application limits",
      "Company blacklist"
    ],
    metric: { value: "50+", label: "Apps/Week" }
  },
  {
    icon: Mic,
    title: "AI Mock Interview",
    tagline: "Practice makes perfect",
    description: "Prepare with AI-powered mock interviews tailored to your target role and company.",
    gradient: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    highlights: [
      "Role-specific questions",
      "Real-time AI feedback",
      "Voice & video practice",
      "Body language tips",
      "Answer improvement",
      "Confidence scoring"
    ],
    metric: { value: "89%", label: "Success Rate" }
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    tagline: "Stay ahead of competition",
    description: "Get instant notifications when new matching jobs are posted before anyone else.",
    gradient: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    highlights: [
      "Real-time job alerts",
      "Custom preferences",
      "Email & push notifications",
      "Salary change alerts",
      "Company updates",
      "Interview reminders"
    ],
    metric: { value: "<5m", label: "Alert Speed" }
  },
  {
    icon: TrendingUp,
    title: "Career Insights",
    tagline: "Data-driven career moves",
    description: "Access powerful analytics and market insights for informed career decisions.",
    gradient: "from-indigo-500 to-blue-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    highlights: [
      "Salary benchmarking",
      "Industry trends",
      "Skills forecasting",
      "Success rate tracking",
      "Improvement tips",
      "Market positioning"
    ],
    metric: { value: "500K+", label: "Data Points" }
  }
];

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className={`relative h-full bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
        isHovered 
          ? 'shadow-2xl -translate-y-2' 
          : 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]'
      }`}>
        
        {/* Popular Badge */}
        {feature.popular && (
          <div className="absolute top-4 right-4 z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${feature.gradient} text-white`}>
              <Sparkles className="w-3 h-3" />
              POPULAR
            </span>
          </div>
        )}

        {/* Top Gradient Line */}
        <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
        
        <div className="p-6 lg:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
              <Icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            
            <div className="text-right">
              <div className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                {feature.metric.value}
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                {feature.metric.label}
              </div>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {feature.title}
          </h3>
          <p className={`text-sm font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-3`}>
            {feature.tagline}
          </p>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            {feature.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-100 mb-4" />

          {/* Features List */}
          <div className="space-y-2.5 mb-5">
            {feature.highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
                <span className="text-sm text-gray-600">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
            isHovered 
              ? `bg-gradient-to-r ${feature.gradient} text-white` 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
          }`}>
            Learn More
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Premium company logos (SVG text representations)
const companyLogos = [
  { name: 'Google', logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png' },
  { name: 'Microsoft', logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/80px-Apple_logo_black.svg.png' },
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/200px-Netflix_2015_logo.svg.png' },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-gradient-to-b from-gray-50/80 to-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-6">
            Trusted by professionals at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
            {companyLogos.map((company) => (
              <img
                key={company.name}
                src={company.logo}
                alt={company.name}
                className="h-6 lg:h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-5"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          
          <p className="text-lg text-gray-500">
            Our AI-powered platform handles the heavy lifting so you can focus on what matters most.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Button size="lg" className="px-8 h-12 rounded-xl shadow-lg shadow-primary/20 font-semibold">
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

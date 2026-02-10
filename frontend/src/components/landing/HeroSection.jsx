import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Sparkles, Star, Users, Shield, Zap, Play, Briefcase, TrendingUp } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [workModel, setWorkModel] = useState('all');
  const [experience, setExperience] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/jobs', { state: { searchQuery, location } });
  };

  const popularTags = ['Remote', 'Software Engineer', 'Data Science', 'Product Manager', 'Marketing'];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-b from-violet-50 via-background to-background">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        {/* Stats Row - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-8 mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">8,000,000+</p>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
            </div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">400,000+</p>
              <p className="text-sm text-muted-foreground">Added Today</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Two Column */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 border border-violet-200"
            >
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">AI-Powered Job Discovery</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Find Your{' '}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Dream Job</span>
                {' '}Today
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
                Let our AI match you with perfect opportunities, tailor your resume, and auto-apply — all while you focus on interviews.
              </p>
            </div>

            {/* Search Form - Competitor Style */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 max-w-2xl"
            >
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Job Title Input */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Job Title</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Software Engineer, Designer..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white text-sm"
                    />
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="City, state, or remote"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Work Model Select */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Work Model</label>
                  <Select value={workModel} onValueChange={setWorkModel}>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Experience Select */}
                <div>
                  <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Experience</label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="h-12 bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                      <SelectItem value="lead">Lead / Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="flex items-center gap-2 flex-wrap mb-4 pb-4 border-b border-gray-100">
                <span className="text-xs text-muted-foreground font-medium">Popular:</span>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag === 'Remote' ? '' : tag)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Search Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Find My Dream Job
              </Button>
            </motion.form>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="font-bold text-foreground text-sm">4.9</span>
                <span className="text-muted-foreground text-xs">(12,847 reviews)</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/32?img=${i + 10}`}
                      alt=""
                      className="w-7 h-7 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">125K+ users</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Video Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Video Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-foreground/5 border border-gray-200">
              {/* Video Thumbnail with Play Button */}
              <div className="relative aspect-video cursor-pointer group" onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}>
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop"
                  alt="How to setup GrowShell"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-8 h-8 text-violet-600 ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-foreground/80 text-background text-sm font-medium">
                  2:15
                </div>
              </div>

              {/* Video Title */}
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-foreground">How to Setup Your Account</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn how to set up GrowShell in under 2 minutes with AI matching, resume tailoring, and auto-apply features.
                </p>
              </div>
            </div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute top-8 -left-6 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-bold">94%</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Match Score</p>
                  <p className="text-xs text-muted-foreground">Senior Developer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-16 -right-6 bg-white rounded-xl shadow-lg p-3 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Auto Apply</p>
                  <p className="text-xs text-muted-foreground">5 jobs today</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

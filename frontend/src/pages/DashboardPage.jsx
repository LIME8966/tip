import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  FileText, 
  Send, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  Sparkles,
  Clock,
  Building2,
  MapPin,
  BookmarkPlus
} from 'lucide-react';

const DashboardPage = () => {
  const { user, jobs, applications } = useApp();

  const stats = [
    { 
      title: 'Job Matches', 
      value: jobs.length, 
      icon: Briefcase, 
      color: 'primary',
      change: '+12 today'
    },
    { 
      title: 'Applications', 
      value: applications.filter(a => a.status === 'applied').length, 
      icon: Send, 
      color: 'info',
      change: '3 pending'
    },
    { 
      title: 'Interviews', 
      value: applications.filter(a => a.status === 'interview').length, 
      icon: Calendar, 
      color: 'success',
      change: '1 this week'
    },
    { 
      title: 'Offers', 
      value: applications.filter(a => a.status === 'offer').length, 
      icon: TrendingUp, 
      color: 'warning',
      change: 'Review by Jan 25'
    },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    info: 'bg-info/10 text-info',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning'
  };

  const recentMatches = jobs.slice(0, 4);

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0] || 'there'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s what&apos;s happening with your job search today.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${colorClasses[stat.color]} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Job Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Recent Job Matches
                  </CardTitle>
                  <Link to="/jobs">
                    <Button variant="ghost" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentMatches.map((job) => (
                    <div
                      key={job.id}
                      className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <img 
                        src={job.companyLogo} 
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground truncate">
                              {job.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <Badge className="bg-success/20 text-success border-0 shrink-0">
                            {job.matchScore}% match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {job.postedAt}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Link to={`/jobs/${job.id}`}>
                            <Button size="sm">View Details</Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <BookmarkPlus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity & Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="font-semibold text-foreground">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    Complete your profile to improve job matching accuracy.
                  </p>
                  <Link to="/settings">
                    <Button variant="outline" className="w-full" size="sm">
                      Complete Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/jobs" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <Briefcase className="w-4 h-4 mr-2" />
                      Browse Jobs
                    </Button>
                  </Link>
                  <Link to="/resumes" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Manage Resumes
                    </Button>
                  </Link>
                  <Link to="/applications" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      <Send className="w-4 h-4 mr-2" />
                      Track Applications
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { text: 'Applied to TechCorp Inc.', time: '2 hours ago', icon: Send },
                    { text: 'Interview scheduled at CloudScale', time: '1 day ago', icon: Calendar },
                    { text: 'Resume viewed by DesignFlow', time: '2 days ago', icon: FileText },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;

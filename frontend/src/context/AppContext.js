import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockUser, mockJobs, mockApplications, mockNotifications, mockResumes } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Initialize auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('growshell_auth');
    return stored ? JSON.parse(stored).isAuthenticated : false;
  });
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('growshell_auth');
    return stored ? JSON.parse(stored).user : null;
  });
  
  // Jobs State
  const [jobs, setJobs] = useState(mockJobs);
  const [savedJobs, setSavedJobs] = useState([]);
  
  // Applications State
  const [applications, setApplications] = useState(mockApplications);
  
  // Notifications State
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // Resumes State
  const [resumes, setResumes] = useState(mockResumes);
  
  // Onboarding State - also persist from localStorage
  const [onboardingComplete, setOnboardingComplete] = useState(() => {
    const stored = localStorage.getItem('growshell_auth');
    return stored ? JSON.parse(stored).onboardingComplete : false;
  });
  const [onboardingData, setOnboardingData] = useState({
    resume: null,
    parsedResume: null,
    preferences: {
      roles: [],
      experience: '',
      locations: [],
      salary: '',
      workType: ''
    },
    skills: []
  });

  // Auth Functions
  const login = useCallback((email, password) => {
    // Mock login - in real app would call API
    setIsAuthenticated(true);
    setUser(mockUser);
    // Persist to localStorage
    localStorage.setItem('growshell_auth', JSON.stringify({
      isAuthenticated: true,
      user: mockUser,
      onboardingComplete: false
    }));
    return { success: true };
  }, []);

  const signup = useCallback((data) => {
    // Mock signup
    setIsAuthenticated(true);
    const newUser = { ...mockUser, ...data };
    setUser(newUser);
    // Persist to localStorage
    localStorage.setItem('growshell_auth', JSON.stringify({
      isAuthenticated: true,
      user: newUser,
      onboardingComplete: false
    }));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setOnboardingComplete(false);
    // Clear localStorage
    localStorage.removeItem('growshell_auth');
  }, []);

  // Job Functions
  const saveJob = useCallback((jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
    setSavedJobs(prev => {
      const job = jobs.find(j => j.id === jobId);
      if (job?.saved) {
        return prev.filter(j => j.id !== jobId);
      }
      return [...prev, job];
    });
  }, [jobs]);

  const applyToJob = useCallback((jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      setApplications(prev => [...prev, {
        id: Date.now(),
        jobTitle: job.title,
        company: job.company,
        appliedDate: new Date().toISOString().split('T')[0],
        status: 'applied',
        nextStep: 'Awaiting response',
        notes: ''
      }]);
    }
  }, [jobs]);

  // Application Functions
  const updateApplicationStatus = useCallback((appId, status) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status } : app
    ));
  }, []);

  const updateApplicationNotes = useCallback((appId, notes) => {
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, notes } : app
    ));
  }, []);

  // Notification Functions
  const markNotificationRead = useCallback((notifId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notifId ? { ...n, read: true } : n
    ));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  // Resume Functions
  const addResume = useCallback((resume) => {
    setResumes(prev => [...prev, { ...resume, id: Date.now() }]);
  }, []);

  const deleteResume = useCallback((resumeId) => {
    setResumes(prev => prev.filter(r => r.id !== resumeId));
  }, []);

  const setDefaultResume = useCallback((resumeId) => {
    setResumes(prev => prev.map(r => ({
      ...r,
      isDefault: r.id === resumeId
    })));
  }, []);

  // Onboarding Functions
  const updateOnboardingData = useCallback((data) => {
    setOnboardingData(prev => ({ ...prev, ...data }));
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
    // Update user with onboarding data
    const updatedUser = {
      ...user,
      ...onboardingData.preferences,
      skills: onboardingData.skills
    };
    setUser(updatedUser);
    // Persist to localStorage
    localStorage.setItem('growshell_auth', JSON.stringify({
      isAuthenticated: true,
      user: updatedUser,
      onboardingComplete: true
    }));
  }, [user, onboardingData]);

  const value = {
    // Auth
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    
    // Jobs
    jobs,
    savedJobs,
    saveJob,
    applyToJob,
    
    // Applications
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    
    // Notifications
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount: notifications.filter(n => !n.read).length,
    
    // Resumes
    resumes,
    addResume,
    deleteResume,
    setDefaultResume,
    
    // Onboarding
    onboardingComplete,
    onboardingData,
    updateOnboardingData,
    completeOnboarding
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

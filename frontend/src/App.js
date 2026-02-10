import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import { Toaster } from "@/components/ui/sonner";

// Pages
import LandingPage from "@/pages/LandingPage";
import { SignInPage, SignUpPage, ForgotPasswordPage } from "@/pages/auth";
import OnboardingPage from "@/pages/OnboardingPage";
import DashboardPage from "@/pages/DashboardPage";
import { JobsPage, JobDetailsPage } from "@/pages/JobsPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import ResumesPage from "@/pages/ResumesPage";
import ResumeTailorPage from "@/pages/ResumeTailorPage";
import ProfilePage from "@/pages/ProfilePage";
import NotificationsPage from "@/pages/NotificationsPage";
import SettingsPage from "@/pages/SettingsPage";

// Protected Route Component
const ProtectedRoute = ({ children, requireOnboarding = true }) => {
  const { isAuthenticated, onboardingComplete } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // Skip onboarding check for the onboarding page itself
  if (requireOnboarding && !onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, onboardingComplete } = useApp();
  
  if (isAuthenticated) {
    if (!onboardingComplete) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route path="/signin" element={
        <PublicRoute>
          <SignInPage />
        </PublicRoute>
      } />
      <Route path="/signup" element={
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      } />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Onboarding */}
      <Route path="/onboarding" element={
        <ProtectedRoute requireOnboarding={false}>
          <OnboardingPage />
        </ProtectedRoute>
      } />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      <Route path="/jobs" element={
        <ProtectedRoute>
          <JobsPage />
        </ProtectedRoute>
      } />
      <Route path="/jobs/:id" element={
        <ProtectedRoute>
          <JobDetailsPage />
        </ProtectedRoute>
      } />
      <Route path="/applications" element={
        <ProtectedRoute>
          <ApplicationsPage />
        </ProtectedRoute>
      } />
      <Route path="/resumes" element={
        <ProtectedRoute>
          <ResumesPage />
        </ProtectedRoute>
      } />
      <Route path="/resume-tailor" element={
        <ProtectedRoute>
          <ResumeTailorPage />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      
      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

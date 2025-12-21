import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'

import AboutUs from './pages/AboutUs'
import MainLayout from './layouts/MainLayout'
import JobPortal from './pages/JobPortal'
import Jobs from './pages/Jobs'
import Signin from './pages/candidate/Signin'
import ESignin from './pages/employer/ESignin'
import ESignup from './pages/employer/ESignup'
import PostJob from './pages/employer/PostJob'
import Signup from './pages/candidate/Signup'
import EmployerDashboard from './pages/employer/Dashboard'
import ApplicationDetails from './pages/employer/ApplicationDetails'
import EmployerMessages from './pages/employer/Messages'
import IntroPage from './pages/InroPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import JobDetail from './pages/JobDetail'
import ApplicationForm from './pages/candidate/ApplicationForm'
import Profile from './pages/candidate/Profile'
import { useEffect } from 'react'
import { initSocket, disconnectSocket } from './utils/socket'

// Import candidate pages
import Resume from './pages/candidate/Resume';
import AppliedJobs from './pages/candidate/AppliedJobs';
import { JobAlerts, Notifications, Messages } from './pages/candidate/ActivityPages';
import CandidateLayout from './layouts/CandidateLayout';
import ManageApplications from './pages/employer/ManageApplications';
import ViewJobs from './pages/employer/ViewJobs';

// Loading component for initial auth check
const AppContent = () => {
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (user && user.id) {
      initSocket(user.id);
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [user]);

  // Show loading only during initial auth check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Loading...</h2>
          <p className="text-gray-600 font-semibold">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        {/* Pages WITH Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/job-portal" element={<JobPortal />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>

        {/* Pages WITHOUT Footer */}
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetail />} />
        <Route path="/cand-signin" element={<Signin />} />
        <Route path="/emp-signin" element={<ESignin />} />
        <Route path='/cand-signup' element={<Signup />} />
        <Route path="/emp-signup" element={<ESignup />} />

        {/* Candidate Dashboard Routes */}
        <Route element={<CandidateLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/jobs/applied" element={<AppliedJobs />} />
          {/* Removed SavedJobs route */}
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/job-alerts" element={<JobAlerts />} />
        </Route>

        {/* Employer Routes (no layout) */}
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/application/:applicationId" element={<ApplicationDetails />} />
        <Route path="/employer-messages" element={<EmployerMessages />} />
        <Route path="/manage-applications" element={<ManageApplications />} />
        <Route path="/view-jobs" element={<ViewJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/apply/:jobId" element={<ApplicationForm />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App

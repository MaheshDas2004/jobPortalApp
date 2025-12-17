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
import Dashboard from './pages/candidate/Dashboard'
import EmployerDashboard from './pages/employer/Dashboard'
import EHome from './pages/EHome'
import IntroPage from './pages/InroPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import JobDetail from './pages/JobDetail'
import ApplicationForm from './pages/candidate/ApplicationForm'
import Profile from './pages/candidate/Profile'

// Loading component for initial auth check
const AppContent = () => {
  const { isLoading } = useAuth();

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
          {/* <Route path="/dashboard" element={<Dashboard />}/> */}
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
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/candidate-dashboard" element={<Dashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/ehome" element={<EHome />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/profile" element={<Profile />} />
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

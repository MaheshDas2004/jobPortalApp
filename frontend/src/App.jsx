import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import RecruiterLoginPage from './pages/RecruiterLoginPage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/JobSeeker/Dashboard'
import IntroPage from './pages/Recruiter/InroPage'
import EventHandling from './demo/EventHandling'
import SignupSeeker from './pages/JobSeeker/SignupSeeker'
import Jobs from './pages/JobSeeker/Jobs'
import JobPortal from './pages/JobSeeker/JobPortal'
import AboutUs from './pages/AboutUs'
import SignupRecruiter from './pages/Recruiter/SignupRecruiter'
import PostJob from './pages/Recruiter/PostJob'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <div>
      <Navbar/>

      <Routes>
        {/* Pages WITH Footer */}
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/intro" element={<IntroPage />}/>
          <Route path="/job-portal" element={<JobPortal />}/>
          <Route path="/jobs" element={<Jobs />}/>
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/demo" element={<EventHandling />}/>
        </Route>

        {/* Pages WITHOUT Footer */}
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/login-recruiter" element={<RecruiterLoginPage />}/>
        <Route path='/signup-seeker' element={<SignupSeeker />}/>
        <Route path="/signup-recruiter" element={<SignupRecruiter />}/>
        <Route path="/post-job" element={<PostJob />}/>
      </Routes>
    </div>
  )
}

export default App

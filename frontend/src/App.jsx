import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import RecruiterLoginPage from './pages/RecruiterLoginPage'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/JobSeeker/Dashboard'
import IntroPage from './pages/Recruiter/InroPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Navbar/>
    <div>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/login-recruiter" element={<RecruiterLoginPage />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/intro" element={<IntroPage />}/>


     </Routes>
    </div>
    </div>
  )
}

export default App

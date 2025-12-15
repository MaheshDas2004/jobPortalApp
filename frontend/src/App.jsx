import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import EventHandling from './demo/EventHandling'
import AboutUs from './pages/AboutUs'
import MainLayout from './layouts/MainLayout'
import JobPortal from './pages/JobPortal'
import Jobs from './pages/Jobs'
import Signin from './pages/candidate/Signin'
import ESignin from './pages/employer/ESignin'
import ESignup from './pages/employer/ESignup'
import PostJob from './pages/employer/PostJob'
import Signup from './pages/candidate/Signup'
import IntroPage from './pages/InroPage'


function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Navbar/>

      <Routes>
        {/* Pages WITH Footer */}
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dashboard" element={<Dashboard />}/> */}
          <Route path="/intro" element={<IntroPage/>}/>
          <Route path="/job-portal" element={<JobPortal />}/>
          <Route path="/about-us" element={<AboutUs />}/>
          <Route path="/demo" element={<EventHandling />}/>

        </Route>

        {/* Pages WITHOUT Footer */}
          <Route path="/jobs" element={<Jobs />}/>

        <Route path="/cand-signin" element={<Signin setUser={setUser}/>}/>
        <Route path="/emp-signin" element={<ESignin />}/>
        <Route path='/cand-signup' element={<Signup />}/>
        <Route path="/emp-signup" element={<ESignup />}/>
        <Route path="/post-job" element={<PostJob />}/>
      </Routes>
    </div>
  )
}

export default App

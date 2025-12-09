import React from 'react'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      <Outlet />   {/* content of the child routes */}
      <Footer />
    </>
  )
}

export default MainLayout

import React from 'react'
import { Outlet } from 'react-router-dom'
import NaveBar from './Componantes/NaveBar'
import Footer from './Componantes/Footer'


const AppLayout = () => {
  return (
    <>
      <NaveBar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default AppLayout
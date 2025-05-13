import React from 'react'
import { Outlet } from 'react-router-dom'
import NaveBar from './Pages/Components/NaveBar'
import FooterBar from './Pages/Components/FooterBar'

const AppLayout = () => {
  return (
    <>
      <NaveBar />
      <Outlet />
      <FooterBar/>
    </>
  )
}

export default AppLayout
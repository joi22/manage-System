import React from 'react'
import { Outlet } from 'react-router-dom'
import NaveBar from './Pages/Components/NaveBar'

const AppLayout = () => {
  return (
    <>
      <NaveBar />
      <Outlet />
    </>
  )
}

export default AppLayout
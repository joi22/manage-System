import React from 'react'
import { Outlet } from 'react-router-dom'
import NaveBar from './Componantes/NaveBar'


const AppLayout = () => {
  return (
    <>
      <NaveBar />
      <Outlet />
    </>
  )
}

export default AppLayout
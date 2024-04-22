import React from 'react'
import { Outlet } from 'react-router-dom'
import CustomHeader from './SharedComponents/CustomHeader'
import FooterComponent from './SharedComponents/CustomFooter'
const Layout = () =>{
  return (
    <>
<CustomHeader/>
<Outlet />
<FooterComponent/>

    </>
  )
}

export default Layout
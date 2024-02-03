import React from 'react'
import { CardFooter } from 'react-bootstrap'
import {CardHeader} from 'react-bootstrap'
import { Outlet } from 'react-router'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({children}) {
  return (
    <>
        <Navigation/>
            <Outlet/>
            {children}
        {/* <Footer /> */}
    </>
  )
}

export default Layout
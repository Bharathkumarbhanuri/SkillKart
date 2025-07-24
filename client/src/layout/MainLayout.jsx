import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../pages/Home'

function MainLayout() {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default MainLayout

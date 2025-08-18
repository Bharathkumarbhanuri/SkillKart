import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaClipboardList, FaBell } from 'react-icons/fa';
import Search from './Search';
import ProfileSidebar from './ProfileSidebar';  

function Navbar() {
    return (
        <nav className='bg-white flex min-w-fit items-center text-black shadow-lg p-4 gap-12'>

            <NavLink to="/" className='' >
                <p className='text-3xl font-semibold px-6'>SkillKart</p>
            </NavLink>

            <NavLink to="/cart" className='' >
                Explore
            </NavLink>

            <div className='w-full'>
                <Search />
            </div>

            <NavLink to="/cart" className='flex items-center' >
                <button className='flex items-center text-2xl'><FaShoppingCart className='text-2xl mr-2' />cart</button>
            </NavLink>
            <NavLink to="/orders" className='flex items-center' >
                <button className='flex items-center text-2xl'><FaClipboardList className='text-2xl mr-2' />orders</button>
            </NavLink>
            <NavLink to="/orders" className='flex items-center' >
                <button className='flex items-center text-2xl'><FaBell className='text-2xl mr-2' /></button>
            </NavLink>

            <ProfileSidebar />
        </nav>
    )
}

export default Navbar

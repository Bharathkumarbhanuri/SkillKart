import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaClipboardList, FaBell, FaHeart, FaRegHeart } from 'react-icons/fa';
import Search from './Search';
import ProfileSidebar from './ProfileSidebar';

function Navbar() {
    return (
        <nav className='bg-white flex items-center justify-between text-black shadow-lg p-4 '>

            {/* Left: Logo + Explore */}
            <div className='flex items-center gap-6'>
                <NavLink to="/" className='' >
                    <p className='text-3xl font-semibold px-6'>SkillKart</p>
                </NavLink>
                <NavLink to="/explore" className='' >
                    Explore
                </NavLink>
            </div>

            {/* Middle: Search (limit width, centered) */}

            <div className='w-full'>
                <Search />
            </div>

            {/* Right: Icons + Profile */}
            <div className='flex items-center gap-6'>
                <NavLink to="/cart" className='flex items-center' >
                    <button className='flex items-center text-xl'><FaShoppingCart className='text-2xl mr-2' />cart</button>
                </NavLink>
                <NavLink to="/orders" className='flex items-center' >
                    <button className='flex items-center text-xl'><FaClipboardList className='text-2xl mr-2' />orders</button>
                </NavLink>
                <NavLink to="/wishlist" className='flex items-center' >
                    <button className='flex items-center text-2xl'><FaHeart className='text-2xl mr-2' /></button>
                </NavLink>
                <NavLink to="/notifications" className='flex items-center' >
                    <button className='flex items-center text-2xl'><FaBell className='text-2xl mr-2' /></button>
                </NavLink>

                <ProfileSidebar />
            </div>
        </nav>
    )
}

export default Navbar

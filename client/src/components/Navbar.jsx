import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaClipboardList, FaBell, FaHeart, FaRegHeart } from 'react-icons/fa';
import Search from './Search';
import ProfileSidebar from './ProfileSidebar';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearch = (query) => {
        const path = location.pathname;

        if (!query) {
            navigate(path);
            return;
        }

        // Navigate with query param on same page or courses page
        if (path === '/' || path === '/courses') {
            navigate(`/courses?q=${encodeURIComponent(query)}`);
        } else {
            navigate(`${path}?q=${encodeURIComponent(query)}`);
        }
    };



    return (
        <nav className='bg-white shadow-lg p-2 sm:p-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>

            {/* Left: Logo + Explore */}
            <div className='flex flex-row  sm:items-center sm:gap-6 w-full sm:w-auto gap-2'>
                <NavLink to="/">
                    <p className='text-xl sm:text-2xl font-semibold px-2 sm:px-6'>SkillKart</p>
                </NavLink>
                <NavLink to="/courses" className='text-sm sm:text-base' >
                    Explore
                </NavLink>
            </div>

            {/* Middle: Search (limit width, centered) */}

            <div className='flex-1 min-w-[150px] sm:min-w-[300px]'>
                <Search onSearch={handleSearch} />
            </div>

            {/* Right: Icons + Profile */}
            <div className='flex justify-between sm:justify-end items-center gap-2 sm:gap-6 w-full sm:w-auto mt-2 sm:mt-0'>
                <NavLink to="/cart" className='flex items-center text-sm sm:text-base'>
                    <FaShoppingCart className='mr-1 sm:mr-2 text-lg sm:text-xl' />cart
                </NavLink>
                <NavLink to="/mycourses" className='flex items-center text-sm sm:text-base'>
                    <FaClipboardList className='mr-1 sm:mr-2 text-lg sm:text-xl' />My courses
                </NavLink>
                <NavLink to="/wishlist" className='hidden sm:flex items-center text-sm sm:text-base'>
                    <FaHeart className='mr-1 sm:mr-2 text-lg sm:text-xl' />
                </NavLink>
                <NavLink to="/notifications" className='flex items-center text-sm sm:text-base'>
                    <FaBell className='mr-1 sm:mr-2 text-lg sm:text-xl' />
                </NavLink>

                <ProfileSidebar />
            </div>
        </nav>
    )
}

export default Navbar

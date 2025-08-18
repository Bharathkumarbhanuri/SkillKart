import React from 'react'
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='min-h-screen bg-white shadow-md rounded-md p-6'>
            <h2 className='text-2xl font-bold text-gray-800 text-center mb-8'>
                Admin Panel
            </h2>
            <nav className='text-center'>
                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        isActive
                            ? 'px-4 py-2 block rounded-md bg-blue-100 text-blue-700 font-medium'
                            : 'px-4 py-2 block rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200'
                    }
                >
                    Dashboard
                </NavLink>

            </nav>
        </div>
    )
}

export default Sidebar

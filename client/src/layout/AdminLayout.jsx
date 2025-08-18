import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/admin/Sidebar'

function AdminLayout() {
    return (
        <div className='min-h-screen flex bg-gray-100'>
            <aside className='w-64 border-r border-gray-300 bg-white'>
                <Sidebar />
            </aside>
            <main className='w-full'>
                {/* className="flex-1 p-6"> */}
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout

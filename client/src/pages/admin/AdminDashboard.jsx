import React from 'react'
import { useNavigate } from "react-router-dom";
import CourseList from './CourseList';

function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className='p-6'>
             <h1 className='text-3xl font-bold text-gray-800 mb-6'>Admin Dashboard</h1>
             <div className='flex justify-end mb-6'>
                <button 
                    onClick={()=> navigate("/admin/createcourse")}
                    className='bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-md shadow'>
                    Add Course
                </button>
             </div>

             {/* courses list */}
             <CourseList/>
        </div>
    )
}

export default Dashboard

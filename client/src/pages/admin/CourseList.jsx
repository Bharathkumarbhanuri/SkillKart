import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';
import API_BASE_URL from '../../config';

function CourseList() {

    const navigate = useNavigate(); 
    const [courses, setCourses] = useState([]);
    const [openMenuId, setOpenMenuId] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/courses`);
                setCourses(res.data);
            } catch (error) {
                console.log("error fetching courses:", error);
            }
        };
        fetchCourses();
    }, []);

    const handleEdit = (courseId) => {
        navigate(`/admin/createcourse/${courseId}`);
    };

    const handleDelete = async (courseId) => {
        try {
            const res = await axios.delete(`${API_BASE_URL}/api/courses/${courseId}`);
            setCourses((prev) => prev.filter((course) => course.id !== courseId))
            console.log(res.status);
        } catch (error) {
            console.log('error deleting course:', error);
        }
    };

    const toggleMenu = (id) => {
        setOpenMenuId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className='p-6'>
            <h3 className='text-3xl font-semibold text-gray-800 mb-6'>All Courses</h3>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
                    <thead className="bg-gray-100 text-gray-700 text-left">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className='border-b hover:bg-gray-50 transition duration-200 '>
                                <td className="px-6 py-4">{course.title}</td>
                                <td className="px-6 py-4">₹{course.price}</td>
                                <td className="px-6 py-4 relative">
                                    {/* three dot button */}
                                    <button
                                        onClick={() => toggleMenu(course.id)}
                                        className='text-gray-800 hover:text-black text-xl px-2 focus:outline-none'
                                    >
                                        ⋮
                                    </button>
                                    {/* dropdown menu for delete edit */}
                                    {openMenuId === course.id && (
                                        <div className='absolute right-12 bottom-6 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-10'>
                                            <button
                                                onClick={() => handleEdit(course.id)}
                                                className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className='w-full text-left px-4 py-2 text-sm hover:bg-red-100 text-red-600'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {courses.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center text-gray-500 py-6">
                                    No courses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CourseList

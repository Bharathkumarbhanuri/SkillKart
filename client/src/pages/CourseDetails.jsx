import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5003/api/courses/${id}`);
                setCourse(res.data);
            } catch (error) {
                console.error("Error fetching course:", error);
                alert("Failed to load course data");
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetails();
    }, [id]);

    const requireLogin = (action) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to continue");
            navigate("/login");
            return false;   
        }
        // If logged in, perform the action
        action();
    };

    const handleEnroll = () => {
        requireLogin(() => {
            console.log("Enroll API call for course ID:", id);
        });
    };

    const handleAddToCart = () => {
        requireLogin(() => {
            console.log("Add to cart API call for course ID:", id);
        });
    };

     const handleAddToWishlist = () => {
        requireLogin(() => {
            console.log("Add to wishlist API call for course ID:", id);
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <p className="text-red-500 font-semibold text-lg">Course not found!</p>
            </div>
        );
    }

    return (
        <div className='min-h-screen p-6 bg-gray-50'>
            <div className='max-w-6xl mx-auto md:flex bg-white rounded-lg shadow-lg overflow-hidden p-4'>
                {/* Course Image */}
                <div className='md:w-1/2'>
                    <img
                        src={course.image_url}
                        alt={course.title}
                        className='w-full h-full object-cover'
                    />
                </div>
                {/* Course Details */}
                <div className='md:w-1/2 p-6 flex flex-col justify-between'>
                    <div>
                        <h1 className='text-3xl font-semibold mb-2' >{course.title}</h1>
                        <p className='mb-4'>By <span className="font-medium">{course.instructor}</span></p>
                        <p className="text-2xl font-bold text-blue-600 mb-4">₹{course.price}</p>
                        <p className="text-gray-700 leading-relaxed mb-6">{course.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleEnroll}
                            className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition'
                        >
                            Enroll Now
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className='border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg font-medium transition'
                        >
                            add to cart
                        </button>
                        <button
                            onClick={handleAddToWishlist}
                            className='bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-medium transition'
                        >
                            add to wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails;

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [inCart, setInCart] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
                setCourse(res.data);


                const token = localStorage.getItem("token");
                if (token) {
                    const [cartRes, wishRes, enrollRes] = await Promise.all([
                        axios.get(`${API_BASE_URL}/api/cart/getcart`, { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get(`${API_BASE_URL}/api/wishlist/getwishlist`, { headers: { Authorization: `Bearer ${token}` } }),
                        axios.post(`${API_BASE_URL}/api/enroll/check`, { course_id: id }, { headers: { Authorization: `Bearer ${token}` } })
                    ]);

                    setInCart(cartRes.data.some(c => String(c.id) === String(id)));
                    setInWishlist(wishRes.data.some(c => String(c.id) === String(id)));
                    setEnrolled(enrollRes.data.enrolled === true);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                alert("Failed to load course data");
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetails();
    }, [id]);

    const requireLogin = async (action) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setShowLoginModal(true);
            return false;
        }
        try {
            await action(token);
        } catch (error) {
            // If backend returns 401, token is expired or invalid
            if (error.response?.status === 401) {
                setShowLoginModal(true);
            } else {
                console.error(error);
                alert(error.response?.data?.message || "Something went wrong. Please try again.");
            }
        }

    };

    const handleEnroll = () => {
        requireLogin(async (token) => {
            if (!enrolled) {
                navigate("/paymentpage", {
                    state: { courseIds: [id] }, // always pass array
                });
            }
        });
    };

    const handleAddToCart = () => {
        requireLogin(async (token) => {
            await axios.post(`${API_BASE_URL}/api/cart/add`,
                { course_id: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInCart(true);
            alert("Added to cart!");
        });
    };

    const handleAddToWishlist = () => {
        requireLogin(async (token) => {
            await axios.post(`${API_BASE_URL}/api/wishlist/add`,
                { course_id: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setInWishlist(true);
            alert("Added to wishlist!");
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
                        {enrolled ? (
                            <span className="bg-gray-400 text-white py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                                Enrolled
                            </span>
                        ) : (
                            <button
                                onClick={handleEnroll}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
                            >
                                Enroll Now
                            </button>
                        )}
                        {!enrolled && (
                            <button
                                onClick={handleAddToCart}
                                disabled={inCart}
                                className={`${inCart ? 'bg-gray-200 cursor-not-allowed' : 'border border-gray-300 hover:bg-gray-100'} py-2 px-4 rounded-lg font-medium transition`}
                            >
                                {inCart ? "In Cart" : "Add to Cart"}
                            </button>
                        )}

                        {!enrolled && (
                            <button
                                onClick={handleAddToWishlist}
                                disabled={inWishlist}
                            className={`${inWishlist ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'} text-white py-2 px-4 rounded-lg font-medium transition`}
                            >
                            {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                            </button>
                        )}

                        {enrolled && (
                            <button
                                onClick={() => navigate(`/learningpage/${id}`)}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition"
                            >
                                View Course
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {showLoginModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
                    <div className='bg-white p-8 rounded-lg text-center'>
                        <h2 className="text-xl font-semibold mb-2">Session Expired/Required</h2>
                        <p className="mb-4">You need to log in to continue.</p>
                        <div className="flex justify-between gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="bg-gray-300 py-2 px-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => navigate("/login", { state: { from: location.pathname + location.search } })}
                                className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CourseDetails;

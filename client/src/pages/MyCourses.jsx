import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';


function MyCourses() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase();

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);


    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setShowLoginModal(true);
                    setLoading(false);
                    return;
                }
                const res = await axios.get('http://localhost:5003/api/enroll/enrolledcourses',
                    { headers: { Authorization: `Bearer ${token}` } });
                console.log("Enrolled courses API:", res.data);
                setCourses(res.data)
            } catch (error) {
                console.error('Failed to fetch your courses:', error)
            } finally {
                setLoading(false)
            }
        };
        fetchEnrolledCourses();
    }, [])

    const filteredCourses = query
    ? courses.filter((c) => c.title.toLowerCase().includes(query))
    : courses;


    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }
    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">My Courses</h1>

            {/* Empty State */}
            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg mb-4">
                        {query ? "No courses found for your search." : "You are not enrolled in any courses yet."}
                    </p>
                    <button
                        onClick={() => navigate("/courses")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Courses
                    </button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
                            onClick={() => navigate(`/learningpage/${course.id}`)}
                        >
                            <img
                                src={course.image_url}
                                alt={course.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{course.title}</h2>
                                <p className="text-sm text-gray-500 mb-2">
                                    By {course.instructor}
                                </p>
                                {/* Always show as Purchased */}
                                <p className="font-bold text-green-600">Purchased</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                    <div className="bg-white p-8 rounded-lg text-center">
                        <h2 className="text-xl font-semibold mb-2">Session Expired / Required</h2>
                        <p className="mb-4">You need to log in to continue.</p>
                        <div className="flex justify-between gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="bg-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                            >
                                Back to Home
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
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

export default MyCourses


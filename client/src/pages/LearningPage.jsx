import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function LearningPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setShowLoginModal(true);
                    return;
                }
                const enrollRes = await axios.post(
                    "http://localhost:5003/api/enroll/check",
                    { course_id: id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (!enrollRes.data.enrolled) {
                    setEnrolled(false);
                    return;
                }
                setEnrolled(true);

                const res = await axios.get(`http://localhost:5003/api/courses/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const courseData = {
                    ...res.data,
                    videos: Array.isArray(res.data.videos)
                        ? res.data.videos
                        : res.data.videos
                            ? JSON.parse(res.data.videos)
                            : [],
                };
                setCourse(courseData);
            } catch (error) {
                console.error("Failed to fetch course:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourses();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    if (showLoginModal) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                <div className="bg-white p-8 rounded-lg text-center">
                    <h2 className="text-xl font-semibold mb-2">Login Required</h2>
                    <p className="mb-4">You need to log in to view this course.</p>
                    <div className="flex justify-center gap-4">
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
        );
    }

    if (!enrolled) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    You are not enrolled in this course
                </h2>
                <p className="text-gray-700 mb-6">
                    Please enroll in the course to access the learning materials.
                </p>
                <button
                    onClick={() => navigate(`/coursedetails/${id}`)}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
                >
                    Go to Course Details
                </button>
            </div>
        );
    }

    if (!course) return <p className="text-center mt-10">Course not found</p>;

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="mb-6">{course.description}</p>
            <div className="flex flex-col items-start space-y-6">
                {course.videos.map((link, index) => (
                    <div key={index} className="w-4/6">
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={link}
                                title={`Video ${index + 1}`}
                                allowFullScreen
                                className="w-full h-[350px] rounded-lg shadow-md"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearningPage

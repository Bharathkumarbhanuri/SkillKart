import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import API_BASE_URL from '../config';


function Wishlist() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase();


    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Please login to view your wishlist");
                    return;
                }

                // 1. Fetch wishlist
                const res = await axios.get(`${API_BASE_URL}/api/wishlist/getwishlist`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // 2. Fetch all enrolled courses for the user
                const enrolledRes = await axios.get(`${API_BASE_URL}/api/enroll/enrolledcourses`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const enrolledIds = enrolledRes.data.map(c => c.id);
                setEnrolledCourses(enrolledIds);

                // 3. Mark courses in wishlist as enrolled
                const updatedWishlist = res.data.map(course => ({
                    ...course,
                    enrolled: enrolledIds.includes(course.id)
                }));

                setWishlist(updatedWishlist);
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [])

    const filteredWishlist = query
        ? wishlist.filter(course => course.title.toLowerCase().includes(query))
        : wishlist;

    const handleRemoveFromList = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view your cart");
                return;
            }
            const res = await axios.delete(`${API_BASE_URL}/api/wishlist/delete`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { course_id: id }
                });
            setWishlist(prev => prev.filter(course => course.id !== id));
            alert("removed from wishlist!");
        } catch (error) {
            console.error('Failed to delete course:', error)
        }
    }

    const handleMoveToCart = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view your cart");
                return;
            }

            // Prevent moving enrolled courses to cart
            if (enrolledCourses.includes(id)) return;

            await axios.post(`${API_BASE_URL}/api/wishlist/movetocart`,
                { course_id: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setWishlist((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error('Failed to add course to wishlist:', error)
        }
    }

    if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

    if (filteredWishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                    alt="Empty Wishlist"
                    className="w-40 mb-6 opacity-70"
                />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    {query ? "No results found" : "Your wishlist is empty"}
                </h2>
                {!query &&<p className="text-gray-500">Add courses to see them here later.</p>}
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWishlist.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                    >
                        <img
                            src={course.image}
                            alt={course.title}
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                                <h2 className="text-lg font-semibold break-words mb-2">
                                    {course.title}
                                </h2>
                                <p className="text-blue-600 font-bold text-xl">
                                    ₹{course.price}
                                </p>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => handleMoveToCart(course.id)}
                                    disabled={course.enrolled}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                                >
                                    {course.enrolled ? "Enrolled" : "Move to Cart"}
                                </button>
                                <button
                                    onClick={() => handleRemoveFromList(course.id)}
                                    className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist

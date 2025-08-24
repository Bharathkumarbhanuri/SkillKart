import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Please login to view your wishlist");
                    return;
                }
                const res = await axios.get('http://localhost:5003/api/wishlist/getwishlist', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setWishlist(res.data);
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [])

    const handleRemoveFromList = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view your cart");
                return;
            }
            const res = await axios.delete('http://localhost:5003/api/wishlist/delete',
                { headers: { Authorization: `Bearer ${token}` } ,
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
            const res = await axios.post('http://localhost:5003/api/wishlist/movetocart',
                { course_id: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setWishlist((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error('Failed to add course to wishlist:', error)
        }
    }

    if (wishlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                    alt="Empty Wishlist"
                    className="w-40 mb-6 opacity-70"
                />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Your wishlist is empty
                </h2>
                <p className="text-gray-500">Add courses to see them here later.</p>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((course, index) => (
                    <div
                        key={index}
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
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                                >
                                    Move to Cart
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

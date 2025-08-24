import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { data } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Please login to view your cart");
                    return;
                }
                const res = await axios.get('http://localhost:5003/api/cart/getcart',
                    { headers: { Authorization: `Bearer ${token}` } });
                setCart(res.data)
            } catch (error) {
                console.error('Failed to fetch cart:', error)
            } finally {
                setLoading(false)
            }
        };
        fetchCart();
    }, [])


    const handleRemoveFromCart = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view your cart");
                return;
            }
            const res = await axios.delete('http://localhost:5003/api/cart/delete',
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { course_id: id }
                });
            setCart(prev => prev.filter(course => course.id !== id));
            alert("removed from cart!");
        } catch (error) {
            console.error('Failed to delete course:', error)
        }
    }

    const handleMoveToWishlist = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view your cart");
                return;
            }
            const res = await axios.post('http://localhost:5003/api/cart/movetowishlist',
                { course_id: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCart((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error('Failed to add course to wishlist:', error)
        }
    }

    // Calculate total and discounted price safely
    const totalPrice = cart.reduce((sum, course) => sum + Number(course.price), 0);
    const discount = totalPrice * 0.05;
    const finalPrice = totalPrice - discount;



    return (
        <div className='min-h-screen bg-gray-100'>
            {loading ? (
                <p className="text-center mt-10 text-lg">Loading... please wait</p>
            ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-screen text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
                        alt="Empty Cart"
                        className="w-40 mb-6 opacity-70"
                    />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500">Add courses to see them here later.</p>
                </div>
            ) : (
                <div className='p-8'>
                    <h1 className='text-4xl font-bold ml-6 mb-6'>Shopping Cart</h1>

                    <div className='flex justify-center gap-28'>

                        {/* cart items */}
                        <div className='flex flex-col gap-6'>
                            {cart.map((course, index) => (
                                <div key={index} className='flex items-center justify-between max-w-4xl bg-sky-200 p-4 rounded-lg shadow-md'>
                                    <div className='flex items-center gap-8'>
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className='h-24 w-32 object-cover rounded-md flex-shrink-0'
                                        />
                                        <div className='flex-1 min-w-0'>
                                            <h1 className='text-2xl font-semibold '>{course.title}</h1>
                                            <p className='text-lg mt-1'>${course.price}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 ml-8 flex-shrink-0'>
                                        <button
                                            className='bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 font-semibold transition'
                                            onClick={() => handleRemoveFromCart(course.id)}
                                        >
                                            Remove from cart
                                        </button>
                                        <button
                                            className='bg-blue-400 hover:bg-blue-500 text-white rounded-md px-4 py-2 font-semibold transition'
                                            onClick={() => handleMoveToWishlist(course.id)}
                                        >
                                            Move to wishlist
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>


                        {/* Summary Panel */}
                        <div className='w-96 h-fit bg-white p-6 rounded-lg shadow-md flex flex-col gap-4 sticky top-24 self-start'>
                            <h2 className='text-2xl font-bold mb-4'>Order Summary</h2>
                            <div className='flex justify-between text-lg'>
                                <span>Total Price:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-lg'>
                                <span>Discount (5%):</span>
                                <span>-${discount.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between text-xl font-semibold border-t pt-2 mt-2'>
                                <span>Final Price:</span>
                                <span>${finalPrice.toFixed(2)}</span>
                            </div>
                            <button className='mt-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md px-4 py-3 font-semibold transition'>
                                Enroll Now
                            </button>
                        </div>

                    </div>


                </div>
            )}
        </div>
    )
}

export default Cart

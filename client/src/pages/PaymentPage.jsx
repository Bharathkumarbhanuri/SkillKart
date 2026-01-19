import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../config';


function PaymentPage() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const courseIds = state?.courseIds || [];
    const IS_DUMMY = import.meta.env.VITE_PAYMENT_MODE === "DUMMY";

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (courseIds.length === 0) {
            navigate("/cart"); // fallback
            return;
        }

        const fetchCourses = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/courses/bulk?ids=${courseIds.join(",")}`
                );
                const data = Array.isArray(res.data) ? res.data : [res.data];
                setCourses(data);
            } catch (err) {
                console.error("Error fetching courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, [courseIds, navigate]);


    const handleConfirmPayment = async () => {
        try {
            const token = localStorage.getItem("token");

            // 1. Create order
            const res = await axios.post(`${API_BASE_URL}/api/payment/create-order`,
                { courses: courseIds },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { order, dummy } = res.data;

            // ✅ Dummy mode: skip Razorpay popup and directly verify + enroll
            if (IS_DUMMY || dummy === true) {
                await axios.post(
                    `${API_BASE_URL}/api/payment/verify`,
                    {
                        dummy: true,
                        razorpay_order_id: order?.id || `dummy_order_${Date.now()}`,
                        razorpay_payment_id: `dummy_payment_${Date.now()}`,
                        courses: courseIds,
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                alert("Enrolled successfully (Dummy Payment).");
                navigate("/mycourses");
                return;
            }

            // 2. real Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from env
                amount: order.amount,
                currency: order.currency,
                name: "SkillKart",
                description: "Course Payment",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        // 3. Verify payment
                        await axios.post(
                            `${API_BASE_URL}/api/payment/verify`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                courses: courseIds
                            },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        alert("Payment successful! You are enrolled.");
                        navigate("/mycourses");
                    } catch (err) {
                        console.error("Verification failed", err);
                        alert("Payment verification failed..");
                    }
                },
                prefill: {
                    email: "bharathkumarbhanuri@gmail.com", // optional
                    contact: "7989221589",
                },
                theme: {
                    color: "#7C3AED",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment failed", err);
            alert("Something went wrong during payment.");
        }
    };

    if (loading) return <p>Loading payment details...</p>;

    const total = courses.reduce((sum, c) => sum + Number(c.price || 0), 0);

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">Payment</h1>
            {courses.map((c) => (
                <div
                    key={c.id}
                    className="flex justify-between border-b py-2 text-lg"
                >
                    <span>{c.title}</span>
                    <span>₹{c.price}</span>
                </div>
            ))}
            <div className="flex justify-between font-bold text-xl mt-4">
                <span>Total</span>
                <span>₹{total}</span>
            </div>
            <button
                onClick={handleConfirmPayment}
                className="bg-purple-600 text-white w-full py-2 mt-6 rounded-lg"
            >
                {IS_DUMMY ? "Enroll Now" : "Pay & Enroll"}
            </button>
        </div>
    );
}

export default PaymentPage

import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await axios.post('http://localhost:5003/api/users/signup', form);
            alert('user created successfulyy!!')
            navigate("/login")
        } catch (error) {
            console.error("Signup error:", error);
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        }
    }

    return (
        <div className='min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100'>
            <div className='bg-white px-8 py-4 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-3xl font-bold mb-2 text-center text-gray-800'>Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">
                            Password
                            <span className="text-xs text-gray-500">
                                {" "}(Password must be at least 8 characters)
                            </span>
                        </label>
                        <p className="text-sm text-gray-500 mb-2"></p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="w-full px-4 py-1 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-500 hover:underline">
                            Login
                        </NavLink>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Signup

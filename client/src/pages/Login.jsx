import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from '../config';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({email: "", password: ""});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async(e) => {  
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/users/login`, form);
            localStorage.setItem("token", res.data.token);
            
            alert('login successfull!!')
            const redirectPath = location.state?.from || "/";
            navigate(redirectPath, { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        }
    }

    return (
        <div className='min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Login to your Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={8} 
                            className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-4">
                        Don’t have an account?{" "}
                        <NavLink to="/signup" className="text-blue-500 hover:underline">
                            Create one
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;

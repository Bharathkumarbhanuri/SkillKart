import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CourseCard = ({ id, title, description, price, image }) => {
    const navigate = useNavigate();
    return (
        <div className='border p-4 rounded-sm shadow hover:shadow-md transition duration-300'>
            {/* w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 border */}
            <img
                src={image}
                alt={title}
                className='w-full h-40 object-cover'
            />
            <div className='p-4'>
                <h3 className='text-xl font-semibold text-gray-800'>{title}</h3>
                <p className='text-sm text-gray-600 line-clamp-2 mt-2'>{description}</p>
                {price && (
                    <p className='text-md font-bold text-green-600 mt-3'>₹{price}</p>
                )}
                <button
                    onClick={() => navigate(`/coursedetails/${id}`)}
                    className='mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition'
                >
                    View Details
                </button>
            </div>
        </div>
    )
}

export default CourseCard;

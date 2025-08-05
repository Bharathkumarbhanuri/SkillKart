import React from 'react'
import { NavLink } from 'react-router-dom';

function HeroSection() {
    return (
        <div className='bg-blue-600 text-white py-20 px-6 md:px-16'>
            <div className='max-w-6xl flex flex-col md:flex-row items-center gap-20'>
                {/* left side content */}
                <div className='text-center md:text-left max-w-xl'>
                    <h1 className='text-4xl md:text-5xl font-bold leading-tight mb-6'>
                        Unlock Your Potential with <span className="text-yellow-300">SkillKart</span>
                    </h1>
                    <p className='text-lg md:text-xl text-blue-100 mb-8'>
                        Learn from industry experts. Get certified. Boost your career — one course at a time.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start'>
                        <a href="#courses">
                            <button className='bg-white text-blue-600 font-semibold rounded-md py-3 px-4 shadow hover:bg-blue-100 transition'>
                                Browse Courses
                            </button>
                        </a>
                        <NavLink to="/signup">
                            <button className="border border-white text-white font-semibold px-4 py-3 rounded-md hover:bg-blue-500 transition">
                                Join Now
                            </button>
                        </NavLink>
                    </div>
                </div>
                {/* right side image */}
                <div className='mt-10 md:mt-0 md:w-1/2 hidden md:block'>
                    <img
                        src="/educational-video.svg"
                        alt="Learning Illustration"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSection

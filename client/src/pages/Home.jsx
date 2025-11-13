import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection'
import CourseCard from '../components/CourseCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses`);
                const res = await axios.get(`${API_BASE_URL}/api/courses`);
                const sortedCourses = res.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setCourses(sortedCourses.slice(0, 6));
            } catch (error) {
                console.error('Failed to fetch courses:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg">Loading courses...</p>;
    
    return (
        <div>
            <HeroSection />
            <div id="courses" className='my-10 px-6'>
                <h2 className='text-3xl font-bold mb-4 text-center'>Featured Courses</h2>

                {/* course cards */}

                {loading ? (
                    <p className="text-center">Loading......wait</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        {courses.map((course) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                price={course.price}
                                image={course.image_url}
                            />
                        ))}
                    </div>
                )}
                <div className='text-center mt-6'>
                    <a
                        href='/courses'
                        className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                    >
                        Explore More Courses
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;

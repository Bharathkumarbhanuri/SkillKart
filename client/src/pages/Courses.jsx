import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';

function Courses() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        if (query) {
          const res = await axios.get(`${API_BASE_URL}/api/search?context=courses&q=${query}`);
          setCourses(res.data.results || []);
        } else {
          const res = await axios.get(`${API_BASE_URL}/api/courses`);
        setCourses(res.data || []);
        }
      } catch (error) { 
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold mb-8 text-center">All Courses</h1>

      {loading ? (
        <p className="text-center">Loading......wait</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-600">No courses available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}

export default Courses;

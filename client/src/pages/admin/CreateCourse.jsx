import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config';

function CreateCourse() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        instructor: '',
        image_url: '',
        videos: [],
    });

    const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
            const fetchCourseDetails = async () => {
                try {
                    const res = await axios.get(`${API_BASE_URL}/api/courses/${id}`);
                    const course = res.data;

                    setForm({
                        title: course.title || '',
                        description: course.description || '',
                        price: course.price || '',
                        instructor: course.instructor || '',
                        image_url: course.image_url || '',
                        videos: Array.isArray(course.videos)
                            ? course.videos
                            : course.videos
                                ? [course.videos]
                                : [],
                    });
                } catch (error) {
                    console.error("Error fetching course:", error);
                    alert("Failed to load course data");
                }
            };
            fetchCourseDetails();
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`${API_BASE_URL}/api/courses/${id}`, form);
                alert('course updated successfulyy!!')

            } else {
                await axios.post(`${API_BASE_URL}/api/courses`, form);
                alert('course created successfulyy!!')
            }
            navigate("/admin");
        } catch (error) {
            console.error('error creating course:', error);
            alert('something went wrong');
        }
    };

    const handlecancel = () => {
        navigate("/admin")
    }

    const handleVideoChange = (index, value) => {
        const newVideos = [...form.videos];
        newVideos[index] = value;
        setForm((prevForm) => ({
            ...prevForm,
            videos: newVideos,
        }));
    };

    const addVideoField = () => {
        setForm((prevForm) => ({
            ...prevForm,
            videos: [...prevForm.videos, ""],
        }));
    };

    const removeVideoField = (index) => {
        const newVideos = form.videos.filter((_, i) => i !== index);
        setForm((prevForm) => ({
            ...prevForm,
            videos: newVideos,
        }));
    };


    return (
        <div className="min-h-screen bg-white p-8">
            <button
                onClick={handlecancel}
                className='text-gray-600 hover:text-red-500 text-xl font-bold absolute right-10'
            >
                X
            </button>
            <h1 className='text-2xl font-semibold mb-4 text-center text-gray-800'>{isEdit ? 'Edit Course' : 'Create New Course'}</h1>
            <form onSubmit={handleSubmit} className='space-y-5'>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Course Title"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Course Description"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Price (e.g., 49.99)"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="0.01"
                    required
                />
                <input
                    type="text"
                    name="instructor"
                    value={form.instructor}
                    onChange={handleChange}
                    placeholder="Instructor Name"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="url"
                    name="image_url"
                    value={form.image_url}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                {/* ✅ Videos Section */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Course Videos (YouTube links)</h2>
                    {form.videos.map((video, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="url"
                                value={video}
                                onChange={(e) => handleVideoChange(index, e.target.value)}
                                placeholder="Enter YouTube link"
                                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeVideoField(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addVideoField}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        + Add Video
                    </button>
                </div>

                {/* cancel submit Buttons */}
                <div className='flex justify-end gap-4'>
                    <button
                        type="button"
                        onClick={handlecancel}
                        className='bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition'
                    >
                        cancel
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md transition"
                    >
                        {isEdit ? 'Update Course' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateCourse;

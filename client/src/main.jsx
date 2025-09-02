import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import './styles/index.css';

import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';

import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCourse from './pages/admin/CreateCourse';

import Home from './pages/Home';
import CourseDetails from './pages/CourseDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import PaymentPage from './pages/PaymentPage';
import MyCourses from './pages/MyCourses';
import LearningPage from './pages/LearningPage';
import Courses from './pages/Courses';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path='coursedetails/:id' element={<CourseDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='courses' element={<Courses />} />
        <Route path='learningpage/:id' element={<LearningPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='profile' element={<Profile />} />
        <Route path='mycourses' element={<MyCourses />} />
        <Route path='wishlist' element={<Wishlist />} />
        <Route path='paymentpage' element={<PaymentPage />} />
      </Route>

      {/* admin section routes */}
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path='createcourse' element={<CreateCourse />} />
        <Route path="createcourse/:id" element={<CreateCourse />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

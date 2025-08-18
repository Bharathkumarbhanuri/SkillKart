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
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Orders from './pages/Orders';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path='coursedetails/:id' element={<CourseDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='profile' element={<Profile />} />
        <Route path='orders' element={<Orders />} />
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

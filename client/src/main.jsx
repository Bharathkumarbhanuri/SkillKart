import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import './styles/index.css';

import MainLayout from './layout/MainLayout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout/>} >
      <Route index element={<Home/>} />
      <Route path='productdetails' element={<ProductDetails/>} />
      <Route path='cart' element={<Cart/>} />
      <Route path='checkout' element={<Checkout/>} />
      <Route path='login' element={<Login/>} />
      <Route path='signup' element={<Signup/>} />
      <Route path='profile' element={<Profile/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

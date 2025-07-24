import React from 'react'
import {NavLink} from 'react-router-dom';

function Navbar() {
    return (
        <nav className='bg-white text-black font-semibold shadow-lg p-4'>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="/" >Home</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="productdetails" >Product Details</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="cart" >Cart</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="checkout" >Checkout</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="login" >Login</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="signup" >Signup</NavLink>
            <NavLink className={({isActive})=>isActive ? "text-blue-600 px-8": "px-8"} to="profile" >Profile</NavLink>
        </nav>
    )
}

export default Navbar

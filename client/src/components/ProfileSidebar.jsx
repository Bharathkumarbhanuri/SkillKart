import React, { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

export default function ProfileSidebar() {
  const [isOpen, setIsOpen] = useState(false); // controls sidebar visibility
  const sidebarRef = useRef(); // tracks the sidebar DOM node

  // Detects click outside and closes the sidebar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-2xl text-gray-800"
      >
        <FaUser />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-500 ${isOpen ? "bg-opacity-40" : "bg-opacity-0 pointer-events-none"
          }`}
      ></div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-72 max-w-[80%] bg-white shadow-2xl z-50 border-l border-gray-200
        transform transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Account</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-2xl text-gray-500 hover:text-black transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <ul className="mt-4">
          {[{ to: "/", label: "Home" },
          { to: "profile", label: "Profile" },
          { to: "cart", label: "Cart" },
          { to: "checkout", label: "Checkout" },
          { to: "login", label: "Login" },
          { to: "signup", label: "Signup" },
          ].map(({ to, label }) => (
            <li
              key={to}
              onClick={() => setIsOpen(false)}
            >
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `block px-6 py-4 text-gray-700 border-b transition-all duration-300 hover:bg-gray-100 hover:pl-8 ${isActive ? "text-blue-600 font-medium" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

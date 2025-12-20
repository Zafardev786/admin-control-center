import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaHospital,
  FaVials,
  FaAmbulance,
  FaPills,
  FaUserPlus,
  FaUserCircle,
  FaChevronDown,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import HomePage from "./HomePage";
// import HomePage from "./HomePage";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { path: "/navbar-home", icon: <FaHome />, label: "Home" },
    { path: "/doctor-booking", icon: <FaUserMd />, label: "Doctor" },
    { path: "/hospital-booking", icon: <FaHospital />, label: "Hospital" },
    { path: "/tests", icon: <FaVials />, label: "Tests@Home" },
    { path: "/ambulance-booking", icon: <FaAmbulance />, label: "Ambulance" },
    { path: "/medicine", icon: <FaPills />, label: "Medicine" },
    { path: "/register", icon: <FaUserPlus />, label: "Register" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <h1 className="text-2xl mr-7.5 font-bold tracking-wide whitespace-nowrap">
            Ursag Medicine Store
          </h1>

          {/* Navigation Menu */}
          <ul className="flex items-center gap-5 text-sm font-medium whitespace-nowrap">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white hover:text-indigo-700 transition-all duration-300"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Profile Dropdown */}
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white hover:text-indigo-700 transition-all duration-300"
              >
                <FaUserCircle className="text-lg" />
                My Account
                <FaChevronDown
                  className={`text-xs transform transition-transform ${dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg overflow-hidden z-50">
                  <Link
                    to="/my-profile"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaUserCircle /> My Profile
                  </Link>
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-indigo-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FaHistory /> My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-indigo-100"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* <HomePage /> */}
    </>
  );
};

export default Navbar;

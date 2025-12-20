import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaHospital,
  FaVials,
  FaAmbulance,
  FaPills,
  FaUsers,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaChartBar,
  FaBoxes,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "dashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
    { path: "doctor", icon: <FaUserMd />, label: "Doctor" },
    { path: "hospital", icon: <FaHospital />, label: "Hospital" },
    { path: "tests", icon: <FaVials />, label: "Tests@Home" },
    { path: "ambulance", icon: <FaAmbulance />, label: "Ambulance" },
    { path: "medicine", icon: <FaPills />, label: "Medicine" },
    { path: "patients", icon: <FaUsers />, label: "Patients" },
    { path: "appointments", icon: <FaCalendarAlt />, label: "Appointments" },
    { path: "billing", icon: <FaFileInvoiceDollar />, label: "Billing" },
    { path: "reports", icon: <FaChartBar />, label: "Reports" },
    { path: "inventory", icon: <FaBoxes />, label: "Inventory" },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={24} />
        </button>
        <span className="ml-4 font-semibold text-lg">HI Ursag</span>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 flex flex-col shadow-2xl z-50
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300
        md:translate-x-0 md:static md:flex`}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={24} />
          </button>-5

        </div>

        {/* Profile Section (Horizontal with text below) */}

        <div className="flex flex-col p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <img
              src="https://media-exp1.licdn.com/dms/image/C4D0BAQH5gW6N0ID7yA/company-logo_200_200/0?e=2159024400&v=beta&t=hTSbHwnXycFmKk4BtRG-BKsMS11Tqfy1tnXOyZ7YqpY"
              alt="profile"
              className="w-14 h-14 rounded-full border-2 border-purple-500 shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-white text-lg">HI Ursag</span>
              <span className="text-sm text-gray-400">Administrator</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 mt-4">
            {menuItems.map((item, index) => {
              const active = location.pathname.includes(item.path);
              return (
                <li key={index}>
                  <Link
                    to={`/${item.path}`}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-6 py-3 transition-all duration-300 
                      ${active
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg rounded-lg"
                        : "hover:bg-gray-700 hover:text-white rounded-lg"
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-700">
          <button
            // onClick={() => console.log("Logout clicked")}
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition duration-300"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

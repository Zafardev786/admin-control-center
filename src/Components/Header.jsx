import React from "react";
import { FaMoon, FaBell, FaCommentDots, FaClock } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <img
          src="https://tse4.mm.bing.net/th/id/OIP.mki6JUTwrGo5AldrftXfAgHaCp?rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Logo"
          className="h-10"
        />
        <h1 className="text-xl font-bold">Ursag Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none"
        />
        <div className="flex items-center gap-3 text-gray-600">
          <FaMoon className="cursor-pointer" />
          <FaBell className="cursor-pointer" />
          <FaCommentDots className="cursor-pointer" />
          <FaClock className="cursor-pointer" />
        </div>
        <img
          src="https://media-exp1.licdn.com/dms/image/C4D0BAQH5gW6N0ID7yA/company-logo_200_200/0?e=2159024400&v=beta&t=hTSbHwnXycFmKk4BtRG-BKsMS11Tqfy1tnXOyZ7YqpY"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;

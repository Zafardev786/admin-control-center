import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className=" p-6 bg-gray-100 min-h-screen w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

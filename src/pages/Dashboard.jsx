import React, { useEffect, useState } from "react";
import {
  FaHospital,
  FaUserMd,
  FaAmbulance,
  FaFlask,
  FaPills,
  FaBell,
} from "react-icons/fa";

import Header from "../Components/Header";
import ActivityCard from "../Components/ActivityCard";
import PatientBookingsChart from "../Charts/PatientBookingsChart";
import HospitalDoctorChart from "../Charts/HospitalDoctorChart";
import MedicineCategoriesChart from "../Charts/MedicineCategoriesChart";
import DashbordDoctorList from "../Components/Lists/DashbordDoctorList";
import DashbordHospitalList from "../Components/Lists/DashbordHospitalList";

const Dashboard = () => {
  // 🔹 Local state for counts
  const [counts, setCounts] = useState({
    hospitals: 0,
    doctors: 0,
    ambulances: 0,
  });

  // 🔹 Fetch data from API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch("http://54.167.190.182:8099/retail/admin/allRecord");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();

        // Assuming API returns like:
        // { hospitalCount: 10, doctorCount: 25, ambulanceCount: 12 }
        setCounts({
          hospitals: data.hospitalCount || 0,
          doctors: data.doctorCount || 0,
          ambulances: data.ambulanceCount || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchCounts();
  }, []);

  // Dummy Chart Data
  const patientBookings = [
    { month: "Jan", bookings: 40 },
    { month: "Feb", bookings: 60 },
    { month: "Mar", bookings: 80 },
    { month: "Apr", bookings: 30 },
    { month: "May", bookings: 100 },
  ];

  const hospitalDoctorCounts = [
    { name: "Hospitals", count: counts.hospitals },
    { name: "Doctors", count: counts.doctors },
  ];

  const medicineCategories = [
    { name: "Painkillers", value: 400 },
    { name: "Antibiotics", value: 300 },
    { name: "Vitamins", value: 200 },
    { name: "Other", value: 100 },
  ];

  // Activity Cards Data (dynamic for first three)
  const activityCards = [
    {
      title: "Hospitals",
      value: counts.hospitals,
      color: "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: FaHospital,
    },
    {
      title: "Doctors",
      value: counts.doctors,
      color: "bg-gradient-to-r from-green-500 to-green-700",
      icon: FaUserMd,
    },
    {
      title: "Ambulances",
      value: counts.ambulances,
      color: "bg-gradient-to-r from-pink-500 to-pink-700",
      icon: FaAmbulance,
    },
    {
      title: "Lab Tests",
      value: 2100,
      color: "bg-gradient-to-r from-purple-500 to-purple-700",
      icon: FaFlask,
    },
    {
      title: "Medicines Sold",
      value: 700,
      color: "bg-gradient-to-r from-red-500 to-red-700",
      icon: FaPills,
    },
    {
      title: "Notifications",
      value: 15,
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      icon: FaBell,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 🔹 Right Content */}
      <div className="flex- ml-13 flex flex-col">
        {/* Header Fixed */}
        <div className="fixed top-2 left-58 right-2 z-10 bg-gray-100 shadow">
          <Header />
        </div>

        {/* Scrollable Content */}
        <main className="p-6 mt-20 overflow-y-auto flex-1">
          {/* Activity Section */}
          <h2 className="text-2xl font-bold mb-6">
            ⚡ Healthcare Activity Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {activityCards.map((card, index) => (
              <ActivityCard key={index} {...card} />
            ))}
          </div>

          {/* Charts Section */}
          <h2 className="text-2xl font-bold mb-6">
            📊 Healthcare Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <PatientBookingsChart data={patientBookings} />
            <HospitalDoctorChart data={hospitalDoctorCounts} />
            <MedicineCategoriesChart data={medicineCategories} />
          </div>

          {/* Management Section */}
          <h2 className="text-2xl font-bold mb-6">⚕️ Healthcare Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashbordHospitalList />
            <DashbordDoctorList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

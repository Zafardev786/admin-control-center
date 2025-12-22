import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
import Hospital from "./pages/Hospital";
import Medicine from "./pages/Medicine";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import TestsHome from "./pages/TestsHome";
import Ambulance from "./pages/Ambulance";

import Login from "./Components/Login";
import Register from "./Components/Register";
import DoctorList from "./Components/DoctorList";
import Navbar from "./Components/Navbar";
import HomePage from "./Components/HomePage";
import AmbulanceList from "./Components/AmbulanceList";
import MyProfile from "./Components/MyProfile";
import HospitalList from "./Components/HospitalList";
import MyBooking from "./Components/MyBooking";
import Footer from "./Components/Footer";
import AmbulanceDetails from "./Components/AmbulanceDetails";
import AmbulanceBookingForm from "./Components/AmbulanceBookingForm";
import AmbulancePaymentPage from "./Components/AmbulancePaymentPage";
import AmbulanceSuccess from "./Components/AmbulanceSuccess";
import HospitalDetails from "./Components/HospitalDetails";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            {token ? (
              <>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="doctor" element={<Doctor />} />
                  <Route path="hospital" element={<Hospital />} />
                  {/* <Route path="medicine" element={<Medicine />} /> */}
                  <Route path="medicine" element = {<Medicine/>}/>
                  <Route path="patients" element={<Patients />} />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="tests" element={<TestsHome />} />
                  <Route path="ambulance" element={<Ambulance />} />
                  <Route path="inventory" element={<Inventory />} />
                  <Route path="hospital-detail/:id" element={<HospitalDetails />} />
                </Route>

                {/* Other Pages */}
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/doctor-booking" element={<DoctorList />} />
                <Route path="/ambulance-booking" element={<AmbulanceList />} />
                <Route path="/hospital-booking" element={<HospitalList />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/my-bookings" element={<MyBooking />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/ambulanceDetails/:ambulanceId" element={<AmbulanceDetails />} />
                <Route path="/hospitalDetails/:hospitalId" element={<HospitalDetails />} />
                <Route path="/ambulanceBookingForm" element={<AmbulanceBookingForm />} />
                <Route path="/ambulance-payment" element={<AmbulancePaymentPage />} />
                <Route path="/ambulance-success" element={<AmbulanceSuccess />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}

          </Routes>
        </div>

        {token && <Footer />}
      </div>
    </Router>
  );
};

export default App;

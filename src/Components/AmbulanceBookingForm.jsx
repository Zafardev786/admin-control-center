import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AmbulanceBookingForm = () => {

  const navigate = useNavigate();   // ✅ Yaha hona chahiye

  const [ambulance, setAmbulance] = useState(null);
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    pickupLocation: "",
    ambulanceLocation: "",
    driverName: "",
    vehicleType: "",
  });

  useEffect(() => {
    const amb = JSON.parse(localStorage.getItem("selectedAmbulance"));
    if (amb) {
      setAmbulance(amb);
      setForm((prev) => ({
        ...prev,
        ambulanceLocation: amb.location || "",
        driverName: amb.driverName || "",
        vehicleType: amb.vehicleType || "",
      }));
    }

    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setForm((prev) => ({
        ...prev,
        userName: storedUser.name || "",
        userEmail: storedUser.email || "",
        userPhone: storedUser.phone || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userName: form.userName,
      userEmail: form.userEmail,
      userPhone: form.userPhone,
      pickupLocation: form.pickupLocation,
      ambulanceLocation: form.ambulanceLocation,
      driverName: form.driverName,
      vehicleType: form.vehicleType,
      ambulanceId: ambulance?.id,
    };

    localStorage.setItem("ambulanceBookingData", JSON.stringify(payload));

    navigate("/ambulance-payment");  // ✅ Correct Redirect
  };

  return (
    <>
      <Navbar />

      <div className="max-w-4xl  ml-34 py-10 px-4">

        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          🚑 Ambulance Booking Summary
        </h2>

        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">

          {ambulance && (
            <div className="flex items-center gap-4 mb-6 border-b pb-4">
              <img
                src={
                  ambulance.profileImage
                    ? `http://54.167.190.182:8099/retail/showimage?imagepath=${ambulance.profileImage}`
                    : "https://cdn.pixabay.com/photo/2014/04/02/10/40/ambulance-304029_1280.png"
                }
                className="w-28 h-20 object-cover rounded-md shadow"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {ambulance.vehicleName}
                </h3>
                <p className="text-sm text-gray-600">
                  <b>Driver:</b> {ambulance.driverName}
                </p>
                <p className="text-sm text-gray-600">
                  <b>Location:</b> {ambulance.location}
                </p>
                <p className="text-sm text-blue-600 font-semibold mt-1">
                  ₹ {ambulance.chargePerKm} / km
                </p>
              </div>
            </div>
          )}

          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🧾 Enter Your Booking Details
          </h3>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block text-gray-700 font-medium">User Name</label>
              <input
                type="text"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter your User Name"
                className="mt-1 w-full border p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                name="userEmail"
                value={form.userEmail}
                onChange={handleChange}
                placeholder="Enter your Email Address"
                className="mt-1 w-full border p-3 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Phone Number</label>
              <input
                type="text"
                name="userPhone"
                value={form.userPhone}
                onChange={handleChange}
                placeholder="Enter your Phone Number"
                className="mt-1 w-full border p-3 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Pickup Location</label>
              <input
                type="text"
                name="pickupLocation"
                value={form.pickupLocation}
                onChange={handleChange}
                placeholder="Enter your pickup address"
                className="mt-1 w-full border p-3 rounded-md shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Ambulance Location</label>
              <input
                type="text"
                name="ambulanceLocation"
                value={form.ambulanceLocation}
                onChange={handleChange}
                placeholder="Enter your Ambulance Location"
                className="mt-1 w-full border p-3 rounded-md bg-gray-100 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Driver Name</label>
              <input
                type="text"
                name="driverName"
                value={form.driverName}
                onChange={handleChange}
                placeholder="Enter your Driver Name"
                className="mt-1 w-full border p-3 rounded-md bg-gray-100 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Vehicle Type</label>
              <input
                type="text"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                placeholder="Enter your Vehicle Type"
                className="mt-1 w-full border p-3 rounded-md bg-gray-100 shadow-sm"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold shadow hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AmbulanceBookingForm;

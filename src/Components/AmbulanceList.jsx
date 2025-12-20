import React, { useState, useEffect } from "react";
import {
  FaAmbulance,
  FaMapMarkerAlt,
  FaStar,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const AmbulanceList = () => {
  const [ambulanceList, setAmbulanceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();


  const handleAmbulanceDetails = (ambulance) => {
    localStorage.setItem("selectedAmbulance", JSON.stringify(ambulance));
    navigate(`/ambulanceDetails/${ambulance.ambulanceId}`);


  };
  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await fetch(
          "http://54.167.190.182:8099/retail/hospitals/getAllAmbulance"
        );
        if (!response.ok) throw new Error("Failed to fetch ambulance data");

        const result = await response.json();
        const ambulanceArray = Array.isArray(result.data) ? result.data : [];

        // ✅ Store API data to localStorage
        localStorage.setItem("ambulanceData", JSON.stringify(ambulanceArray));

        setAmbulanceList(ambulanceArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // ✅ Load from localStorage if exists
    const storedData = JSON.parse(localStorage.getItem("ambulanceData"));
    if (storedData && storedData.length > 0) {
      setAmbulanceList(storedData);
      setLoading(false);
    } else {
      fetchAmbulances();
    }
    // ✅ Load existing bookings
    const savedBookings =
      JSON.parse(localStorage.getItem("ambulanceBookings")) || [];
    setBookings(savedBookings);
  }, []);

  // -------------------- UI RENDERING --------------------
  if (loading)
    return (
      <p className="text-center text-lg text-gray-500 mt-10">
        Loading ambulances...
      </p>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10 w-full">
        <h2 className="text-3xl font-bold mb-10 flex items-center ml-24 gap-2 text-blue-700">
          <FaAmbulance /> Available Ambulances at Ursag Medicine Store
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {ambulanceList.map((ambulance, index) => {
            const imageUrl = ambulance.profileImage
              ? `http://54.167.190.182:8099/retail/showimage?imagepath=${ambulance.profileImage}`
              : "https://cdn.pixabay.com/photo/2014/04/02/10/40/ambulance-304029_1280.png";

            return (
              <div
                key={ambulance.ambulance_id || index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Ambulance Image */}
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={ambulance.vehicleName || "Ambulance"}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {ambulance.vehicleType || "Emergency"}
                  </div>
                </div>

                {/* Ambulance Info */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ambulance.vehicleName || "Ambulance Service"}
                    </h3>

                    <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
                      <FaMapMarkerAlt className="text-blue-500" />{" "}
                      {ambulance.location || "Location not available"}
                    </p>

                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(ambulance.rating || 4)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {ambulance.rating || "4.5"} ⭐
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        <span className="font-semibold">Driver:</span>{" "}
                        {ambulance.driverName || "Not Available"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" />
                        {ambulance.email || "No email provided"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-green-600" />
                        {ambulance.contactNumber || "No contact available"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaBriefcase className="text-orange-500" />
                        Availability:{" "}
                        {ambulance.availabilityStatus || "Available"}
                      </p>
                      <p>
                        <span className="font-semibold">Charge:</span> ₹
                        {ambulance.chargePerKm || "50"}/km
                      </p>
                    </div>
                  </div>

                  {/* ✅ Payment Button */}
                  <button
                    onClick={() => handleAmbulanceDetails(ambulance)}
                    className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    Ambulance Booking                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AmbulanceList;

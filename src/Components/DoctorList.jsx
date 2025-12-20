import React, { useState, useEffect } from "react";
import {
  FaUserMd,
  FaMapMarkerAlt,
  FaStar,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
} from "react-icons/fa";
import Navbar from "./Navbar";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://54.167.190.182:8099/retail/profile/allDoctor"
        );
        if (!response.ok) throw new Error("Failed to fetch doctor data");

        const result = await response.json();
        const doctorArray = Array.isArray(result.data) ? result.data : [];
        setDoctorList(doctorArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();

    const savedBookings =
      JSON.parse(localStorage.getItem("doctorBookings")) || [];
    setBookings(savedBookings);
  }, []);

  // ✅ Book function
  const handleBook = (doctor) => {
    const newBooking = {
      ...doctor,
      bookingId: Date.now(),
      bookedAt: new Date().toLocaleString(),
    };

    const existingBookings =
      JSON.parse(localStorage.getItem("doctorBookings")) || [];

    const updatedBookings = [...existingBookings, newBooking];
    localStorage.setItem("doctorBookings", JSON.stringify(updatedBookings));

    setBookings(updatedBookings);
    alert(`${doctor.name || "Doctor"} booked successfully!`);
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-500 mt-10">
        Loading doctors...
      </p>
    );

  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10 w-full">
        <h2 className="text-3xl font-bold mb-10 text-center flex items-center ml-22 gap-2 text-blue-700">
          <FaUserMd /> Explore Top Doctors at Ursag Medicine Store
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {doctorList.map((doctor, index) => {
            const imageUrl = doctor.profileImage
              ? `http://54.167.190.182:8099/retail/showimage?imagepath=${doctor.profileImage}`
              : "https://cdn.pixabay.com/photo/2023/07/05/39pE9luU-ai-generated-8451277_1280.png";

            return (
              <div
                key={doctor.vendor_id || index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Doctor Image */}
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={doctor.name || "Doctor"}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {doctor.specialization || "General"}
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {doctor.name || "Doctor Name"}
                    </h3>

                    <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
                      <FaMapMarkerAlt className="text-blue-500" />{" "}
                      {doctor.address || doctor.city || "Location not available"}
                    </p>

                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(doctor.rating || 4)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {doctor.rating || "4.5"} ⭐
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        <span className="font-semibold">Qualification:</span>{" "}
                        {doctor.qualifications || "MBBS"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" />
                        {doctor.email || "No email provided"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-green-600" />
                        {doctor.phone || "No contact available"}
                      </p>
                      <p className="flex items-center gap-2">
                        <FaBriefcase className="text-orange-500" />
                        Experience: {doctor.yearsofExperience || "0"} years
                      </p>
                      <p>
                        <span className="font-semibold">Fee:</span> ₹
                        {doctor.consultationFees || "1000"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(doctor)}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    Book Doctor
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DoctorList;

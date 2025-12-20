import React, { useEffect, useState } from "react";
import {
  FaAmbulance,
  FaUserMd,
  FaHospital,
  FaPills,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";
import Navbar from "./Navbar";

const IMAGE_BASE_URL = "http://54.167.190.182:8099/retail/showimage?imagepath=";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  // 🟦 Load all bookings from localStorage
  useEffect(() => {
    const ambulanceBookings =
      JSON.parse(localStorage.getItem("ambulanceBookings")) || [];
    const doctorBookings =
      JSON.parse(localStorage.getItem("doctorBookings")) || [];
    const hospitalBookings =
      JSON.parse(localStorage.getItem("hospitalBookings")) || [];
    const medicineBookings =
      JSON.parse(localStorage.getItem("medicineBookings")) || [];

    const tagged = [
      ...ambulanceBookings.map((b) => ({ ...b, category: "Ambulance" })),
      ...doctorBookings.map((b) => ({ ...b, category: "Doctor" })),
      ...hospitalBookings.map((b) => ({ ...b, category: "Hospital" })),
      ...medicineBookings.map((b) => ({ ...b, category: "Medicine" })),
    ];

    setBookings(tagged);
  }, []);

  // 🟥 Cancel Booking
  const handleCancelBooking = (id, category) => {
    const keyMap = {
      Ambulance: "ambulanceBookings",
      Doctor: "doctorBookings",
      Hospital: "hospitalBookings",
      Medicine: "medicineBookings",
    };

    const key = keyMap[category];
    const stored = JSON.parse(localStorage.getItem(key)) || [];
    const updated = stored.filter((item) => item.bookingId !== id);

    localStorage.setItem(key, JSON.stringify(updated));

    setBookings((prev) => prev.filter((b) => b.bookingId !== id));

    alert(`${category} booking cancelled!`);
  };

  // 🟦 Get image function
  const getImageUrl = (path) => {
    if (!path) return null;
    return IMAGE_BASE_URL + path;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10 w-full">
        <h2 className="text-3xl font-bold mb-10 text-center text-blue-600 flex justify-center items-center gap-2">
          <FaBriefcase /> My All Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            No bookings found.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {bookings.map((booking, index) => {
              // 🟩 Category Icons
              let icon, defaultImg;

              switch (booking.category) {
                case "Ambulance":
                  icon = <FaAmbulance className="text-red-500" />;
                  defaultImg =
                    "https://cdn.pixabay.com/photo/2014/04/02/10/40/ambulance-304029_1280.png";
                  break;

                case "Doctor":
                  icon = <FaUserMd className="text-green-500" />;
                  defaultImg =
                    "https://cdn-icons-png.flaticon.com/512/387/387561.png";
                  break;

                case "Hospital":
                  icon = <FaHospital className="text-blue-500" />;
                  defaultImg =
                    "https://cdn-icons-png.flaticon.com/512/2966/2966327.png";
                  break;

                default:
                  icon = <FaPills className="text-purple-500" />;
                  defaultImg =
                    "https://cdn-icons-png.flaticon.com/512/387/387593.png";
              }

              // 🟦 Final Image Source From API
              const finalImage =
                getImageUrl(booking.imagePath) || defaultImg;

              return (
                <div
                  key={booking.bookingId || index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <img
                    src={finalImage}
                    alt={booking.name || "Booking"}
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      {icon}
                      {booking.name || booking.vehicleName || "Booking"}
                    </h3>

                    <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
                      <FaMapMarkerAlt className="text-blue-500" />
                      {booking.location || "Not available"}
                    </p>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      {booking.driverName && (
                        <p>
                          <span className="font-semibold">Driver:</span>{" "}
                          {booking.driverName}
                        </p>
                      )}

                      {booking.contactNumber && (
                        <p className="flex items-center gap-2">
                          <FaPhoneAlt className="text-green-600" />
                          {booking.contactNumber}
                        </p>
                      )}

                      <p className="flex items-center gap-2">
                        <FaClock className="text-gray-500" />
                        Booked At: {booking.bookedAt || "N/A"}
                      </p>

                      <p>
                        <span className="font-semibold">Category:</span>{" "}
                        {booking.category}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleCancelBooking(
                          booking.bookingId,
                          booking.category
                        )
                      }
                      className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;

import React, { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const AmbulanceDetails = () => {
  const [ambulance, setAmbulance] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");


  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedAmbulance"));
    if (data) {
      setAmbulance(data);

      const profileImage = data.profileImage
        ? `http://54.167.190.182:8099/retail/showimage?imagepath=${data.profileImage}`
        : "https://cdn.pixabay.com/photo/2014/04/02/10/40/ambulance-304029_1280.png";

      const imgArray = [profileImage, profileImage, profileImage, profileImage];
      setImages(imgArray);
      setMainImage(profileImage);
    }
  }, []);

  if (!ambulance) {
    return (
      <p className="text-center text-lg text-gray-500 mt-10">Loading...</p>
    );
  }
  // const navigate = useNavigate();
  const handleBookingAmbulance = (ambulance) => {
    localStorage.setItem("selectedAmbulance", JSON.stringify(ambulance));
    navigate("/ambulanceBookingForm");
  };


  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto mt-10 p-5 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LEFT SIDE THUMBNAILS */}
        <div className="flex flex-col items-center gap-4 max-h-[450px] overflow-y-auto">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setMainImage(img)}
              className={`w-20 h-20 border rounded-md p-1 object-cover cursor-pointer shadow-sm 
              ${mainImage === img ? "border-blue-500 shadow-md" : "border-gray-300"}`}
            />
          ))}
        </div>

        {/* CENTER BIG IMAGE */}
        <div className="col-span-2 flex justify-center items-start">
          <img
            src={mainImage}
            className="w-full max-w-lg h-[450px] object-contain rounded-lg border shadow-md bg-white p-4"
          />
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="space-y-4">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
            {ambulance.vehicleName || "Ambulance Service"}
          </h1>

          {/* Brand/Provider */}
          <p className="text-sm text-gray-600">
            Provider: <span className="text-blue-600 font-medium">Ursag Ambulance Network</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
              {ambulance.rating || "4.5"} <FaStar size={12} />
            </span>
            <p className="text-gray-600 text-sm">2,340 Ratings & 589 Reviews</p>
          </div>

          {/* Price / Charges Box */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <p className="text-xl font-bold text-green-600">
              ₹{ambulance.chargePerKm || 50} / km
            </p>
            <p className="text-sm text-gray-500">Charges may vary based on distance</p>
          </div>

          {/* Highlights */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Key Features</h3>
            <ul className="mt-2 text-gray-700 text-sm space-y-1 list-disc list-inside">
              <li>Fast Emergency Response</li>
              <li>Certified Professional Driver</li>
              <li>Fully Equipped Vehicle</li>
              <li>24x7 Emergency Support</li>
            </ul>
          </div>

          {/* Details */}
          <div className="space-y-3 pt-2">
            <p className="flex items-center gap-2 text-gray-700">
              <FaMapMarkerAlt className="text-blue-600" />
              <b>Location:</b> {ambulance.location}
            </p>

            <p className="flex items-center gap-2 text-gray-700">
              <FaPhoneAlt className="text-green-600" />
              <b>Contact:</b> {ambulance.contactNumber}
            </p>

            <p className="flex items-center gap-2 text-gray-700">
              <FaEnvelope className="text-red-600" />
              <b>Email:</b> {ambulance.email}
            </p>

            <p className="text-gray-700">
              <b>Driver Name:</b> {ambulance.driverName}
            </p>

            <p className="text-gray-700">
              <b>Vehicle Type:</b> {ambulance.vehicleType}
            </p>
          </div>

          {/* BOOK BUTTON */}
          <button
            onClick={() => handleBookingAmbulance(ambulance)}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow">
            Ambulance Booking
          </button>
        </div>
      </div>
    </>
  );
};

export default AmbulanceDetails;

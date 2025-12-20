import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaBriefcase } from "react-icons/fa";

const HospitalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await axios.get(
          `http://54.167.190.182:8099/retail/hospitals/getHospitalById/${id}`
        );
        setHospital(res.data.data);
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    };

    fetchHospital();
  }, [id]);

  const imageBaseUrl = "http://54.167.190.182:8099/images/";

  if (!hospital) {
    return (
      <>
        <Navbar />
        <p className="p-5 text-lg font-semibold">Loading hospital details...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-4">

        {/* MAIN IMAGE */}
        <img
          src={imageBaseUrl + hospital.profileImage}
          alt="Hospital"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
          onError={(e) => (e.target.src = hospital.logo)}
        />

        {/* TITLE + RATING */}
        <div className="mt-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{hospital.hospitalName}</h1>
          <span className="flex items-center text-yellow-500">
            <FaStar className="mr-1" /> {hospital.rating}
          </span>
        </div>

        {/* SPECIALIST */}
        <p className="mt-2 text-gray-700 text-lg flex items-center">
          <FaBriefcase className="mr-2 text-blue-600" />
          {hospital.specialist}
        </p>

        {/* ADDRESS */}
        <p className="mt-2 flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          {hospital.address}
        </p>

        {/* CONTACT */}
        <div className="mt-2 flex items-center text-gray-700">
          <FaPhoneAlt className="mr-2 text-green-600" />
          {hospital.phone || "Not Available"}
        </div>

        {/* CATEGORIES */}
        <p className="mt-3 text-sm font-semibold text-blue-600">
          Category:{" "}
          {hospital.hospitalCategory?.map((c) => c.categoryName).join(", ")}
        </p>

        {/* DESCRIPTION */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">About Us</h2>
          <p className="text-gray-700">{hospital.description}</p>
        </div>

        {/* BOOK BUTTON */}
        <button
          onClick={() => navigate(`/hospital-book/${hospital.hospital_id}`)}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold shadow-md hover:bg-blue-700"
        >
          Book Hospital
        </button>

      </div>
    </>
  );
};

export default HospitalDetails;

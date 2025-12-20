// HospitalList.jsx
import React, { useEffect, useState } from "react";
import {
  FaHospitalAlt,
  FaMapMarkerAlt,
  FaStar,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const HospitalList = () => {
  const [hospitalList, setHospitalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleHospitalDetails = (hospital) => {
    localStorage.setItem("selectedHospital", JSON.stringify(hospital));
    navigate(`/hospitalDetails/${hospital.hospitalId}`);
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "http://54.167.190.182:8099/retail/hospitals/allHospital"
        );

        if (!response.ok) throw new Error("Failed to fetch hospitals");

        const result = await response.json();
        const hospitalArray = Array.isArray(result.data) ? result.data : [];

        localStorage.setItem("hospitalData", JSON.stringify(hospitalArray));
        setHospitalList(hospitalArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const storedData = JSON.parse(localStorage.getItem("hospitalData"));

    if (storedData && storedData.length > 0) {
      setHospitalList(storedData);
      setLoading(false);
    } else {
      fetchHospitals();
    }
  }, []);

  // Loading
  if (loading)
    return (
      <p className="text-center text-lg text-gray-500 mt-10">
        Loading hospitals...
      </p>
    );

  // Error
  if (error)
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 py-10 w-full">
        <h2 className="text-3xl font-bold mb-10 flex items-center ml-24 gap-2 text-blue-700">
          <FaHospitalAlt /> Available Hospitals
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {hospitalList.map((hospital, index) => {
            const imageUrl = hospital.profileImage
              ? `http://54.167.190.182:8099/retail/showimage?imagepath=${hospital.profileImage}`
              : "https://cdn-icons-png.flaticon.com/512/2967/2967350.png";

            return (
              <div
                key={hospital.hospitalId || index}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col"
              >
                {/* Hospital Image */}
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={hospital.hospitalName}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {hospital.specialization || "General Hospital"}
                  </div>
                </div>

                {/* Hospital Info */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {hospital.hospitalName || "Hospital"}
                    </h3>

                    <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
                      <FaMapMarkerAlt className="text-blue-500" />
                      {hospital.location || hospital.address || "Location not available"}
                    </p>

                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < Math.round(hospital.rating || 4)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {hospital.rating || "4.5"} ⭐
                      </span>
                    </div>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p className="flex items-center gap-2">
                        <FaBriefcase className="text-orange-500" />
                        {hospital.type || "Private"}
                      </p>

                      <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-green-600" />
                        {hospital.phone || "No phone available"}
                      </p>

                      <p className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" />
                        {hospital.email || "No email provided"}
                      </p>

                      <p>
                        <span className="font-semibold">Consultation Fee:</span>{" "}
                        ₹{hospital.consultationFee || "300"}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleHospitalDetails(hospital)}
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
                  >
                    Book Hospital
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

export default HospitalList;

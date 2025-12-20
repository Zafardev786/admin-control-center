import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserMd,
  FaAmbulance,
  FaPills,
  FaHospital,
  FaVials,
  FaUsers,
} from "react-icons/fa";
import Navbar from "./Navbar";

const HomePage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Doctors",
      desc: "Find and book top specialists near you.",
      icon: <FaUserMd className="text-indigo-600 text-5xl" />,
      image:
        "https://th.bing.com/th/id/OIP.zRQCTTVrE7eIIaObOd1cFgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/doctor-booking",
    },
    {
      title: "Hospitals",
      desc: "Locate trusted hospitals with advanced facilities.",
      icon: <FaHospital className="text-indigo-600 text-5xl" />,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.gzdk25CnHR7kqyaBGLtUYwHaDV?rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/hospital-booking",
    },
    {
      title: "Ambulance",
      desc: "Book emergency ambulance services 24/7.",
      icon: <FaAmbulance className="text-indigo-600 text-5xl" />,
      image:
        "https://tse1.mm.bing.net/th/id/OIP.jwVNw9uiH7OIGE435GeX8AHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/ambulance-booking",
    },
    {
      title: "Medicines",
      desc: "Order medicines easily from verified pharmacies.",
      icon: <FaPills className="text-indigo-600 text-5xl" />,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.6uxRCHOm2Pvsv84j4R-WoQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/medicine",
    },
    {
      title: "Tests @ Home",
      desc: "Get health tests done right from home.",
      icon: <FaVials className="text-indigo-600 text-5xl" />,
      image:
        "https://tse3.mm.bing.net/th/id/OIF.gMbPEDKiOO8E2OQWofc9ew?rs=1&pid=ImgDetMain&o=7&rm=3",
      link: "/tests",
    },
    {
      title: "Patients",
      desc: "Manage patient records and appointments.",
      icon: <FaUsers className="text-indigo-600 text-5xl" />,
      image:
        "https://www.generalmedicine.com/wp-content/uploads/2014/05/nurse-meeting-with-male-and-spouse.jpg",
      link: "/patients",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen pt-8 pb-16 px-6">
        <h2 className="text-3xl font-bold ml-26 text-indigo-700 mb-10">
          Healthcare Services Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  {service.icon}
                </div>
              </div>

              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.desc}</p>
                <button
                  onClick={() => navigate(service.link)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-all duration-300"
                >
                  See More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

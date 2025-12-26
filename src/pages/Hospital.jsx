import React, { useState } from "react";
import { FaHospitalAlt, FaStar } from "react-icons/fa";

/* 🔹 STATIC 10 HOSPITAL DATA */
const hospitalsData = [
  {
    id: 1,
    name: "Apollo Hospitals",
    location: "New Delhi, India",
    rating: 4.7,
    type: "Private",
    image: "https://images.livemint.com/img/2021/09/10/1600x900/apollo_1594043446600_1594043458522_1631255542658.jpg",
    description:
      "Leading multispeciality hospital offering advanced treatments in cardiology, neurology, oncology, and more.",
  },
  {
    id: 2,
    name: "Fortis Healthcare",
    location: "Mumbai, India",
    rating: 4.6,
    type: "Private",
    image: "https://bl-i.thgim.com/public/incoming/zuqan/article66131773.ece/alternates/FREE_1200/Fortis-01.jpg",
    description:
      "Well-known hospital with expertise in orthopedics, neurosurgery, cardiac sciences and organ transplant.",
  },
  {
    id: 3,
    name: "AIIMS",
    location: "New Delhi, India",
    rating: 4.9,
    type: "Government",
    image: "https://tse1.mm.bing.net/th/id/OIP.kET3DtDE-a3YZSZfYaHczQHaEy?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "India’s top government medical institute offering world-class healthcare and education.",
  },
  {
    id: 4,
    name: "Max Super Speciality",
    location: "Delhi, India",
    rating: 4.5,
    type: "Private",
    image: "https://tse4.mm.bing.net/th/id/OIP.dsU9BVUpzJ3650Iqes8qhQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Advanced healthcare services with modern infrastructure and expert doctors.",
  },
  {
    id: 5,
    name: "Medanta",
    location: "Gurgaon, India",
    rating: 4.8,
    type: "Private",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/2100b5111982037.Y3JvcCw4MDgsNjMyLDAsMA.jpg",
    description:
      "Renowned multispeciality hospital with world-class treatment facilities.",
  },
  {
    id: 6,
    name: "Manipal Hospital",
    location: "Bangalore, India",
    rating: 4.6,
    type: "Private",
    image: "https://tse1.mm.bing.net/th/id/OIP.6mXmsGsMlt-j8RBKL5XThAHaDs?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Trusted healthcare provider offering comprehensive medical services.",
  },
  {
    id: 7,
    name: "Safdarjung Hospital",
    location: "New Delhi, India",
    rating: 4.3,
    type: "Government",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Safdarjung_Hospital.jpg",
    description:
      "Major government hospital providing affordable healthcare.",
  },
  {
    id: 8,
    name: "Kokilaben Hospital",
    location: "Mumbai, India",
    rating: 4.7,
    type: "Private",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Kokilaben_Dhirubhai_Ambani_Hospital.jpg",
    description:
      "Advanced multispeciality hospital with modern technology.",
  },
  {
    id: 9,
    name: "NIMS Hospital",
    location: "Hyderabad, India",
    rating: 4.4,
    type: "Government",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/NIMS_Hospital_Hyderabad.jpg",
    description:
      "Top government medical institute in Telangana.",
  },
  {
    id: 10,
    name: "Ruby Hall Clinic",
    location: "Pune, India",
    rating: 4.5,
    type: "Private",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Ruby_Hall_Clinic.jpg",
    description:
      "Well-known hospital with a strong reputation for patient care.",
  },
];
;

const Hospital = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const filteredHospitals = hospitalsData.filter((hospital) => {
    const matchSearch = hospital.name.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "All" || hospital.type === type;
    return matchSearch && matchType;
  });

  return (
    <div className="bg-gray-50 h-screen">
      {/* 🔹 FIXED HEADER */}
      <div className="fixed top-5 left-60 right-0  bg-white p-5 shadow z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaHospitalAlt className="text-pink-500 text-3xl" />
          <h1 className="text-2xl font-bold">Find a Hospital</h1>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-pink-400"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="All">All Types</option>
            <option value="Private">Private</option>
            <option value="Government">Government</option>
          </select>
        </div>
      </div>

      {/* 🔹 SCROLLABLE LIST */}
      <div className="pt-28 px-6 h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg font-bold">{hospital.name}</h2>
                <p className="text-sm text-gray-500">{hospital.location}</p>

                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  <FaStar />
                  <span className="text-sm font-semibold text-gray-700">
                    {hospital.rating}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {hospital.description}
                </p>

                <div className="flex gap-3 mt-5">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    Book
                  </button>
                  <button className="flex-1 border border-gray-400 py-2 rounded-lg hover:bg-gray-100">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hospital;

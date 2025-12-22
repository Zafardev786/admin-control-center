// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const HOSPITALS = [
//   {
//     id: 1,
//     name: "Apollo Hospitals",
//     location: "New Delhi, India",
//     rating: 4.7,
//     beds: 1200,
//     type: "Multispeciality",
//     fee: "₹1500 - ₹5000",
//     image:
//       "https://www.medicalbuyer.co.in/wp-content/uploads/2021/10/Apollo-Hospitals-launches-centre-of-excellence-to-boost-critical-care-across-India.jpg",
//     description:
//       "Leading multispeciality hospital offering advanced treatments in cardiology, neurology, oncology, and more.",
//   },
//   {
//     id: 2,
//     name: "Fortis Healthcare",
//     location: "Mumbai, India",
//     rating: 4.6,
//     beds: 950,
//     type: "Multispeciality",
//     fee: "₹1200 - ₹4000",
//     image:
//       "https://www.healthcareradius.in/cloud/2021/11/15/fortis-escorts.jpg",
//     description:
//       "Well-known hospital with expertise in orthopedics, neurosurgery, cardiac sciences and organ transplant.",
//   },
//   {
//     id: 3,
//     name: "AIIMS",
//     location: "New Delhi, India",
//     rating: 4.9,
//     beds: 2000,
//     type: "Government",
//     fee: "₹500 - ₹2000",
//     image: "https://h-leads.com/wp-content/uploads/2022/09/AIIMS.jpg",
//     description:
//       "India’s top government medical institute offering world-class healthcare and education.",
//   },
//   {
//     id: 4,
//     name: "Max Super Speciality Hospital",
//     location: "Bengaluru, India",
//     rating: 4.5,
//     beds: 800,
//     type: "Multispeciality",
//     fee: "₹1000 - ₹3500",
//     image:
//       "https://tse4.mm.bing.net/th/id/OIP.nDr31OH6H7NoOTdjzSZqLQAAAA",
//     description:
//       "Known for liver transplant, cancer care, and advanced robotic surgeries.",
//   },
// ];

// function StarRating({ rating }) {
//   return (
//     <div className="flex items-center gap-1 text-sm">
//       <span className="text-yellow-500">★</span>
//       <span className="font-medium text-gray-700">
//         {rating.toFixed(1)}
//       </span>
//     </div>
//   );
// }

// function Hospital() {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [filter, setFilter] = useState("all");

//   const filtered = HOSPITALS.filter((h) => {
//     const q = query.toLowerCase().trim();
//     if (q && !(`${h.name} ${h.type} ${h.location}`.toLowerCase().includes(q)))
//       return false;
//     if (filter !== "all" && h.type.toLowerCase() !== filter) return false;
//     return true;
//   });

//   const types = Array.from(
//     new Set(HOSPITALS.map((h) => h.type.toLowerCase()))
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="bg-white py-5 px-6 shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
//           <h1 className="text-3xl font-bold">🏥 Find a Hospital</h1>

//           <div className="flex gap-3">
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search hospital..."
//               className="px-4 py-2 rounded-lg border"
//             />

//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="px-4 py-2 rounded-lg border"
//             >
//               <option value="all">All Types</option>
//               {types.map((t) => (
//                 <option key={t} value={t}>
//                   {t}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Hospital Cards */}
//       <div className="max-w-7xl mx-auto mt-8 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
//         {filtered.map((h) => (
//           <article
//             key={h.id}
//             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition"
//           >
//             <img
//               src={h.image}
//               alt={h.name}
//               className="w-full h-44 object-cover"
//             />

//             <div className="p-5 space-y-2">
//               <h2 className="font-semibold text-lg">{h.name}</h2>
//               <p className="text-sm text-gray-500">{h.location}</p>

//               <StarRating rating={h.rating} />

//               <p className="text-sm text-gray-600 line-clamp-2">
//                 {h.description}
//               </p>

//               <div className="mt-4 flex gap-2">
//                 <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">
//                   Book
//                 </button>

//                 <button
//                   onClick={() =>
//                     navigate("/hospital-details", { state: h })
//                   }
//                   className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
//                 >
//                   Details
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}

//         {filtered.length === 0 && (
//           <p className="text-gray-600 col-span-full">
//             No hospitals match your search.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Hospital;
import React, { useEffect, useState } from "react";
import { FaHospital } from "react-icons/fa";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://54.167.190.182:8099/retail/admin/hospitals"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch hospitals");
      }

      const data = await res.json();
      setHospitals(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load hospitals");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search filter
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔹 Header (Medicine style) */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-3">
          <FaHospital className="text-blue-600 text-3xl" />
          <h1 className="text-2xl font-bold">Find a Hospital</h1>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search hospital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* 🔹 States */}
      {loading && <p>Loading hospitals...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredHospitals.length === 0 && (
        <p>No hospitals found</p>
      )}

      {/* 🔹 Hospital Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredHospitals.map((hospital, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">
              {hospital.name || "Hospital Name"}
            </h2>
            <p className="text-sm text-gray-600">
              Type: {hospital.type || "General"}
            </p>
            <p className="text-sm text-gray-600">
              Location: {hospital.city || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Contact: {hospital.contact || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hospital;


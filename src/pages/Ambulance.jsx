// import React, { useEffect, useState } from "react";
// import {
//   FaAmbulance,
//   FaCheckCircle,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaEdit,
//   FaTrash,
// } from "react-icons/fa";

// const Ambulance = () => {
//   const [ambulanceBookings, setAmbulanceBookings] = useState([]);
//   const [editBooking, setEditBooking] = useState(null); // for editing modal

//   // ✅ Load data from localStorage
//   useEffect(() => {
//     const savedBookings =
//       JSON.parse(localStorage.getItem("ambulanceBookings")) || [];
//     setAmbulanceBookings(savedBookings);
//   }, []);

//   // ✅ Delete booking
//   const handleDelete = (bookingId) => {
//     const updated = ambulanceBookings.filter((b) => b.bookingId !== bookingId);
//     setAmbulanceBookings(updated);
//     localStorage.setItem("ambulanceBookings", JSON.stringify(updated));
//   };

//   // ✅ Open Edit Modal
//   const handleEdit = (booking) => {
//     setEditBooking(booking);
//   };

//   // ✅ Save Edited Booking
//   const handleSave = () => {
//     const updated = ambulanceBookings.map((b) =>
//       b.bookingId === editBooking.bookingId ? editBooking : b
//     );
//     setAmbulanceBookings(updated);
//     localStorage.setItem("ambulanceBookings", JSON.stringify(updated));
//     setEditBooking(null); // close modal
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gray-50">
//       <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-red-700">
//         <FaAmbulance /> Ambulance Bookings (from Users)
//       </h2>

//       {ambulanceBookings.length === 0 ? (
//         <p className="text-gray-500">No ambulance bookings yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {ambulanceBookings.map((book) => (
//             <div
//               key={book.bookingId}
//               className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition"
//             >
//               <img
//                 src={
//                   book.profileImage
//                     ? `http://54.167.190.182:8099/retail/showimage?imagepath=${book.profileImage}`
//                     : "https://cdn.pixabay.com/photo/2014/04/02/10/40/ambulance-304029_1280.png"
//                 }
//                 alt={book.ambulanceName}
//                 className="w-full h-32 object-cover rounded-lg mb-2"
//               />
//               <h3 className="text-lg font-semibold">
//                 {book.ambulanceName || book.vehicleName || "Ambulance"}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {book.ambulanceTitle || "No Title"}
//               </p>
//               <p className="text-gray-600 flex items-center gap-1 text-sm mt-1">
//                 <FaMapMarkerAlt className="text-blue-500" />{" "}
//                 {book.location || "Location not available"}
//               </p>
//               <p className="text-sm mt-1 flex items-center gap-1 text-green-600">
//                 <FaPhoneAlt /> {book.contactNumber || "N/A"}
//               </p>
//               <p className="text-sm mt-1">
//                 <b>Type:</b> {book.ambulanceType?.ambulanceTypes || "Van"}
//               </p>
//               <p className="text-sm mt-1">
//                 <b>Services:</b> {book.services || "No services listed"}
//               </p>
//               <p className="text-sm mt-1">
//                 <b>Specialties:</b> {book.specialties || "N/A"}
//               </p>
//               <p className="text-sm mt-1">
//                 <b>Description:</b>{" "}
//                 {book.ambulanceDescription?.slice(0, 80) || "No description"}
//               </p>
//               <p className="text-sm mt-1">
//                 <b>Rating:</b> {book.rating || "4"} ⭐
//               </p>
//               <p className="text-sm mt-1">
//                 Booked on: <b>{book.bookedAt}</b>
//               </p>
//               <p className="mt-2 text-green-600 flex items-center gap-1">
//                 <FaCheckCircle /> {book.status || "Confirmed"}
//               </p>

//               {/* Buttons */}
//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => handleEdit(book)}
//                   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1"
//                 >
//                   <FaEdit /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(book.bookingId)}
//                   className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg flex items-center justify-center gap-1"
//                 >
//                   <FaTrash /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Edit Modal */}
//       {editBooking && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg shadow-lg relative">
//             <h3 className="text-xl font-semibold mb-4 text-center text-red-600">
//               Edit Ambulance Booking
//             </h3>

//             <div className="grid grid-cols-1 gap-3">
//               <input
//                 type="text"
//                 value={editBooking.ambulanceName || ""}
//                 onChange={(e) =>
//                   setEditBooking({
//                     ...editBooking,
//                     ambulanceName: e.target.value,
//                   })
//                 }
//                 placeholder="Ambulance Name"
//                 className="border rounded-lg p-2"
//               />
//               <input
//                 type="text"
//                 value={editBooking.ambulanceTitle || ""}
//                 onChange={(e) =>
//                   setEditBooking({
//                     ...editBooking,
//                     ambulanceTitle: e.target.value,
//                   })
//                 }
//                 placeholder="Ambulance Title"
//                 className="border rounded-lg p-2"
//               />
//               <textarea
//                 value={editBooking.ambulanceDescription || ""}
//                 onChange={(e) =>
//                   setEditBooking({
//                     ...editBooking,
//                     ambulanceDescription: e.target.value,
//                   })
//                 }
//                 placeholder="Ambulance Description"
//                 className="border rounded-lg p-2"
//                 rows={3}
//               />
//               <input
//                 type="text"
//                 value={editBooking.services || ""}
//                 onChange={(e) =>
//                   setEditBooking({ ...editBooking, services: e.target.value })
//                 }
//                 placeholder="Services"
//                 className="border rounded-lg p-2"
//               />
//               <input
//                 type="text"
//                 value={editBooking.specialties || ""}
//                 onChange={(e) =>
//                   setEditBooking({
//                     ...editBooking,
//                     specialties: e.target.value,
//                   })
//                 }
//                 placeholder="Specialties"
//                 className="border rounded-lg p-2"
//               />
//               <input
//                 type="number"
//                 value={editBooking.rating || ""}
//                 onChange={(e) =>
//                   setEditBooking({ ...editBooking, rating: e.target.value })
//                 }
//                 placeholder="Rating"
//                 className="border rounded-lg p-2"
//               />
//               <select
//                 value={editBooking.status || ""}
//                 onChange={(e) =>
//                   setEditBooking({ ...editBooking, status: e.target.value })
//                 }
//                 className="border rounded-lg p-2"
//               >
//                 <option value="Confirmed">Confirmed</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Pending">Pending</option>
//               </select>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end gap-3 mt-5">
//               <button
//                 onClick={() => setEditBooking(null)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Ambulance;


import React, { useState } from "react";
import { FaAmbulance, FaStar } from "react-icons/fa";

/* 🔹 STATIC AMBULANCE DATA (Hospital-style) */
const ambulanceData = [
  {
    id: 1,
    name: "Apollo Ambulance Service",
    location: "New Delhi",
    rating: 4.7,
    image:
      "https://th.bing.com/th/id/R.0e01a0a3d570fefb8e26bda68c0e06dd?rik=mcNzp2wfMfI5XQ&riu=http%3a%2f%2fwww.asm-aetna.com%2fblog%2fwp-content%2fuploads%2fMercedes-Sprinter-Ambulance-ASM-A.jpg&ehk=xB%2b5TokRlcVhZpSTIRKg5mExk36SmDdWcIn9lWrp%2bOU%3d&risl=&pid=ImgRaw&r=0",
    description:
      "24x7 emergency ambulance service with advanced life support and trained paramedics.",
  },
  {
    id: 2,
    name: "Fortis Emergency Ambulance",
    location: "Mumbai",
    rating: 4.6,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.A1pXHwi2QhA8xcEl4UuR7wHaEY?w=550&h=326&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Fast-response ambulance service connected with Fortis hospitals across the city.",
  },
  {
    id: 3,
    name: "AIIMS Emergency Ambulance",
    location: "Delhi",
    rating: 4.8,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.jou_5BgAQI-cwq5lWS-8hgHaE8?w=612&h=408&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Government ambulance service providing affordable and reliable emergency care.",
  },
  {
    id: 4,
    name: "Medanta Life Support",
    location: "Gurgaon",
    rating: 4.5,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.ErWGFQYO82QH-EsT1uok0wHaFj?w=626&h=470&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Advanced cardiac and trauma life support ambulances with expert staff.",
  },
  {
    id: 5,
    name: "Manipal Emergency Services",
    location: "Bangalore",
    rating: 4.4,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.ErWGFQYO82QH-EsT1uok0wHaFj?w=626&h=470&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Well-equipped ambulances ensuring quick and safe patient transportation.",
  },
  {
    id: 6,
    name: "108 Emergency Ambulance",
    location: "Pan India",
    rating: 4.6,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.ErWGFQYO82QH-EsT1uok0wHaFj?w=626&h=470&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Nationwide emergency ambulance service supported by government initiatives.",
  },
];

const Ambulance = () => {
  const [search, setSearch] = useState("");

  const filteredAmbulance = ambulanceData.filter((amb) =>
    amb.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 🔹 FIXED HEADER */}
      <div className="sticky top-0 z-50 bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaAmbulance className="text-red-600 text-3xl" />
          <h1 className="text-2xl font-bold">Emergency Ambulance</h1>
        </div>

        <input
          type="text"
          placeholder="Search ambulance..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* 🔹 SCROLLABLE LIST */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredAmbulance.map((amb) => (
            <div
              key={amb.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={amb.image}
                alt={amb.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg font-bold">{amb.name}</h2>
                <p className="text-sm text-gray-500">{amb.location}</p>

                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  <FaStar />
                  <span className="text-sm font-semibold text-gray-700">
                    {amb.rating}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {amb.description}
                </p>

                <div className="flex gap-3 mt-5">
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                    Call Now
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

export default Ambulance;

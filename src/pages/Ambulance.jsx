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


import React, { useEffect, useState } from "react";
import { FaAmbulance } from "react-icons/fa";

const Ambulance = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://54.167.190.182:8099/retail/admin/ambulances"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch ambulances");
      }

      const data = await res.json();
      setAmbulances(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load ambulances");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search filter
  const filteredAmbulances = ambulances.filter((amb) =>
    amb.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔹 Header (Same as Medicine style) */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center gap-3">
          <FaAmbulance className="text-red-600 text-3xl" />
          <h1 className="text-2xl font-bold">Find an Ambulance</h1>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search ambulance..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* 🔹 States */}
      {loading && <p>Loading ambulances...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredAmbulances.length === 0 && (
        <p>No ambulances found</p>
      )}

      {/* 🔹 Ambulance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAmbulances.map((amb, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">
              {amb.name || "Ambulance Service"}
            </h2>
            <p className="text-sm text-gray-600">
              Type: {amb.type || "Basic"}
            </p>
            <p className="text-sm text-gray-600">
              Contact: {amb.contact || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Price: ₹{amb.price || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ambulance;

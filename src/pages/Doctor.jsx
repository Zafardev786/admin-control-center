// import React, { useEffect, useState } from "react";
// import {
//   FaCheckCircle,
//   FaUserMd,
//   FaEdit,
//   FaTrash,
//   FaSearch,
//   FaHospital,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaStar,
//   FaBars,
// } from "react-icons/fa";

// const Doctor = () => {
//   const [doctorBookings, setDoctorBookings] = useState([]);
//   const [editingBookingId, setEditingBookingId] = useState(null);
//   const [editedDoctor, setEditedDoctor] = useState({});
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const savedBookings =
//       JSON.parse(localStorage.getItem("doctorBookings")) || [];
//     setDoctorBookings(savedBookings);
//   }, []);

//   const handleDelete = (bookingId) => {
//     if (!window.confirm("Are you sure you want to delete this booking?")) return;
//     const updatedBookings = doctorBookings.filter(
//       (booking) => booking.bookingId !== bookingId
//     );
//     localStorage.setItem("doctorBookings", JSON.stringify(updatedBookings));
//     setDoctorBookings(updatedBookings);
//   };

//   const handleEdit = (booking) => {
//     setEditingBookingId(booking.bookingId);
//     setEditedDoctor({ ...booking });
//   };

//   const handleSave = (bookingId) => {
//     const updatedBookings = doctorBookings.map((booking) =>
//       booking.bookingId === bookingId ? editedDoctor : booking
//     );
//     localStorage.setItem("doctorBookings", JSON.stringify(updatedBookings));
//     setDoctorBookings(updatedBookings);
//     setEditingBookingId(null);
//   };

//   const handleChange = (e) => {
//     setEditedDoctor({ ...editedDoctor, [e.target.name]: e.target.value });
//   };

//   const filteredBookings = doctorBookings.filter(
//     (b) =>
//       b.name?.toLowerCase().includes(search.toLowerCase()) ||
//       b.specialization?.toLowerCase().includes(search.toLowerCase()) ||
//       b.city?.toLowerCase().includes(search.toLowerCase()) ||
//       b.state?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       {/* ---------- Main Content ---------- */}
//       <div className="flex-1 ml-4 flex flex-col h-screen">
//         {/* ---------- Navbar (Fixed Top) ---------- */}
//         <header className="bg-white shadow fixed top-0 left-64 right-0 z-20 flex justify-between items-center px-6 py-4">
//           <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//             <FaUserMd className="text-purple-600" /> Doctor Bookings
//           </h2>
//           <div className="flex items-center bg-gray-100 border rounded-full px-4 py-2 shadow-sm w-1/3">
//             <FaSearch className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Search doctor..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="bg-transparent outline-none w-full"
//             />
//           </div>
//         </header>

//         {/* ---------- Scrollable Doctor Cards ---------- */}
//         <main className="mt-20 p-6 overflow-y-auto flex-1">
//           {filteredBookings.length === 0 ? (
//             <p className="text-center text-gray-500 text-lg">
//               No doctor bookings found.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-3 gap-6" >
//               {filteredBookings.map((book) => (
//                 <div
//                   key={book.bookingId}
//                   className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition relative"
//                 >
//                   {editingBookingId === book.bookingId ? (
//                     <>
//                       <input
//                         type="text"
//                         name="name"
//                         value={editedDoctor.name}
//                         onChange={handleChange}
//                         className="border p-2 w-full mb-2 rounded"
//                         placeholder="Doctor Name"
//                       />
//                       <input
//                         type="text"
//                         name="specialization"
//                         value={editedDoctor.specialization}
//                         onChange={handleChange}
//                         className="border p-2 w-full mb-2 rounded"
//                         placeholder="Specialization"
//                       />
//                       <input
//                         type="text"
//                         name="city"
//                         value={editedDoctor.city}
//                         onChange={handleChange}
//                         className="border p-2 w-full mb-2 rounded"
//                         placeholder="City"
//                       />
//                       <input
//                         type="text"
//                         name="consultationFees"
//                         value={editedDoctor.consultationFees}
//                         onChange={handleChange}
//                         className="border p-2 w-full mb-2 rounded"
//                         placeholder="Fees"
//                       />
//                       <button
//                         onClick={() => handleSave(book.bookingId)}
//                         className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <img
//                         src={
//                           book.profileImage
//                             ? `http://54.167.190.182:8099/retail/showimage?imagepath=${book.profileImage}`
//                             : "https://cdn.pixabay.com/photo/2023/07/05/39pE9luU-ai-generated-8578393_1280.png"
//                         }
//                         alt={book.name}
//                         className="w-full h-40 object-cover rounded-lg mb-3"
//                       />
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {book.name}
//                       </h3>
//                       <p className="text-gray-600">{book.qualifications}</p>
//                       <p className="text-sm text-blue-600 mb-2">
//                         {book.specialization}
//                       </p>
//                       <div className="text-sm text-gray-700 space-y-1">
//                         <p className="flex items-center gap-2">
//                           <FaEnvelope className="text-gray-400" /> {book.email}
//                         </p>
//                         <p className="flex items-center gap-2">
//                           <FaPhoneAlt className="text-gray-400" /> {book.phone}
//                         </p>
//                         <p className="flex items-center gap-2">
//                           <FaMapMarkerAlt className="text-gray-400" />{" "}
//                           {book.address}, {book.city}, {book.state} -{" "}
//                           {book.pincode}
//                         </p>
//                       </div>

//                       <div className="flex items-center gap-2 mt-2">
//                         <FaStar className="text-yellow-400" />
//                         <span className="text-sm text-gray-600">
//                           Rating: {book.rating || 4.5} ⭐
//                         </span>
//                       </div>

//                       <p className="text-sm mt-1">
//                         Experience: {book.yearsofExperience || 0} years
//                       </p>

//                       <p className="mt-1 text-sm text-gray-500">
//                         Fee: ₹{book.consultationFees || 0}
//                       </p>

//                       <p className="text-xs text-gray-500 mt-1">
//                         Booked on: {book.bookedAt}
//                       </p>

//                       <p className="mt-2 text-green-600 flex items-center gap-1">
//                         <FaCheckCircle /> Confirmed
//                       </p>

//                       <div className="flex gap-2 mt-3">
//                         <button
//                           onClick={() => handleEdit(book)}
//                           className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
//                         >
//                           <FaEdit /> Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(book.bookingId)}
//                           className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
//                         >
//                           <FaTrash /> Delete
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Doctor;
import React, { useState } from "react";
import { FaUserMd, FaStar } from "react-icons/fa";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    specialization: "Cardiologist",
    hospital: "Apollo Hospitals, Delhi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    description:
      "Senior cardiologist with over 15 years of experience in treating heart diseases, angioplasty, and cardiac surgeries.",
  },
  {
    id: 2,
    name: "Dr. Anjali Verma",
    specialization: "Neurologist",
    hospital: "Fortis Hospital, Mumbai",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    description:
      "Expert neurologist specializing in brain disorders, stroke management, and advanced neurological treatments.",
  },
  {
    id: 3,
    name: "Dr. Amit Kumar",
    specialization: "Orthopedic Surgeon",
    hospital: "AIIMS, Delhi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d",
    description:
      "Highly experienced orthopedic surgeon handling joint replacement, fractures, and sports injuries.",
  },
  {
    id: 4,
    name: "Dr. Neha Singh",
    specialization: "Gynecologist",
    hospital: "Max Hospital, Delhi",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    description:
      "Specialist in women’s health, pregnancy care, infertility treatments, and minimally invasive surgeries.",
  },
  {
    id: 5,
    name: "Dr. Suresh Patel",
    specialization: "Dermatologist",
    hospital: "Medanta, Gurgaon",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54",
    description:
      "Renowned dermatologist treating skin, hair, and cosmetic concerns with modern techniques.",
  },
  {
    id: 6,
    name: "Dr. Pooja Mehta",
    specialization: "Pediatrician",
    hospital: "Manipal Hospital, Bangalore",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    description:
      "Dedicated pediatrician providing comprehensive healthcare for infants, children, and adolescents.",
  },
];

const Doctor = () => {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctorsData.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 🔹 FIXED HEADER */}
      <div className="sticky top-0 z-50 bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaUserMd className="text-green-600 text-3xl" />
          <h1 className="text-2xl font-bold">Find a Doctor</h1>
        </div>

        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* 🔹 SCROLLABLE LIST AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-lg font-bold">{doc.name}</h2>
                <p className="text-sm text-gray-500">
                  {doc.specialization} • {doc.hospital}
                </p>

                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  <FaStar />
                  <span className="text-sm font-semibold text-gray-700">
                    {doc.rating}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {doc.description}
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

export default Doctor;

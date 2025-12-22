import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaUserMd,
  FaEdit,
  FaTrash,
  FaSearch,
  FaHospital,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStar,
  FaBars,
} from "react-icons/fa";

const Doctor = () => {
  const [doctorBookings, setDoctorBookings] = useState([]);
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedDoctor, setEditedDoctor] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("doctorBookings")) || [];
    setDoctorBookings(savedBookings);
  }, []);

  const handleDelete = (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    const updatedBookings = doctorBookings.filter(
      (booking) => booking.bookingId !== bookingId
    );
    localStorage.setItem("doctorBookings", JSON.stringify(updatedBookings));
    setDoctorBookings(updatedBookings);
  };

  const handleEdit = (booking) => {
    setEditingBookingId(booking.bookingId);
    setEditedDoctor({ ...booking });
  };

  const handleSave = (bookingId) => {
    const updatedBookings = doctorBookings.map((booking) =>
      booking.bookingId === bookingId ? editedDoctor : booking
    );
    localStorage.setItem("doctorBookings", JSON.stringify(updatedBookings));
    setDoctorBookings(updatedBookings);
    setEditingBookingId(null);
  };

  const handleChange = (e) => {
    setEditedDoctor({ ...editedDoctor, [e.target.name]: e.target.value });
  };

  const filteredBookings = doctorBookings.filter(
    (b) =>
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      b.city?.toLowerCase().includes(search.toLowerCase()) ||
      b.state?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* ---------- Main Content ---------- */}
      <div className="flex-1 ml-4 flex flex-col h-screen">
        {/* ---------- Navbar (Fixed Top) ---------- */}
        <header className="bg-white shadow fixed top-0 left-64 right-0 z-20 flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaUserMd className="text-purple-600" /> Doctor Bookings
          </h2>
          <div className="flex items-center bg-gray-100 border rounded-full px-4 py-2 shadow-sm w-1/3">
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </header>

        {/* ---------- Scrollable Doctor Cards ---------- */}
        <main className="mt-20 p-6 overflow-y-auto flex-1">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No doctor bookings found.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6" >
              {filteredBookings.map((book) => (
                <div
                  key={book.bookingId}
                  className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition relative"
                >
                  {editingBookingId === book.bookingId ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editedDoctor.name}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2 rounded"
                        placeholder="Doctor Name"
                      />
                      <input
                        type="text"
                        name="specialization"
                        value={editedDoctor.specialization}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2 rounded"
                        placeholder="Specialization"
                      />
                      <input
                        type="text"
                        name="city"
                        value={editedDoctor.city}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2 rounded"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="consultationFees"
                        value={editedDoctor.consultationFees}
                        onChange={handleChange}
                        className="border p-2 w-full mb-2 rounded"
                        placeholder="Fees"
                      />
                      <button
                        onClick={() => handleSave(book.bookingId)}
                        className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={
                          book.profileImage
                            ? `http://54.167.190.182:8099/retail/showimage?imagepath=${book.profileImage}`
                            : "https://cdn.pixabay.com/photo/2023/07/05/39pE9luU-ai-generated-8578393_1280.png"
                        }
                        alt={book.name}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {book.name}
                      </h3>
                      <p className="text-gray-600">{book.qualifications}</p>
                      <p className="text-sm text-blue-600 mb-2">
                        {book.specialization}
                      </p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-gray-400" /> {book.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaPhoneAlt className="text-gray-400" /> {book.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />{" "}
                          {book.address}, {book.city}, {book.state} -{" "}
                          {book.pincode}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <FaStar className="text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          Rating: {book.rating || 4.5} ⭐
                        </span>
                      </div>

                      <p className="text-sm mt-1">
                        Experience: {book.yearsofExperience || 0} years
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Fee: ₹{book.consultationFees || 0}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Booked on: {book.bookedAt}
                      </p>

                      <p className="mt-2 text-green-600 flex items-center gap-1">
                        <FaCheckCircle /> Confirmed
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(book)}
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.bookingId)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Doctor;






 // // ✅ Booking Function with Razorpay Integration
  // const handleBook = async (ambulance) => {
  //   const isLoaded = await loadRazorpayScript();
  //   if (!isLoaded) {
  //     alert("Razorpay SDK failed to load. Check your internet connection.");
  //     return;
  //   }

  //   // 💰 Set charge per booking (you can adjust this dynamically)
  //   const baseAmount = ambulance.chargePerKm ? Number(ambulance.chargePerKm) * 10 : 500;

  //   const options = {
  //     key: "rzp_test_V5BOZ1QNIXpbsu", // ✅ Razorpay Test Key
  //     amount: Math.round(baseAmount * 100), // Convert to paise
  //     currency: "INR",
  //     name: "Ursag Ambulance Service",
  //     description: `Booking for ${ambulance.vehicleName || "Ambulance"}`,
  //     handler: function (response) {
  //       // ✅ Save booking after successful payment
  //       const newBooking = {
  //         ...ambulance,
  //         bookingId: Date.now(),
  //         bookedAt: new Date().toLocaleString(),
  //         paymentId: response.razorpay_payment_id,
  //       };

  //       const existingBookings =
  //         JSON.parse(localStorage.getItem("ambulanceBookings")) || [];
  //       const updatedBookings = [...existingBookings, newBooking];
  //       localStorage.setItem("ambulanceBookings", JSON.stringify(updatedBookings));

  //       setBookings(updatedBookings);
  //       alert("✅ Payment Successful & Ambulance Booked!");
  //       navigate(
  //         `/payment-success?razorpay_payment_id=${response.razorpay_payment_id}&vehicleName=${ambulance.vehicleName}&amount=${baseAmount}`
  //       );
  //     },
  //     prefill: {
  //       name: ambulance.driverName || "Ambulance Service",
  //       email: "support@ursag.com",
  //       contact: ambulance.contactNumber || "9999999999",
  //     },
  //     notes: {
  //       address: ambulance.location || "Ursag Hospital Network",
  //     },
  //     theme: {
  //       color: "#dc2626", // red theme
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };











  // import React, { useState } from "react";
  
  // const Medicine = [
  //   {
  //     id: 1,
  //     name: "Paracetamol",
  //     brand: "Cipla",
  //     rating: 4.7,
  //     description: "Used to treat fever and mild to moderate pain.",
  //     image:
  //       "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  //   },
  //   {
  //     id: 2,
  //     name: "Azithromycin",
  //     brand: "Sun Pharma",
  //     rating: 4.6,
  //     description: "Antibiotic used for bacterial infections.",
  //     image:
  //       "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
  //   },
  //   {
  //     id: 3,
  //     name: "Vitamin C",
  //     brand: "Himalaya",
  //     rating: 4.9,
  //     description: "Boosts immunity and improves overall health.",
  //     image:
  //       "https://images.unsplash.com/photo-1615486363973-f79d875c6e6c",
  //   },
  // ];
  
  // const MedicineSection = () => {
  //   const [search, setSearch] = useState("");
  
  //   const filteredMedicines = medicinesData.filter((item) =>
  //     item.name.toLowerCase().includes(search.toLowerCase())
  //   );
  
  //   return (
  //     <div className="p-6">
  //       {/* Header */}
  //       <div className="flex items-center justify-between mb-6">
  //         <h1 className="text-2xl font-bold flex items-center gap-2">
  //           💊 Find a Medicine
  //         </h1>
  //         <div className="flex gap-3">
  //           <input
  //             type="text"
  //             placeholder="Search medicine..."
  //             className="border rounded-lg px-4 py-2 w-64"
  //             value={search}
  //             onChange={(e) => setSearch(e.target.value)}
  //           />
  //           <select className="border rounded-lg px-4 py-2">
  //             <option>All Types</option>
  //             <option>Tablet</option>
  //             <option>Syrup</option>
  //             <option>Capsule</option>
  //           </select>
  //         </div>
  //       </div>
  
  //       {/* Cards */}
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {filteredMedicines.map((item) => (
  //           <div
  //             key={item.id}
  //             className="bg-white rounded-xl shadow-md overflow-hidden"
  //           >
  //             <img
  //               src={item.image}
  //               alt={item.name}
  //               className="h-48 w-full object-cover"
  //             />
  
  //             <div className="p-5">
  //               <h2 className="text-lg font-semibold">{item.name}</h2>
  //               <p className="text-sm text-gray-500">{item.brand}</p>
  
  //               <div className="flex items-center gap-2 mt-2">
  //                 <span className="text-yellow-500">★ {item.rating}</span>
  //               </div>
  
  //               <p className="text-sm text-gray-600 mt-3">
  //                 {item.description}
  //               </p>
  
  //               <div className="flex gap-3 mt-5">
  //                 <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
  //                   Add to Cart
  //                 </button>
  //                 <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
  //                   Details
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default Medicine
  
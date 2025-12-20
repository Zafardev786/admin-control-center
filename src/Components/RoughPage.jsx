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
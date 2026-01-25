import React, { useState } from "react";

/* ===================== STATS ===================== */
const stats = [
  { title: "Total Tests", value: "48", icon: "🧪" },
  { title: "Booked Tests", value: "16", icon: "📦", pulse: true },
  { title: "Sample Pending", value: "5", icon: "🚚" },
  { title: "Total Revenue", value: "₹18,450", icon: "💰" },
];

/* ===================== TEST LIST ===================== */
const tests = [
  {
    id: "#TST-101",
    name: "Complete Blood Count (CBC)",
    category: "Blood",
    price: "₹499",
    homeSample: "Yes",
    status: "Active",
  },
  {
    id: "#TST-102",
    name: "Thyroid Profile",
    category: "Hormone",
    price: "₹799",
    homeSample: "Yes",
    status: "Active",
  },
  {
    id: "#TST-103",
    name: "Blood Sugar (Fasting)",
    category: "Diabetes",
    price: "₹199",
    homeSample: "No",
    status: "Inactive",
  },
];

/* ===================== BOOKINGS ===================== */
const bookings = [
  {
    id: "#BK-201",
    patient: "Rahul Sharma",
    test: "Thyroid Profile",
    address: "Delhi, India",
    date: "2024-01-12",
    status: "Pending",
    payment: "Paid",
  },
  {
    id: "#BK-202",
    patient: "Anita Verma",
    test: "CBC",
    address: "Noida, India",
    date: "2024-01-11",
    status: "Collected",
    payment: "Paid",
  },
  {
    id: "#BK-203",
    patient: "Amit Patel",
    test: "Blood Sugar",
    address: "Mumbai, India",
    date: "2024-01-10",
    status: "Completed",
    payment: "Paid",
  },
  {
    id: "#BK-204",
    patient: "Neha Joshi",
    test: "CBC",
    address: "Pune, India",
    date: "2024-01-09",
    status: "Pending",
    payment: "Unpaid",
  },
];

const statusStyle = {
  Pending: "bg-amber-100 text-amber-700",
  Collected: "bg-indigo-100 text-indigo-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

/* ===================== COMPONENT ===================== */
const TestsAtHome = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        Tests @ Home
      </h1>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {stats.map((item, i) => (
          <div
            key={i}
            className="relative rounded-[30px] p-6
            bg-gradient-to-br from-indigo-500 via-indigo-400 to-indigo-300
            shadow-[0_20px_40px_rgba(79,70,229,0.35)]
            hover:shadow-[0_30px_60px_rgba(79,70,229,0.55)]
            transition-all duration-300"
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/40 rounded-full blur-2xl"></div>

            <div className="flex items-center gap-4 relative z-10">
              <div
                className={`w-14 h-14 flex items-center justify-center
                rounded-2xl bg-white text-indigo-600 text-2xl shadow-md
                ${item.pulse ? "animate-pulse" : ""}`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-sm text-indigo-100">
                  {item.title}
                </p>
                <p className="text-2xl font-bold text-white">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TEST LIST ================= */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">
          Available Tests
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-3 text-left">Test ID</th>
              <th className="p-3 text-left">Test Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Home Sample</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test) => (
              <tr
                key={test.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{test.id}</td>
                <td className="p-3 font-medium">{test.name}</td>
                <td className="p-3 text-center">{test.category}</td>
                <td className="p-3 text-center">{test.price}</td>
                <td className="p-3 text-center">{test.homeSample}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      test.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {test.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= BOOKINGS ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4">
          Test Bookings
        </h2>

        <table className="w-full text-sm">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="p-3 text-left">Booking ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Test</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((b) => (
              <tr
                key={b.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">{b.id}</td>
                <td className="p-3 text-center">{b.patient}</td>
                <td className="p-3 text-center">{b.test}</td>
                <td className="p-3 text-center">{b.date}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      statusStyle[b.status]
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="px-4 py-1 text-sm rounded-lg
                    bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-bold text-indigo-700 mb-3">
              Booking Details
            </h3>
            <p><b>Patient:</b> {selectedBooking.patient}</p>
            <p><b>Test:</b> {selectedBooking.test}</p>
            <p><b>Address:</b> {selectedBooking.address}</p>
            <p><b>Payment:</b> {selectedBooking.payment}</p>

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestsAtHome;

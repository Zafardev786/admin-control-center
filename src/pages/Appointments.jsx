import React, { useState } from "react";
import { FaCalendarCheck, FaStar } from "react-icons/fa";

/* 🔹 STATIC APPOINTMENTS DATA */
const appointmentsData = [
  {
    id: 1,
    patientName: "Rohit Sharma",
    doctor: "Dr. A. Mehta",
    department: "Cardiology",
    rating: 4.7,
    date: "25 Sep 2025",
    time: "10:30 AM",
    status: "Confirmed",
    amount: 1200,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    description: "Follow-up appointment for heart health monitoring.",
  },
  {
    id: 2,
    patientName: "Anita Verma",
    doctor: "Dr. Neha Singh",
    department: "Neurology",
    rating: 4.6,
    date: "26 Sep 2025",
    time: "12:00 PM",
    status: "Pending",
    amount: 1500,
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
    description: "Neurological consultation and progress review.",
  },
  {
    id: 3,
    patientName: "Suresh Kumar",
    doctor: "Dr. R. Patel",
    department: "Orthopedic",
    rating: 4.8,
    date: "27 Sep 2025",
    time: "04:00 PM",
    status: "Confirmed",
    amount: 1800,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    description: "Physiotherapy and post-surgery follow-up.",
  },
  {
    id: 4,
    patientName: "Pooja Mehta",
    doctor: "Dr. K. Rao",
    department: "Dermatology",
    rating: 4.5,
    date: "28 Sep 2025",
    time: "11:00 AM",
    status: "Pending",
    amount: 900,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    description: "Skin allergy and treatment consultation.",
  },
  {
    id: 5,
    patientName: "Amit Jain",
    doctor: "Dr. S. Kapoor",
    department: "ENT",
    rating: 4.4,
    date: "29 Sep 2025",
    time: "09:30 AM",
    status: "Confirmed",
    amount: 1000,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7",
    description: "ENT examination and hearing issues.",
  },
  {
    id: 6,
    patientName: "Neha Gupta",
    doctor: "Dr. R. Malhotra",
    department: "Gynecology",
    rating: 4.6,
    date: "30 Sep 2025",
    time: "01:00 PM",
    status: "Pending",
    amount: 1300,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
    description: "Routine gynecological check-up.",
  },
  {
    id: 7,
    patientName: "Rahul Singh",
    doctor: "Dr. V. Arora",
    department: "Urology",
    rating: 4.3,
    date: "01 Oct 2025",
    time: "03:30 PM",
    status: "Confirmed",
    amount: 1600,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    description: "Urinary tract consultation.",
  },
  {
    id: 8,
    patientName: "Kiran Patel",
    doctor: "Dr. M. Shah",
    department: "General Medicine",
    rating: 4.5,
    date: "02 Oct 2025",
    time: "10:00 AM",
    status: "Pending",
    amount: 700,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    description: "General health check-up.",
  },
  {
    id: 9,
    patientName: "Sunita Rao",
    doctor: "Dr. N. Iyer",
    department: "Pediatrics",
    rating: 4.7,
    date: "03 Oct 2025",
    time: "05:00 PM",
    status: "Confirmed",
    amount: 800,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    description: "Child health consultation.",
  },
];

const Appointments = () => {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [search, setSearch] = useState("");

  const handleCancel = (id) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Cancelled" } : item
      )
    );
  };

  const filteredAppointments = appointments.filter((item) =>
    item.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-28 px-6 ">
      {/* 🔹 FIXED HEADER */}
      <div className="fixed top-5 left-64 right-5 bg-white p-5 shadow rounded-lg z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaCalendarCheck className="text-blue-600 text-3xl" />
          <h1 className="text-2xl font-bold">Appointments</h1>
        </div>

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-64"
        />
      </div>

      {/* 🔹 APPOINTMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredAppointments.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition relative"
          >
            {/* STATUS BADGE */}
            <span
              className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full
                ${item.status === "Confirmed"
                  ? "bg-green-100 text-green-700"
                  : item.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {item.status}
            </span>

            <img
              src={item.image}
              alt={item.patientName}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-5">
              <h2 className="font-bold text-lg">{item.patientName}</h2>
              <p className="text-sm text-gray-500">
                {item.department} • {item.doctor}
              </p>

              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <FaStar /> {item.rating}
              </div>

              <p className="text-sm mt-2">{item.description}</p>

              <p className="text-sm mt-2">
                📅 {item.date} | ⏰ {item.time}
              </p>

              <p className="text-sm mt-2 font-semibold text-blue-600">
                💰 Amount: ₹{item.amount}
              </p>

              <button
                onClick={() => handleCancel(item.id)}
                disabled={item.status === "Cancelled"}
                className={`mt-4 w-full py-2 rounded-lg text-white ${item.status === "Cancelled"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;

import React, { useState } from "react";

const DashbordDoctorList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const doctors = [
    {
      name: "Dr. Sharma",
      specialization: "Cardiologist",
      mobile: "9876543210",
      email: "sharma@example.com",
    },
    {
      name: "Dr. Khan",
      specialization: "Neurologist",
      mobile: "9123456780",
      email: "khan@example.com",
    },
    // {
    //   name: "Dr. Patel",
    //   specialization: "Orthopedic",
    //   mobile: "9988776655",
    //   email: "patel@example.com",
    // },
    // {
    //   name: "Dr. Gupta",
    //   specialization: "Dermatologist",
    //   mobile: "9090909090",
    //   email: "gupta@example.com",
    // },
    // {
    //   name: "Dr. Reddy",
    //   specialization: "Pediatrician",
    //   mobile: "9911223344",
    //   email: "reddy@example.com",
    // },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || doctor.specialization === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-green-600">👨‍⚕️ Doctors</h2>

      {/* Search + Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search Doctors..."
          className="border px-3 py-2 rounded-lg w-full focus:outline-green-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Pediatrician">Pediatrician</option>
        </select>
      </div>

      {/* Doctor Cards */}
      <ul className="space-y-4">
        {filteredDoctors.map((doctor, index) => (
          <li
            key={index}
            className="p-4 border rounded-xl bg-gradient-to-r from-green-50 to-white shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
                <p className="text-sm text-green-600 font-medium">{doctor.specialization}</p>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>📞 {doctor.mobile}</p>
              <p>✉️ {doctor.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashbordDoctorList;

import React, { useState } from "react";

const DashbordHospitalList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const hospitals = [
    { name: "Apollo Hospital", city: "Delhi" },
    { name: "Fortis Hospital", city: "Mumbai" },
    { name: "AIIMS", city: "Delhi" },
    // { name: "CMC Hospital", city: "Vellore" },
    // { name: "Narayana Hospital", city: "Bangalore" },
  ];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || hospital.city === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-600">🏥 Hospitals</h2>

      {/* Search + Filter */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search Hospitals..."
          className="border px-3 py-2 rounded-lg w-full focus:outline-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded-lg"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Vellore">Vellore</option>
          <option value="Bangalore">Bangalore</option>
        </select>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {filteredHospitals.map((hospital, index) => (
          <li
            key={index}
            className="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer"
          >
            <p className="font-semibold">{hospital.name}</p>
            <p className="text-sm text-gray-500">{hospital.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashbordHospitalList;

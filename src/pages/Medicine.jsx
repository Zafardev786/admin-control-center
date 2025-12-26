import React, { useState } from "react";
import { FaPills, FaStar } from "react-icons/fa";

/* 🔹 STATIC MEDICINE DATA */
const medicinesData = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1580281658629-1c35c9c8f33c",
    description:
      "Used to treat fever and mild to moderate pain such as headache, toothache, and body pain.",
  },
  {
    id: 2,
    name: "Azithromycin",
    category: "Antibiotic",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
    description:
      "Antibiotic used to treat bacterial infections including respiratory and skin infections.",
  },
  {
    id: 3,
    name: "Cetirizine",
    category: "Allergy",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    description:
      "Antihistamine used to relieve allergy symptoms like sneezing, itching, and runny nose.",
  },
  {
    id: 3,
    name: "Cetirizine",
    category: "Allergy",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    description:
      "Antihistamine used to relieve allergy symptoms like sneezing, itching, and runny nose.",
  },
  {
    id: 3,
    name: "Cetirizine",
    category: "Allergy",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    description:
      "Antihistamine used to relieve allergy symptoms like sneezing, itching, and runny nose.",
  },
  {
    id: 3,
    name: "Cetirizine",
    category: "Allergy",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    description:
      "Antihistamine used to relieve allergy symptoms like sneezing, itching, and runny nose.",
  },
  {
    id: 3,
    name: "Cetirizine",
    category: "Allergy",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    description:
      "Antihistamine used to relieve allergy symptoms like sneezing, itching, and runny nose.",
  },
];

const Medicine = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredMedicines = medicinesData.filter((med) => {
    const matchSearch = med.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      category === "All" || med.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔹 Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-lg shadow mb-8">
        <div className="flex items-center gap-3">
          <FaPills className="text-purple-600 text-3xl" />
          <h1 className="text-2xl font-bold">Find a Medicine</h1>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search medicine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-purple-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="All">All Categories</option>
            <option value="Pain Relief">Pain Relief</option>
            <option value="Antibiotic">Antibiotic</option>
            <option value="Allergy">Allergy</option>
          </select>
        </div>
      </div>

      {/* 🔹 Medicine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredMedicines.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={med.image}
              alt={med.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-lg font-bold">{med.name}</h2>
              <p className="text-sm text-gray-500">{med.category}</p>

              <div className="flex items-center gap-1 mt-2 text-yellow-500">
                <FaStar />
                <span className="text-sm font-semibold text-gray-700">
                  {med.rating}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {med.description}
              </p>

              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Add to Cart
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
  );
};

export default Medicine;

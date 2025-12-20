import React, { useState } from "react";

const Medicine = [
  {
    id: 1,
    name: "Paracetamol",
    brand: "Cipla",
    rating: 4.7,
    description: "Used to treat fever and mild to moderate pain.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  },
  {
    id: 2,
    name: "Azithromycin",
    brand: "Sun Pharma",
    rating: 4.6,
    description: "Antibiotic used for bacterial infections.",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
  },
  {
    id: 3,
    name: "Vitamin C",
    brand: "Himalaya",
    rating: 4.9,
    description: "Boosts immunity and improves overall health.",
    image:
      "https://images.unsplash.com/photo-1615486363973-f79d875c6e6c",
  },
];

const MedicineSection = () => {
  const [search, setSearch] = useState("");

  const filteredMedicines = medicinesData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          💊 Find a Medicine
        </h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search medicine..."
            className="border rounded-lg px-4 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="border rounded-lg px-4 py-2">
            <option>All Types</option>
            <option>Tablet</option>
            <option>Syrup</option>
            <option>Capsule</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.brand}</p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">★ {item.rating}</span>
              </div>

              <p className="text-sm text-gray-600 mt-3">
                {item.description}
              </p>

              <div className="flex gap-3 mt-5">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  Add to Cart
                </button>
                <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
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

export default Medicine

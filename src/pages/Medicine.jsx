import React, { useEffect, useState } from "react";
import { FaPills } from "react-icons/fa";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "http://54.167.190.182:8099/retail/admin/medicines"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch medicines");
      }

      const data = await res.json();
      setMedicines(data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load medicines");
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search filter
  const filteredMedicines = medicines.filter((med) =>
    med.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* 🔹 Header (Image ke according) */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow mb-6">
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
            className="border px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* 🔹 States */}
      {loading && <p>Loading medicines...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && filteredMedicines.length === 0 && (
        <p>No medicines found</p>
      )}

      {/* 🔹 Medicine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMedicines.map((med, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">
              {med.name || "Medicine Name"}
            </h2>
            <p className="text-sm text-gray-600">
              Category: {med.category || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Price: ₹{med.price || 0}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Medicine;

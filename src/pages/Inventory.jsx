import React, { useState } from "react";

/* ===================== INITIAL DATA ===================== */
const initialInventory = [
  { id: "PRD-101", name: "Thermometer", category: "Medical", stock: 120, price: 299 },
  { id: "PRD-102", name: "BP Machine", category: "Equipment", stock: 4, price: 1499 },
  { id: "PRD-103", name: "Surgical Mask", category: "PPE", stock: 0, price: 10 },
  { id: "PRD-104", name: "Hand Gloves", category: "PPE", stock: 18, price: 15 },
  { id: "PRD-105", name: "Oximeter", category: "Equipment", stock: 2, price: 899 },
];

/* ===================== STATUS LOGIC ===================== */
const getStatus = (stock) => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 5) return "Low Stock";
  return "In Stock";
};

const statusStyle = {
  "In Stock": "bg-emerald-100 text-emerald-700",
  "Low Stock": "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-rose-100 text-rose-700",
};

const Inventory = () => {
  const [data, setData] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [audit, setAudit] = useState([]);

  /* ===================== FILTER + SORT ===================== */
  let filtered = data.filter((item) =>
    (item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())) &&
    (category === "All" || item.category === category) &&
    (statusFilter === "All" || getStatus(item.stock) === statusFilter)
  );

  if (sortBy === "stock") filtered.sort((a, b) => a.stock - b.stock);
  if (sortBy === "price") filtered.sort((a, b) => a.price - b.price);

  /* ===================== BULK DELETE ===================== */
  const bulkDelete = () => {
    setData(data.filter((item) => !selected.includes(item.id)));
    setSelected([]);
  };

  /* ===================== DELETE ===================== */
  const deleteItem = (id) => {
    setData(data.filter((item) => item.id !== id));
    setAudit([...audit, `Deleted product ${id}`]);
  };

  /* ===================== SUMMARY ===================== */
  const summary = {
    total: data.length,
    inStock: data.filter((i) => getStatus(i.stock) === "In Stock").length,
    lowStock: data.filter((i) => getStatus(i.stock) === "Low Stock").length,
    outStock: data.filter((i) => getStatus(i.stock) === "Out of Stock").length,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Inventory Management
      </h1>

      {/* ================= SUMMARY ================= */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Items", value: summary.total },
          { title: "In Stock", value: summary.inStock },
          { title: "Low Stock", value: summary.lowStock },
          { title: "Out of Stock", value: summary.outStock },
        ].map((s, i) => (
          <div key={i} className="bg-indigo-500 text-white p-5 rounded-xl shadow">
            <p className="text-sm">{s.title}</p>
            <p className="text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          placeholder="Search ID / Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />

        <select onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option>All</option>
          <option>Medical</option>
          <option>Equipment</option>
          <option>PPE</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option>All</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="">Sort</option>
          <option value="stock">Stock</option>
          <option value="price">Price</option>
        </select>

        {selected.length > 0 && (
          <button onClick={bulkDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Bulk Delete
          </button>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelected(e.target.checked ? data.map((i) => i.id) : [])
                  }
                />
              </th>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => {
              const status = getStatus(item.stock);
              return (
                <tr key={item.id} className="border-t">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() =>
                        setSelected(
                          selected.includes(item.id)
                            ? selected.filter((i) => i !== item.id)
                            : [...selected, item.id]
                        )
                      }
                    />
                  </td>
                  <td className="p-3 text-indigo-600">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs ${statusStyle[status]}`}>
                      {status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= AUDIT ================= */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Audit Log</h3>
        {audit.length === 0 ? (
          <p className="text-sm text-gray-500">No activity yet</p>
        ) : (
          audit.map((a, i) => <p key={i} className="text-sm">• {a}</p>)
        )}
      </div>
    </div>
  );
};

export default Inventory;

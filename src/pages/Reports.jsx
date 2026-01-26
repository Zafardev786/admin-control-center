import React from "react";

const Reports = () => {
  /* ================= SUMMARY CARDS ================= */
  const summaryData = [
    { title: "Total Bookings", value: 120, color: "bg-blue-100 text-blue-600" },
    { title: "Total Revenue", value: "₹85,000", color: "bg-green-100 text-green-600" },
    { title: "Cancelled", value: 12, color: "bg-red-100 text-red-600" },
    { title: "Pending", value: 8, color: "bg-yellow-100 text-yellow-600" },
  ];

  /* ================= REPORT TABLE ================= */
  const reports = [
    {
      id: 1,
      user: "Rohit Sharma",
      type: "Doctor",
      amount: "₹1200",
      status: "Completed",
      date: "12 Jan 2026",
    },
    {
      id: 2,
      user: "Anita Verma",
      type: "Medicine",
      amount: "₹560",
      status: "Pending",
      date: "13 Jan 2026",
    },
    {
      id: 3,
      user: "Aman Khan",
      type: "Hospital",
      amount: "₹4200",
      status: "Cancelled",
      date: "14 Jan 2026",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* ================= 1. SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <div key={index} className={`p-4 rounded shadow ${item.color}`}>
            <p className="text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* ================= 2. FILTERS ================= */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded shadow mb-6">
        <input type="date" className="border p-2 rounded" />
        <input type="date" className="border p-2 rounded" />

        <select className="border p-2 rounded">
          <option>All Categories</option>
          <option>Doctor</option>
          <option>Hospital</option>
          <option>Medicine</option>
        </select>

        <select className="border p-2 rounded">
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* ================= 3. CHARTS (STATIC UI) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Monthly Revenue</h3>
          <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-500">
            📊 Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Booking Status</h3>
          <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-500">
            🥧 Pie Chart Placeholder
          </div>
        </div>
      </div>

      {/* ================= 4. PAYMENT REPORT ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">💳 UPI: ₹40,000</div>
        <div className="bg-white p-4 shadow rounded">💳 Card: ₹30,000</div>
        <div className="bg-white p-4 shadow rounded">💵 Cash: ₹15,000</div>
      </div>

      {/* ================= 5. USER ACTIVITY ================= */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-2">User Activity</h3>
        <ul className="space-y-1 text-sm">
          <li>👤 New Users: 25</li>
          <li>🔥 Active Users: 180</li>
          <li>⭐ Top Customer: Rohit Sharma</li>
        </ul>
      </div>

      {/* ================= 6. DOWNLOAD BUTTONS ================= */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Download PDF
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Export Excel
        </button>
      </div>

      {/* ================= 7. REPORT TABLE ================= */}
      <div className="bg-white rounded shadow overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">User</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{item.user}</td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${item.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.date}</td>
                <td>
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= 8. SYSTEM LOGS ================= */}
      <div className="bg-red-50 p-4 rounded shadow">
        <h3 className="font-semibold text-red-600 mb-2">System Logs</h3>
        <p className="text-sm">❌ Payment failed for Order #1023</p>
        <p className="text-sm">⚠ API timeout at 11:45 AM</p>
      </div>
    </div>
  );
};

export default Reports;

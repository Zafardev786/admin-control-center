import React, { useState } from "react";

/* ===================== VENDOR DETAILS ===================== */
const vendor = {
  name: "Ursag Pvt Ltd",
  vendorCode: "VND-URSAG-001",
  address: "New Delhi, India",
  email: "support@ursag.com",
  gst: "07AAFCU1234M1Z9",
  logo: "https://cdn-icons-png.flaticon.com/512/4320/4320337.png",
};

/* ===================== DASHBOARD STATS ===================== */
const stats = [
  {
    title: "Total Invoices",
    value: "245",
    icon: "📄",
    color: "from-blue-300 to-blue-600",
  },
  {
    title: "Pending Payments",
    value: "12",
    icon: "⏳",
    color: "from-yellow-300 to-yellow-500",
  },
  {
    title: "Paid This Month",
    value: "₹1,20,500",
    icon: "✅",
    color: "from-green-300 to-green-600",
  },
  {
    title: "Overdue Amount",
    value: "₹15,800",
    icon: "⚠️",
    color: "from-red-300 to-red-600",
  },
];




/* ===================== INVOICES ===================== */
const invoices = [
  {
    id: "#INV-1024",
    customer: "Rahul Sharma",
    email: "rahul@gmail.com",
    status: "Pending",
    amount: "₹9,086",
    issueDate: "2023-12-20",
    dueDate: "2024-01-05",
  },
  {
    id: "#INV-1023",
    customer: "Anita Verma",
    email: "anita@gmail.com",
    status: "Paid",
    amount: "₹9,086",
    issueDate: "2023-12-18",
    dueDate: "2024-01-02",
  },
  {
    id: "#INV-1023",
    customer: "Anita Verma",
    email: "anita@gmail.com",
    status: "Paid",
    amount: "₹9,086",
    issueDate: "2023-12-18",
    dueDate: "2024-01-02",
  },
  {
    id: "#INV-1023",
    customer: "Anita Verma",
    email: "anita@gmail.com",
    status: "Paid",
    amount: "₹9,086",
    issueDate: "2023-12-18",
    dueDate: "2024-01-02",
  },
];

/* ===================== STATUS STYLE ===================== */
const statusStyle = {
  Paid: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-indigo-50 text-indigo-700 border border-indigo-300",
  Overdue: "bg-sky-50 text-sky-700 border border-sky-300",
};

/* ===================== INVOICE ITEMS ===================== */
const invoiceItems = [
  { name: "Cetirizine", qty: 1, price: 5000 },
  { name: "Pain Relief", qty: 2, price: 1500 },
  { name: "Azithromycin (1 Year)", qty: 1, price: 1200 },
];

const Billing = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const subtotal = invoiceItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const cgst = Math.round(subtotal * 0.09);
  const sgst = Math.round(subtotal * 0.09);
  const total = subtotal + cgst + sgst;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Billing Dashboard
        </h1>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl shadow">
          + Create Invoice
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`rounded-2xl p-5 flex items-center gap-4
      bg-gradient-to-r ${item.color} text-white
      shadow-sm hover:shadow-md transition`}
          >
            <div className="w-12 h-12 flex items-center justify-center
        rounded-xl bg-white/20 text-xl">
              {item.icon}
            </div>

            <div>
              <p className="text-sm opacity-90">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-4 text-left">Invoice ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Status</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((item, i) => (
              <tr key={i} className="border-t hover:bg-indigo-50">
                <td className="p-4 text-indigo-600 font-semibold">
                  {item.id}
                </td>
                <td className="p-4">{item.customer}</td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-medium ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 font-bold">{item.amount}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedInvoice(item)}
                    className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-lg"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= INVOICE MODAL ================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8 relative">

            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 text-gray-500"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="flex justify-between mb-6">
              <div className="flex gap-3">
                <img src={vendor.logo} alt="logo" className="w-12 h-12" />
                <div>
                  <h2 className="text-xl font-bold underline text-indigo-700">
                    {vendor.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Vendor ID: {vendor.vendorCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    Invoice No: {selectedInvoice.id}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm">
                <p><b>Date:</b> {selectedInvoice.issueDate}</p>
                <p><b>Due Date:</b> {selectedInvoice.dueDate}</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <h3 className="font-semibold text-indigo-600">
                  Company / Vendor Details
                </h3>
                <p>{vendor.address}</p>
                <p>{vendor.email}</p>
                <p className="text-xs text-gray-500">
                  GSTIN: {vendor.gst}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-600">Bill To</h3>
                <p>{selectedInvoice.customer}</p>
                <p>{selectedInvoice.email}</p>
              </div>
            </div>

            {/* ITEMS */}
            <table className="w-full border text-sm mb-6">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Price</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, i) => (
                  <tr key={i}>
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2 text-center">{item.qty}</td>
                    <td className="border p-2 text-right">₹{item.price}</td>
                    <td className="border p-2 text-right">
                      ₹{item.qty * item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTAL */}
            <div className="flex justify-end mb-6">
              <div className="w-64 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (9%)</span>
                  <span>₹{cgst}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (9%)</span>
                  <span>₹{sgst}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-500">
              Thank you for your business 🙏
            </p>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">
                Download PDF
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 border py-2 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Billing;

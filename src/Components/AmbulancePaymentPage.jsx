import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AmbulancePaymentPage = () => {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("ambulanceBookingData"));
    setBookingData(data);
  }, []);

  const handlePayment = async () => {
    if (!bookingData) return alert("No booking data found!");

    const resp = await fetch("http://54.167.190.182:8099/retail/payment/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100, currency: "INR" }),
    });

    const order = await resp.json();
    console.log("ORDER RESPONSE:", order);

    const orderId = order?.orderId;

    if (!orderId) {
      alert("Payment order failed");
      return;
    }

    // Razorpay Checkout
    const options = {
      key: "rzp_test_V5BOZ1QNIXpbsu",
      amount: order.amount * 100,
      currency: "INR",
      name: "Ambulance Booking",
      description: "Payment for Ambulance Service",
      order_id: orderId,

      handler: function (response) {
        localStorage.setItem(
          "ambulancePaymentSuccess",
          JSON.stringify(response)
        );
        window.location.href = "/ambulance-success";
      },

      prefill: {
        name: bookingData.userName,
        email: bookingData.userEmail,
        contact: bookingData.userPhone,
      },

      theme: { color: "#1a73e8" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  return (
    <>
      <Navbar />

      <div className="max-w-5xl ml-36 mt-10 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT SIDE — PAYMENT SUMMARY CARD */}
          <div className="md:col-span-2 bg-white shadow-xl p-6 rounded-xl border border-gray-200">

            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              🧾 Payment Summary
            </h2>

            <div className="space-y-4">

              {/* User Info */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  👤 Customer Details
                </h3>
                <p><b>Name:</b> {bookingData?.userName}</p>
                <p><b>Email:</b> {bookingData?.userEmail}</p>
                <p><b>Phone:</b> {bookingData?.userPhone}</p>
              </div>

              {/* Pickup Info */}
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  📍 Pickup Details
                </h3>
                <p><b>Pickup Location:</b> {bookingData?.pickupLocation}</p>
                <p><b>Ambulance Location:</b> {bookingData?.ambulanceLocation}</p>
                <p><b>Driver:</b> {bookingData?.driverName}</p>
                <p><b>Vehicle:</b> {bookingData?.vehicleType}</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — PRICE CARD LIKE FLIPKART */}
          <div className="bg-white shadow-xl p-6 rounded-xl border border-gray-200 h-fit">

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              💰 Price Details
            </h3>

            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between text-gray-700">
                <span>Ambulance Base Fare</span>
                <span>₹500</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Taxes & Charges</span>
                <span>₹0</span>
              </div>

              <div className="flex justify-between text-gray-800 font-semibold text-lg mt-3">
                <span>Total Amount</span>
                <span>₹500</span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold shadow"
            >
              🚀 Pay ₹500 Now
            </button>

            {/* 100% Safe Payment */}
            <p className="text-center text-sm text-gray-500 mt-3">
              🔐 100% Secure Payment through Razorpay
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default AmbulancePaymentPage;

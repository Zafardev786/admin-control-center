import React from "react";
import Navbar from "./Navbar";
import { FaCheckCircle } from "react-icons/fa";

const AmbulanceSuccess = () => {
  const res = JSON.parse(localStorage.getItem("ambulancePaymentSuccess"));

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-20 p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

          {/* Success Icon */}
          <div className="flex justify-center">
            <FaCheckCircle className="text-green-600 text-6xl" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center mt-4 text-green-600">
            Payment Successful!
          </h2>

          {/* Sub-text */}
          <p className="text-center text-gray-600 mt-2 text-lg">
            Your ambulance booking has been confirmed.
          </p>

          {/* Divider */}
          <div className="border-t mt-6 mb-6"></div>

          {/* Details Section */}
          <div className="text-left space-y-3">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Payment ID:</span>{" "}
              <span className="text-gray-900">{res?.razorpay_payment_id}</span>
            </p>

            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Order ID:</span>{" "}
              <span className="text-gray-900">{res?.razorpay_order_id}</span>
            </p>
          </div>

          {/* Styled Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-blue-600 to-blue-700 
              text-white py-3 px-8 rounded-xl shadow-lg hover:opacity-95 
              transition-all duration-200 text-lg font-semibold"
            >
              Back to Home
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AmbulanceSuccess;

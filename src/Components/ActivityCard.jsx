import React from "react";

const ActivityCard = ({ title, value, color, icon: Icon }) => {
  return (
    <div
      className={`p-5 rounded-2xl shadow-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 cursor-pointer ${color}`}
    >
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md mb-3">
        <Icon className="text-2xl" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      {/* Value */}
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  );
};

export default ActivityCard;

import { useLocation,  useParams,useNavigate } from "react-router-dom";

function HospitalDetails() {
  const { state: hospital } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ id milegi

  if (!hospital) {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        No Hospital Data Found
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 flex gap-10">

        {/* 🔹 LEFT SIDE (Images) */}
        <div className="flex gap-5">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <img
                key={i}
                src={hospital.image}
                alt="thumb"
                className="w-24 h-24 object-cover border rounded-lg cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <img
              src={hospital.image}
              alt={hospital.name}
              className="w-[420px] h-[320px] object-cover rounded-xl hover:scale-105 transition"
            />
          </div>
        </div>

        {/* 🔹 RIGHT SIDE (Details) */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900">
            {hospital.name}
          </h1>

          <p className="text-gray-500 text-lg mt-2">
            {hospital.location}
          </p>

          {/* Highlights */}
          <div className="flex items-center gap-4 mt-5">
            <span className="bg-green-600 text-white px-4 py-1 rounded-md font-semibold">
              {hospital.rating} ★
            </span>
            <span className="text-gray-600">
              {hospital.beds} Beds
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm">
              {hospital.type}
            </span>
          </div>

          {/* Fee */}
          <p className="mt-4 text-xl font-semibold text-green-700">
            Consultation Fee: {hospital.fee}
          </p>

          {/* Description */}
          <p className="mt-6 text-gray-700 leading-relaxed">
            {hospital.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-5 mt-10">
            <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90">
              Book Appointment
            </button>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-200 px-8 py-3 rounded-lg font-semibold"
            >
              Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HospitalDetails;

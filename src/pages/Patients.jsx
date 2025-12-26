import React, { useState } from "react";
import { FaUserInjured, FaStar } from "react-icons/fa";

/* 🔹 STATIC PATIENT DATA */
const patientsData = [
  {
    id: 1,
    name: "Rohit Sharma",
    age: 45,
    condition: "Heart Disease",
    rating: 4.7,
    image:
      "https://th.bing.com/th/id/R.b09e5994859018fa99dfd8d822b09a04?rik=qHIJr8U6kG%2fr0Q&riu=http%3a%2f%2fwww.ashtonshospitalpharmacy.com%2fwp-content%2fuploads%2f2016%2f04%2fSurgical-Patient-involvement-hospital-patient-nurse-iStock_000074621731_Full.jpg&ehk=irH6AAmAd7F2WxaaSLkEKOilcWvhXJFESkPqjrHgx7I%3d&risl=&pid=ImgRaw&r=0",
    description:
      "Patient receiving cardiac treatment with regular monitoring and medication.",
  },
  {
    id: 2,
    name: "Anita Verma",
    age: 32,
    condition: "Neurological Disorder",
    rating: 4.6,
    image:
      "https://th.bing.com/th/id/OIP.GBf7X9t4bXFpkclFHpI1SQHaE7?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Under neurological care with rehabilitation and follow-ups.",
  },
  {
    id: 3,
    name: "Suresh Kumar",
    age: 60,
    condition: "Orthopedic Injury",
    rating: 4.8,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.3y1UV-I5rQ6n6WAcXc3gEwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Recovering from joint replacement surgery with physiotherapy.",
  },

  {
    id: 4,
    name: "Pooja Singh",
    age: 28,
    condition: "Gynecology",
    rating: 4.5,
    image:
      "https://cdn.pixabay.com/photo/2024/05/19/09/37/ai-generated-8772169_1280.png",
    description:
      "Patient undergoing routine gynecological checkups and treatment.",
  },
  {
    id: 5,
    name: "Amit Patel",
    age: 52,
    condition: "Diabetes",
    rating: 4.4,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.KKTTHh4EBDD97y3-S-GyOQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Managing diabetes with regular insulin and lifestyle monitoring.",
  },
  {
    id: 6,
    name: "Neha Gupta",
    age: 36,
    condition: "Dermatology",
    rating: 4.6,
    image:
      "https://png.pngtree.com/png-vector/20240414/ourmid/pngtree-a-compassionate-woman-physician-comforting-an-elderly-gentleman-at-a-care-png-image_12135476.png",
    description:
      "Receiving skin treatment and long-term dermatology care.",
  },
  {
    id: 7,
    name: "Ramesh Yadav",
    age: 65,
    condition: "Respiratory Issues",
    rating: 4.3,
    image:
      "https://healthtian.com/wp-content/uploads/2020/08/Patient1.jpg",
    description:
      "Under treatment for chronic respiratory problems and oxygen support.",
  },
  {
    id: 8,
    name: "Kavita Mehra",
    age: 40,
    condition: "ENT",
    rating: 4.5,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.iEfxvPKlnzWTCgCTVqtI7wHaE8?w=1024&h=683&rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "ENT patient receiving treatment for sinus and hearing issues.",
  },
];


const Patients = () => {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("All");

  const filteredPatients = patientsData.filter((patient) => {
    const matchSearch = patient.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCondition =
      condition === "All" || patient.condition === condition;
    return matchSearch && matchCondition;
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 🔹 MAIN CONTENT */}
      <div className="flex-1 ml-0">
        {/* 🔹 HEADER (FIXED) */}
        <div className="fixed top-0 left-60 right-0 bg-white p-5 shadow z-40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaUserInjured className="text-blue-600 text-3xl" />
            <h1 className="text-2xl font-bold">
              Find a Patient
            </h1>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="All">All Conditions</option>
              <option value="Heart Disease">Heart Disease</option>
              <option value="Neurological Disorder">
                Neurological
              </option>
              <option value="Orthopedic Injury">
                Orthopedic
              </option>
            </select>
          </div>
        </div>

        {/* 🔹 SCROLLABLE LIST (same as Medicine) */}
        <div className="pt-28 px-6 h-full overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={patient.image}
                  alt={patient.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-lg font-bold">
                    {patient.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Age: {patient.age} • {patient.condition}
                  </p>

                  <div className="flex items-center gap-1 mt-2 text-yellow-500">
                    <FaStar />
                    <span className="text-sm font-semibold text-gray-700">
                      {patient.rating}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                    {patient.description}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      View
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
      </div>
    </div>
  );
};

export default Patients;

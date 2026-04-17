// import React, { Component } from 'react'

// export default class ProfileOwner extends Component {
//   render() {
//     return (
//       <div>ProfileOwner</div>
//     )
//   }
// }








import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";

export default function ProfileOwner() {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col gap-6">

      {/* PROFILE CARD */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow p-6">

        {/* Edit */}
        <div className="flex justify-end">
          <button className="p-2 rounded-lg border text-gray-500 hover:bg-gray-100">
            <FaPencil />
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold">
            SM
          </div>

          <h2 className="mt-3 text-xl font-semibold">
            Saryar Mirzayev
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            🇺🇿 Mirzayev Do'koni · Tashkent
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-green-500">8</h3>
            <p className="text-gray-500 text-sm mt-1">
              Fully Paid Loaners
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-500">16</h3>
            <p className="text-gray-500 text-sm mt-1">
              Active Loaners
            </p>
          </div>
        </div>
      </div>

      {/* LOAN SECTION (DROPDOWN) */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6">

        {/* Header with dropdown toggle */}
        <div
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center cursor-pointer"
        >
          <h3 className="text-gray-500 font-semibold tracking-wide">
            FULLY PAID LOANERS
          </h3>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg px-3 py-1 text-sm outline-none"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Arrow */}
            <span className="text-gray-500">
              {open ? "▲" : "▼"}
            </span>
          </div>
        </div>

        {/* Dropdown Content */}
        {open && (
          <div className="mt-4 space-y-4">

            {/* Item 1 */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold">
                  MR
                </div>
                <div>
                  <h4 className="font-medium">Malika Razzagova</h4>
                  <p className="text-gray-500 text-sm">
                    Paid 3 200 000 UZS · Mar 2025
                  </p>
                </div>
              </div>

              <span className="text-green-500 bg-green-100 px-3 py-1 rounded-full text-sm">
                • Paid
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-semibold">
                  ZA
                </div>
                <div>
                  <h4 className="font-medium">Zulfiya Azimova</h4>
                  <p className="text-gray-500 text-sm">
                    Paid 1 500 000 UZS · Feb 2025
                  </p>
                </div>
              </div>

              <span className="text-green-500 bg-green-100 px-3 py-1 rounded-full text-sm">
                • Paid
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold">
                  JO
                </div>
                <div>
                  <h4 className="font-medium">Jasur Ortiqov</h4>
                  <p className="text-gray-500 text-sm">
                    Paid 800 000 UZS · Jan 2025
                  </p>
                </div>
              </div>

              <span className="text-green-500 bg-green-100 px-3 py-1 rounded-full text-sm">
                • Paid
              </span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
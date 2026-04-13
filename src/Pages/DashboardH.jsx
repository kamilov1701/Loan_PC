// import React, { Component } from 'react'

// // Images{
// // import logo from "../src/assets/logo.png"
// // }

// // Icons{
// import { House } from 'lucide-react';
// import { Users } from 'lucide-react';
// import { User } from 'lucide-react';
// import { ChartNoAxesColumn } from 'lucide-react';
// import { Search } from "lucide-react";
// import { Globe } from "lucide-react";
// import { DollarSign } from 'lucide-react';
// import { Check } from 'lucide-react';
// import { Plus, Minus, Eye, Pencil, Trash2, Clock } from "lucide-react";

// // }

// export default class DashboardH extends Component {
//   render() {
//     return (
//       <div>

//       </div >
//     )
//   }
// }







export default function DashboardH() {
  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold">
          Dashboard <span className="text-blue-500">Overview</span>
        </h2>

        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 px-3 py-2 rounded-lg outline-none"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-5 mt-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Total Loans</p>
          <h2 className="text-xl font-bold">84 500 000</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500">Paid Loans</p>
          <h2 className="text-xl font-bold">31 200 000</h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white mt-6 p-5 rounded-xl shadow">

        <h3 className="mb-4 font-semibold">Recent Loaners</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Loan</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td>1</td>
              <td>Anvar Karimov</td>
              <td>+998 99 567 12 78</td>
              <td className="text-red-500">2 500 000</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Bell } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [switchPeriod, setSwitchPeriod] = useState("Weekly");
  const [switchType, setSwitchType] = useState("Kirim");

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const loanData = [12000000, 8500000, 15000000, 6000000]; // Kirim
  const expenseData = [5000000, 9200000, 11000000, 6000000]; // Chiqim

  const barData = {
    labels,
    datasets: [
      {
        label: "Kirim",
        data: loanData,
        backgroundColor: "#2563EB",
      },
      {
        label: "Chiqim",
        data: expenseData,
        backgroundColor: "#10B981",
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Kirim",
        data: loanData,
        borderColor: "#2563EB",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
      },
      {
        label: "Chiqim",
        data: expenseData,
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: {
      y: {
        ticks: {
          callback: (value) => new Intl.NumberFormat("uz-UZ").format(value),
        },
      },
    },
  };

  return (
    <div className="font-sans">

      {/* Header */}
      <section>
        <div className='container flex items-center justify-between'>
          <div className='flex gap-[5px] items-center'>
            <h1 className='text-[21px] font-bold'>Analitika</h1>
            <h2 className='text-[14px] ml-[12px] font-normal'>Insights & reports</h2>
          </div>
          <div className='flex gap-[20px] items-center'>
            <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><a href="/alert"><Bell /></a></button>
            <button><a href="/profile"><span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span></a></button>
          </div>
        </div>
      </section> <hr className='mt-[12px]' />

      {/* Topbar Controls */}
      <div className="flex flex-wrap gap-3 items-center mt-[20px]">
        <div className="flex rounded-lg border overflow-hidden">
          {["Weekly", "Monthly", "Yearly"].map((option) => (
            <button
              key={option}
              onClick={() => setSwitchPeriod(option)}
              className={`px-4 py-2 text-sm ${switchPeriod === option
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border overflow-hidden">
          {["Kirim", "Chiqim"].map((option) => (
            <button
              key={option}
              onClick={() => setSwitchType(option)}
              className={`px-4 py-2 text-sm ${switchType === option
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-[20px] mb-6">
        {[
          { label: "Total Loans", value: 84500000, color: "text-blue-600" },
          { label: "Repaid", value: 31200000, color: "text-green-600" },
          { label: "Outstanding", value: 53300000, color: "text-red-600" },
          { label: "Avg. Loan", value: 3520000, color: "text-yellow-500" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <div className="text-sm text-gray-500">{card.label}</div>
            <div className={`text-lg font-bold ${card.color}`}>
              {new Intl.NumberFormat("uz-UZ").format(card.value)}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-semibold mb-2">Loan Volume — Bar Chart</div>
          <Bar data={barData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="font-semibold mb-2">Trend — Line Chart</div>
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
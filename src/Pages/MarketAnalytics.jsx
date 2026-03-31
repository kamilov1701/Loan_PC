import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      {/* Header */}
      <header className="bg-white rounded-xl shadow flex items-center justify-between px-6 py-4 mb-6">
        <div className="text-lg font-semibold">
          Analytics <span className="text-gray-400 text-sm ml-2">Insights & reports</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search loaners..."
            className="border rounded-lg px-3 py-1 text-sm"
          />
          <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            SM
          </div>
        </div>
      </header>

      {/* Topbar Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Detailed Summary Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="font-semibold mb-4">Detailed Summary</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Period</th>
                <th className="px-3 py-2 border">New Loans</th>
                <th className="px-3 py-2 border">Repayments</th>
                <th className="px-3 py-2 border">Net</th>
                <th className="px-3 py-2 border">Loaners Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2 border">Week 1</td>
                <td className="px-3 py-2 border text-red-600">12 000 000</td>
                <td className="px-3 py-2 border text-green-600">5 000 000</td>
                <td className="px-3 py-2 border text-red-500">–7 000 000</td>
                <td className="px-3 py-2 border">4</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Week 2</td>
                <td className="px-3 py-2 border text-red-600">8 500 000</td>
                <td className="px-3 py-2 border text-green-600">9 200 000</td>
                <td className="px-3 py-2 border text-green-500">+700 000</td>
                <td className="px-3 py-2 border">3</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Week 3</td>
                <td className="px-3 py-2 border text-red-600">15 000 000</td>
                <td className="px-3 py-2 border text-green-600">11 000 000</td>
                <td className="px-3 py-2 border text-red-500">–4 000 000</td>
                <td className="px-3 py-2 border">6</td>
              </tr>
              <tr>
                <td className="px-3 py-2 border">Week 4</td>
                <td className="px-3 py-2 border text-red-600">6 000 000</td>
                <td className="px-3 py-2 border text-green-600">6 000 000</td>
                <td className="px-3 py-2 border text-gray-500">—</td>
                <td className="px-3 py-2 border">2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
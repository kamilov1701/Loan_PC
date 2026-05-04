import React, { useState, useEffect } from "react";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { Bell, TrendingUp, TrendingDown, Users, CreditCard, Clock, Activity } from 'lucide-react';
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
  ArcElement,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Monthly");
  const [type, setType] = useState("Inflow");

  useEffect(() => {
    fetchData(filter);
  }, []);

  const fetchData = (period) => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}get_analytics.php?period=${period}`)
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <Activity className="animate-spin text-blue-600" size={32} />
      <span className="text-gray-500 font-medium">Loading Analytics...</span>
    </div>
  );

  const statusLabels = stats.status_data.map(d => d.status);
  const statusValues = stats.status_data.map(d => d.count);

  const barData = {
    labels: statusLabels,
    datasets: [{
      label: "Number of Clients",
      data: statusValues,
      backgroundColor: ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#6B7280"],
      borderRadius: 6,
    }]
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Loan Growth",
      data: [30, 45, 35, 60, 55, 80],
      borderColor: "#2563EB",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      fill: true,
      tension: 0.4,
    }]
  };

  const doughnutData = {
    labels: statusLabels,
    datasets: [{
      data: statusValues,
      backgroundColor: ["#2563EB", "#10B981", "#F59E0B", "#EF4444", "#6B7280"],
      borderWidth: 0,
    }]
  };

  const pieData = {
    labels: ["New", "Regular", "Returned"],
    datasets: [{
      data: [40, 35, 25],
      backgroundColor: ["#8B5CF6", "#EC4899", "#F59E0B"],
    }]
  };

  return (
    <div className="font-sans pb-20 pt-10 px-4 md:px-8 space-y-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <section className="container mx-auto">
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic'>Analytics</h1>
            <p className='text-sm font-medium text-slate-500 uppercase tracking-widest'>Financial Insights & Activity Reports</p>
          </div>
          <div className='flex gap-4 items-center'>
            <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95'>
              <a href="/alert"><Bell className="text-slate-600 dark:text-slate-400" size={24} /></a>
            </button>
            <button className="active:scale-95 transition-transform">
              <a href="/profile">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-sm font-black shadow-lg">SM</span>
              </a>
            </button>
          </div>
        </div>
        <hr className='mt-8 border-slate-200 dark:border-slate-800' />
      </section>


      <section className="container mx-auto space-y-6">
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {["Daily", "Weekly", "Monthly", "Yearly", "EveryYear"].map(t => (
              <button 
                key={t}
                onClick={() => {
                  setFilter(t);
                  fetchData(t);
                }}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${filter === t ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {["Inflow", "Outflow"].map(t => (
              <button 
                key={t}
                onClick={() => {
                  setType(t);
                  fetchData(filter);
                }}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${type === t ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 py-2 px-4 bg-indigo-50 dark:bg-indigo-950/30 w-fit rounded-full border border-indigo-100 dark:border-indigo-900/50">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
           </span>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">Viewing {filter} {type} data</span>
        </div>
      </section>


      <section className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { label: "Total Loans", value: stats.total_loans, color: "text-indigo-600", icon: <CreditCard size={20} className="text-indigo-500" /> },
            { label: "Repaid", value: stats.repaid, color: "text-emerald-600", icon: <TrendingUp size={20} className="text-emerald-500" /> },
            { label: "Outstanding", value: stats.outstanding, color: "text-rose-600", icon: <TrendingDown size={20} className="text-rose-500" /> },
            { label: "Avg. Loan", value: stats.avg_loan, color: "text-amber-500", icon: <Users size={20} className="text-amber-500" /> },
          ].map((card) => (
            <div key={card.label} className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 p-8 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{card.label}</div>
              <div className={`text-2xl font-black tracking-tight ${card.color}`}>
                {new Intl.NumberFormat("uz-UZ").format(Math.floor(card.value))}
              </div>
              <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest opacity-60">UZS currency</p>
            </div>
          ))}
        </div>
      </section>


      <section className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 p-10 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Loan Volume</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Analysis v2.0</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600">
                <Activity size={20} />
              </div>
            </div>
            <div className="h-[350px]">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 p-10 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Growth Trend</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time dynamic stats</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="h-[350px]">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 p-10 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Distribution</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan Status Breakdown</p>
              </div>
            </div>
            <div className="h-[350px] flex items-center justify-center">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-800 p-10 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic">Customer Mix</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Segmentation</p>
              </div>
            </div>
            <div className="h-[350px] flex items-center justify-center">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

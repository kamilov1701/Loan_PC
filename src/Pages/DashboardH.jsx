import React, { useState, useEffect } from 'react';
import { Bell, Search, Globe, DollarSign, Check, Plus, Minus, Eye, Pencil, Trash2, Clock, TrendingUp, Activity, X, User as UserIcon } from "lucide-react";
import AnimatedNumber from '../Components/AnimatedNumber';

export default function DashboardH() {
  const [stats, setStats] = useState({
    total_loans: 0,
    active_loaners: 0,
    paid_total: 0,
    paid_count: 0,
    growth: 0
  });
  const [loaners, setLoaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "User", initials: "U" });
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const userData = JSON.parse(session);
        const name = userData.name || userData.login || "User";
        const initials = name.substring(0, 2).toUpperCase();
        setUser({ ...userData, name, initials, id: userData.id || 0 });
      } catch (e) {
        console.error("Session parse error", e);
      }
    }

    const fetchData = async () => {
      try {
        const [statsRes, loanersRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}get_stats.php`),
          fetch(`${import.meta.env.VITE_API_URL}get_loaners.php`)
        ]);
        
        const statsData = await statsRes.json();
        const loanersData = await loanersRes.json();
        
        if (statsData && !statsData.error) {
          setStats(statsData);
        }
        
        const session = localStorage.getItem("userSession");
        const userData = session ? JSON.parse(session) : null;
        let finalLoaners = Array.isArray(loanersData) ? loanersData : [];
        if (userData && userData.role === 'Admin') {
            finalLoaners = finalLoaners.filter(l => String(l.casser_id) === String(userData.id));
        }
        setLoaners(finalLoaners); 
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dark:text-white transition-colors duration-500">
      <section className="px-4">
        <div className='container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic'>Management</h1>
            <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Overview</h2>
          </div>
          <div className='flex gap-4 items-center w-full md:w-auto justify-end'>
            <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'>
              <a href="/alert"><Bell className="text-slate-600 dark:text-slate-400" size={20} /></a>
            </button>
            <button>
              <a href="/profile" className="flex items-center gap-3 group">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                  {user.initials}
                </span>
              </a>
            </button>
          </div>
        </div>
      </section>
 <hr className='mt-[12px] border-slate-200 dark:border-slate-800' />

      <section className='container header_home mt-6 px-4'>
        <div className='flex flex-col lg:flex-row gap-[16px] mt-[28px]'>
          
          <div className="flex gap-[16px] py-[23px] px-[23px] w-full lg:w-[50%]">
            <span>
              <div className="bg-[#EFF6FF] text-indigo-600 w-[48px] h-[48px] rounded-[12px] flex items-center justify-center">
                <DollarSign size={24} strokeWidth={2} />
              </div>
            </span>
            <div>
              <p className="text-[#fff] text-[17px] font-medium">Total Loan Amount</p>
              <h2 className="text-[#fff] text-[24px] font-extrabold mt-0.5">
                <AnimatedNumber value={stats.total_loans} />
              </h2>
              <p className="text-[#fff] text-[15px] font-normal opacity-70">UZS · {stats.active_loaners} Active Debtors</p>
              <h3 className="text-[#10B981] text-[11px] font-semibold px-[8px] py-[5px] mt-[5px] bg-[#ECFDF5] rounded-[20px] w-fit">
                ↑ +12% this month
              </h3>
            </div>
          </div>

          <div className="flex gap-[16px] py-[23px] px-[23px] w-full lg:w-[50%]">
            <span>
              <div className="bg-[#ECFDF5] text-emerald-600 w-[48px] h-[48px] rounded-[12px] flex items-center justify-center">
                <Check size={24} strokeWidth={2} />
              </div>
            </span>
            <div>
              <p className="text-[#fff] text-[17px] font-medium">Total Repaid Amount</p>
              <h2 className="text-[#fff] text-[24px] font-extrabold mt-0.5">
                <AnimatedNumber value={stats.paid_total} />
              </h2>
              <p className="text-[#fff] text-[15px] font-normal opacity-70">UZS · {stats.paid_count} Fully Paid</p>
              <h3 className="text-[#10B981] text-[11px] font-semibold px-[8px] py-[5px] mt-[5px] bg-[#ECFDF5] rounded-[20px] w-fit">
                ↑ +5% this month
              </h3>
            </div>
          </div>

        </div>
      </section>

      <section className='container px-4'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between mt-8 mb-4 gap-4'>
          <h2 className='text-slate-900 dark:text-white text-xs font-black uppercase tracking-[0.2em] opacity-70'>Recently Added Loans</h2>
          <div className="w-full md:w-[400px] h-11 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center px-4 bg-white dark:bg-slate-950 shadow-sm focus-within:border-indigo-500 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full h-full outline-none text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-4'>
          {loading ? (
            <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading...</div>
          ) : (
            <>
              <div className='hidden md:block border border-slate-200 dark:border-slate-800 rounded-2xl w-full overflow-x-auto bg-white dark:bg-slate-900 shadow-sm'>
                <div className='flex bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 min-w-[1000px]'>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[45px] px-4'>#</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[199px] px-4'>Debtor</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[154px] px-4'>Phone</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[141px] px-4'>Amount</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[112px] px-4'>Start Date</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[115px] px-4'>Deadline</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[120px] px-4'>Status</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex-1 px-4 text-center'>Actions</div>
                </div>
                {loaners.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone_number.includes(searchTerm)).slice(0, 5).map((loaner, index) => (
                  <div key={loaner.id} className='flex items-center border-t border-slate-100 dark:border-slate-800 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group min-w-[1000px]'>
                    <div className='w-[45px] text-slate-400 text-[13px] font-medium px-[12px]'>{index + 1}</div>
                    <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
                      {loaner.image ? (
                        <img src={`${import.meta.env.VITE_API_URL}${loaner.image}`} alt={loaner.name} className="w-[34px] h-[34px] rounded-xl object-cover shadow-sm" />
                      ) : (
                        <span className="w-[34px] h-[34px] rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[11px] font-black">{loaner.name.substring(0, 2).toUpperCase()}</span>
                      )}
                      <h2 className='text-slate-900 dark:text-white text-[13px] font-bold group-hover:text-indigo-600 transition-colors'>{loaner.name}</h2>
                    </div>
                    <div className='text-slate-500 dark:text-slate-400 text-[13px] font-medium w-[154px] px-[12px]'>{loaner.phone_number}</div>
                    <div className='text-rose-600 dark:text-rose-400 text-[14px] font-black w-[141px] px-[12px]'>{loaner.loan_amount}</div>
                    <div className='text-slate-500 dark:text-slate-400 text-[13px] font-medium w-[112px] px-[12px]'>{loaner.start_date}</div>
                    <div className='text-slate-500 dark:text-slate-400 text-[13px] font-medium w-[112px] px-[12px]'>{loaner.deadline}</div>
                    <div className='w-[120px]'><span className='text-indigo-600 dark:text-indigo-400 font-black text-[10px] bg-indigo-50 dark:bg-indigo-500/10 rounded-full px-3 py-1 uppercase tracking-tighter'>• {loaner.status}</span></div>
                    <div className='flex gap-4 items-center justify-center flex-1 px-[12px]'>
                      <a href={`/plus-loan?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-600 transition-all"><Plus size={16} /></a>
                      <a href={`/minus-loan?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 transition-all"><Minus size={16} /></a>
                      <a href={`/history?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-all"><Clock size={16} /></a>
                      <button onClick={() => { setPreviewImage(loaner.image ? `${import.meta.env.VITE_API_URL}${loaner.image}` : null); setShowModal(true); }} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 transition-all"><Eye size={16} /></button>
                      <a href={`/edit-loaner?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-600 transition-all"><Pencil size={16} /></a>
                    </div>
                  </div>
                ))}
              </div>

              <div className='md:hidden space-y-4'>
                {loaners.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.phone_number.includes(searchTerm)).slice(0, 5).map((loaner) => (
                  <div key={loaner.id} className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm relative overflow-hidden'>
                    <div className='flex items-center gap-3 mb-4'>
                      {loaner.image ? (
                        <img src={`${import.meta.env.VITE_API_URL}${loaner.image}`} alt={loaner.name} className="w-10 h-10 rounded-xl object-cover shadow-md" />
                      ) : (
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-black">{loaner.name.substring(0, 2).toUpperCase()}</span>
                      )}
                      <div>
                        <h2 className='text-slate-900 dark:text-white text-sm font-black leading-tight'>{loaner.name}</h2>
                        <p className='text-slate-400 text-[10px] font-bold uppercase tracking-widest'>{loaner.phone_number}</p>
                      </div>
                      <span className='ml-auto text-[9px] font-black bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-lg uppercase tracking-tighter'>
                        {loaner.status}
                      </span>
                    </div>
                    <div className='grid grid-cols-2 gap-4 py-3 border-y border-slate-50 dark:border-slate-800/50 mb-4'>
                      <div>
                        <p className='text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1'>Amount</p>
                        <p className='text-rose-600 dark:text-rose-400 text-sm font-black'>{loaner.loan_amount} <span className='text-[10px] opacity-60 font-medium'>UZS</span></p>
                      </div>
                      <div className='text-right'>
                        <p className='text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1'>Deadline</p>
                        <p className='text-slate-700 dark:text-slate-300 text-sm font-black'>{loaner.deadline}</p>
                      </div>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                      <a href={`/plus-loan?id=${loaner.id}`} className='flex-1 py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center transition-all'><Plus size={16} /></a>
                      <a href={`/minus-loan?id=${loaner.id}`} className='flex-1 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center transition-all'><Minus size={16} /></a>
                      <a href={`/history?id=${loaner.id}`} className='flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center transition-all'><Clock size={16} /></a>
                      <button onClick={() => { setPreviewImage(loaner.image ? `${import.meta.env.VITE_API_URL}${loaner.image}` : null); setShowModal(true); }} className='flex-1 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center transition-all'><Eye size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-slate-900/50 hover:bg-slate-900 text-white rounded-full z-10 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="p-8 flex flex-col items-center">
              {previewImage ? (
                <img src={previewImage} alt="Loaner" className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-lg" />
              ) : (
                <div className="w-64 h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400">
                   <UserIcon size={64} className="mb-4 opacity-20" />
                   <p className="text-xs font-black uppercase tracking-widest">No Image Available</p>
                </div>
              )}
              <div className="mt-8 w-full flex justify-center">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/30 transition-all active:scale-95"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
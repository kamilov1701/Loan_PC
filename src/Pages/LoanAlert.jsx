import React, { useState, useEffect } from 'react';
import { Search, Bell, Phone, MessageSquare, Calendar, ArrowRight, Clock, AlertTriangle } from "lucide-react";

export default function LoanAlert() {
  const [data, setData] = useState({ overdue: [], upcoming: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}get_alerts.php`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleTelegram = (phone, name) => {
    const message = encodeURIComponent(`Salom ${name}, qarzingiz to'lash muddati haqida eslatma.`);
    window.open(`https://t.me/${phone.replace('+', '').replace(' ', '')}?text=${message}`, '_blank');
  };

  const filterLoans = (list) => {
    return list.filter(l => 
      l.name.toLowerCase().includes(search.toLowerCase()) || 
      l.phone_number.includes(search)
    );
  };

  if (loading) return <div className="p-10 text-center text-slate-400 font-black uppercase tracking-[0.2em] animate-pulse">Yuklanmoqda...</div>;

  const overdueFiltered = filterLoans(data.overdue);
  const upcomingFiltered = filterLoans(data.upcoming);

  return (
    <div className="pb-24 lg:pb-10 min-h-screen transition-colors duration-500 dark:text-white">
      <section className="px-4">
        <div className='container flex flex-col md:flex-row items-center justify-between py-6 gap-6'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic'>Ogohlantirishlar</h1>
            <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Overview</h2>
          </div>
          
          <div className='flex gap-4 items-center w-full md:w-auto'>
            <div className="flex-1 md:w-[300px] h-11 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center px-4 bg-white dark:bg-slate-950 shadow-sm focus-within:border-indigo-500 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Qidirish..." 
                className="w-full h-full outline-none text-sm bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm'><Bell className="text-indigo-500" size={20} /></button>
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg">SM</span>
          </div>
        </div>
      </section>
      <hr className='border-slate-100 dark:border-slate-800' />

      <section className='container px-4 mt-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center'>
                        <AlertTriangle size={18} strokeWidth={3} />
                    </div>
                    <h2 className='text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest'>Muddati o'tgan</h2>
                </div>
                <span className='px-3 py-1 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-tighter shadow-lg shadow-rose-500/20'>
                    {overdueFiltered.length} Active
                </span>
            </div>

            <div className='space-y-4'>
              {overdueFiltered.length === 0 ? (
                <div className='p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800'>
                  <p className='text-xs font-bold text-slate-400 uppercase tracking-widest opacity-50'>Hozircha muddati o'tgan qarzlar yo'q</p>
                </div>
              ) : (
                overdueFiltered.map(item => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1 bg-rose-500 h-full"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                          {item.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{item.name}</h4>
                          <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                            <Clock size={10} /> Muddati o'tgan: {item.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-rose-600 dark:text-rose-400 tracking-tight">{item.loan_amount}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.phone_number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                      <button 
                        onClick={() => handleCall(item.phone_number)}
                        className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <Phone size={14} /> Qo'ng'iroq
                      </button>
                      <button 
                        onClick={() => handleTelegram(item.phone_number, item.name)}
                        className="flex-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <MessageSquare size={14} /> Telegram
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center'>
                        <Calendar size={18} strokeWidth={3} />
                    </div>
                    <h2 className='text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest'>Kelgusi to'lovlar</h2>
                </div>
                <span className='px-3 py-1 bg-indigo-500 text-white text-[10px] font-black rounded-full uppercase tracking-tighter shadow-lg shadow-indigo-500/20'>
                    {upcomingFiltered.length} Soon
                </span>
            </div>

            <div className='space-y-4'>
              {upcomingFiltered.length === 0 ? (
                <div className='p-12 text-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800'>
                  <p className='text-xs font-bold text-slate-400 uppercase tracking-widest opacity-50'>Yaqin haftada to'lovlar yo'q</p>
                </div>
              ) : (
                upcomingFiltered.map(item => (
                  <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1 bg-indigo-500 h-full"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg group-hover:scale-110 transition-transform">
                          {item.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{item.name}</h4>
                          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                            <Calendar size={10} /> Muddat: {item.deadline}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-slate-900 dark:text-white tracking-tight">{item.loan_amount}</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.phone_number}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4 border-t border-slate-50 dark:border-slate-800/50">
                      <button 
                        onClick={() => handleCall(item.phone_number)}
                        className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <Phone size={14} /> Qo'ng'iroq
                      </button>
                      <button 
                        onClick={() => handleTelegram(item.phone_number, item.name)}
                        className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
                      >
                        <MessageSquare size={14} /> Telegram
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
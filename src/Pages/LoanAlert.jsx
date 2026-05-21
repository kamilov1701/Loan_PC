import React, { useState, useEffect } from 'react';
import { Search, Bell, Phone, MessageSquare, Calendar, ArrowRight, Clock, AlertTriangle, Pencil, X, Save, CheckCircle2 } from "lucide-react";

export default function LoanAlert() {
  const [data, setData] = useState({ overdue: [], upcoming: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchData = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleTelegram = (phone, name) => {
    const message = encodeURIComponent(`Salom ${name}, qarzingiz to'lash muddati haqida eslatma.`);
    window.open(`https://t.me/${phone.replace('+', '').replace(' ', '')}?text=${message}`, '_blank');
  };

  const handleEditClick = (item) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    
    const formData = new FormData();
    Object.keys(editingItem).forEach(key => {
        formData.append(key, editingItem[key]);
    });

    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}update_loaner_info.php`, {
            method: 'POST',
            body: formData
        });
        const result = await res.json();
        if (result.success) {
            setToast({ type: 'success', message: 'Muvaffaqiyatli yangilandi!' });
            setIsModalOpen(false);
            fetchData();
        } else {
            setToast({ type: 'error', message: result.error || 'Xatolik yuz berdi' });
        }
    } catch (err) {
        setToast({ type: 'error', message: 'Serverga ulanishda xatolik' });
    } finally {
        setUpdateLoading(false);
        setTimeout(() => setToast(null), 3000);
    }
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
                      <div className="text-right flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-base font-black text-rose-600 dark:text-rose-400 tracking-tight">{item.loan_amount}</p>
                            <button 
                                onClick={() => handleEditClick(item)}
                                className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                <Pencil size={12} />
                            </button>
                        </div>
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
                      <div className="text-right flex flex-col items-end">
                         <div className="flex items-center gap-2 mb-1">
                            <p className="text-base font-black text-slate-900 dark:text-white tracking-tight">{item.loan_amount}</p>
                            <button 
                                onClick={() => handleEditClick(item)}
                                className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors"
                            >
                                <Pencil size={12} />
                            </button>
                        </div>
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

      {/* Quick Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative max-w-md w-full bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full z-10 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Calendar size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Muddatni Yangilash</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{editingItem?.name}</p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Yangi Muddat (Deadline)</label>
                  <input 
                    type="date" 
                    required
                    className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl px-5 outline-none font-bold text-slate-900 dark:text-white transition-all"
                    value={editingItem?.deadline || ''}
                    onChange={(e) => setEditingItem({...editingItem, deadline: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                  <select 
                    className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-indigo-500/30 rounded-2xl px-5 outline-none font-bold text-slate-900 dark:text-white transition-all appearance-none"
                    value={editingItem?.status || 'Active'}
                    onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit"
                        disabled={updateLoading}
                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-3"
                    >
                        {updateLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Save size={18} /> Saqlash
                            </>
                        )}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-24 lg:bottom-10 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 ${toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
            <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
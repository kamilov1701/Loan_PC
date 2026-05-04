import React, { useState, useEffect } from 'react';
import { Bell, Search, FileText, Plus, Minus, Eye, Pencil, Trash2, Clock, Funnel, User as UserIcon } from "lucide-react";

const statusMap = {
  'New': { label: 'Yangi', color: 'text-blue-600 bg-blue-50' },
  'Active': { label: 'Faol', color: 'text-emerald-600 bg-emerald-50' },
  'Due Soon': { label: 'Muddati yaqin', color: 'text-amber-600 bg-amber-50' },
  'Overdue': { label: 'Muddati o\'tgan', color: 'text-red-600 bg-red-50' },
  'Paid': { label: 'To\'langan', color: 'text-gray-600 bg-gray-50' }
};

export default function ListLoan() {
  const [loaners, setLoaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [user, setUser] = useState({ name: "User", initials: "U" });
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const userData = JSON.parse(session);
        const name = userData.name || userData.login || "User";
        const initials = name.substring(0, 2).toUpperCase();
        setUser({ ...userData, name, initials });
      } catch (e) {
        console.error("Session parse error", e);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}get_loaners.php`)
      .then(res => res.json())
      .then(data => {
        setLoaners(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
        setLoaners([]);
      });
  }, []);

  const filteredLoaners = loaners.filter(loaner => {
    const matchesSearch = loaner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loaner.phone_number.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || loaner.status === filterStatus;
    const matchesRole = user.role === 'Admin' ? String(loaner.casser_id) === String(user.id) : true;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleExportXLS = () => {
    const headers = ["ID", "Name", "Phone", "Amount", "Start Date", "Deadline", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredLoaners.map(l => [
        l.id,
        `"${l.name}"`,
        `"${l.phone_number}"`,
        `"${l.loan_amount}"`,
        l.start_date,
        l.deadline,
        l.status
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `loaners_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pb-10">
      <section className="px-4">
        <div className='container flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-6'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic'>Debtors</h1>
            <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>All Clients</h2>
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
      </section> <hr className='mt-[12px]' />

      <section className='container px-4'>
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mt-8 mb-6 w-full gap-4'>
          <div className='flex flex-col md:flex-row gap-3 items-start md:items-center w-full lg:w-auto'>
            <div className="w-full md:w-[350px] h-11 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center px-4 bg-white dark:bg-slate-950 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all shadow-sm">
              <Search className="w-5 h-5 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full h-full outline-none text-sm bg-transparent text-slate-700 dark:text-slate-300 placeholder-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex gap-2 w-full md:w-auto relative'>
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className='flex-1 md:flex-none text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-bold px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2 transition-colors'
              >
                <Funnel className='opacity-60' size={16} /> {filterStatus === 'All' ? 'Filter' : filterStatus}
              </button>
              {showFilterDropdown && (
                <div className="absolute top-12 left-0 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-[60] overflow-hidden">
                    {['All', 'Active', 'Paid', 'Overdue', 'Due Soon'].map(status => (
                        <button 
                            key={status}
                            onClick={() => { setFilterStatus(status); setShowFilterDropdown(false); }}
                            className={`w-full px-5 py-3 text-left text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${filterStatus === status ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-600 dark:text-slate-400'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
              )}
              <button 
                onClick={handleExportXLS}
                className='flex-1 md:flex-none text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-bold px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2 transition-colors'
              >
                <FileText className='opacity-60' size={16} /> Export
              </button>
            </div>
          </div>
          <button onClick={() => window.location.href = '/new-loaner'} className='w-full lg:w-auto text-white text-xs font-black px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-widest'>
            <Plus size={18} /> New Client
          </button>
        </div>

        <div className='mt-4'>
          {loading ? (
            <div className="p-10 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Loading...</div>
          ) : filteredLoaners.length === 0 ? (
            <div className="p-10 text-center text-slate-500 font-bold uppercase tracking-widest text-xs opacity-50">No Clients Found</div>
          ) : (
            <>
              <div className='hidden md:block border border-slate-200 dark:border-slate-800 rounded-2xl w-full overflow-x-auto bg-white dark:bg-slate-900 shadow-sm'>
                <div className='flex bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 min-w-[1000px]'>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[45px] px-4'>#</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[199px] px-4'>Loaner</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[154px] px-4'>Phone</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[141px] px-4'>Loan Amount</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[112px] px-4'>Start Date</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[115px] px-4'>Deadline</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest w-[120px] px-4'>Status</div>
                  <div className='py-4 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest flex-1 px-4 text-center'>Actions</div>
                </div>
                {filteredLoaners.map((loaner, index) => (
                  <div key={loaner.id} className='flex items-center border-b border-slate-100 dark:border-slate-800 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group min-w-[1000px]'>
                    <div className='w-[45px] text-slate-400 text-[13px] px-4'>{index + 1}</div>
                    <div className='flex w-[199px] px-4 gap-3 items-center'>
                      {loaner.image ? (
                        <img src={`${import.meta.env.VITE_API_URL}${loaner.image}`} alt={loaner.name} className="w-10 h-10 rounded-xl object-cover shadow-sm" />
                      ) : (
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-sm">
                          {loaner.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                      <div><h2 className='text-slate-900 dark:text-white text-[13px] font-bold group-hover:text-indigo-600 transition-colors'>{loaner.name}</h2></div>
                    </div>
                    <div className='text-slate-500 dark:text-slate-400 text-[13px] font-medium w-[154px] px-4'>{loaner.phone_number}</div>
                    <div className='text-rose-600 dark:text-rose-400 text-[14px] font-black w-[141px] px-4'>{loaner.loan_amount}</div>
                    <div className='text-slate-500 dark:text-slate-400 text-[13px] font-medium w-[112px] px-4'>{loaner.start_date}</div>
                    <div className='text-slate-500 dark:text-slate-400 text-[13px] font-medium w-[112px] px-4'>{loaner.deadline}</div>
                    <div className='w-[120px]'>
                      <span className={`font-black text-[10px] rounded-full px-3 py-1 uppercase tracking-tighter ${statusMap[loaner.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                        • {statusMap[loaner.status]?.label || loaner.status}
                      </span>
                    </div>
                    <div className='flex gap-4 items-center flex-1 px-4 justify-center'>
                      <a href={`/plus-loan?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-600 transition-all"><Plus size={16} /></a>
                      <a href={`/minus-loan?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 transition-all"><Minus size={16} /></a>
                      <a href={`/history?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-all"><Clock size={16} /></a>
                      <button onClick={() => { setPreviewImage(loaner.image ? `${import.meta.env.VITE_API_URL}${loaner.image}` : null); setShowModal(true); }} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 transition-all"><Eye size={16} /></button>
                      {(user.role === 'Programmer' || user.role === 'Owner') && (
                        <>
                          <a href={`/edit-loaner?id=${loaner.id}`} className="p-2 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-400 hover:text-amber-600 transition-all"><Pencil size={16} /></a>
                          <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-600 transition-all"><Trash2 size={16} /></button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>


              <div className='md:hidden space-y-4'>
                {filteredLoaners.map((loaner) => (
                  <div key={loaner.id} className='bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm relative overflow-hidden'>
                    <div className='flex items-center gap-3 mb-4'>
                      {loaner.image ? (
                        <img src={`${import.meta.env.VITE_API_URL}${loaner.image}`} alt={loaner.name} className="w-10 h-10 rounded-xl object-cover shadow-md" />
                      ) : (
                        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-sm">
                          {loaner.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                      <div>
                        <h2 className='text-slate-900 dark:text-white text-sm font-black leading-tight'>{loaner.name}</h2>
                        <p className='text-slate-400 text-[10px] font-bold uppercase tracking-widest'>{loaner.phone_number}</p>
                      </div>
                      <span className={`ml-auto text-[9px] font-black rounded-lg px-2 py-1 uppercase tracking-tighter ${statusMap[loaner.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                        {statusMap[loaner.status]?.label || loaner.status}
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
                    <div className='flex flex-wrap justify-between items-center gap-2'>
                      <a href={`/plus-loan?id=${loaner.id}`} className='flex-1 min-w-[45px] py-2.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center transition-all'><Plus size={16} /></a>
                      <a href={`/minus-loan?id=${loaner.id}`} className='flex-1 min-w-[45px] py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl flex items-center justify-center transition-all'><Minus size={16} /></a>
                      <a href={`/history?id=${loaner.id}`} className='flex-1 min-w-[45px] py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center transition-all'><Clock size={16} /></a>
                      <button onClick={() => { setPreviewImage(loaner.image ? `${import.meta.env.VITE_API_URL}${loaner.image}` : null); setShowModal(true); }} className='flex-1 min-w-[45px] py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center transition-all'><Eye size={16} /></button>
                      {(user.role === 'Programmer' || user.role === 'Owner') && (
                        <a href={`/edit-loaner?id=${loaner.id}`} className='flex-1 min-w-[45px] py-2.5 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center transition-all'><Pencil size={16} /></a>
                      )}
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
              <Eye className="rotate-180" size={24} />
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
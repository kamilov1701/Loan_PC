import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Globe, Plus, Minus, FileText, ArrowLeft, Clock } from "lucide-react";

export default function HistoryLoanC() {
    const [searchParams] = useSearchParams();
    const loanerId = searchParams.get('id');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loanerId) {
            fetch(`${import.meta.env.VITE_API_URL}get_transactions.php?loaner_id=${loanerId}`)
                .then(res => res.json())
                .then(resData => {
                    setData(resData);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [loanerId]);

    if (loading) return <div className="p-10 text-center text-slate-400 font-black uppercase tracking-[0.2em] animate-pulse">Loading...</div>;
    if (!data || data.error) return <div className="p-10 text-center text-rose-500 font-bold uppercase tracking-widest">{data?.error || "Data not found"}</div>;

    const { loaner, transactions } = data;

    return (
        <div className="pb-24 lg:pb-10 min-h-screen transition-colors duration-500 dark:text-white">
            <section className="px-4">
                <div className='container flex items-center justify-between py-6'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic'>History</h1>
                        <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                        <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>{loaner.name}</h2>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm'><Globe className="text-slate-400" size={20} /></button>
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg">SM</span>
                    </div>
                </div>
            </section>
            <hr className='border-slate-100 dark:border-slate-800' />

            <section className='container px-4 mt-8'>
                <div className='bg-gradient-to-br from-slate-900 to-indigo-900 w-full rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden'>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className='relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
                        <div>
                            <div className='flex items-center gap-2 mb-2'>
                                <h1 className='text-white text-xl md:text-2xl font-black tracking-tight uppercase italic'>{loaner.name}</h1>
                                <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">| Transaction History</span>
                            </div>
                            <h3 className='text-3xl md:text-4xl font-black text-white tracking-tighter'>{loaner.loan_amount} <span className="text-sm text-white/50 uppercase">UZS</span></h3>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                            <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Status</p>
                            <span className="text-white font-black text-xs uppercase tracking-widest px-3 py-1 bg-white/20 rounded-full border border-white/20">
                                {loaner.status}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <main className='container px-4 mt-10 max-w-4xl'>
                <div className='bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden'>
                    <div className='p-8 border-b border-slate-50 dark:border-slate-800/50 flex items-center justify-between'>
                        <h4 className='text-xs font-black text-slate-400 uppercase tracking-[0.25em]'>All Transactions</h4>
                        <span className="text-[10px] font-black text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-tighter">
                            {transactions.length} Transactions
                        </span>
                    </div>

                    <div className='divide-y divide-slate-50 dark:divide-slate-800/50'>
                        {transactions.length === 0 ? (
                            <div className="p-16 text-center text-slate-300 font-bold uppercase tracking-widest text-xs opacity-50">No transactions yet</div>
                        ) : (
                            transactions.map((t) => (
                                <div key={t.id} className='flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group'>
                                    <div className='flex gap-5 items-center'>
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg ${
                                            t.type === 'Added' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                        }`}>
                                            {t.type === 'Added' ? <Plus size={20} strokeWidth={3} /> : <Minus size={20} strokeWidth={3} />}
                                        </div>
                                        <div>
                                            <h4 className='text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-indigo-600 transition-colors'>
                                                {t.type === 'Added' ? '+ Added Loan' : '– Reduced Loan'}
                                            </h4>
                                            <p className='text-xs text-slate-400 font-bold uppercase tracking-widest mt-1'>{t.comment || "No comment"}</p>
                                        </div>
                                    </div>
                                    <div className='text-right'>
                                        <p className={`text-base font-black tracking-tight ${t.type === 'Added' ? 'text-indigo-600 dark:text-indigo-400' : 'text-rose-600 dark:text-rose-400'}`}>
                                            {t.type === 'Added' ? '+' : '–'}{new Intl.NumberFormat().format(t.amount)} <span className="text-[10px]">UZS</span>
                                        </p>
                                        <p className='text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1'>
                                            {new Date(t.created_at).toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className='p-8 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-50 dark:border-slate-800/50 flex flex-col sm:flex-row gap-4 items-center justify-between'>
                        <button className='w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95 transition-all'>
                            <FileText size={16} /> Export XLSX
                        </button>
                        <a href="/list" className='w-full sm:w-auto text-center text-slate-400 hover:text-indigo-600 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2'>
                            <ArrowLeft size={14} /> Back to List
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
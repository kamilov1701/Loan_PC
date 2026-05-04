import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Bell, Globe, ArrowLeft, MinusCircle } from 'lucide-react';

export default function MinusLoanC() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const loanerId = searchParams.get('id');
  
  const [loaner, setLoaner] = useState(null);
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loanerId) {
      fetch(`${import.meta.env.VITE_API_URL}get_transactions.php?loaner_id=${loanerId}`)
        .then(res => res.json())
        .then(data => {
          if (data.loaner) setLoaner(data.loaner);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [loanerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}update_loan.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loaner_id: loanerId,
          amount: parseInt(amount),
          type: 'Reduced',
          comment: comment,
          casser_id: JSON.parse(localStorage.getItem("userSession") || "{}").id
        })
      });
      const data = await res.json();
      if (data.success) {
        navigate(`/history?id=${loanerId}`);
      } else {
        alert(data.error || "An error occurred");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-slate-400 font-black uppercase tracking-[0.2em] animate-pulse">Loading...</div>;
  if (!loaner) return <div className="p-10 text-center text-rose-500 font-bold uppercase tracking-widest">Client not found</div>;

  const currentVal = parseInt(loaner.loan_amount.replace(/[^0-9]/g, ''));
  const newVal = currentVal - (parseInt(amount) || 0);

  return (
    <div className="pb-24 lg:pb-10 min-h-screen transition-colors duration-500 dark:text-white">
      <section className="px-4">
        <div className='container flex items-center justify-between py-6'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic text-rose-500'>Reduce Loan</h1>
            <div className="w-1 h-1 rounded-full bg-rose-500"></div>
            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>{loaner.name}</h2>
          </div>
          <div className='flex gap-4 items-center'>
            <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm'><a href="/alert"><Bell className="text-slate-400" size={20} /></a></button>
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg">SM</span>
          </div>
        </div>
      </section>
      <hr className='border-slate-100 dark:border-slate-800' />

      <section className='container px-4 mt-8'>
        <div className='bg-gradient-to-br from-slate-900 to-rose-900 w-full rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden'>
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className='relative z-10'>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">Current Total Debt Amount</p>
                <h3 className='text-3xl md:text-4xl font-black text-white tracking-tighter'>{loaner.loan_amount}</h3>
            </div>
        </div>
      </section>

      <main className='container px-4 mt-10 max-w-2xl'>
        <form onSubmit={handleSubmit} className='bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl p-8 md:p-10'>
            <div className='space-y-8'>
                <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block'>Enter Payment Amount (UZS) <span className='text-rose-500'>*</span></label>
                    <input 
                        className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-xl md:text-2xl font-black text-slate-900 dark:text-white outline-none focus:border-rose-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700' 
                        type="number" 
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder='0' 
                    />
                </div>

                <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block'>Comment (Optional)</label>
                    <textarea 
                        className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-rose-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 h-24 resize-none' 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='e.g. To`liq to`lov, naqd pulda...'
                    ></textarea>
                </div>

                <div className='bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 p-6 rounded-2xl'>
                    <div className='flex justify-between items-center'>
                        <p className='text-[10px] font-black text-rose-500 uppercase tracking-widest'>Remaining Debt Amount</p>
                        <p className='text-xl font-black text-rose-600 dark:text-rose-400'>{new Intl.NumberFormat().format(newVal)} <span className="text-xs">UZS</span></p>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 pt-4'>
                    <button 
                        type="submit"
                        disabled={submitting}
                        className='flex-1 bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2'
                    >
                        {submitting ? "Processing..." : <><MinusCircle size={18} /> Save Payment</>}
                    </button>
                    <button 
                        type="button"
                        onClick={() => navigate(-1)}
                        className='flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
      </main>
    </div>
  );
}

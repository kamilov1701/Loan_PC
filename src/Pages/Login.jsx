import React, { useState, useEffect } from "react";
import { User, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { RiEyeFill, RiEyeCloseFill, RiSecurePaymentLine } from "react-icons/ri";
import logo from "../assets/Logo_MAX.png";
import heroImg from "../assets/login-hero.png";

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (formData.login && formData.password) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          const data = await res.json();

          if (data.success) {
            localStorage.setItem("userSession", JSON.stringify({
                ...data.user,
                timestamp: new Date().getTime()
            }));
            
            setIsSubmitting(false);
            setShowWelcome(true);
            
            setTimeout(() => {
              if (onLogin) onLogin();
            }, 2000);
          } else {
            setError(data.error || "Incorrect login or password");
            setIsSubmitting(false);
          }
        } catch (err) {
          setError("Error connecting to server");
          setIsSubmitting(false);
        }
    } else {
        setError("Please fill in all fields");
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-[#050505] font-sans selection:bg-indigo-100 dark:selection:bg-indigo-500/30 transition-colors duration-500">
      
      {showWelcome && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-black transition-all duration-500 animate-fadeIn">
          <div className="relative">
            <div className="w-32 h-32 bg-white dark:bg-slate-900 rounded-[40px] flex items-center justify-center shadow-2xl shadow-indigo-500/20 border-4 border-indigo-600/10 p-5 animate-pulse">
              <img src={logo} alt="MAX LOAN" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -inset-6 border-2 border-indigo-500/20 rounded-[50px] animate-ping"></div>
          </div>
          <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic animate-pulse">
            Welcome Back!
          </h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
            MAX LOAN • ACCESSING SYSTEM
          </p>
        </div>
      )}

      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-slate-100 dark:bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="Workspace" 
            className="w-full h-full object-cover opacity-90 dark:opacity-60 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent dark:from-black/60 dark:to-transparent"></div>
        </div>

        <div className="relative z-10 w-full h-full p-16 flex flex-col justify-between">
          <div className="flex items-center gap-4 group">
            <div className="w-16 h-16 bg-white/90 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-2.5 shadow-2xl border border-white/20 transition-transform duration-500 group-hover:scale-110">
              <img src={logo} alt="MAX LOAN" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                MAX <span className="text-indigo-600 dark:text-indigo-400">LOAN</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Management System</p>
            </div>
          </div>

          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-xl text-white text-xs font-bold mb-6 shadow-xl shadow-indigo-500/20">
              <RiSecurePaymentLine size={18} />
              Professional Financial Tools
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
              Towards <br />
              <span className="text-indigo-600 dark:text-indigo-400">Excellence</span> in Finance.
            </h2>
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed opacity-80">
              Manage loans, payments, and customer databases with high precision through our system.
            </p>
          </div>

          <div className="flex items-center gap-6 text-slate-400 dark:text-slate-600 text-xs font-bold uppercase tracking-widest">
            <span>Security First</span>
            <div className="w-1 h-1 rounded-full bg-current"></div>
            <span>v3.2.0</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 bg-white dark:bg-[#050505]">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden flex justify-center mb-12">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-12 h-12" />
              <span className="text-2xl font-black text-slate-900 dark:text-white italic">MAX LOAN</span>
            </div>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Welcome!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your credentials to login.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 p-4 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <User size={18} strokeWidth={2.5} />
                </div>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                  className="w-full pl-14 pr-5 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-indigo-500/30 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-900 rounded-[20px] outline-none transition-all duration-300 text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-4 bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent focus:border-indigo-500/30 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-900 rounded-[20px] outline-none transition-all duration-300 text-slate-900 dark:text-white font-bold placeholder:text-slate-300 dark:placeholder:text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-300 hover:text-indigo-500 transition-colors"
                >
                  {showPassword ? <RiEyeCloseFill size={22} /> : <RiEyeFill size={22} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center cursor-pointer select-none group/check">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-5 h-5 rounded-md border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-200 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                </div>
                <span className="ml-3 text-sm font-bold text-slate-500 dark:text-slate-400 group-hover/check:text-slate-700 dark:group-hover/check:text-slate-300 transition-colors">
                  Remember Me
                </span>
              </label>
              
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <ShieldCheck size={12} />
                Secure
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[20px] font-black text-lg uppercase tracking-[0.15em] shadow-2xl shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              {isSubmitting ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Login
                  <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} LOAN MANAGEMENT • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

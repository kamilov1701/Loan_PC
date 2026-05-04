import React from 'react';
import { HiSun, HiMoon } from "react-icons/hi";

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-[60]">
      <button
        onClick={toggleTheme}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all duration-300 shadow-lg group
          ${isDarkMode 
            ? "bg-slate-900 border-slate-800 text-white hover:bg-slate-800" 
            : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"}`}
      >
        <div className="relative w-5 h-5">
          <HiSun 
            className={`absolute inset-0 transition-all duration-500 transform 
              ${isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100 text-yellow-500"}`} 
            size={20} 
          />
          <HiMoon 
            className={`absolute inset-0 transition-all duration-500 transform 
              ${isDarkMode ? "opacity-100 rotate-0 scale-100 text-indigo-400" : "opacity-0 -rotate-90 scale-0"}`} 
            size={20} 
          />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">
          {isDarkMode ? "Tun" : "Kunduz"}
        </span>
        
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 blur-md -z-10
          ${isDarkMode ? "bg-indigo-500/20" : "bg-yellow-500/10"}`}></div>
      </button>
    </div>
  );
};

export default ThemeToggle;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiClipboardList,
  HiPlusCircle,
  HiChartBar,
  HiSun,
  HiMoon
} from "react-icons/hi";
import logo from "../assets/Logo_MAX.png";

function NavbarDash({ isDarkMode, toggleTheme }) {
  const location = useLocation();


  const navItems = [
    { name: "New Client", path: "/new-loaner", icon: <HiPlusCircle /> },
    { name: "Dashboard", path: "/dashboard", icon: <HiHome /> },
    { name: "Client List", path: "/list", icon: <HiClipboardList /> },
    { name: "Analytics", path: "/analytics", icon: <HiChartBar /> },
    { name: "Profile", path: "/profile", icon: <HiUser /> },
  ];

  return (
    <>
      <div className={`hidden lg:flex flex-col w-64 xl:w-72 min-h-screen p-6 transition-colors duration-500 border-r bg-slate-950 border-slate-900 text-white`}>
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl p-3 shadow-2xl mb-4 border-4 border-slate-800 transition-colors">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <h2 className="text-xl font-black tracking-tighter uppercase italic">
            MAX <span className="text-indigo-600 dark:text-indigo-400">LOAN</span>
          </h2>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-200
                    ${location.pathname === item.path 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" 
                      : "hover:bg-slate-900 text-slate-400"}`}
                >
                  <div className="text-xl">{item.icon}</div>
                  <span className="text-sm tracking-wide">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between p-2 bg-slate-900 rounded-2xl border border-slate-800 mb-6">
            <button 
              onClick={() => isDarkMode && toggleTheme()}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${!isDarkMode 
                   ? "bg-white text-indigo-600 shadow-sm" 
                   : "text-slate-500 hover:text-slate-300"}`}
            >
              <HiSun size={14} />
              kun
            </button>
            <button 
              onClick={() => !isDarkMode && toggleTheme()}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${isDarkMode 
                   ? "bg-slate-800 text-indigo-400 shadow-sm" 
                   : "text-slate-400 hover:text-slate-600"}`}
            >
              <HiMoon size={14} />
              tun
            </button>
          </div>
          <p className={`text-[10px] font-black uppercase text-center tracking-widest ${isDarkMode ? "text-white" : "text-white/40"}`}>
            &copy; 2026 MAX LOAN
          </p>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md lg:hidden z-50">
        <div className={`flex justify-around items-center py-4 px-2 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-500
          ${isDarkMode 
            ? "bg-slate-900/80 border-slate-800 text-white" 
            : "bg-white/80 border-slate-200 text-slate-900"}`}>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex flex-col items-center gap-1.5 transition-all duration-300 group
                  ${isActive ? "scale-110" : "opacity-60 hover:opacity-100"}`}
              >
                <div className={`text-2xl transition-transform duration-300 ${isActive ? "text-indigo-500 -translate-y-1" : "text-slate-400 group-hover:scale-110"}`}>
                  {item.icon}
                </div>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                )}
                <span className={`text-[9px] font-black uppercase tracking-tighter transition-colors ${isActive ? "text-indigo-500" : "text-slate-500"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NavbarDash;
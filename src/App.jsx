import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import NavbarDash from "./Components/NavbarDash";
import ThemeToggle from "./Components/ThemeToggle";

import Login from "./Pages/Login";
import DashboardH from "./Pages/DashboardH";
import EditLoanerInfo from "./Pages/EditLoanerInfo";
import HistoryLoanC from "./Pages/HistoryLoanC";
import ListLoan from "./Pages/ListLoan";
import LoanAlert from "./Pages/LoanAlert";
import MarketAnalytics from "./Pages/MarketAnalytics";
import MinusLoanC from "./Pages/MinusLoanC";
import NewLoanerC from "./Pages/NewLoanerC";
import PlusLoan from "./Pages/PlusLoan";
import ProfileOwner from "./Pages/ProfileOwner";

import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (!session && !isLoginPage) {
      navigate("/login");
    }
  }, [location.pathname, navigate, isLoginPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-slate-950" : "bg-slate-50"}`}>
      {!isLoginPage && <NavbarDash isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}

      <div className={`flex-1 ${!isLoginPage ? "p-5 pb-20 lg:pb-5 lg:ml-0" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => navigate("/")} />} />
          <Route path="/" element={<DashboardH />} />
          <Route path="/dashboard" element={<DashboardH />} />
          <Route path="/edit-loaner" element={<EditLoanerInfo />} />
          <Route path="/history" element={<HistoryLoanC />} />
          <Route path="/list" element={<ListLoan />} />
          <Route path="/alert" element={<LoanAlert />} />
          <Route path="/analytics" element={<MarketAnalytics />} />
          <Route path="/minus-loan" element={<MinusLoanC />} />
          <Route path="/new-loaner" element={<NewLoanerC />} />
          <Route path="/plus-loan" element={<PlusLoan />} />
          <Route path="/profile" element={<ProfileOwner isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import NavbarDash from "./Components/NavbarDash";

// Pages
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
  return (
    <Router>
      <div className="flex">

        {/* Sidebar / Navbar */}
        <NavbarDash />

        {/* Main Content */}
        <div className="flex-1 p-5">
          <Routes>
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
            <Route path="/profile" element={<ProfileOwner />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
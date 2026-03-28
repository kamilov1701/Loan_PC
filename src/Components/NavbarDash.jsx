import { Link } from "react-router-dom";

function NavbarDash() {
  return (
    <div className="w-[250px] h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-5">Loan App</h2>

      <ul className="space-y-3">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/new-loaner">New Loaner</Link></li>
        <li><Link to="/list">Loaners List</Link></li>
        <li><Link to="/plus-loan">Add Loan</Link></li>
        <li><Link to="/minus-loan">Pay Loan</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/alert">Alerts</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

export default NavbarDash;
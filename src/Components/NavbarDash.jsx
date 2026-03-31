// // import { Link } from "react-router-dom";

// // function NavbarDash() {
// //   return (
// //     <div className="w-[250px] h-screen bg-gray-800 text-white p-4">
// //       <h2 className="text-xl mb-5">Loan App</h2>

// //       <ul className="space-y-3">
// //         <li><Link to="/dashboard">Dashboard</Link></li>
// //         <li><Link to="/new-loaner">New Loaner</Link></li>
// //         <li><Link to="/list">Loaners List</Link></li>
// //         <li><Link to="/plus-loan">Add Loan</Link></li>
// //         <li><Link to="/minus-loan">Pay Loan</Link></li>
// //         <li><Link to="/history">History</Link></li>
// //         <li><Link to="/analytics">Analytics</Link></li>
// //         <li><Link to="/alert">Alerts</Link></li>
// //         <li><Link to="/profile">Profile</Link></li>
// //       </ul>
// //     </div>
// //   );
// // }

// // export default NavbarDash;







// import { Link, useLocation } from "react-router-dom";
// import {
//   HiHome,
//   HiUser,
//   HiClipboardList,
//   HiPlusCircle,
//   HiMinusCircle,
//   HiChartBar,  // <- Use this instead of HiChartPie
//   HiBell,
//   HiCog
// } from "react-icons/hi";

// const navItems = [
//   { name: "Dashboard", path: "/dashboard", icon: <HiHome /> },
//   { name: "New Loaner", path: "/new-loaner", icon: <HiPlusCircle /> },
//   { name: "Loaners List", path: "/list", icon: <HiClipboardList /> },
//   { name: "Add Loan", path: "/plus-loan", icon: <HiPlusCircle /> },
//   { name: "Pay Loan", path: "/minus-loan", icon: <HiMinusCircle /> },
//   { name: "History", path: "/history", icon: <HiChartBar /> },
//   { name: "Analytics", path: "/analytics", icon: <HiChartBar /> },
//   { name: "Alerts", path: "/alert", icon: <HiBell /> },
//   { name: "Profile", path: "/profile", icon: <HiUser /> },
//   { name: "Settings", path: "/settings", icon: <HiCog /> },
// ];

// return (
//   <>
//     {/* Desktop Sidebar */}
//     <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800 text-white p-4">
//       <h2 className="text-2xl font-bold mb-6">Loan App</h2>
//       <ul className="space-y-3">
//         {navItems.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition-colors ${location.pathname === item.path ? "bg-gray-700" : ""
//                 }`}
//             >
//               <div className="text-xl">{item.icon}</div>
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Mobile Bottom Navbar */}
//     <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around p-2 md:hidden shadow-inner">
//       {navItems.map((item) => (
//         <Link
//           key={item.name}
//           to={item.path}
//           className={`flex flex-col items-center text-xs ${location.pathname === item.path ? "text-blue-500" : "text-gray-300"
//             }`}
//         >
//           <div className="text-2xl">{item.icon}</div>
//           <span>{item.name}</span>
//         </Link>
//       ))}
//     </div>
//   </>
// );
// }

// export default NavbarDash;




import { Link, useLocation } from "react-router-dom";
import {
  HiHome,
  HiUser,
  HiClipboardList,
  HiPlusCircle,
  HiMinusCircle,
  HiChartBar,
  HiBell,
  HiCog
} from "react-icons/hi";

function NavbarDash() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <HiHome /> },
    { name: "New Loaner", path: "/new-loaner", icon: <HiPlusCircle /> },
    { name: "Loaners List", path: "/list", icon: <HiClipboardList /> },
    // { name: "Add Loan", path: "/plus-loan", icon: <HiPlusCircle /> },
    // { name: "Pay Loan", path: "/minus-loan", icon: <HiMinusCircle /> },
    // { name: "History", path: "/history", icon: <HiChartBar /> },
    { name: "Analytics", path: "/analytics", icon: <HiChartBar /> },
    // { name: "Alerts", path: "/alert", icon: <HiBell /> },
    { name: "Profile", path: "/profile", icon: <HiUser /> },
    // { name: "Settings", path: "/settings", icon: <HiCog /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Loan App</h2>
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 ${location.pathname === item.path ? "bg-gray-700" : ""
                  }`}
              >
                <div className="text-lg">{item.icon}</div>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-around p-2 md:hidden shadow-inner">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center text-xs ${location.pathname === item.path
                ? "text-blue-500"
                : "text-gray-300"
              }`}
          >
            <div className="text-2xl">{item.icon}</div>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export default NavbarDash;
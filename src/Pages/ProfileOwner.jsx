import React, { useState, useEffect } from "react";
import { 
  HiPencil, HiCamera, HiShieldCheck, HiOutlineLocationMarker, 
  HiBadgeCheck, HiX, HiPlus, HiTrash, HiClock, HiUserAdd, HiEye, HiEyeOff,
  HiUserGroup, HiTrendingUp, HiCash, HiChevronRight, HiOutlineShieldCheck,
  HiOutlineCube, HiOutlineChartBar, HiOutlineBell, HiLogout
} from "react-icons/hi";
import { RiVipCrownFill, RiAdminFill, RiUserSettingsFill, RiDatabase2Fill, RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export default function ProfileOwner() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    id: null, 
    name: "User", 
    login: "",
    role: "Admin",
    image: null, 
    local_image: null,
    location: "Mirzayev Do'koni - Tashkent"
  });
  const [stats, setStats] = useState({ paid: 0, active: 0, period_total: 0, total_lent: 0 });
  const [cassers, setCassers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddCasserModalOpen, setIsAddCasserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isAdminActivityModalOpen, setIsAdminActivityModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminActivity, setAdminActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(false);
  
  const [editData, setEditData] = useState({ name: "", password: "", image: null });
  const [uploading, setUploading] = useState(false);

  const [newCasser, setNewCasser] = useState({ 
    name: "", 
    login: "", 
    password: "", 
    status: "Active", 
    role: "Admin",
    image: null 
  });
  const [showCasserPass, setShowCasserPass] = useState(false);
  const [addingCasser, setAddingCasser] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const session = localStorage.getItem("userSession");
      if (!session) {
        navigate('/login');
        return;
      }
      const userData = JSON.parse(session);
      setUser(prev => ({
        ...prev,
        ...userData,
        initials: (userData.name || "U").substring(0, 2).toUpperCase()
      }));

      const responses = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}manage_cassers.php`).then(res => res.json()),
        fetch(`${import.meta.env.VITE_API_URL}get_analytics.php?period=Monthly`).then(res => res.json()),
        fetch(`${import.meta.env.VITE_API_URL}get_loaners.php`).then(res => res.json())
      ]);

      const [cassersRes, analyticsRes, loanersRes] = responses;

      if (!Array.isArray(cassersRes)) {
        console.error("cassersRes is not an array:", cassersRes);
        setLoading(false);
        return;
      }

      const currentUser = cassersRes.find(c => String(c.id) === String(userData.id)) || userData;
      
      const finalUser = {
        ...user,
        ...currentUser,
        id: currentUser.id || userData.id,
        name: currentUser.name || userData.name || "User",
        role: currentUser.role || userData.role || "Admin",
        status: currentUser.status || userData.status || "Active"
      };

      setUser({
        ...finalUser,
        initials: (finalUser.name).substring(0, 2).toUpperCase(),
      });
      setEditData(prev => ({ ...prev, name: finalUser.name }));

      setCassers(cassersRes);
      setLogs(analyticsRes.recent_logs || []);
      
      if (Array.isArray(loanersRes)) {
          setStats({
            paid: loanersRes.filter(l => l.status === 'Paid').length,
            active: loanersRes.filter(l => l.status === 'Active').length,
            period_total: analyticsRes.total_loans || 0,
            total_lent: loanersRes.reduce((acc, curr) => acc + parseInt(String(curr.loan_amount).replace(/[^0-9]/g, '') || 0), 0)
          });
      }
      setLoading(false);
    } catch (err) {
      console.error("fetchUserData Error:", err);
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("name", editData.name);
    if (editData.password) formData.append("password", editData.password);
    if (editData.image) formData.append("image", editData.image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}update_profile.php`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        const updatedUser = {
          ...user,
          name: data.name || user.name,
          image: data.image || user.image,
          local_image: data.local_image || user.local_image
        };
        setUser(updatedUser);
        
        const session = JSON.parse(localStorage.getItem("userSession") || "{}");
        if (data.name) session.name = data.name;
        if (data.image) session.image = data.image;
        if (data.local_image) session.local_image = data.local_image;
        localStorage.setItem("userSession", JSON.stringify(session));
        
        setIsEditModalOpen(false);
        setEditData({ ...editData, password: "", image: null });
        fetchUserData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddCasser = async (e) => {
    e.preventDefault();
    setAddingCasser(true);

    const formData = new FormData();
    formData.append("name", newCasser.name);
    formData.append("login", newCasser.login);
    formData.append("password", newCasser.password);
    formData.append("status", newCasser.status);
    formData.append("role", newCasser.role);
    if (newCasser.image) formData.append("image", newCasser.image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}manage_cassers.php`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        setIsAddCasserModalOpen(false);
        setNewCasser({ name: "", login: "", password: "", status: "Active", role: "Admin", image: null });
        fetchUserData();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAddingCasser(false);
    }
  };

  const handleDeleteCasser = async (id) => {
    if (!window.confirm("Foydalanuvchini o'chirishni tasdiqlaysizmi?")) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}manage_cassers.php?id=${id}`, {
      method: 'DELETE'
    });
    if (res.ok) fetchUserData();
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    const formData = new FormData();
    formData.append("id", selectedUser.id);
    formData.append("name", selectedUser.name);
    formData.append("role", selectedUser.role);
    formData.append("status", selectedUser.status);
    if (selectedUser.new_image) formData.append("image", selectedUser.new_image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}manage_cassers.php`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setIsEditUserModalOpen(false);
        fetchUserData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const fetchAdminActivity = async (adminId) => {
    setLoadingActivity(true);
    setIsAdminActivityModalOpen(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}get_admin_activity.php?id=${adminId}`);
      const data = await res.json();
      if (data.success) {
        setAdminActivity(data.loans);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    navigate('/login');
  };

  const getRoleIcon = (role, status) => {
    if (status === 'Programmer' || role === 'Programmer') return <RiVipCrownFill className="text-indigo-500" />;
    if (role === 'Owner') return <RiAdminFill className="text-amber-500" />;
    return <RiUserSettingsFill className="text-emerald-500" />;
  };

  const getRoleBadge = (role, status) => {
    if (role === 'Programmer') return <span className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-black rounded-lg uppercase tracking-tighter border border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]">Programmer</span>;
    if (role === 'Owner') return <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-[10px] font-black rounded-lg uppercase tracking-tighter border border-indigo-500/20">Owner</span>;
    return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-lg uppercase tracking-tighter border border-emerald-500/20">Admin</span>;
  };

  const canManage = (targetRole, targetStatus) => {
    if (user.role === 'Programmer') return true;
    if (user.role === 'Owner') {
        if (targetRole === 'Admin') return true;
        return false;
    }
    return false;
  };

  const canDelete = (targetRole) => {
    if (user.role === 'Programmer') return true;
    if (user.role === 'Owner' && targetRole === 'Admin') return true;
    return false;
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-slate-950">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen pb-32 transition-colors duration-500 bg-[#F8FAFC] dark:bg-[#020617]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        
        <div className="flex items-center justify-between py-8 relative z-10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 dark:border-slate-800">
                    <HiOutlineCube size={24} className="text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Profile <span className="text-indigo-600">Center</span></h1>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Control Panel</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={() => navigate('/alert')} className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:text-indigo-600 transition-all shadow-lg">
                    <HiOutlineBell size={20} />
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-500/5">
                    <HiLogout size={18} /> Logout
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 relative z-10">
            <div className="lg:col-span-4 xl:col-span-3">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden group">
                    <div className="h-32 bg-gradient-to-r from-indigo-600 to-blue-600 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-[32px] bg-white dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-2xl overflow-hidden flex items-center justify-center">
                                    {user.image || user.local_image ? (
                                        <img 
                                            src={user.local_image ? `${import.meta.env.VITE_BASE_URL}${user.local_image}` : user.image} 
                                            alt="Profile" 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-4xl font-black text-indigo-500">{user.initials}</span>
                                    )}
                                </div>
                                <button 
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="absolute -bottom-1 -right-1 p-2.5 bg-white dark:bg-slate-800 text-indigo-600 rounded-xl shadow-xl hover:scale-110 transition-transform border border-slate-100 dark:border-slate-700"
                                >
                                    <HiPencil size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="pt-16 pb-10 px-8 text-center">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">{user.name}</h2>
                        <div className="flex justify-center mt-3 mb-6">
                            {getRoleBadge(user.role, user.status)}
                        </div>
                        
                        <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                            <div className="flex items-center gap-3 text-slate-400">
                                <HiOutlineLocationMarker className="text-rose-500 shrink-0" size={18} />
                                <span className="text-[11px] font-bold uppercase tracking-wide truncate">{user.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <RiDatabase2Fill className="text-indigo-500 shrink-0" size={18} />
                                <span className="text-[11px] font-bold uppercase tracking-wide">ID: #00{user.id}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <HiBadgeCheck className="text-emerald-500 shrink-0" size={18} />
                                <span className="text-[11px] font-bold uppercase tracking-wide">Verified Identity</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsEditModalOpen(true)}
                            className="w-full mt-8 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-600 dark:text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-9 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                    {[
                        { label: "Successful", val: stats.paid, icon: <HiBadgeCheck size={22}/>, color: "emerald" },
                        { label: "Active Loans", val: stats.active, icon: <HiTrendingUp size={22}/>, color: "indigo" },
                        { label: "Monthly Sales", val: stats.period_total, isMoney: true, icon: <HiCash size={22}/>, color: "amber" },
                        { label: "Total Lent", val: stats.total_lent, isMoney: true, icon: <HiOutlineChartBar size={22}/>, color: "blue" }
                    ].map((card, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-${card.color}-500/5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`}></div>
                            <div className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500 mb-4`}>
                                {card.icon}
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {card.isMoney ? card.val.toLocaleString() : card.val}
                                {card.isMoney && <span className="text-xs opacity-50 ml-1.5 uppercase font-bold">UZS</span>}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-tight flex items-center gap-2">
                                <HiTrendingUp className="text-emerald-500" /> Today's Staff Activity
                            </h3>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Today's Results</p>
                        </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
                        {(user.role === 'Admin' ? cassers.filter(c => String(c.id) === String(user.id) && c.today_lent_total > 0) : cassers.filter(c => c.today_lent_total > 0)).length === 0 ? (
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest p-4">No activity today</p>
                        ) : (
                            (user.role === 'Admin' ? cassers.filter(c => String(c.id) === String(user.id) && c.today_lent_total > 0) : cassers.filter(c => c.today_lent_total > 0)).map(admin => (
                                <div 
                                    key={admin.id} 
                                    onClick={() => { setSelectedUser(admin); fetchAdminActivity(admin.id); }}
                                    className="min-w-[240px] bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 group hover:border-emerald-500/50 transition-all cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <HiTrendingUp size={40} className="text-emerald-500" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center text-sm font-black text-indigo-500 shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800">
                                            {admin.local_image ? <img src={`${import.meta.env.VITE_BASE_URL}${admin.local_image}`} className="w-full h-full object-cover" /> : admin.name[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-tighter truncate w-32">{admin.name}</h4>
                                            <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-wider">{admin.today_count} Clients Issued</p>
                                        </div>
                                    </div>
                                    <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                                        {parseInt(admin.today_lent_total).toLocaleString()} <span className="text-[10px] opacity-50 font-bold uppercase">UZS</span>
                                    </p>
                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                                        {admin.last_loan_client ? (
                                            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate">
                                                {admin.name} → {admin.last_loan_client} <span className="text-emerald-500">({admin.last_loan_amount})</span> → Today
                                            </p>
                                        ) : (
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                Active Performance
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                    
                    <div className="xl:col-span-3 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tight flex items-center gap-2">
                                    <HiUserGroup size={22} className="text-indigo-600" /> Personnel
                                </h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Staff Management</p>
                            </div>
                            {(user.role === 'Programmer' || user.role === 'Owner') && (
                                <button 
                                    onClick={() => setIsAddCasserModalOpen(true)}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <HiUserAdd size={16} /> Add Staff
                                </button>
                            )}
                        </div>

                        <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                            {cassers.length === 0 ? (
                                <div className="p-20 text-center flex flex-col items-center">
                                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-200 dark:text-slate-700 mb-4">
                                        <HiUserGroup size={40} />
                                    </div>
                                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">No users found</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {cassers.filter(c => user.role === 'Admin' ? String(c.id) === String(user.id) : true).map(casser => (
                                        <div key={casser.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                                            <div className="flex items-center gap-5">
                                                <div className="relative">
                                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-xl flex items-center justify-center">
                                                        {casser.local_image ? (
                                                            <img src={`${import.meta.env.VITE_BASE_URL}${casser.local_image}`} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <span className="text-xl font-black text-indigo-500">{casser.name[0].toUpperCase()}</span>
                                                        )}
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 ${casser.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'} shadow-lg`}></div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="font-black text-slate-900 dark:text-white">{casser.name}</h4>
                                                        {getRoleBadge(casser.role, casser.status)}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-1.5">
                                                        <p className="text-[11px] text-slate-400 font-bold tracking-tight">@{casser.login}</p>
                                                        {parseInt(casser.today_lent_total) > 0 && (
                                                            <span className="flex items-center gap-1 text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase">
                                                                <HiTrendingUp size={10} /> {(parseInt(casser.today_lent_total)/1000).toFixed(0)}k Issued
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                {canManage(casser.role, casser.status) && casser.id !== user.id ? (
                                                    <>
                                                        <button 
                                                            onClick={() => { setSelectedUser(casser); setIsEditUserModalOpen(true); }}
                                                            className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100"
                                                        >
                                                            <HiPencil size={18} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteCasser(casser.id)}
                                                            className="p-3 text-slate-300 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm opacity-0 group-hover:opacity-100"
                                                        >
                                                            <HiTrash size={20} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className="p-3 text-slate-100 dark:text-slate-800"><HiBadgeCheck size={22} /></div>
                                                )}
                                                <HiChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" size={20} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="xl:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    <HiClock className="text-indigo-500" size={20} /> Recent Activities
                                </h3>
                            </div>

                            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                {logs.length === 0 ? (
                                    <div className="py-20 text-center opacity-40">
                                        <HiClock size={40} className="mx-auto text-slate-200 mb-3" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">No activities</p>
                                    </div>
                                ) : (
                                    logs.map((log, idx) => (
                                        <div key={log.id} className="relative pl-8 group">
                                            {idx !== logs.length - 1 && (
                                                <div className="absolute left-[7px] top-4 w-[2px] h-full bg-slate-50 dark:bg-slate-800/50"></div>
                                            )}
                                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] group-hover:scale-125 transition-transform"></div>
                                            
                                            <div>
                                                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                                                    <span className="text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter text-[9px] block mb-0.5 font-black">{log.casser_name}</span>
                                                    {log.details}
                                                </p>
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-2 opacity-50">
                                                    {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • TODAY
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="bg-[#0F172A] rounded-[40px] p-8 shadow-2xl relative overflow-hidden group border border-white/5">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-[60px] group-hover:scale-150 transition-all duration-1000"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                                    <HiOutlineShieldCheck size={28} />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">Premium Security</h4>
                                <p className="text-[11px] font-bold text-slate-400 leading-relaxed mb-8 uppercase tracking-widest">System is protected with 256-bit encryption.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-white/10 dark:border-slate-800 animate-slideUp">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-600">
                      <RiUserSettingsFill size={20} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Settings</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all"><HiX size={24} /></button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative group cursor-pointer" onClick={() => document.getElementById('profile-upload').click()}>
                  <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    {editData.image ? (
                      <img src={URL.createObjectURL(editData.image)} alt="Preview" className="w-full h-full object-cover" />
                    ) : user.image || user.local_image ? (
                        <img 
                          src={user.local_image ? `${import.meta.env.VITE_BASE_URL}${user.local_image}` : user.image} 
                          alt="Current" 
                          className="w-full h-full object-cover opacity-60" 
                        />
                    ) : (
                      <HiCamera className="text-slate-300" size={40} />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-indigo-600/40 rounded-[32px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <HiCamera className="text-white" size={32} />
                  </div>
                  <input id="profile-upload" type="file" className="hidden" accept="image/*" onChange={(e) => setEditData({ ...editData, image: e.target.files[0] })} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold dark:text-white focus:border-indigo-500 transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">New Password <span className="opacity-40">(optional)</span></label>
                    <div className="relative">
                        <RiLockPasswordLine className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                        <input type="password" placeholder="••••••••" value={editData.password} onChange={(e) => setEditData({ ...editData, password: e.target.value })} className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-sm font-bold dark:text-white focus:border-indigo-500 transition-all" />
                    </div>
                </div>
              </div>

              <button type="submit" disabled={uploading} className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-500/40 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3">
                {uploading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddCasserModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-white/10 dark:border-slate-800 animate-slideUp">
            <div className="flex items-center justify-between mb-8">
              <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Add New Staff</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">System Management</p>
              </div>
              <button onClick={() => setIsAddCasserModalOpen(false)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm"><HiX size={24} /></button>
            </div>

            <form onSubmit={handleAddCasser} className="space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group cursor-pointer" onClick={() => document.getElementById('new-casser-image').click()}>
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-950/50">
                    {newCasser.image ? (
                      <img src={URL.createObjectURL(newCasser.image)} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <HiCamera size={32} className="text-slate-300" />
                    )}
                  </div>
                  <input 
                    id="new-casser-image" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setNewCasser({ ...newCasser, image: e.target.files[0] })} 
                  />
                  <div className="mt-2 text-[8px] font-black uppercase text-slate-400 tracking-widest">Optional Image</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input type="text" required value={newCasser.name} onChange={(e) => setNewCasser({ ...newCasser, name: e.target.value })} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white focus:border-indigo-500 transition-all shadow-inner" placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Login</label>
                    <input type="text" required value={newCasser.login} onChange={(e) => setNewCasser({ ...newCasser, login: e.target.value })} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white focus:border-indigo-500 transition-all shadow-inner" placeholder="login" />
                </div>
                <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                    <input type={showCasserPass ? "text" : "password"} required value={newCasser.password} onChange={(e) => setNewCasser({ ...newCasser, password: e.target.value })} className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white focus:border-indigo-500 transition-all shadow-inner" placeholder="••••••••" />
                    <button type="button" onClick={() => setShowCasserPass(!showCasserPass)} className="absolute right-4 bottom-4 text-slate-400">
                      {showCasserPass ? <HiEyeOff size={18}/> : <HiEye size={18}/>}
                    </button>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                    <select value={newCasser.status} onChange={(e) => setNewCasser({ ...newCasser, status: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white appearance-none">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role</label>
                    <select value={newCasser.role} onChange={(e) => setNewCasser({ ...newCasser, role: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white appearance-none">
                        {user.role === 'Programmer' && (
                          <>
                            <option value="Programmer">Programmer</option>
                            <option value="Owner">Owner</option>
                          </>
                        )}
                        <option value="Admin">Admin</option>
                    </select>
                  </div>
              </div>

              <button type="submit" disabled={addingCasser} className="w-full py-5 mt-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/30 active:scale-95 disabled:opacity-70 flex items-center justify-center">
                {addingCasser ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : "Add Staff"}
              </button>
            </form>
          </div>
        </div>
      )}

      {isEditUserModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-white/10 dark:border-slate-800 animate-slideUp">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">Edit Account</h3>
              <button onClick={() => setIsEditUserModalOpen(false)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all"><HiX size={24} /></button>
            </div>

            <form onSubmit={handleEditUser} className="space-y-5">
              <div className="flex flex-col items-center mb-6">
                <div className="relative group cursor-pointer" onClick={() => document.getElementById('edit-casser-image').click()}>
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-dashed border-indigo-200 dark:border-indigo-900 flex items-center justify-center bg-indigo-50/30 dark:bg-indigo-950/30">
                    {selectedUser.new_image ? (
                      <img src={URL.createObjectURL(selectedUser.new_image)} alt="Preview" className="w-full h-full object-cover" />
                    ) : selectedUser.local_image ? (
                      <img src={`${import.meta.env.VITE_BASE_URL}${selectedUser.local_image}`} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <HiCamera size={32} className="text-indigo-300" />
                    )}
                  </div>
                  <input 
                    id="edit-casser-image" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setSelectedUser({ ...selectedUser, new_image: e.target.files[0] })} 
                  />
                  <div className="mt-2 text-[8px] font-black uppercase text-indigo-400 tracking-widest">Change Photo (Optional)</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input type="text" required value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white focus:border-indigo-500 transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                    <select value={selectedUser.status} onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white appearance-none">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role</label>
                    <select value={selectedUser.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })} className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none text-xs font-bold dark:text-white appearance-none">
                        {user.role === 'Programmer' && (
                          <>
                            <option value="Programmer">Programmer</option>
                            <option value="Owner">Owner</option>
                          </>
                        )}
                        <option value="Admin">Admin</option>
                    </select>
                  </div>
              </div>

              <button type="submit" className="w-full py-5 mt-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/30 active:scale-95 flex items-center justify-center">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {isAdminActivityModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/10 dark:border-slate-800 animate-slideUp relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500/30"></div>
            
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                      <HiTrendingUp size={32} />
                  </div>
                  <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter">{selectedUser.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Daily Activity Summary</p>
                  </div>
              </div>
              <button onClick={() => setIsAdminActivityModalOpen(false)} className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm"><HiX size={28} /></button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Clients</p>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{selectedUser.today_count}</h4>
                </div>
                <div className="bg-emerald-500/10 p-6 rounded-[32px] border border-emerald-500/20 text-center">
                    <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Total Amount</p>
                    <h4 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">
                        {parseInt(selectedUser.today_lent_total || 0).toLocaleString()} <span className="text-xs uppercase font-bold">UZS</span>
                    </h4>
                </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
              {loadingActivity ? (
                <div className="flex flex-col items-center py-20 opacity-50">
                    <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-widest">Loading data...</p>
                </div>
              ) : adminActivity.length === 0 ? (
                <div className="py-20 text-center opacity-30">
                    <HiUserGroup size={60} className="mx-auto mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest">No activities found today</p>
                </div>
              ) : (
                <div className="space-y-6 relative">
                  <div className="absolute left-[23px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-slate-800/50"></div>
                  
                  {adminActivity.map((loan, idx) => (
                    <div key={idx} className="relative pl-14 group">
                      <div className="absolute left-0 top-1.5 w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 flex items-center justify-center text-indigo-500 shadow-sm z-10 group-hover:scale-110 transition-transform group-hover:border-indigo-500/20">
                          {loan.image ? (
                             <img src={`${import.meta.env.VITE_API_URL}${loan.image}`} className="w-full h-full object-cover rounded-xl" alt="" />
                          ) : (
                             <span className="font-black text-xs">{loan.name ? loan.name[0] : "M"}</span>
                          )}
                      </div>
                      
                      <div className="bg-white dark:bg-slate-950/40 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/5">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="text-[13px] font-black text-slate-900 dark:text-white tracking-tight">{loan.name}</h5>
                                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-black rounded-md uppercase tracking-tighter">New Loan</span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                                <HiClock size={12} className="text-slate-300" />
                                {new Date(loan.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • Today
                              </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter">
                                {parseInt(String(loan.loan_amount).replace(/[^0-9]/g, '') || 0).toLocaleString()}
                                <span className="text-[10px] opacity-40 ml-1.5 font-bold uppercase tracking-widest">UZS</span>
                            </p>
                            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mt-1 opacity-60">Transaction ID: #L{loan.id}</p>
                          </div>
                        </div>
                        
                        {loan.comment && (
                          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-2xl text-[10px] font-bold text-slate-500 italic">
                             " {loan.comment} "
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
                onClick={() => setIsAdminActivityModalOpen(false)}
                className="w-full mt-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
            >
                Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
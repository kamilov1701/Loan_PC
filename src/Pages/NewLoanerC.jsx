import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, Upload, Camera, User, Plus, ArrowLeft, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function NewLoanerC() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", initials: "U" });
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    loan_amount: '',
    deadline: '',
    start_date: new Date().toISOString().split('T')[0],
    phone_number: '',
    comment: '',
    status: 'Active'
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const userData = JSON.parse(session);
        const name = userData.name || "User";
        const initials = name.substring(0, 2).toUpperCase();
        setUser({ ...userData, name, initials });
      } catch (e) {
        console.error("Session parse error", e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.loan_amount || !formData.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (user.id) data.append('casser_id', user.id);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}add_loaner.php`, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        navigate('/list');
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Camera access denied");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setImagePreview(dataUrl);
      
      fetch(dataUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], "camera_capture.jpg", { type: "image/jpeg" });
          setImageFile(file);
        });
      
      stopCamera();
    }
  };

  return (
    <div className="px-3 sm:px-4 lg:px-6 pb-24 lg:pb-10 dark:text-white transition-colors duration-500">
      <section className="px-4">
        <div className='container flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 gap-6'>
          <div className='flex gap-2 items-center'>
            <h1 className='text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic'>New Debtor</h1>
            <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Add Client</h2>
          </div>
          <div className='flex gap-4 items-center w-full md:w-auto justify-end'>
            <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'>
              <Bell size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-xs font-black shadow-lg">
                {user.initials}
              </span>
            </div>
          </div>
        </div>
      </section>
      <hr className='border-slate-100 dark:border-slate-800' />

      <section className='container px-4 mt-8'>
        <form onSubmit={handleSubmit} className='bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl p-8 md:p-10 rounded-[32px] max-w-[1000px] mx-auto'>
          <h2 className='text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-10'>
            Client Information
          </h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
            <div className='space-y-6'>
              <h3 className='text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2'>
                <Camera size={18} className="text-indigo-600" /> Profile Image
              </h3>

              <div className='relative group'>
                <div 
                  className='border-2 border-dashed border-slate-200 dark:border-slate-800 w-full h-[280px] rounded-3xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/50 group hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden'
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className='flex flex-col items-center group-hover:scale-110 transition-transform'>
                      <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-4 border border-slate-100 dark:border-slate-700">
                        <Upload className='text-slate-400 group-hover:text-indigo-600' size={28} />
                      </div>
                      <p className='text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest'>Upload or Camera</p>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current.click()}
                      className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-lg hover:scale-110 transition-transform"
                    >
                      <Upload size={20} />
                    </button>
                    <button 
                      type="button" 
                      onClick={startCamera}
                      className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                    >
                      <Camera size={20} />
                    </button>
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                />
              </div>

              <div className='space-y-6'>
                <div>
                  <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Full Name <span className="text-rose-500">*</span></label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text" 
                    required
                    placeholder='Example: John Doe'
                    className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all' 
                  />
                </div>

                <div>
                  <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Amount (UZS) <span className="text-rose-500">*</span></label>
                  <input 
                    name="loan_amount"
                    value={formData.loan_amount}
                    onChange={handleInputChange}
                    type="number" 
                    required
                    placeholder='0'
                    className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-black text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all' 
                  />
                </div>
              </div>
            </div>


            <div className='space-y-6'>
              <h3 className='text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-2'>
                <User size={18} className="text-indigo-600" /> Additional Details
              </h3>

              <div className='space-y-6'>
                <div>
                  <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Phone Number</label>
                  <input 
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    type="tel" 
                    placeholder='+998 90 123 45 67'
                    className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all' 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Start Date</label>
                    <input 
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      type="date" 
                      className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all' 
                    />
                  </div>
                  <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Deadline <span className="text-rose-500">*</span></label>
                    <input 
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      type="date" 
                      required
                      className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all' 
                    />
                  </div>
                </div>

                <div>
                  <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Comment (Optional)</label>
                  <textarea 
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder='Additional details...'
                    className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 dark:text-white outline-none focus:border-indigo-500 transition-all resize-none' 
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-50 dark:border-slate-800/50'>
            <button 
              type="submit"
              disabled={loading}
              className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl flex gap-3 items-center justify-center py-5 px-8 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50'
            >
              {loading ? "Adding..." : <><Plus size={20} /> Add Debtor</>}
            </button>
            <button 
              type="button"
              onClick={() => navigate(-1)}
              className='flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl flex gap-3 items-center justify-center py-5 px-8 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all'
            >
              <ArrowLeft size={20} /> Cancel
            </button>
          </div>
        </form>
      </section>


      {isCameraOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative max-w-lg w-full bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl border border-white/10">
            <div className="p-10 flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-8">
                <h3 className="text-white text-xs font-black uppercase tracking-[0.25em]">Live Camera</h3>
                <button onClick={stopCamera} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="w-full aspect-square bg-black rounded-3xl overflow-hidden mb-8 shadow-inner">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={capturePhoto}
                  className="flex-1 bg-white text-slate-950 text-xs font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Camera size={20} /> Capture Photo
                </button>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
}

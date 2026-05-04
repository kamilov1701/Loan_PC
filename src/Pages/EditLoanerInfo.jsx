import React, { useState, useEffect, useRef } from 'react';
import { Bell, Upload, Camera, User, Save, ArrowLeft, X, Check } from "lucide-react";
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function EditLoanerInfo() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    loan_amount: '',
    start_date: '',
    deadline: '',
    phone_number: '',
    comment: '',
    status: 'Active'
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      alert("ID topilmadi");
      navigate('/list');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}get_loaner_details.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          navigate('/list');
        } else {
          setFormData({
            name: data.name,
            loan_amount: data.loan_amount_raw,
            start_date: data.start_date.split('.').reverse().join('-'),
            deadline: data.deadline.split('.').reverse().join('-'),
            phone_number: data.phone_number,
            comment: data.comment || '',
            status: data.status
          });
          setCurrentImage(data.image);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Kameraga ruxsat berilmadi");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append('id', id);
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) {
      data.append('image', imageFile);
    }
    data.append('current_image', currentImage || '');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}update_loaner_info.php`, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      if (result.success) {
        navigate('/list');
      } else {
        alert("Xatolik: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server xatosi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-bold animate-pulse text-slate-400">MA'LUMOTLAR YUKLANMOQDA...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-20 pt-6">
      <section className="container mx-auto">
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
          <div className='flex gap-3 items-center'>
            <h1 className='text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter'>Tahrirlash</h1>
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
            <h2 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>Mijoz ma'lumotlari</h2>
          </div>
          <div className='flex gap-4 items-center'>
            <button className='border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-all'>
              <Bell size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
        <hr className='mt-8 border-slate-100 dark:border-slate-800' />
      </section>


      <section className='container mx-auto mt-10'>
        <form onSubmit={handleSubmit} className='bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-8 md:p-12 rounded-[40px] max-w-[1100px] mx-auto'>
          <div className='flex flex-col lg:flex-row gap-12'>
            
            <div className='flex-1 space-y-8'>
              <div className="space-y-4">
                <h3 className='text-xs font-black text-slate-400 uppercase tracking-[0.2em]'>Rasm va Shaxsiyat</h3>
                
                <div className='relative group'>
                  <div className='w-full h-[320px] rounded-[32px] overflow-hidden border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex flex-col items-center justify-center relative transition-all group-hover:border-indigo-500'>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : currentImage ? (
                      <img src={`${import.meta.env.VITE_API_URL}${currentImage}`} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm">
                           <Upload className="text-slate-400" size={28} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rasm yuklanmagan</p>
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
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>To'liq ism</label>
                  <input 
                    name="name" value={formData.name} onChange={handleInputChange}
                    type="text" className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all' 
                  />
                </div>
                <div>
                  <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Telefon raqami</label>
                  <input 
                    name="phone_number" value={formData.phone_number} onChange={handleInputChange}
                    type="tel" className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all' 
                  />
                </div>
              </div>
            </div>


            <div className='flex-1 space-y-8'>
              <div className="space-y-4">
                <h3 className='text-xs font-black text-slate-400 uppercase tracking-[0.2em]'>Qarz Tafsilotlari</h3>
                <div className="space-y-6">
                  <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Asosiy summa (UZS)</label>
                    <input 
                      name="loan_amount" value={formData.loan_amount} onChange={handleInputChange}
                      type="number" className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-black outline-none focus:border-indigo-500 transition-all text-rose-600' 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Boshlanish</label>
                      <input 
                        name="start_date" value={formData.start_date} onChange={handleInputChange}
                        type="date" className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-xs font-bold outline-none focus:border-indigo-500 transition-all' 
                      />
                    </div>
                    <div>
                      <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Muddati</label>
                      <input 
                        name="deadline" value={formData.deadline} onChange={handleInputChange}
                        type="date" className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-4 text-xs font-bold outline-none focus:border-indigo-500 transition-all' 
                      />
                    </div>
                  </div>

                  <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Holati</label>
                    <select 
                      name="status" value={formData.status} onChange={handleInputChange}
                      className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest outline-none focus:border-indigo-500 transition-all'
                    >
                      <option value="Active">Faol</option>
                      <option value="Paid">To'langan</option>
                      <option value="Due Soon">Yaqin</option>
                      <option value="Overdue">Muddati o'tgan</option>
                    </select>
                  </div>

                  <div>
                    <label className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block ml-1'>Izoh</label>
                    <textarea 
                      name="comment" value={formData.comment} onChange={handleInputChange}
                      rows="4" className='w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-indigo-500 transition-all resize-none' 
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-50 dark:border-slate-800/50'>
            <button 
              type="submit" disabled={saving}
              className='flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black uppercase tracking-widest rounded-2xl flex gap-3 items-center justify-center py-5 px-8 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50'
            >
              {saving ? "Saqlanmoqda..." : <><Check size={20} /> O'zgarishlarni saqlash</>}
            </button>
            <button 
              type="button" onClick={() => navigate(-1)}
              className='flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl flex gap-3 items-center justify-center py-5 px-8 hover:bg-slate-200 transition-all'
            >
              <ArrowLeft size={20} /> Bekor qilish
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


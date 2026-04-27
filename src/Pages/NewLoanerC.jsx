// import React, { Component } from 'react'
// import { Bell } from 'lucide-react';
// import { Search } from "lucide-react";
// import { Upload } from "lucide-react";
// import { Camera } from "lucide-react";
// import { User } from "lucide-react";
// import { Plus } from "lucide-react";
// import { ArrowLeft } from "lucide-react";


// export default class NewLoanerC extends Component {
//   render() {
//     return (
//       <div>
//         <section>
//           <div className='container flex items-center justify-between'>
//             <div className='flex gap-[5px] items-center'>
//               <h1 className='text-[21px] font-bold'>Yangi qarzdorni qo'shish</h1>
//               <h2 className='text-[14px] font-normal ml-[12px]'>Qarz oluvchi ma'lumotlarini to'ldiring</h2>
//             </div>
//             <div className='flex gap-[20px] items-center'>
//               <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><Bell /></button>
//               <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span>
//             </div>

//           </div>
//         </section> <hr className='mt-[12px]' />

//         <section className='mt-[28px]'>
//           <div>
//             <div className=' bg-[#FFFFFF] border border-[#0000000A] shadow-[0_1px_3px_0_#0000000F] px-[24px] py-[29px] w-[1100px] rounded-[14px]'>
//               <h2 className='text-[#6B7280] text-[17px] font-semibold uppercase'>Qarz oluvchi haqida yangi ma'lumot</h2>
//               <div className='flex gap-[24px]'>


//                 <div>
//                   <h2 className='text-[#111827] text-[18px] font-semibold mt-[10px]'>Rasm yuklash</h2>
//                   <div className='border border-[#E5E7EB] w-[510px] h-[270px] text-center flex flex-col items-center justify-center py-[34px] bg-[#F4F6FA] mt-[8px] rounded-[12px]'>
//                     <span className='flex flex-col items-center'>
//                       <Upload className='text-[#9CA3AF] text-center mb-[10px]' size={36} />
//                       <h2 className='text-[#111827] text-[15px] font-semibold '>Yuklang yoki suratga oling</h2>
//                       <h3 className='text-[#9CA3AF] text-[15px] font-normal'>JPG, PNG · Maks. 5MB</h3>
//                     </span>
//                     <div className='flex gap-[10px] mt-[14px]'>
//                       <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[16px] py-[8px] text-[13px] font-semibold text-[#111827] w-[110px]">
//                         <Upload size={26} className='text-[#9CA3AF]' />
//                         Eksport
//                       </button>
//                       <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[16px] py-[8px] text-[13px] font-semibold text-[#111827] w-[110px]">
//                         <Camera size={26} className='text-[#9CA3AF]' />
//                         Eksport
//                       </button>
//                     </div>
//                   </div>
//                   <div className='mt-[24px]'>
//                     <label htmlFor="">
//                       <p className='text-[#111827] text-[16px] font-semibold'>To'liq ism</p>
//                       <input type="text" placeholder='Masalan: Anvar Karimov' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[510px] mt-[6px]' />
//                     </label>
//                     <label htmlFor="">
//                       <p className='text-[#111827] text-[16px] font-semibold mt-[24px]'>Qarz summasi (so‘m)</p>
//                       <input type="text" placeholder='1 000 000' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[510px] mt-[6px]' />
//                     </label>
//                     <label htmlFor="">
//                       <p className='text-[#111827] text-[16px] font-semibold mt-[24px]'>Tugatish sanasi</p>
//                       <input type="date" className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[510px] mt-[6px]' />
//                     </label>
//                   </div>

//                   <div className='flex gap-[10px] items-center mt-[24px]'>
//                     <button className='bg-[#2563EB] text-[#FFFFFF] text-[15px] font-semibold rounded-[8px] flex gap-[6px] items-center py-[10px] px-[16px]'><Plus /> Qarzdor qo'shing</button>
//                     <button className='bg-[#FFFFFF] text-[#111827] text-[15px] border-[#E5E7EB] border font-semibold rounded-[8px] flex gap-[6px] items-center py-[10px] px-[16px]'><ArrowLeft /> Bekor qilish</button>
//                   </div>
//                 </div>

//                 {/* Right Side */}

//                 <div>
//                   <h2 className='text-[#111827] text-[18px] font-semibold mt-[10px] mb-[8px]'>Suratni ko‘rish</h2>
//                   <div>
//                     <div className='flex flex-col items-center w-[510px] h-[270px] bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)] py-[72px] px-[65px] rounded-[14px] text-center'>
//                       <User className='text-[#2563EB]' size={30} />
//                       <h2 className='text-[#2563EB] text-[13px] font-semibold'>Suratni ko‘rish</h2>
//                     </div>
//                   </div>
//                   <div className='mt-[24px]'>
//                     <label htmlFor="">
//                       <p className='text-[#111827] text-[16px] font-semibold'>Telefon raqami</p>
//                       <input type="number" placeholder='+998' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[510px] mt-[6px]' />
//                     </label>
//                     <label htmlFor="">
//                       <p className='text-[#111827] text-[16px] font-semibold mt-[24px]'>Boshlanish sanasi</p>
//                       <input type="date" className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[510px] mt-[6px]' />
//                     </label>
//                     <label htmlFor="">
//                       <p className='text-[#111827] text-[16px] font-semibold mt-[24px]'>Ixtiyoriy izoh</p>
//                       <input type="text" placeholder='Eslatma qoshing...' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[510px] mt-[6px]' />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     )
//   }
// }















import React, { Component } from 'react'
import { Bell, Search, Upload, Camera, User, Plus, ArrowLeft } from "lucide-react";

export default class NewLoanerC extends Component {
  render() {
    return (
      <div className="px-3 sm:px-4 lg:px-6 pb-20 lg:pb-6">

        {/* Header */}
        <section>
          <div className='container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3'>

            <div className='flex flex-col sm:flex-row sm:items-center gap-[5px]'>
              <h1 className='text-[18px] sm:text-[21px] font-bold'>
                Yangi qarzdorni qo'shish
              </h1>
              <h2 className='text-[12px] sm:text-[14px] font-normal sm:ml-[12px]'>
                Qarz oluvchi ma'lumotlarini to'ldiring
              </h2>
            </div>

            <div className='flex gap-[12px] sm:gap-[20px] items-center'>
              <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[8px] sm:p-[10px] rounded-[10px]'>
                <Bell size={18} />
              </button>
              <span className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[12px] sm:text-[13px] font-bold">
                SM
              </span>
            </div>

          </div>
        </section>

        <hr className='mt-[12px]' />

        {/* Form */}
        <section className='mt-[28px]'>

          <div className='bg-[#FFFFFF] border border-[#0000000A] shadow-[0_1px_3px_0_#0000000F] px-[16px] sm:px-[24px] py-[20px] sm:py-[29px] w-full max-w-[1100px] rounded-[14px]'>

            <h2 className='text-[#6B7280] text-[15px] sm:text-[17px] font-semibold uppercase'>
              Qarz oluvchi haqidagi ma'lumotlar
            </h2>

            <div className='flex flex-col lg:flex-row gap-[24px]'>

              {/* LEFT */}
              <div className='w-full lg:w-1/2'>

                <h2 className='text-[#111827] text-[16px] sm:text-[18px] font-semibold mt-[10px]'>
                  Rasm yuklash
                </h2>

                <div className='border border-[#E5E7EB] w-full h-[220px] sm:h-[270px] text-center flex flex-col items-center justify-center py-[20px] sm:py-[34px] bg-[#F4F6FA] mt-[8px] rounded-[12px]'>

                  <span className='flex flex-col items-center'>
                    <Upload className='text-[#9CA3AF] mb-[10px]' size={32} />
                    <h2 className='text-[#111827] text-[13px] sm:text-[15px] font-semibold'>
                      Yuklang yoki suratga oling
                    </h2>
                    <h3 className='text-[#9CA3AF] text-[12px] sm:text-[15px]'>
                      JPG, PNG · Maks. 5MB
                    </h3>
                  </span>

                  <div className='flex flex-col sm:flex-row gap-[10px] mt-[14px]'>
                    <button className="flex items-center justify-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[12px] py-[8px] text-[12px] sm:text-[13px] font-semibold text-[#111827] w-full sm:w-[110px]">
                      <Upload size={18} className='text-[#9CA3AF]' />
                      Eksport
                    </button>

                    <button className="flex items-center justify-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[12px] py-[8px] text-[12px] sm:text-[13px] font-semibold text-[#111827] w-full sm:w-[110px]">
                      <Camera size={18} className='text-[#9CA3AF]' />
                      Kamera
                    </button>
                  </div>
                </div>

                <div className='mt-[24px]'>

                  <label>
                    <p className='text-[#111827] text-[14px] sm:text-[16px] font-semibold'>
                      To'liq ism
                    </p>
                    <input type="text" placeholder='Masalan: Anvar Karimov'
                      className='py-[10px] sm:py-[12px] px-[12px] sm:px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-full mt-[6px]' />
                  </label>

                  <label>
                    <p className='text-[#111827] text-[14px] sm:text-[16px] font-semibold mt-[24px]'>
                      Qarz summasi (so‘m)
                    </p>
                    <input type="text" placeholder='1 000 000'
                      className='py-[10px] sm:py-[12px] px-[12px] sm:px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-full mt-[6px]' />
                  </label>

                  <label>
                    <p className='text-[#111827] text-[14px] sm:text-[16px] font-semibold mt-[24px]'>
                      Tugatish sanasi
                    </p>
                    <input type="date"
                      className='py-[10px] sm:py-[12px] px-[12px] sm:px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-full mt-[6px]' />
                  </label>

                </div>

                <div className='flex flex-col sm:flex-row gap-[10px] items-stretch sm:items-center mt-[24px]'>

                  <button className='bg-[#2563EB] text-[#FFFFFF] text-[14px] sm:text-[15px] font-semibold rounded-[8px] flex gap-[6px] items-center justify-center py-[10px] px-[16px] w-full sm:w-auto'>
                    <Plus size={18} /> Qarzdor qo'shing
                  </button>

                  <button className='bg-[#FFFFFF] text-[#111827] text-[14px] sm:text-[15px] border-[#E5E7EB] border font-semibold rounded-[8px] flex gap-[6px] items-center justify-center py-[10px] px-[16px] w-full sm:w-auto'>
                    <ArrowLeft size={18} /> Bekor qilish
                  </button>

                </div>

              </div>

              {/* RIGHT */}
              <div className='w-full lg:w-1/2'>

                <h2 className='text-[#111827] text-[16px] sm:text-[18px] font-semibold mt-[10px] mb-[8px]'>
                  Suratni ko‘rish
                </h2>

                <div className='flex flex-col items-center w-full h-[220px] sm:h-[270px] bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)] py-[40px] sm:py-[72px] px-[20px] sm:px-[65px] rounded-[14px] text-center'>
                  <User className='text-[#2563EB]' size={28} />
                  <h2 className='text-[#2563EB] text-[12px] sm:text-[13px] font-semibold'>
                    Suratni ko‘rish
                  </h2>
                </div>

                <div className='mt-[24px]'>

                  <label>
                    <p className='text-[#111827] text-[14px] sm:text-[16px] font-semibold'>
                      Telefon raqami
                    </p>
                    <input type="number" placeholder='+998'
                      className='py-[10px] sm:py-[12px] px-[12px] sm:px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-full mt-[6px]' />
                  </label>

                  <label>
                    <p className='text-[#111827] text-[14px] sm:text-[16px] font-semibold mt-[24px]'>
                      Boshlanish sanasi
                    </p>
                    <input type="date"
                      className='py-[10px] sm:py-[12px] px-[12px] sm:px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-full mt-[6px]' />
                  </label>

                  <label>
                    <p className='text-[#111827] text-[14px] sm:text-[16px] font-semibold mt-[24px]'>
                      Ixtiyoriy izoh
                    </p>
                    <input type="text" placeholder='Eslatma qoshing...'
                      className='py-[10px] sm:py-[12px] px-[12px] sm:px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-full mt-[6px]' />
                  </label>

                </div>

              </div>

            </div>
          </div>

        </section>
      </div>
    )
  }
}
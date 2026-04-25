// import React, { Component } from 'react'

// // Images{
// // import logo from "../src/assets/logo.png"
// // }

// // Icons{
// import { House } from 'lucide-react';
// import { Users } from 'lucide-react';
// import { User } from 'lucide-react';
// import { ChartNoAxesColumn } from 'lucide-react';
// import { Search } from "lucide-react";
// import { Globe } from "lucide-react";
// import { DollarSign } from 'lucide-react';
// import { Check } from 'lucide-react';
// import { Plus, Minus, Eye, Pencil, Trash2, Clock } from "lucide-react";

// // }

// export default class DashboardH extends Component {
//   render() {
//     return (
//       <div>

//       </div >
//     )
//   }
// }

// Icons{
import { Bell } from 'lucide-react';
// import { Users } from 'lucide-react';
// import { User } from 'lucide-react';
// import { ChartNoAxesColumn } from 'lucide-react';
import { Search } from "lucide-react";
import { Globe } from "lucide-react";
import { DollarSign } from 'lucide-react';
import { Check } from 'lucide-react';
import { Plus, Minus, Eye, Pencil, Trash2, Clock } from "lucide-react";


// export default class DashboardH extends Component {
//   render() {

//   }
// }



export default function DashboardH() {

  return (
    <div>
      <section>
        <div className='container flex items-center justify-between'>
          <div className='flex gap-[5px] items-center'>
            <h1 className='text-[21px] font-bold'>Boshqaruv paneli</h1>
            <h2 className='text-[14px] font-normal'>Overview</h2>
          </div>
          <div className='flex gap-[20px] items-center'>
            <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><a href="/alert"><Bell /></a></button>
            <button><a href="/profile"><span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span></a></button>
          </div>
        </div>
      </section> <hr  className='mt-[12px]'/>

      {/* Home Header */}

      <section className='container'>
        <div className='mt-[28px] flex gap-[16px]'>
          <div className='flex gap-[16px] shadow-[0_1px_3px_0_#0000000F,0_4px_16px_0_#0000000F] py-[23px] px-[23px] rounded-[14px] w-[50%]'>
            <span><DollarSign className='bg-[#EFF6FF] px-[12px] w-[48px] h-[48px] rounded-[12px]' /></span>
            <div>
              <p className='text-[#6B7280] text-[12px] font-medium'>Total Written Loans</p>
              <h2 className='text-[#111827] text-[24px] font-extrabold'>84 500 000</h2>
              <p className='text-[#9CA3AF] text-[12px] font-normal'>UZS · 24 active loaners</p>
              <h3 className='text-[#10B981] text-[11px] font-semibold px-[8px] py-[2px] bg-[#ECFDF5] rounded-[20px] w-[112px]'>↑ +12% this month</h3>
            </div>
          </div>
          <div className='flex gap-[16px] shadow-[0_1px_3px_0_#0000000F,0_4px_16px_0_#0000000F] py-[23px] px-[23px] rounded-[14px] w-[50%]'>
            <span><Check className='bg-[#ECFDF5] px-[12px] w-[48px] h-[48px] rounded-[12px]' /></span>
            <div>
              <p className='text-[#6B7280] text-[12px] font-medium'>Total Reduced Loans</p>
              <h2 className='text-[#111827] text-[24px] font-extrabold'>31 200 000</h2>
              <p className='text-[#9CA3AF] text-[12px] font-normal'>UZS · 8 fully paid</p>
              <h3 className='text-[#10B981] text-[11px] font-semibold px-[8px] py-[2px] bg-[#ECFDF5] rounded-[20px] w-[112px]'>↑ +5% this month</h3>
            </div>
          </div>
        </div>
      </section>

      {/* List Home */}
      
      <section className='container'>
        <div className='flex items-center mt-[24px] mb-[16px]'>
          <h2 className='text-[#111827] text-[15px] font-bold'>Yaqinda qo'shilgan qarzlar</h2>
          <div className="w-[580px] h-[38px] border border-[#E5E7EB] rounded-[10px] flex items-center px-3 bg-white ml-[350px]">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input type="text" placeholder="Qarz oluvchilarni qidirish..." className="w-full h-full outline-none text-sm text-gray-600 placeholder-gray-400" />
          </div>
          {/* <button className='text-[#FFFFFF] text-[13px] font-semibold px-[12px] py-[9px] bg-[#2563EB] rounded-[8px] flex items-center gap-[6px]'><Plus className='text-[#000000]' size={16} />  Add New Loaner</button> */}
        </div>

        <div className='border border-[#E5E7EB] rounded-[15px] max-w-[1110px] w-full'>
          <div className='flex'>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[45px] px-[16px]'>#</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[199px] px-[16px]'>Loaner</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[154px] px-[16px]'>Phone</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[141px] px-[16px]'>Loan Amount</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[112px] px-[16px]'>Start Date</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[115px] px-[16px]'>Deadline</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[120px] px-[16px]'>Status</div>
            <div className='py-[12px] text-[#6B7280] text-[11px] font-bold w-[253px] px-[16px]'>Actions</div>
          </div>

          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Anvar Karimov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#2563EB] font-semibold text-[11px] bg-[#EFF6FF] rounded-[20px] px-[15px] py-[5px]'>• Active</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Anvar Karimov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#2563EB] font-semibold text-[11px] bg-[#EFF6FF] rounded-[20px] px-[15px] py-[5px]'>• Active</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Anvar Karimov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#2563EB] font-semibold text-[11px] bg-[#EFF6FF] rounded-[20px] px-[15px] py-[5px]'>• Active</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Anvar Karimov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#2563EB] font-semibold text-[11px] bg-[#EFF6FF] rounded-[20px] px-[15px] py-[5px]'>• Active</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Anvar Karimov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#2563EB] font-semibold text-[11px] bg-[#EFF6FF] rounded-[20px] px-[15px] py-[5px]'>• Active</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Anvar Karimov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#2563EB] font-semibold text-[11px] bg-[#EFF6FF] rounded-[20px] px-[15px] py-[5px]'>• Active</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center text-white text-[13px] font-bold">DF </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Dilnoza Yusupova</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px] '>
              <span className='text-[#F59E0B] font-semibold text-[11px] bg-[#FFFBEB] rounded-[20px] px-[15px] py-[5px]'>• Due Soon</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
          <div className='flex items-center border border-[#E5E7EB] py-[13px]'>
            <div className='w-[45px] text-[#6B7280] text-[13px] font-normal px-[12px]'>1</div>
            <div className='flex w-[199px] px-[12px] gap-[12px] items-center'>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center text-white text-[13px] font-bold">BT </span>
              <div>
                <h2 className='text-[#111827] text-[13px] font-semibold'>Bobur Toshmatov</h2>
              </div>
            </div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[154px] px-[12px]'>+998 99 567 12 78</div>
            <div className='text-[#EF4444] text-[14px] font-bold w-[141px] px-[12px]'>2 500 000 UZS</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.03.2025</div>
            <div className='text-[#6B7280] text-[13px] font-normal w-[112px] px-[12px]'>01.06.2025</div>
            <div className='w-[120px]'>
              <span className='text-[#EF4444] font-semibold text-[11px] bg-[#FEF2F2] rounded-[20px] px-[15px] py-[5px]'>• Overdue</span>
            </div>

            <div className='flex gap-[20px] items-center ml-[15px]'>
              <Plus size={16} />
              <Minus size={16} />
              <Clock size={16} />
              <Eye size={16} />
              <Pencil size={16} />
              <Trash2 size={16} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
//   return (
//     <div>

//       {/* Header */}
//       <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
//         <h2 className="text-xl font-semibold">
//           Dashboard <span className="text-blue-500">Overview</span>
//         </h2>

//         <input
//           type="text"
//           placeholder="Search..."
//           className="bg-gray-100 px-3 py-2 rounded-lg outline-none"
//         />
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-5 mt-6">

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500">Total Loans</p>
//           <h2 className="text-xl font-bold">84 500 000</h2>
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow">
//           <p className="text-gray-500">Paid Loans</p>
//           <h2 className="text-xl font-bold">31 200 000</h2>
//         </div>

//       </div>

//       {/* Table */}
//       <div className="bg-white mt-6 p-5 rounded-xl shadow">

//         <h3 className="mb-4 font-semibold">Recent Loaners</h3>

//         <table className="w-full text-left">
//           <thead>
//             <tr className="text-gray-500">
//               <th>#</th>
//               <th>Name</th>
//               <th>Phone</th>
//               <th>Loan</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr className="border-t">
//               <td>1</td>
//               <td>Anvar Karimov</td>
//               <td>+998 99 567 12 78</td>
//               <td className="text-red-500">2 500 000</td>
//             </tr>
//           </tbody>
//         </table>

//       </div>

//     </div>
//   );
// }
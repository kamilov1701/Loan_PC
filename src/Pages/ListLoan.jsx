import React, { Component } from 'react'

// Images{
// import logo from "../src/assets/logo.png"
// }

// Icons{
import { Bell } from 'lucide-react';
// import { Users } from 'lucide-react';
// import { User } from 'lucide-react';
// import { ChartNoAxesColumn } from 'lucide-react';
import { Search, FileText } from "lucide-react";

import { Plus, Minus, Eye, Pencil, Trash2, Clock, Funnel } from "lucide-react";

// }

export default class ListLoan extends Component {
  render() {
    return (
      <div>
        <section className='border-[#E5E7EB] border px-[28px]'>
          <div className='py-[7px] flex items-center container justify-between '>
            <div className='flex gap-[5px] items-center'>
              <h1 className='text-[17px] font-bold'>Loaners List</h1>
              <h2 className='text-[14px] font-normal'>All customers</h2>
            </div>
            <div className='flex gap-[20px] items-center'>
              <div className="w-[280px] h-[38px] border border-[#E5E7EB] rounded-[10px] flex items-center px-3 bg-white">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Qarz oluvchilarni qidirish..." className="w-full h-full outline-none text-sm text-gray-600 placeholder-gray-400" />
              </div>
              <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><Bell /></button>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
            </div>

          </div>
        </section>

        <section className='container'>
          <div className='flex items-center justify-between mt-[24px] mb-[16px]'>
            <div className='flex gap-[12px]'>
              <div className="w-[280px] h-[38px] border border-[#E5E7EB] rounded-[10px] flex items-center px-3 bg-white">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Qarz oluvchilarni qidirish..." className="w-full h-full outline-none text-sm text-gray-600 placeholder-gray-400" />
              </div>
              <button className='text-[#111827] border border-[#E5E7EB] text-[13px] font-semibold px-[12px] py-[9px] bg-none rounded-[8px] flex items-center gap-[6px]'><Funnel className='text-[#111827]' size={16} />  Filter</button>
              <button className='text-[#111827] border border-[#E5E7EB] text-[13px] font-semibold px-[12px] py-[9px] bg-none rounded-[8px] flex items-center gap-[6px]'><FileText className='text-[#111827]' size={16} />  Export XLSX</button>

            </div>
            <button className='text-[#FFFFFF] text-[13px] font-semibold px-[12px] py-[9px] bg-[#2563EB] rounded-[8px] flex items-center gap-[6px]'><Plus className='text-[#FFFFFF]' size={16} />  Add New Loaner</button>
          </div>

          <div className='border border-[#E5E7EB] rounded-[14px]'>
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
}
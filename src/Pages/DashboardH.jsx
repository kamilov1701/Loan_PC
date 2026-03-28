import React, { Component } from 'react'

// Images{
// import logo from "../src/assets/logo.png"
// }

// Icons{
import { House } from 'lucide-react';
import { Users } from 'lucide-react';
import { User } from 'lucide-react';
import { Bell } from 'lucide-react';
import { ChartNoAxesColumn } from 'lucide-react';
import { Search } from "lucide-react";
import { Globe } from "lucide-react";
import { DollarSign } from 'lucide-react';
import { Check } from 'lucide-react';
import { Plus } from 'lucide-react';
// }

export default class DashboardH extends Component {
  render() {
    return (
      <div>
        <div>
          <main>

            <section className='border-[#E5E7EB] border'>
              <div className='py-[7px] flex items-center container justify-between '>
                <div className='flex gap-[5px] items-center'>
                  <h1 className='text-[17px] font-bold'>Bosh sahifa</h1>
                  <h2 className='text-[14px] font-normal'>Asosiy</h2>
                </div>
                <div className="w-[570px] h-[38px] border border-[#E5E7EB] rounded-[10px] flex items-center px-3 bg-white">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input type="text" placeholder="Search loaners..." className="w-full h-full outline-none text-sm text-gray-600 placeholder-gray-400" />
                </div>

                <div className='flex gap-[20px] items-center'>
                  <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><Globe /></button>
                  <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
                </div>

              </div>
            </section>

            <section className='container py-[24px]'>

              <div className='flex gap-[16px]'>
                <div className='flex items-center gap-[18px] bg-[#FFFFFF] border-[#0000000A] border w-[50%] py-[30px] px-[24px] shadow-[0px_4px_16px_0px_#0000000F,0px_1px_3px_0px_#0000000F] rounded-[14px]'>
                  <span className='text-[#2563EB] bg-[#EFF6FF] p-[12px] rounded-[12px] inline-block'>
                    <DollarSign />
                  </span>
                  <div>
                    <p className='text-[12px] text-[#6B7280] font-medium'>Umumiy qarzlar summasi</p>
                    <h2 className='text-[#111827] text-[24px] font-extrabold'>84 500 000</h2>
                    <h3 className='text-[11px] font-semibold text-[#10B981]'>↑ +12% Bu Oyda</h3>
                  </div>
                </div>
                <div className='flex items-center gap-[18px] bg-[#FFFFFF] border-[#0000000A] border w-[50%] py-[30px] px-[24px] shadow-[0px_4px_16px_0px_#0000000F,0px_1px_3px_0px_#0000000F] rounded-[14px]'>
                  <span className='text-[#10B981] bg-[#ECFDF5] p-[12px] rounded-[12px] inline-block'>
                    <Check />
                  </span>
                  <div>
                    <p className='text-[12px] text-[#6B7280] font-medium'>Umumiy to’plangan qarzlar summasi</p>
                    <h2 className='text-[#111827] text-[24px] font-extrabold'>31 200 000</h2>
                    <h3 className='text-[11px] font-semibold text-[#10B981]'>↑ +5% Bu Oyda</h3>
                  </div>
                </div>
              </div>

              <div className='mt-[24px]'>

                <div className='flex items-center justify-between'>
                  <h2 className='text-[15px] font-bold text-[#111827]'>So’ngi qo’shilgan Qarzdorlar</h2>
                  <button className='text-[#FFFFFF] text-[13px] font-semibold py-[9px] px-[10px] bg-[#2563EB] rounded-[8px] flex gap-[5px] items-center'><Plus />Yangi qarzdor  yaratish</button>
                </div>

                <div>
                  <div>
                    <p className='loannum'>#</p>
                    <p className="loanlist">Qarzdor</p>

                  </div>
                </div>
              </div>

            </section>

          </main>
        </div>
      </div >
    )
  }
}
import React, { Component } from 'react'
import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { Phone, MessageSquare } from 'lucide-react';

export default class LoanAlert extends Component {
  render() {
    return (
      <div>

        <section className='border-[#E5E7EB] border px-[28px]'>
          <div className='py-[7px] flex items-center container justify-between '>
            <div className='flex gap-[5px] items-center'>
              <h1 className='text-[17px] font-bold'>Ogohlantirishlar</h1>
              <h2 className='text-[14px] font-normal'>Belgilangan muddatlar va bildirishnomalar</h2>
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

        <section className='mt-[28px] container'>
          <div className='flex gap-[16px] items-center mb-[16px]'>
            <button className='text-[#111827] text-[13px] font-semibold py-[7px] px-[16px] bg-[#FFFFFF] shadow-[0_4px_16px_0_#0000000F,0_1px_3px_0_#0000000F] rounded-[7px]'>Kelgusi (2)</button>
            <button className='text-[#6B7280] text-[13px] font-semibold py-[7px] px-[16px] rounded-[7px]'>Muddati o'tgan (1)</button>
          </div>

          <div className='space-y-[10px]'>
            <div className="flex items-center justify-between px-4 py-3 bg-[#fff] border-[#E5E7EB] border rounded-lg ">

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
                  AK
                </div>
                <div>
                  <p className="text-[14px] font-medium">Dilnoza Yusupova</p>
                  <p className="text-[12px] text-gray-400">+998 90 123 45 67 · 2 kundan keyin tugaydi</p>
                </div>
              </div>

              <div className='flex items-center gap-[17px]'>

                <input type="date" className='py-[10px] border-[#E5E7EB] border bg-[#FFFFFF] rounded-[8px] px-[16px]' />

                <div className="text-[14px] font-semibold text-red-500">
                  1 800 000 so'm
                </div>

                <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[143px]">
                  <Phone size={16} />
                  Qo'ng'iroq qiling
                </button>
                <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[72px]">
                  <MessageSquare size={16} />
                  SMS
                </button>
              </div>

            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-[#fff] border-[#E5E7EB] border rounded-lg ">

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
                  AK
                </div>
                <div>
                  <p className="text-[14px] font-medium">Dilnoza Yusupova</p>
                  <p className="text-[12px] text-gray-400">+998 90 123 45 67 · 2 kundan keyin tugaydi</p>
                </div>
              </div>

              <div className='flex items-center gap-[17px]'>

                <input type="date" className='py-[10px] border-[#E5E7EB] border bg-[#FFFFFF] rounded-[8px] px-[16px]' />

                <div className="text-[14px] font-semibold text-red-500">
                  1 800 000 so'm
                </div>

                <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[143px]">
                  <Phone size={16} />
                  Qo'ng'iroq qiling
                </button>
                <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[72px]">
                  <MessageSquare size={16} />
                  SMS
                </button>
              </div>

            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-[#fff] border-[#E5E7EB] border rounded-lg ">

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
                  AK
                </div>
                <div>
                  <p className="text-[14px] font-medium">Dilnoza Yusupova</p>
                  <p className="text-[12px] text-gray-400">+998 90 123 45 67 · 2 kundan keyin tugaydi</p>
                </div>
              </div>

              <div className='flex items-center gap-[17px]'>

                <input type="date" className='py-[10px] border-[#E5E7EB] border bg-[#FFFFFF] rounded-[8px] px-[16px]' />

                <div className="text-[14px] font-semibold text-red-500">
                  1 800 000 so'm
                </div>

                <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[143px]">
                  <Phone size={16} />
                  Qo'ng'iroq qiling
                </button>
                <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[72px]">
                  <MessageSquare size={16} />
                  SMS
                </button>
              </div>

            </div>
          </div>
        </section>

      </div>
    )
  }
}

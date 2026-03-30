import React, { Component } from 'react'

// Images{
// import logo from "../src/assets/logo.png"
// }

// Icons{
import { House } from 'lucide-react';
import { Users } from 'lucide-react';
import { User } from 'lucide-react';
import { ChartNoAxesColumn } from 'lucide-react';
import { Search } from "lucide-react";
import { Globe } from "lucide-react";
import { DollarSign } from 'lucide-react';
import { Check } from 'lucide-react';
import { Plus, Minus, Eye, Pencil, Trash2, Clock } from "lucide-react";

// }

export default class DashboardH extends Component {
  render() {
    return (
      <div>
        <div>
          <main>

            <section className='border-[#E5E7EB] border px-[28px]'>
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

                <div className="w-full bg-white rounded-xl shadow p-4 space-y-2"><div className="flex text-gray-400 text-sm font-semibold px-4 py-2">
                  <div className="w-[40px]">#</div>
                  <div className="w-[250px]">Qarzdor</div>
                  <div className="w-[180px]">Telefon</div>
                  <div className="w-[180px]">Qarz summasi</div>
                  <div className="w-[150px]">Yozilgan sana</div>
                  <div className="w-[150px]">Keyingi muddat</div>
                  <div className="w-[150px]">Holati</div>
                  <div className="flex-1">Amallar</div>
                </div>

                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-[40px]">1</div>

                    <div className="w-[250px] flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
                        AK
                      </div>
                      <div>
                        <p className="text-sm font-medium">Anvar Karimov</p>
                        <p className="text-xs text-gray-400">ID N° 001</p>
                      </div>
                    </div>

                    <div className="w-[180px] text-sm">+998 99 567 12 78</div>

                    <div className="w-[180px] text-sm font-semibold text-red-500">
                      2 500 000 so'm
                    </div>

                    <div className="w-[150px] text-sm text-gray-500">01.03.2025</div>
                    <div className="w-[150px] text-sm text-gray-500">01.06.2025</div>

                    <div className="w-[150px]">
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-500">
                        Aktiv
                      </span>
                    </div>

                    <div className="flex gap-3 text-gray-400">
                      <Plus size={16} className="cursor-pointer" />
                      <Minus size={16} className="cursor-pointer00" />
                      <Clock size={16} className="cursor-pointer" />
                      <Eye size={16} className="cursor-pointer0" />
                      <Pencil size={16} className="cursor-pointer00" />
                      <Trash2 size={16} className="cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-[40px]">2</div>

                    <div className="w-[250px] flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-green-500">
                        DY
                      </div>
                      <div>
                        <p className="text-sm font-medium">Dinoza Yusupova</p>
                        <p className="text-xs text-gray-400">ID N° 002</p>
                      </div>
                    </div>

                    <div className="w-[180px] text-sm">+998 90 123 45 67</div>

                    <div className="w-[180px] text-sm font-semibold text-red-500">
                      1 800 000 so'm
                    </div>

                    <div className="w-[150px] text-sm text-gray-500">15.02.2025</div>
                    <div className="w-[150px] text-sm text-gray-500">15.05.2025</div>

                    <div className="w-[150px]">
                      <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-500">
                        Yaqinlashgan
                      </span>
                    </div>

                    <div className="flex gap-3 text-gray-400">
                      <Plus size={16} className="cursor-pointer" />
                      <Minus size={16} className="cursor-pointer00" />
                      <Clock size={16} className="cursor-pointer" />
                      <Eye size={16} className="cursor-pointer0" />
                      <Pencil size={16} className="cursor-pointer00" />
                      <Trash2 size={16} className="cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-[40px]">3</div>

                    <div className="w-[250px] flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-purple-500">
                        BT
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bobur Toshmatov</p>
                        <p className="text-xs text-gray-400">ID N° 003</p>
                      </div>
                    </div>

                    <div className="w-[180px] text-sm">+998 91 234 56 78</div>

                    <div className="w-[180px] text-sm font-semibold text-red-500">
                      5 000 000 so'm
                    </div>

                    <div className="w-[150px] text-sm text-gray-500">10.01.2025</div>
                    <div className="w-[150px] text-sm text-gray-500">10.04.2025</div>

                    <div className="w-[150px]">
                      <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-500">
                        Muddati o'tgan
                      </span>
                    </div>

                    <div className="flex gap-3 text-gray-400">
                      <Plus size={16} className="cursor-pointer" />
                      <Minus size={16} className="cursor-pointer00" />
                      <Clock size={16} className="cursor-pointer" />
                      <Eye size={16} className="cursor-pointer0" />
                      <Pencil size={16} className="cursor-pointer00" />
                      <Trash2 size={16} className="cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-[40px]">4</div>

                    <div className="w-[250px] flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-yellow-500">
                        MR
                      </div>
                      <div>
                        <p className="text-sm font-medium">Malika Razzoqova</p>
                        <p className="text-xs text-gray-400">ID N° 004</p>
                      </div>
                    </div>

                    <div className="w-[180px] text-sm">+998 93 345 67 89</div>

                    <div className="w-[180px] text-sm font-semibold text-green-500">
                      To'langan
                    </div>

                    <div className="w-[150px] text-sm text-gray-500">05.12.2024</div>
                    <div className="w-[150px] text-sm text-gray-500">05.03.2025</div>

                    <div className="w-[150px]">
                      <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-500">
                        To'liq to'langan
                      </span>
                    </div>

                    <div className="flex gap-3 text-gray-400">
                      <Plus size={16} className="cursor-pointer" />
                      <Minus size={16} className="cursor-pointer00" />
                      <Clock size={16} className="cursor-pointer" />
                      <Eye size={16} className="cursor-pointer0" />
                      <Pencil size={16} className="cursor-pointer00" />
                      <Trash2 size={16} className="cursor-pointer" />
                    </div>
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
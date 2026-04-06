import React, { Component } from 'react'
import { Bell } from 'lucide-react';
import { Search } from "lucide-react";
import { Upload } from "lucide-react";
import { Camera } from "lucide-react";
import { User } from "lucide-react";
import { Plus } from "lucide-react";
import { ArrowLeft  } from "lucide-react";


export default class NewLoanerC extends Component {
  render() {
    return (
      <div>
        <section className='border-[#E5E7EB] border px-[28px]'>
          <div className='py-[7px] flex items-center container justify-between '>
            <div className='flex gap-[5px] items-center'>
              <h1 className='text-[17px] font-bold'>Yangi qarz oluvchi qo'shing</h1>
              <h2 className='text-[14px] font-normal'>Qarz oluvchi ma'lumotlarini to'ldiring</h2>
            </div>
            <div className='flex gap-[20px] items-center'>
              <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><Bell /></button>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
            </div>

          </div>
        </section>

        <section className='mt-[28px]'>
          <div>

            <div className=' bg-[#FFFFFF] border border-[#0000000A] shadow-[0_1px_3px_0_#0000000F] px-[24px] py-[29px] w-[700px] rounded-[14px]'>
            <h2 className='text-[#6B7280] text-[13px] font-semibold uppercase'>Qarz oluvchi haqida yangi ma'lumot</h2>
              <div className='flex gap-[24px]'>
                <div>
                  <h2 className='text-[#111827] text-[12px] font-semibold mt-[10px]'>Rasm yuklash</h2>
                  <div className='border border-[#E5E7EB] w-[309px] text-center flex flex-col items-center justify-center py-[34px] bg-[#F4F6FA] mt-[8px] rounded-[12px]'>
                    <span className='flex flex-col items-center'>
                      <Upload className='text-[#9CA3AF] text-center mb-[10px]' size={36}/>
                      <h2 className='text-[#111827] text-[13px] font-semibold '>Yuklang yoki suratga oling</h2>
                      <h3 className='text-[#9CA3AF] text-[12px] font-normal'>JPG, PNG · Maks. 5MB</h3>
                    </span>
                    <div className='flex gap-[10px] mt-[14px]'>
                      <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[16px] py-[8px] text-[13px] font-semibold text-[#111827] w-[110px]">
                        <Upload size={26} className='text-[#9CA3AF]' />
                        Eksport
                      </button>
                      <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[16px] py-[8px] text-[13px] font-semibold text-[#111827] w-[110px]">
                        <Camera size={26} className='text-[#9CA3AF]' />
                        Eksport
                      </button>
                    </div>
                  </div>
                  <div className='mt-[24px]'>
                    <label htmlFor="">
                    <p className='text-[#111827] text-[12px] font-semibold'>To'liq ism</p>
                    <input type="text" placeholder='masalan Anvar Karimov' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[313px] mt-[6px]'/>
                  </label>
                    <label htmlFor="">
                    <p className='text-[#111827] text-[12px] font-semibold mt-[24px]'>Kredit summasi (so‘m)</p>
                    <input type="text" placeholder='1 000 000' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[313px] mt-[6px]'/>
                  </label>
                    <label htmlFor="">
                    <p className='text-[#111827] text-[12px] font-semibold mt-[24px]'>Tugatish sanasi</p>
                    <input type="date" className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[313px] mt-[6px]'/>
                  </label>
                  </div>

                  <div className='flex gap-[10px] items-center mt-[24px]'>
                    <button className='bg-[#2563EB] text-[#FFFFFF] text-[13px] font-semibold rounded-[8px] flex gap-[6px] items-center py-[10px] px-[16px]'><Plus/> Loaner qo'shing</button>
                    <button className='bg-[#FFFFFF] text-[#111827] text-[13px] border-[#E5E7EB] border font-semibold rounded-[8px] flex gap-[6px] items-center py-[10px] px-[16px]'><ArrowLeft /> Orqaga</button>
                  </div>
                </div>

                <div>
                  <h2 className='text-[#111827] text-[12px] font-semibold mt-[10px] mb-[8px]'>Suratni ko‘rish</h2>
                  <div>
                    <div className='flex flex-col items-center w-[220px] bg-[linear-gradient(135deg,#EFF6FF_0%,#DBEAFE_100%)] py-[72px] px-[65px] rounded-[14px] text-center'>
                    <User className='text-[#2563EB]' size={30}/>
                    <h2 className='text-[#2563EB] text-[13px] font-semibold'>Suratni ko‘rish</h2>
                    </div>
                  </div>
                  <div className='mt-[40px]'>
                    <label htmlFor="">
                    <p className='text-[#111827] text-[12px] font-semibold'>Telefon raqami</p>
                    <input type="number" placeholder='+998' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[313px] mt-[6px]'/>
                  </label>
                    <label htmlFor="">
                    <p className='text-[#111827] text-[12px] font-semibold mt-[24px]'>Boshlanish sanasi</p>
                    <input type="date" className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[313px] mt-[6px]'/>
                  </label>
                    <label htmlFor="">
                    <p className='text-[#111827] text-[12px] font-semibold mt-[24px]'>Ixtiyoriy izoh</p>
                    <input type="text" placeholder='Eslatma qoshing...' className='py-[12px] px-[15px] border border-[#E5E7EB] rounded-[8px] bg-[#ffffff] w-[313px] mt-[6px]'/>
                  </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

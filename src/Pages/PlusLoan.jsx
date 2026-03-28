import React, { Component } from 'react'

// Icons{
import { Globe } from "lucide-react";
// }

export default class PlusLoan extends Component {
  render() {
    return (
      <div>

        {/* NAV TXT */}
        
        <div className='flex justify-between bg-[#FFF] w-full h-[64px] border-b-[1px] solid-[#E5E7EB]'>
          <div className='flex gap-[6px]'>
            <h1 className='text-[17px] font-bold'>Add Loan</h1>
            <h2 className='text-[14px] font-normal'>Anvar Karimov</h2>
          </div>
          <div>
            <div className='flex gap-[20px] items-center'>
              <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><Globe /></button>
              <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span>
            </div>
          </div>
        </div>

        {/* Full width card */}

        <section className='mt-[28px]'>
          <div className='bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#0EA5E9] w-full h-[116px] rounded-[14px] py-[20px] px-[24px]'>
              <div className='flex gap-[10px] text-[#ffff] text-[21px]'>
                <h1>Anvar Karimov</h1>
                <p>| Hozirgi umumiy qarz miqdori</p>
              </div>
              <div className='mt-[6px]'>
                <h3 className='text-[32px] font-extra text-[#fff]'>2 500 000 UZS</h3>
              </div>

          </div>
        </section>

        {/* Main Card */}

        <main>
          <section className='bg-[#ffff] shadow-lg rounded-xl max-w-[700px] w-full h-[480px] mt-[24px] p-[29px]'>
            <div>
              <p className='text-[#6B7280] text-[19px] font-semibold'>Qarz miqdorini kiriting</p>
            </div>
            <div className='mt-[16px]'>
              <label className='text-[#111827] text-[19px] font-semibold' htmlFor="text">Summani kiriting (UZS) <span className='text-[#EF4444]'>*</span> </label><br />
              <input className='border-[1px] solid-[#E5E7EB] max-w-[642px] w-full h-[42px] px-[15px] py-[12px] text-[#9CA3AF] text-[19px] rounded-[8px] mt-[6px]' type="number" name="" id="" placeholder='250 000 '/>
            </div>
            <div className='bg-[#EFF6FF] max-w-[642px] w-full h-[45px] text-[#2563EB] text-[23px] flex justify-between items-center px-[16px] py-[14px] rounded-[8px] mt-[24px] font-semibold'>
              <p>Qarz qo'shilgandagi qarz miqdori</p>
              <p>2 750 000 UZS</p>
            </div>
            <div className='flex gap-[45px] mt-[16px]'>
              <div>
                <label className='text-[#111827] text-[21px]' htmlFor="text">Qarz kiritilgan sana</label><br />
                <input className='max-w-[220px] h-[42px] border-[1px] romded-[8px] py-[11px] px-[15px]' type="date" name="" id="" />
              </div>
              <div>
                <label className='text-[#111827] text-[21px]' htmlFor="text"> To'lash sanasi</label><br />
                <input className='max-w-[220px] h-[42px] border-[1px] romded-[8px] py-[11px] px-[15px]' type="date" name="" id="" />
              </div>
            </div>
            <div></div>
          </section>
        </main>
      </div>
    )
  }
}

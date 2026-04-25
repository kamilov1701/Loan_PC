import React, { Component } from 'react';
import { Bell } from 'lucide-react';

// Icons{
import { Globe } from "lucide-react";
// }

export default class MinusLoanC extends Component {
  render() {
    return (
      <div>
        {/* NAV TXT */}

        <section>
          <div className='container flex items-center justify-between'>
            <div className='flex gap-[5px] items-center'>
              <h1 className='text-[21px] font-bold'>Qarz ayirish</h1>
              <h2 className='text-[17px] ml-[10px] font-normal'>Anvar Karimov</h2>
            </div>
            <div className='flex gap-[20px] items-center'>
              <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><a href="/alert"><Bell /></a></button>
              <button><a href="/profile"><span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span></a></button>
            </div>
          </div>
        </section> <hr className='mt-[12px]' />

        {/* Full width card */}

        <section className='mt-[28px]'>
          <div className='bg-gradient-to-r from-[#065F46] via-[#10B981] to-[#34D399] w-full h-[116px] rounded-[14px] py-[20px] px-[24px]'>
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
          <section className='bg-[#ffff] shadow-lg rounded-xl max-w-[700px] w-full h-[530px] mt-[24px] p-[29px]'>
            <div>
              <p className='text-[#6B7280] text-[17px] font-semibold'>Qarz miqdorini kiriting</p>
            </div>
            <div className='mt-[16px]'>
              <label className='text-[#111827] text-[16px] font-semibold' htmlFor="text">Summani kiriting (UZS) <span className='text-[#EF4444]'>*</span> </label><br />
              <input className='border-[1px] solid-[#E5E7EB] max-w-[642px] w-full h-[42px] px-[15px] py-[12px] text-[#000] text-[19px] rounded-[8px] mt-[6px]' type="number" name="" id="" placeholder='250 000 ' />
            </div>
            <div className='flex gap-[45px] mt-[16px]'>
              <div>
                <label className='text-[#111827] text-[16px] font-semibold' htmlFor="text">Qarz kiritilgan sana</label><br />
                <input className='w-[300px] h-[42px] border-[1px] rounded-[8px] py-[11px] px-[15px] mt-[6px]' type="date" name="" id="" />
              </div>
              <div>
                <label className='text-[#111827] text-[16px] font-semibold' htmlFor="text"> To'lash sanasi</label><br />
                <input className='w-[300px] h-[42px] border-[1px] rounded-[8px] py-[11px] px-[15px] mt-[6px]' type="date" name="" id="" />
              </div>
            </div>
            <div className='mt-[16px]'>
              <label className='text-[#111827] text-[16px] font-semibold' htmlFor="text">Comment (Ixtiyoriy)</label>
              <textarea className='max-w-[642px] w-full px-[15px] py-[11px] h-[80px] border-[1px] rounded-[8px] mt-[6px] resize-none' name="" id="" placeholder='e.g. Sugar, flour goods...'></textarea>
            </div>
            <div className='bg-[#ECFDF5] max-w-[642px] w-full h-[45px] text-[#10B981] text-[23px] flex justify-between items-center px-[16px] py-[14px] rounded-[8px] mt-[24px] font-semibold'>
              <p>Ayirilgandagi qarz miqdori</p>
              <p>2 750 000 UZS</p>
            </div>
            <div className='flex gap-[12px] pt-[26px]'>
              <button className='w-[114px] h-[36px] bg-[#10B981] rounded-[8px] text-[#fff] text-[14px] font-semibold p-[4px]'><a href="./List">Qarz ayirish</a></button>
              <button className='w-[90px] h-[36px] p-[4px] border-[1px] rounded-[8px] text-[14px] font-semibold'><a href="./Dashboard">Bekor qilish</a></button>
            </div>
          </section>
        </main>
      </div>
    )
  }
}

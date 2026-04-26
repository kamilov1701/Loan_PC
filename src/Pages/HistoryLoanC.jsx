import React, { Component } from 'react'

// Icons{
import { Globe, Plus, Minus, FileText, ArrowLeft } from "lucide-react";
// }

export default class History extends Component {
  render() {
    return (
      <div>

        {/* NAV */}
        <div className='flex justify-between bg-[#FFF] w-full h-[64px] border-b-[1px] border-[#E5E7EB]  items-center'>
          <div className='flex gap-[6px] items-center'>
            <h1 className='text-[21px] font-bold'>Transaction History</h1>
            <h2 className='text-[17px] ml-[10px] font-normal'>Anvar Karimov</h2>
          </div>

          <div className='flex gap-[20px] items-center'>
            <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'>
              <Globe />
            </button>
            <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">
              SM
            </span>
          </div>
        </div>

        {/* HERO */}
        <section className='mt-[28px]'>
          <div className='bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#0EA5E9] w-full h-[116px] rounded-[14px] py-[20px] px-[24px]'>
            <div className='flex gap-[10px] text-[#fff] text-[21px]'>
              <h1>Anvar Karimov</h1>
              <p>| Transaction History</p>
            </div>
            <div className='mt-[6px]'>
              <h3 className='text-[32px] text-[#fff]'>2 500 000 UZS</h3>
            </div>
          </div>
        </section>

        {/* MAIN */}
        <main className='px-[20px]'>
          <section className='bg-[#fff] shadow-lg rounded-xl max-w-[700px] w-full mt-[24px] p-[29px]'>

            <div>
              <p className='text-[#6B7280] text-[17px] font-semibold'>All Transactions</p>
            </div>

            <div className='mt-[20px]'>

              {/* ITEM 1 */}
              <div className='flex justify-between items-center border-b py-[14px]'>
                <div className='flex gap-[12px] items-center'>
                  <div className='w-[38px] h-[38px] rounded-full flex items-center justify-center bg-[#DCFCE7] text-[#16A34A]'>
                    <Plus size={18} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>+ Added Loan</h4>
                    <p className='text-[14px] text-[#6B7280]'>Sugar, flour goods — restocking</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[16px] font-semibold text-[#16A34A]'>+500 000 UZS</p>
                  <p className='text-[13px] text-[#9CA3AF]'>25 Mar 2025 · 10:32</p>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className='flex justify-between items-center border-b py-[14px]'>
                <div className='flex gap-[12px] items-center'>
                  <div className='w-[38px] h-[38px] rounded-full flex items-center justify-center bg-[#FEE2E2] text-[#DC2626]'>
                    <Minus size={18} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>– Reduced Loan</h4>
                    <p className='text-[14px] text-[#6B7280]'>Partial payment in cash</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[16px] font-semibold text-[#DC2626]'>–1 000 000 UZS</p>
                  <p className='text-[13px] text-[#9CA3AF]'>20 Mar 2025 · 14:15</p>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className='flex justify-between items-center border-b py-[14px]'>
                <div className='flex gap-[12px] items-center'>
                  <div className='w-[38px] h-[38px] rounded-full flex items-center justify-center bg-[#DCFCE7] text-[#16A34A]'>
                    <Plus size={18} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>+ Added Loan</h4>
                    <p className='text-[14px] text-[#6B7280]'>Initial loan created</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[16px] font-semibold text-[#16A34A]'>+3 000 000 UZS</p>
                  <p className='text-[13px] text-[#9CA3AF]'>01 Mar 2025 · 09:00</p>
                </div>
              </div>

              {/* ITEM 4 */}
              <div className='flex justify-between items-center border-b py-[14px]'>
                <div className='flex gap-[12px] items-center'>
                  <div className='w-[38px] h-[38px] rounded-full flex items-center justify-center bg-[#FEE2E2] text-[#DC2626]'>
                    <Minus size={18} />
                  </div>
                  <div>
                    <h4 className='text-[16px] font-semibold'>– Reduced Loan</h4>
                    <p className='text-[14px] text-[#6B7280]'>No comment</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[16px] font-semibold text-[#DC2626]'>–500 000 UZS</p>
                  <p className='text-[13px] text-[#9CA3AF]'>10 Feb 2025 · 16:40</p>
                </div>
              </div>

            </div>

            {/* FOOTER */}
            <div className='flex justify-between items-center mt-[20px]'>
              <p className='text-[14px] text-[#6B7280]'>4 transactions total</p>

              <button className='flex gap-[6px] items-center border px-[12px] py-[6px] rounded-[8px] text-[14px]'>
                <FileText size={16} /> Export XLSX
              </button>
            </div>

          </section>

          {/* BACK BUTTON */}
          <div className='mt-[16px]'>
            <button className='flex gap-[6px] items-center border px-[14px] py-[8px] rounded-[8px] text-[14px]'>
              <ArrowLeft size={16} /> Back to Loaners List
            </button>
          </div>

        </main>

      </div>
    )
  }
}
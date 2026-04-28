// import React, { Component } from 'react'
// import { Search } from "lucide-react";
// import { Bell } from "lucide-react";
// import { Phone, MessageSquare } from 'lucide-react';

// export default class LoanAlert extends Component {
//   render() {
//     return (
//       <div>

//         <section className='border-[#E5E7EB] border px-[28px]'>
//           <div className='py-[7px] flex items-center container justify-between '>
//             <div className='flex gap-[5px] items-center'>
//               <h1 className='text-[17px] font-bold'>Ogohlantirishlar</h1>
//               <h2 className='text-[14px] font-normal'>Belgilangan muddatlar va bildirishnomalar</h2>
//             </div>
//             <div className='flex gap-[20px] items-center'>
//               <div className="w-[280px] h-[38px] border border-[#E5E7EB] rounded-[10px] flex items-center px-3 bg-white">
//                 <Search className="w-4 h-4 text-gray-400 mr-2" />
//                 <input type="text" placeholder="Qarz oluvchilarni qidirish..." className="w-full h-full outline-none text-sm text-gray-600 placeholder-gray-400" />
//               </div>
//               <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><Bell /></button>
//               <span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM </span>
//             </div>

//           </div>
//         </section>

//         <section className='mt-[28px] container'>
//           <div className='flex gap-[16px] items-center mb-[16px]'>
//             <button className='text-[#111827] text-[13px] font-semibold py-[7px] px-[16px] bg-[#FFFFFF] shadow-[0_4px_16px_0_#0000000F,0_1px_3px_0_#0000000F] rounded-[7px]'>Kelgusi (2)</button>
//             <button className='text-[#6B7280] text-[13px] font-semibold py-[7px] px-[16px] rounded-[7px]'>Muddati o'tgan (1)</button>
//           </div>

//           <div className='space-y-[10px]'>
//             <div className="flex items-center justify-between px-4 py-3 bg-[#fff] border-[#E5E7EB] border rounded-lg ">

//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
//                   AK
//                 </div>
//                 <div>
//                   <p className="text-[14px] font-medium">Dilnoza Yusupova</p>
//                   <p className="text-[12px] text-gray-400">+998 90 123 45 67 · 2 kundan keyin tugaydi</p>
//                 </div>
//               </div>

//               <div className='flex items-center gap-[17px]'>

//                 <input type="date" className='py-[10px] border-[#E5E7EB] border bg-[#FFFFFF] rounded-[8px] px-[16px]' />

//                 <div className="text-[14px] font-semibold text-red-500">
//                   1 800 000 so'm
//                 </div>

//                 <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[143px]">
//                   <Phone size={16} />
//                   Qo'ng'iroq qiling
//                 </button>
//                 <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[72px]">
//                   <MessageSquare size={16} />
//                   SMS
//                 </button>
//               </div>

//             </div>
//             <div className="flex items-center justify-between px-4 py-3 bg-[#fff] border-[#E5E7EB] border rounded-lg ">

//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
//                   AK
//                 </div>
//                 <div>
//                   <p className="text-[14px] font-medium">Dilnoza Yusupova</p>
//                   <p className="text-[12px] text-gray-400">+998 90 123 45 67 · 2 kundan keyin tugaydi</p>
//                 </div>
//               </div>

//               <div className='flex items-center gap-[17px]'>

//                 <input type="date" className='py-[10px] border-[#E5E7EB] border bg-[#FFFFFF] rounded-[8px] px-[16px]' />

//                 <div className="text-[14px] font-semibold text-red-500">
//                   1 800 000 so'm
//                 </div>

//                 <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[143px]">
//                   <Phone size={16} />
//                   Qo'ng'iroq qiling
//                 </button>
//                 <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[72px]">
//                   <MessageSquare size={16} />
//                   SMS
//                 </button>
//               </div>

//             </div>
//             <div className="flex items-center justify-between px-4 py-3 bg-[#fff] border-[#E5E7EB] border rounded-lg ">

//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-blue-500">
//                   AK
//                 </div>
//                 <div>
//                   <p className="text-[14px] font-medium">Dilnoza Yusupova</p>
//                   <p className="text-[12px] text-gray-400">+998 90 123 45 67 · 2 kundan keyin tugaydi</p>
//                 </div>
//               </div>

//               <div className='flex items-center gap-[17px]'>

//                 <input type="date" className='py-[10px] border-[#E5E7EB] border bg-[#FFFFFF] rounded-[8px] px-[16px]' />

//                 <div className="text-[14px] font-semibold text-red-500">
//                   1 800 000 so'm
//                 </div>

//                 <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[143px]">
//                   <Phone size={16} />
//                   Qo'ng'iroq qiling
//                 </button>
//                 <button className="flex items-center gap-[6px] border border-[#E5E7EB] rounded-[12px] px-[11px] py-[7px] text-[12px] font-semibold text-[#111827] w-[72px]">
//                   <MessageSquare size={16} />
//                   SMS
//                 </button>
//               </div>

//             </div>
//           </div>
//         </section>

//       </div>
//     )
//   }
// }



















import React, { Component } from 'react'
import { Search, Bell, Phone, MessageSquare, Calendar } from "lucide-react";

export default class LoanAlert extends Component {

  state = {
    editIndex: null,
    selectedDate: '',
    loans: [
      {
        name: "Dilnoza Yusupova",
        phone: "+998901234567",
        dateText: "2 kundan keyin",
        amount: "1 800 000 so'm",
        date: "2026-05-01",
        type: "upcoming"
      },
      {
        name: "Anvar Karimov",
        phone: "+998915552211",
        dateText: "5 kundan keyin",
        amount: "950 000 so'm",
        date: "2026-05-05",
        type: "upcoming"
      },
      {
        name: "Jasur Aliyev",
        phone: "+998932221100",
        dateText: "3 kun kechikdi",
        amount: "2 500 000 so'm",
        date: "2026-04-20",
        type: "overdue"
      }
    ]
  }

  openDatePicker = (index, currentDate) => {
    this.setState({
      editIndex: index,
      selectedDate: currentDate
    })
  }

  handleDateChange = (e) => {
    this.setState({ selectedDate: e.target.value })
  }

  saveDate = (index) => {
    const { loans, selectedDate } = this.state
    const updated = [...loans]

    updated[index].date = selectedDate
    updated[index].dateText = "Yangilandi"

    this.setState({
      loans: updated,
      editIndex: null
    })
  }

  cancelEdit = () => {
    this.setState({
      editIndex: null,
      selectedDate: ''
    })
  }

  handleCall = (phone) => {
    window.location.href = `tel:${phone}`
  }

  handleTelegram = (phone, name) => {
    const message = encodeURIComponent(`Salom ${name}, qarzingiz haqida eslatma.`)
    window.open(`https://t.me/${phone.replace('+', '')}?text=${message}`, '_blank')
  }

  renderLoanItem(item, index) {
    const { editIndex, selectedDate } = this.state
    const danger = item.type === "overdue"

    return (
      <div className="flex flex-col gap-[10px] p-[14px] bg-white border border-[#E5E7EB] rounded-[12px] hover:shadow-md transition">

        {/* TOP */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center text-white rounded-full ${danger ? "bg-red-500" : "bg-blue-500"}`}>
              {item.name.slice(0, 2).toUpperCase()}
            </div>

            <div>
              <p className="text-[14px] font-semibold">{item.name}</p>
              <p className="text-[12px] text-gray-400">
                {item.phone} · {item.dateText}
              </p>
            </div>
          </div>

          <div className={`text-[14px] font-bold ${danger ? "text-red-500" : "text-[#111827]"}`}>
            {item.amount}
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-[10px]">

          <button
            onClick={() => this.openDatePicker(index, item.date)}
            className="flex items-center gap-[5px] border border-[#E5E7EB] rounded-[10px] px-[10px] py-[6px] text-[12px]"
          >
            <Calendar size={14} />
            Muddatni o‘zgartirish
          </button>

          <button
            onClick={() => this.handleCall(item.phone)}
            className="flex items-center gap-[5px] border border-[#E5E7EB] rounded-[10px] px-[10px] py-[6px] text-[12px]"
          >
            <Phone size={14} />
            Qo‘ng‘iroq
          </button>

          <button
            onClick={() => this.handleTelegram(item.phone, item.name)}
            className="flex items-center gap-[5px] border border-[#E5E7EB] rounded-[10px] px-[10px] py-[6px] text-[12px]"
          >
            <MessageSquare size={14} />
            Telegram
          </button>

        </div>

        {/* DATE EDIT */}
        {editIndex === index && (
          <div className="flex items-center gap-[10px] mt-[6px] flex-wrap">

            <input
              type="date"
              value={selectedDate}
              onChange={this.handleDateChange}
              className="border border-[#E5E7EB] rounded-[8px] px-[10px] py-[6px] text-[12px]"
            />

            <button
              onClick={() => this.saveDate(index)}
              className="bg-[#2563EB] text-white px-[10px] py-[6px] rounded-[8px] text-[12px]"
            >
              Saqlash
            </button>

            <button
              onClick={this.cancelEdit}
              className="bg-gray-200 px-[10px] py-[6px] rounded-[8px] text-[12px]"
            >
              Bekor qilish
            </button>

          </div>
        )}

      </div>
    )
  }

  render() {
    const { loans } = this.state

    const upcoming = loans.filter(l => l.type === "upcoming")
    const overdue = loans.filter(l => l.type === "overdue")

    return (
      <div className="px-4 lg:px-6 pb-10 min-h-screen">

        {/* ✅ YOUR NAVBAR (UNCHANGED) */}
        <section>
          <div className='container flex items-center justify-between'>
            <div className='flex gap-[5px] items-center'>
              <h1 className='text-[21px] font-bold'>Ogohlantirishlar</h1>
              <h2 className='text-[14px] font-normal'>Overview</h2>
            </div>
            <div className='flex gap-[20px] items-center'>
              <button className='border border-[#E5E7EB] bg-[#FFFFFF] p-[10px] rounded-[10px]'><a href="/alert"><Bell /></a></button>
              <button><a href="/profile"><span className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] flex items-center justify-center text-white text-[13px] font-bold">SM</span></a></button>
            </div>
          </div>
        </section>
        <hr className='mt-[12px]' />

        {/* CONTENT */}
        <section className='mt-[24px] grid grid-cols-1 lg:grid-cols-2 gap-[20px]'>

          {/* UPCOMING */}
          <div className='bg-white rounded-[16px] p-[16px] border border-[#E5E7EB]'>
            <h2 className='font-semibold mb-[10px]'>Kelgusi to‘lovlar</h2>
            <div className='space-y-[10px]'>
              {upcoming.map((item, index) =>
                this.renderLoanItem(item, index)
              )}
            </div>
          </div>

          {/* OVERDUE */}
          <div className='bg-white rounded-[16px] p-[16px] border border-[#E5E7EB]'>
            <h2 className='font-semibold text-red-500 mb-[10px]'>Muddati o‘tgan</h2>
            <div className='space-y-[10px]'>
              {overdue.map((item, index) =>
                this.renderLoanItem(item, loans.indexOf(item))
              )}
            </div>
          </div>

        </section>

      </div>
    )
  }
}
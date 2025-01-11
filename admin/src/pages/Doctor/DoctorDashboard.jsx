import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {

    if (dToken) {

      getDashData()

    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-[#FFFFFF] p-4 min-w-52 rounded border-2 border-[#f7fafc] cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-[#757575]'>{currency}{dashData.earnings}</p>
            <p className='text-[#BDBDBD]'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-[#FFFFFF] p-4 min-w-52 rounded border-2 border-[#f7fafc] cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-[#757575]'>{dashData.appointments}</p>
            <p className='text-[#BDBDBD]'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-[#FFFFFF] p-4 min-w-52 rounded border-2 border-[#f7fafc] cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-[#757575]'>{dashData.patients}</p>
            <p className='text-[#BDBDBD]'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-[#FFFFFF]'>

        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t'>
          <img className='' src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-[#f3f4f6]' key={index}>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-[#808080] font-medium'>{item.userData.name}</p>
                  <p className='text-[#757575]'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled
                    ? <p className='text-[#ef5350] text-xs font-medium'>Cancelled</p>
                    : item.isCompleted
                      ? <p className='text-[#4caf50] text-xs font-medium'>Completed</p>
                      : <div className='flex'>
                        <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
                }
              </div>
            ))
          }
        </div>

      </div>


    </div>
  )
}

export default DoctorDashboard

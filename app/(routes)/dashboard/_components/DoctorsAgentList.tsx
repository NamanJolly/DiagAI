import { AIDoctorAgents } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

function DoctorsAgentList() {
  return (
    <div className='mt-20'>
      <h2 className='font-bold text-2xl text-center'>AI Specialist Doctors</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 -m-12'>
        {AIDoctorAgents.map((doctor,index) => (
            <div key={index} className=''>
                <DoctorAgentCard doctorAgent={doctor}/>
            </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsAgentList

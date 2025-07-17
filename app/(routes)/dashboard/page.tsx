import React from 'react'
import HistoryList from './_components/HistoryList'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import DoctorsAgentList from './_components/DoctorsAgentList'
import AddNewSession from './_components/AddNewSession'


function dashboard() {
  return (
    <div className=' mx-20 pt-20 px-10 md:px-14 lg:px-28'>
        <div className='flex justify-between items-center md:flex-row flex-col gap-2 md:gap-0'>
            <h2 className='md:font-bold font-medium text-lg md:text-2xl'>My Dashboard</h2>
            <AddNewSession />
            
            </div>
      <HistoryList />
      <DoctorsAgentList />
      
    </div>
  )
}

export default dashboard

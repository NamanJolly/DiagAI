"use client"
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import AddNewSession from './AddNewSession';
import axios from 'axios';
import HistoryTable from './HistoryTable';

function HistoryListFull() {
  const [historyList, setHistoryList] = useState([]); 
  useEffect(() => {
    GetHistoryList();
  
  }, [])
  
  const GetHistoryList = async () => {
    const result = await axios.get('/api/session-chat?sessionId=all')
    console.log(result.data)
    setHistoryList(result.data)
  }

  return (
    <div>
      {historyList.length == 0?
      <div className='flex items-center flex-col justify-center gap-2 mt-5 p-7 border-2 border-slate-300 border-dashed rounded-2xl'>
        <Image width={45} height={45} src={"/medical-assisstance.png"} alt='empty' />
        <h2 className='font-bold sm:text-md md:text-xl'>No Recent Consultations</h2>
        <p className='text-xs md:text-sm'> It looks like you haven't consulted with any doctors yet.</p>
        <AddNewSession />
      </div>:
      <div>
        <HistoryTable historyList={historyList} />
      </div>
      }
    </div>
  )
}

export default HistoryListFull

import React from 'react'
import AppHeader from './_components/AppHeader';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AppHeader />
        <div className='z-[60] mx-auto  w-full flex-row items-center justify-between rounded-full bg-transparent px-4 py-2  dark:bg-transparent'>
          {children}
        </div>
      
    </div>
  )
}

export default DashboardLayout

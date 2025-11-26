import React from 'react'
import Header from './_components/Header';
import { Toaster } from "@/components/ui/sonner"

const DashboardLayout = ({ children }) => {
  return (
    <div >
      <Header />
      <div className='w-full py-1 px-5 md:px-8 lg:px-16 xl:px-32'>
        {children}
      </div>
       <Toaster />

    </div>
  )
}

export default DashboardLayout;

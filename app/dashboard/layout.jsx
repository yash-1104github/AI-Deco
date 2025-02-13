import React from 'react'
import Header from './_components/Header';

const DashboardLayout = ({ children }) => {
  return (
    <div >
      <Header />
      <div className='py-1 px-5 md:px-10 lg:px-20 xl:px-40'>
        {children}
      </div>

    </div>
  )
}

export default DashboardLayout;

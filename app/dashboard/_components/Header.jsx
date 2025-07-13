"use client"

import Image from 'next/image'
import React, { useContext } from 'react'
import { UserButton } from "@clerk/clerk-react";
import { UserDetailsConstext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LayoutDashboardIcon,  Sparkles } from 'lucide-react';



const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailsConstext);


  return (

    <div className='py-6 px-4 shadow-sm flex justify-between items-center md:px-16'>
      <div className='flex items-center gap-2 md:px-8'>
         <div className="w-9 h-9 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
        <Link href={'/'}>
          <div className='font-bold text-2xl tracking-wider text-slate-800'>AI Deco</div>
        </Link>
      </div>

      <div className='flex gap-7 items-center'>
      {/* <Link href={'/dashboard/buy-credits'}>
        <Button variant='ghost' className='rounded-full pl-4 text-primary '>Buy More Credits</Button>
      </Link>
        <div className='flex gap-2 items-center bg-gray-100 px-3 rounded-md'>
          <Image src={'/star.png'} width={20} height={10} />
          <h2 className='font-semibold'>{userDetail?.credits}</h2>
        </div> */}

        <Link href={'/dashboard'}>
          <Button>
            <LayoutDashboardIcon size={18} />
            <span className='hidden md:inline'>Dashboard</span>
          </Button>
        </Link>

        <UserButton appearance={{
          elements: {
            avatarBox: "w-8 h-8",
          },
        }}
        />
      </div>

    </div>

  )
}

export default Header

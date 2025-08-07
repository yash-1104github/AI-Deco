"use client"

import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import EmptyState from './EmptyState';
import Link from 'next/link';
import { AiGeneratedImage } from '@/config/schema';
import { db } from '@/config/db';
import { eq } from 'drizzle-orm';
import RoomDesign from './RoomDesign';

const Listing = () => {

    const { user } = useUser();
    const [userRoomList, setUserRoomList] = useState([]);
    
    useEffect(() => {
       user&&GetUserRoomList();
    },[user]);

    const GetUserRoomList= async() => {
         const result  = await db.select().from(AiGeneratedImage)
         .where(eq(AiGeneratedImage.userEmail,user?.primaryEmailAddress?.emailAddress));

         setUserRoomList(result);

         //console.log(result);
    }

    return (
        <div>
            <div className='flex items-center mb-5 justify-between'>
                <h2 className='text-2xl md:text-3xl my-4'>Hello, {user?.fullName}</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button>+ Redesign Room</Button>
                </Link>
            </div>

            {
                userRoomList?.length == 0 ?
                    <EmptyState />
                    :
                    <div className='mt-10'>
                     <h2 className='font-medium text-primary text-xl mb-10'>AI Room Studio</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>

                        {
                          
                            userRoomList.map((room,index)=> (
                                <RoomDesign key={index} room={room}/>
                            ))

                        }
                            </div>
                    </div>
            }
        </div>
    )
}

export default Listing

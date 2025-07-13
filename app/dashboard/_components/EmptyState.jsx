import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
    return (
        <div className='flex items-center justify-center mt-2 flex-col'>
            <Image src={'/room.png'} className='rounded-xl' width={350} height={250} />
            <h2 className='mt-4 font-medium text-xl text-gray-500'>Create New AI Interior Design for your room</h2>

            <Link href={'/dashboard/create-new'}>
                <Button className='mt-4'>+ Redesign Room</Button>
            </Link>
        </div>
    )
}

export default EmptyState

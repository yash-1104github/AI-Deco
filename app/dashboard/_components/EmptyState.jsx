import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const EmptyState = () => {
    return (
        <div className='flex items-center justify-center mt-12 md:mt-20 flex-col'>
            <Image src={'/room.png'} className='rounded-xl' width={450} height={350} />
            <h2 className='mt-12 font-medium text-xl md:text-2xl text-gray-500'>Create New AI Interior Design for your room</h2>

            <Link href={'/dashboard/create-new'}>
                <Button className='mt-4 text-lg font-medium px-4 py-5 md:px-6 md:py-6'>+ Redesign Room</Button>
            </Link>
        </div>
    )
}

export default EmptyState

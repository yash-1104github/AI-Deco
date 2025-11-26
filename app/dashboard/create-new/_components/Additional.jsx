"use client"

import React from 'react'
import { Textarea } from "@/components/ui/textarea"


const Additional = ({ additionalInput }) => {
  return (
    <div className='mt-12'>

      <label className=' flex justify-center text-gray-700 text-xl text-center'>Enter Additional Requirements</label>
      <Textarea className="mt-2" onChange={(e)=>additionalInput(e.target.value)}/>
    </div>
  )
}

export default Additional

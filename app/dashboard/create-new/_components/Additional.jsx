"use client"

import React from 'react'
import { Textarea } from "@/components/ui/textarea"


const Additional = ({ additionalInput }) => {
  return (
    <div className='mt-4'>

      <label className='text-gray-700'>Enter Additional Requirements</label>
      <Textarea className="mt-2" onChange={(e)=>additionalInput(e.target.value)}/>
    </div>
  )
}

export default Additional

"use client"

import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const RoomType = ({ selectedRoomType }) => {
  return (
    <div className='mt-16 md:mt-0'>
    <label className='text-slate-700 text-xl'>Select Room Type</label>
          <Select onValueChange={(value ) => selectedRoomType(value)}>
              <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="Living">Living Room</SelectItem>
                  <SelectItem value="Bedroom">Bedroom</SelectItem>
                  <SelectItem value="Kitchen">Kitchen</SelectItem>
                  <SelectItem value="Living">Office</SelectItem>
                  <SelectItem value="Bathroom">Bathroom</SelectItem>
              </SelectContent>
          </Select>

    </div>
  )
}

export default RoomType

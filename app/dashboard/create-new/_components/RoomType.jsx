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
    <div>
    <div className='mb-2'>
      <label className='text-slate-700 text-lg'>Select Room Type</label>
    </div>
          <Select onValueChange={(value ) => selectedRoomType(value)}>
              <SelectTrigger className="w-full">
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

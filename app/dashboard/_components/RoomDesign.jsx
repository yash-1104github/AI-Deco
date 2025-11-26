
import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';

const RoomDesign = ({ room }) => {

    return (
        <div className='shadow-md rounded-md cursor-pointer' onClick={() => onClickHandler()} >
            <ReactBeforeSliderComponent
                firstImage={{
                    imageUrl: room?.aiImage
                }}
                secondImage={{
                    imageUrl: room?.originalImg
                }}
            />

            <div className='p-4'>
                <div className='text-xl text-blue-400'>
                    Room Type :  <span className='ml-2 text-green-400'>{room.roomType}</span>
                </div>
                <div className='text-xl text-purple-400'>
                    Design Type : <span className='ml-2 text-red-400'>{room.designType}</span> 
                </div>
            </div>
            
        </div>
    )
}

export default RoomDesign

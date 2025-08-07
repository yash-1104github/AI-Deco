
import React, { useState } from 'react'
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import AiOutputDialog from './AiOutputDialog';

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
            <div className='p-4 text-gray-600'>
                <h2>
                    Room Type:  {room.roomType}
                </h2>
                <h2>
                    Design Type: {room.designType}
                </h2>
            </div>
        </div>
    )
}

export default RoomDesign

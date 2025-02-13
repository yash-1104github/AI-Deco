"use client"

import Image from 'next/image'
import React, { useState } from 'react'

const ImageSelction = ({selectedImage}) => {
    const [file, setFile] = useState();


    const onFileSelected = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        selectedImage(event.target.files[0])
    }


    return (
        <div>
            <label className='flex text-gray-700 justify-center  text-lg'>Select Image of Your room</label>
            <div className='mt-5'>
                <label htmlFor='upload-image'>
                    <div className={`cursor-pointer border hover:shadow-lg rounded-xl border-dotted  p-20 flex  botder-primary justify-center bg-slate-300
                      ${file &&'p-0 bg-white'}
                    `}>
                        {!file ? <Image src={'/up.png'} width={100} height={100} />
                            : <Image src={URL.createObjectURL(file)} width={300} height={300}
                                className='w-[300px] h-[300px] object-cover'
                            />}
                    </div>
                </label>
                <input type='file' accept='image/*' id='upload-image'
                    style={{ display: 'none' }} onChange={onFileSelected} />
            </div>
        </div>
    )
}

export default ImageSelction;

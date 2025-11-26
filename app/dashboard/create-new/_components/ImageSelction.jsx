"use client";

import Image from "next/image";
import React, { useState } from "react";

const ImageSelction = ({ selectedImage }) => {
  const [file, setFile] = useState();

  const onFileSelected = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    selectedImage(event.target.files[0]);
  };

  return (
    <div className="w-full">
      <label className="flex text-gray-700 justify-center text-xl">
        Select Image of Your room & Drop
      </label>

      <div className="mt-5 flex w-full justify-center">
        <label htmlFor="upload-image">
          <div
            className={`cursor-pointer hover:shadow-lg rounded-xl flex justify-center items-center
          border-2 border-dashed border-gray-500 bg-slate-300 min-w-96 min-h-96 mx-auto
          ${file && "bg-white p-0"}
        `}
            style={{
              backgroundImage: !file ? "url('/up.png')" : "none",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "90px",
            }}
          >
            {file && (
              <>
              <Image
                src={URL.createObjectURL(file)}
                alt="UploadedImage"
                width={300}
                height={300}
                className="w-3/4 h-3/4 p-5  object-cover rounded-2xl"
              />
              </>
            )}
            
          </div>
        </label>

        <input
          type="file"
          accept="image/*"
          id="upload-image"
          className="hidden"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
};

export default ImageSelction;

"use client";

import Image from "next/image";
import React, { useState } from "react";

const DesignType = ({ selectedDesignType }) => {
  const Designs = [
    {
      name: "Modern",
      image: "/modern.png",
      alt: "Modern Interior Design",
    },
    {
      name: "Industrial",
      image: "/bedroom.png",
      alt: "Industrial Interior Design",
    },
    {
      name: "Bohemian",
      image: "/bohimean.jpg",
      alt: "Bohemian Interior Design",
    },
    {
      name: "Traditional",
      image: "/tradi.jpg",
      alt: "Traditional Interior Design",
    },
    {
      name: "Rustic",
      image: "/rust.jpg",
      alt: "Rustic Interior Design",
    },
    {
      name: "Minimilist",
      image: "/mili.jpg",
      alt: "Minimilist Interior Design",
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-4 md:mt-12">
      <label className="text-gray-700 text-xl">
        Select Interior Design Type
      </label>
      <div className="grid mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {Designs.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.name);
              selectedDesignType(design.name);
            }}
          >
            <Image
              src={design.image}
              alt={design.name}
              width={200}
              height={200}
              className={`h-[120px] w-[220px] object-cover rounded-md hover:scale-105 transition-all cursor-pointer
                                 ${
                                   design.name == selectedOption &&
                                   "border-2 border-primary rounded-md p-1"
                                 }
                                `}
            />

            <div className="mt-2 text-base text-start md:text-center font-medium">
              {design.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignType;

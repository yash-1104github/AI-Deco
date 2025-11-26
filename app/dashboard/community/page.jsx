"use client";

import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { useState, useEffect } from "react";
import RoomDesign from "../_components/RoomDesign";

export default function CommunityPost() {
  const [communityPost, setCommunityPost] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const res = await db.select().from(AiGeneratedImage);
    console.log(res);
    setCommunityPost(res);
  }

  return (
    <>
      <div className="py-12">
        <div className="text-4xl text-slate-600">
          Explore Design By Community
        </div>

        <div className="grid grid-cols-2 gap-10 mt-12">
          {communityPost.map((room, idx) => (
            <RoomDesign key={idx} room={room} />
          ))}
        </div>
      </div>
    </>
  );
}

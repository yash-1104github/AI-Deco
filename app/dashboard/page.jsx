"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import RoomDesign from "./_components/RoomDesign";
import EmptyState from "./_components/EmptyState";

const Dashboard = () => {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  useEffect(() => {
    user && GetUserRoomList();
  }, [user]);

  async function GetUserRoomList() {
    const result = await db
      .select()
      .from(AiGeneratedImage)
      .where(
        eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress?.emailAddress)
      );
    setUserRoomList(result);
  };

  console.log("userRoomList", userRoomList);

  return (
    <div className="py-8">
      <div className="flex items-center mb-5 justify-between">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 font-sans">
          Hello, {user?.fullName}
        </h2>
        <Link href={"/dashboard/create-new"}>
          <Button className="md:mt-4 text-lg font-normal px-4 py-5">
            + Redesign Room
          </Button>
        </Link>
      </div>

      {userRoomList?.length == 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
            {userRoomList.map((room, index) => (
              <RoomDesign key={index} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

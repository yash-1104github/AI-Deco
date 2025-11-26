"use client";

import Image from "next/image";
import React, { useContext } from "react";
import { UserButton } from "@clerk/clerk-react";
import { UserDetailsConstext } from "@/app/_context/UserDetailContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LayoutDashboardIcon } from "lucide-react";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailsConstext);

  return (
    <div className="py-6 px-4 md:px-12 shadow-sm flex justify-between items-center backdrop-blur-3xl">
      <div className="flex items-center gap-2 ">
        <Image src={"/logo.svg"} width={40} height={40} />
        <Link href={"/"}>
          <h2 className="font-semibold text-3xl text-gray-700 font-sans">
            AI Deco
          </h2>
        </Link>
      </div>

      <div className="flex gap-7 items-center">
        <Link href={"/dashboard/community"}>
          <Button variant="ghost" className="rounded-full pl-4 text-xl text-primary ">
             Community Design
          </Button>
        </Link>

        <Link href={"/dashboard"}>
          <Button>
            <LayoutDashboardIcon size={18} />
            <span className="hidden md:inline">Dashboard</span>
          </Button>
        </Link>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;

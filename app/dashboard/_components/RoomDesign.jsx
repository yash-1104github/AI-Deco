"use client";

import React, { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const RoomDesign = ({ room, showCommunityUpload, userEmail, userName }) => {
  const [uploading, setUploading] = useState(false);
  const [shared, setShared] = useState(false);

  const handleUploadToCommunity = async (e) => {
    e.stopPropagation();

    if (shared || uploading) return;

    setUploading(true);
    try {
      await axios.post("/api/community-images", {
        roomType: room.roomType,
        designType: room.designType,
        originalImg: room.originalImg,
        aiImage: room.aiImage,
        userEmail,
        userName,
      });
      setShared(true);
      toast.success("Design shared with the community!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.error || "Failed to share design with community"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="shadow-md rounded-md">
      <ReactBeforeSliderComponent
        firstImage={{
          imageUrl: room?.aiImage,
        }}
        secondImage={{
          imageUrl: room?.originalImg,
        }}
      />

      <div className="p-4">
        <div className="text-xl text-blue-400">
          Room Type :{" "}
          <span className="ml-2 text-green-400">{room.roomType}</span>
        </div>
        <div className="text-xl text-purple-400">
          Design Type :{" "}
          <span className="ml-2 text-red-400">{room.designType}</span>
        </div>

        {showCommunityUpload && (
          <Button
            onClick={handleUploadToCommunity}
            disabled={uploading || shared}
            className="w-full mt-4"
          >
            <Upload className="w-4 h-4 mr-2" />
            {shared
              ? "Shared to Community"
              : uploading
                ? "Sharing..."
                : "Upload to Community"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomDesign;

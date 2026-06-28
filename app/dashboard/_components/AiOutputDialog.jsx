"use client";

import React, { useState } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Upload } from "lucide-react";

const AiOutputDialog = ({
  openDialog,
  closeDialog,
  orgImage,
  aiImage,
  roomType,
  designType,
  userEmail,
  userName,
}) => {
  const [uploading, setUploading] = useState(false);
  const [shared, setShared] = useState(false);

  const handleUploadToCommunity = async () => {
    if (shared || uploading) return;

    setUploading(true);
    try {
      await axios.post("/api/community-images", {
        roomType,
        designType,
        originalImg: orgImage,
        aiImage,
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
    <AlertDialog open={openDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Result:</AlertDialogTitle>
          <ReactBeforeSliderComponent
            firstImage={{
              imageUrl: aiImage,
            }}
            secondImage={{
              imageUrl: orgImage,
            }}
          />
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleUploadToCommunity}
              disabled={uploading || shared}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {shared
                ? "Shared to Community"
                : uploading
                  ? "Sharing..."
                  : "Upload to Community"}
            </Button>
            <Button variant="outline" onClick={() => closeDialog(false)}>
              Close
            </Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AiOutputDialog;

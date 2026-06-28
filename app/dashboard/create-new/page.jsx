"use client";

import React, { useState } from "react";
import ImageSelction from "./_components/ImageSelction";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import Additional from "./_components/Additional";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "../_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { toast } from "sonner";

const CreateNew = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const GenerateAiImage = async () => {
    try {
      if (formData.length == 0) {
        toast("Please chose you style and room type");
        return;
      }

      if (!formData.roomType) {
        toast("Please Select Room type");
        return;
      }

      if (!formData.designType) {
        toast("Please Select Design type");
        return;
      }

      setLoading(true);

      const rawImageUrl = await uploadRawImage();

      if (!rawImageUrl) {
        toast("Please Upload the image");
        return;
      }

      const startRes = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        addInput: formData?.addInput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      const predictionId = startRes.data.id;

      if (!predictionId) {
        throw new Error("Failed to start AI job");
      }

      let attempts = 0;
      const maxAttempts = 30;

      const poll = async () => {
        try {
          const statusRes = await axios.get("/api/redesign-room", {
            params: {
              id: predictionId,
              roomType: formData?.roomType,
              designType: formData?.designType,
              imageUrl: rawImageUrl,
              userEmail: user?.primaryEmailAddress?.emailAddress,
            },
          });

          const data = statusRes.data;

          console.log("Polling status:", data);

          if (data.status === "completed") {
            setAiOutput(data.image);
            setOpenOutputDialog(true);
            setLoading(false);
            return;
          }

          if (data.status === "failed") {
            throw new Error("AI generation failed");
          }

          if (attempts < maxAttempts) {
            attempts++;
            setTimeout(poll, 2000);
          } else {
            throw new Error("Timeout: AI took too long");
          }
        } catch (err) {
          console.error("Polling error:", err);
          toast("Error generating image");
          setLoading(false);
        }
      };

      poll();
    } catch (err) {
      console.log("err", err);
      toast("Some error occur try again");
      setLoading(false);
    }
  };

  const uploadRawImage = async () => {
    try {
      if (!formData.image) {
        toast("Please select image");
        return;
      }

      const uploadData = new FormData();
      uploadData.append("file", formData.image);

      const { data } = await axios.post("/api/upload-image", uploadData);
      const downloadUrl = data.url;
      setOrgImage(downloadUrl);

      return downloadUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast("Upload failed");
      return null;
    }
  };

  return (
    <div className="py-6">
      <div className="font-bold text-4xl mt-1 text-primary text-center">
        Experience the Magic of AI Remodeling
      </div>
      <div className="mt-4 text-xl justify-end items-center text-center text-gray-500">
        Tranform any room with a click. Select a space, choose a style, and
        watch as AI instantly reimageines your environment
      </div>

      <div className="md:flex px-4 py-8 gap-10 mt-6 flex-col md:flex-row">
        {/* LEFT PART */}
        <div className="w-full md:w-1/2 space-y-8">
          <ImageSelction
            selectedImage={(value) => onHandleInputChange(value, "image")}
          />

          <Additional
            additionalInput={(value) => onHandleInputChange(value, "addInput")}
          />
        </div>

        {/* RIGHT PART */}
        <div className="w-full md:w-1/2 space-y-4">
          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "roomType")}
          />

          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />

          <div className="">
            <Button onClick={GenerateAiImage} className="mt-6 w-full px-12 ">
              Generate Your Design
            </Button>
          </div>
        </div>
      </div>

      <CustomLoading loading={loading} />

      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutput}
      />
    </div>
  );
};

export default CreateNew;

"use client";

import React, { useState } from "react";
import ImageSelction from "./_components/ImageSelction";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import Additional from "./_components/Additional";
import { Button } from "@/components/ui/button";
import axios, { toFormData } from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import { useUser } from "@clerk/nextjs";
import CustomLoading from "../_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { toast } from "sonner";

const CreateNew = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [outputResult, setOutputResult] = useState();
  const [aiOutput, setAiOutput] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();

  const onHandleInputChange = (value, fieldName) => {
    console.log("value", value);
    console.log("fieldName", fieldName);
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  console.log(formData);

  const GenerateAiImage = async () => {
    try {
      const rawImageUrl = await SaveRawImageToFirebase();
      console.log("rawImage", rawImageUrl);

      if (formData.length == 0) {
        console.log("Please chose you style and room type");
        toast("Please chose you style and room type");
        return;
      }

      if (!rawImageUrl) {
        toast("Please Upload the image");
        console.log("Upload the image");
        return;
      }

      console.log("formData", formData);

      if (!formData.roomType) {
        toast("Please Select Room type");
        console.log("Please Select Room type");
        return;
      }

      if (!formData.designType) {
        toast("Please Select Design type");
        return;
      }

      setLoading(true);

      const result = await axios.post("/api/redesign-room", {
        imageUrl: rawImageUrl,
        roomType: formData?.roomType,
        designType: formData?.designType,
        addInput: formData?.addInput,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });

      console.log(result.data);
      setAiOutput(result.data.result);
      setOpenOutputDialog(true);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      toast("Some error occur try again");
    }
  };

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + ".jpg";
    const imageRef = ref(storage, "ai-room-redesign/" + fileName);

    try {
      if (!formData.image) {
        console.log("select image");
        toast("Please select image");
        return;
      }

      await uploadBytes(imageRef, formData.image);
      console.log("File uploaded successfully");

      const downloadUrl = await getDownloadURL(imageRef);
      setOrgImage(downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
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

"use client"

import React, { useState } from 'react'
import ImageSelction from './_components/ImageSelction';
import RoomType from './_components/RoomType';
import DesignType from './_components/DesignType';
import Additional from './_components/Additional';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebase';
import { useUser } from '@clerk/nextjs';
import CustomLoading from '../_components/CustomLoading';
import AiOutputDialog from '../_components/AiOutputDialog';


const CreateNew = () => {

  const { user } = useUser();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [outputResult, setOutputResult] = useState();
  const [aiOutput, setAiOutput] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();

  const onHandleInputChange = (value, fieldName) => {


    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))

    console.log(formData);
  }

  const GenerateAiImage = async () => {
    setLoading(true);
    const rawImageUrl = await SaveRawImageToFirebase();

    const result = await axios.post('/api/redesign-room', {
      imageUrl: rawImageUrl,
      roomType: formData?.roomType,
      designType: formData?.designType,
      addInput: formData?.addInput,
      userEmail: user?.primaryEmailAddress?.emailAddress

    })
    console.log(result.data);
    setAiOutput(result.data.result);
    setOpenOutputDialog(true);
    setLoading(false);

    //  console.log(rawImageUrl);
  }

  const SaveRawImageToFirebase = async () => {
    const fileName = Date.now() + ".jpg";
    const imageRef = ref(storage, 'ai-room-redesign/' + fileName);

    try {
      await uploadBytes(imageRef, formData.image);
      //console.log("File uploaded successfully");

      const downloadUrl = await getDownloadURL(imageRef);
      console.log("Download URL:", downloadUrl);
      setOrgImage(downloadUrl);
      return downloadUrl;

    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }

  return (
    <div>
      <h2 className='font-bold text-4xl mt-1 text-primary text-center'>Experience the Magic of AI Remodeling</h2>
      <p className='mt-2 text-center text-gray-500'>Tranform any room with a click. Select a space, choose a style, and watch as AI instantly reimageines your environment.</p>

      <div className='grid sm:grid-cols-1 md:grid-cols-2  py-12 gap-10'>

        <ImageSelction selectedImage={(value) => onHandleInputChange(value, 'image')} />

        <div>
          <RoomType selectedRoomType={(value) => onHandleInputChange(value, 'roomType')} />

          <DesignType selectedDesignType={(value) => onHandleInputChange(value, 'designType')} />

          <Additional additionalInput={(value) => onHandleInputChange(value, 'addInput')} />

          <Button onClick={GenerateAiImage} className='mt-4 w-full mb-4'>Generate</Button>

        </div>
      </div>
      <CustomLoading loading={loading} />
      <AiOutputDialog openDialog={openOutputDialog} closeDialog={() => setOpenOutputDialog(false)}
        orgImage={orgImage}
        aiImage={aiOutput}
      />
    </div>
  )
}

export default CreateNew;

import { db } from "@/config/db";
import { storage } from "@/config/firebase";
import { AiGeneratedImage } from "@/config/schema";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";


const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});

 console.log( "replicate", replicate);

export async function POST(req) {

    const { imageUrl, roomType, designType, addInput, userEmail } = await req.json();
    
    console.log( "replicate", replicate);
    console.log("process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN", process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN);

    try {
        const input = {
            image: imageUrl,
            prompt: "A " + roomType + ' with a ' + designType + " style interior " + addInput
        };

        const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });

        console.log(output);

        // return NextResponse.json({ 'result': output });
        // const output = "https://replicate.delivery/xezq/uNHv0Kb47tprDF9j30eAS9XYBe4vFONFYkV63Kr4UDMhLkOUA/out.png"

        const base64Image = await ConverImageToBase64(output);

        const fileName = Date.now() + '.png';
        const storageRef = ref(storage, 'ai-room-redesign/' + fileName);
        await uploadString(storageRef, base64Image, 'data_url');
        const downloadUrl = await getDownloadURL(storageRef);

        console.log(imageUrl); 
        console.log(downloadUrl);

        const dbResult = await db.insert(AiGeneratedImage).values({
            roomType: roomType,
            designType: designType,
            originalImg: imageUrl,
            aiImage: downloadUrl,
            userEmail: userEmail
        }).returning({id:AiGeneratedImage.id });

        console.log(dbResult);
        return NextResponse.json({ 'result': downloadUrl});

    } catch (e) {
        return NextResponse.json({ error: e })
    }
}


async function ConverImageToBase64(imageUrl) {
    try {
        const res = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64ImageRaw = Buffer.from(res.data).toString('base64');
        return "data:image/png;base64," + base64ImageRaw;
    } catch (error) {
        console.error("Error converting image to base64:", error);
        throw error;
    }
}


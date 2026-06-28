import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { uploadImage } from "@/lib/cloudinary";
import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { error: "missing repliate token" },
      { status: 500 },
    );
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const { imageUrl, roomType, designType, addInput, userEmail } =  await req.json();

  try {
    const input = {
      image: imageUrl,
      prompt: "A " + roomType + " with a " + designType + " style interior " + addInput,
     };

    const prediction = await replicate.predictions.create({
      version:
        "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      input,
    });


     return NextResponse.json({ id: prediction.id });
  } catch (e) {
    console.error("ERROR:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const roomType = searchParams.get("roomType");
  const designType = searchParams.get("designType");
  const imageUrl = searchParams.get("imageUrl");
  const userEmail = searchParams.get("userEmail");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (
    !process.env.CLOUDINARY_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    return NextResponse.json(
      { error: "Missing Cloudinary credentials" },
      { status: 500 },
    );
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { error: "missing repliate token" },
      { status: 500 },
    );
  }

  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  try {
    const prediction = await replicate.predictions.get(id);

    if (prediction.status !== "succeeded") {
      return NextResponse.json({ status: prediction.status });
    }

    const outputUrl = prediction.output[0];

    const response = await axios.get(outputUrl, {
      responseType: "arraybuffer",
    });

    const downloadUrl = await uploadImage(Buffer.from(response.data), "aideco/ai");

    if (roomType && designType && imageUrl) {
      const dbResult = await db.insert(AiGeneratedImage).values({
        roomType,
        designType,
        originalImg: imageUrl,
        aiImage: downloadUrl,
        userEmail,
      }).returning({ id: AiGeneratedImage.id });

      console.log("DB Result:", dbResult);
    }

    return NextResponse.json({
      status: "completed",
      image: downloadUrl,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

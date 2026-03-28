import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, addInput, userEmail } =
    await req.json();

  try {
    const input = {
      image: imageUrl,
      prompt:
        "A " +
        roomType +
        " with a " +
        designType +
        " style interior " +
        addInput,
    };

    // 1️⃣ Generate AI image (returns URL)
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    // 2️⃣ Fetch image as BUFFER (NO base64)
    const response = await axios.get(output, {
      responseType: "arraybuffer",
    });

    const fileName = `images/${Date.now()}.png`;

    // 3️⃣ Upload to Supabase
    const { data, error } = await supabase.storage
      .from("aideco")
      .upload(fileName, response.data, {
        contentType: "image/png",
      });

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 4️⃣ Get public URL
    const { data: urlData } = supabase.storage
      .from("aideco")
      .getPublicUrl(fileName);

    const downloadUrl = urlData.publicUrl;

    // 5️⃣ Save in DB
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType,
        designType,
        originalImg: imageUrl,
        aiImage: downloadUrl,
        userEmail,
      })
      .returning({ id: AiGeneratedImage.id });

    console.log("DB Result:", dbResult);

    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    console.error("ERROR:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
import { db } from "@/config/db";
import { CommunityImages } from "@/config/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await db
      .select()
      .from(CommunityImages)
      .orderBy(desc(CommunityImages.createdAt));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Failed to fetch community images:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { roomType, designType, originalImg, aiImage, userEmail, userName } =
      await req.json();

    if (!roomType || !designType || !originalImg || !aiImage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await db
      .insert(CommunityImages)
      .values({
        roomType,
        designType,
        originalImg,
        aiImage,
        userEmail,
        userName,
      })
      .returning({ id: CommunityImages.id });

    return NextResponse.json({
      id: result[0].id,
      message: "Design shared with community",
    });
  } catch (error) {
    console.error("Failed to save community image:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

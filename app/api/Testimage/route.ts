import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Testimage from "../../../lib/models/TestImg";

export async function GET() {
  try {
    await dbConnect();
    const images = await Testimage.find({}).sort({ createdAt: -1 });
    
    // Transform data to be more frontend-friendly
    const transformedImages = images.map(img => ({
      id: img._id.toString(),
      title: img.Title,
      description: img.Description,
      createdAt: img.createdAt
    }));
    console.log("Fetched images:", transformedImages);
    return NextResponse.json({ images: transformedImages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ 
      message: "Error fetching images",
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, { status: 500 });
  }
}

export async function POST(request : Request){
  try {
    const formdata = await request.formData();
    const title = formdata.get("Title");
    const image = formdata.get("Image");
    const description = formdata.get("Description");

    if(!image || !title || !description){
      return NextResponse.json({message: "Please fill all fields"}, {status: 400});
    }
    
    // Check if image is a File object
    if (!(image instanceof File)) {
      return NextResponse.json({message: "Image must be a file"}, {status: 400});
    }
    
    //convert image to Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await dbConnect();
    const testImg = await Testimage.create({
      Title: title,
      Description: description,
      Image: {
        data: buffer,
        contentType: image.type
      }
    });

    return NextResponse.json({message: "Image uploaded successfully", data: testImg}, {status: 201});
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({
      message: "Error uploading image", 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, {status: 500});
  }
}

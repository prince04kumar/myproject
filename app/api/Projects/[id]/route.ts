import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbconnect';
import NewProject from '../../../../lib/models/NewProject';

interface Params {
  params: { id: string }
}

export async function GET(request: NextRequest, context: Params) {
  try {
    await dbConnect();
    const id = context.params.id;

    const project = await NewProject.findById(id);
    
    if (!project || !project.image || !project.image.data) {
      return new NextResponse('Image not found', { status: 404 });
    }

    return new NextResponse(project.image.data, {
      status: 200,
      headers: {
        'Content-Type': project.image.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('Error fetching project image:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}

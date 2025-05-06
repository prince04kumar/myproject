import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect';
// import Project from '../../../lib/models/Project';
import Team from '../../../lib/models/Team';

// GET all projects
export async function GET() {
  // try {
    await dbConnect();
    console.log('Fetching all projects...');
    const projects = (await Team.find({}));
    const transformedImages = projects.map(img => ({
      id: img._id.toString(),
      title: img.title,
      description: img.description,
     
    }));
    console.log('Fetched projects:', transformedImages);
    return NextResponse.json({projects:transformedImages}, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  // }
}

// POST a new project
// export async function POST(req) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const project = await Project.create(body);
//     return NextResponse.json(project, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }




export async function POST(request : Request){
  console.log('success');
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
    const testImg = await Team.create({
      title: title,
      image: {
        data: buffer,
        contentType: image.type
      },
      description: description
    });

    return NextResponse.json({message: "Image uploaded successfully", data: testImg}, {status: 201});
  } catch (error) {
    console.error("Error uploading for u image:", error);
    return NextResponse.json({
      message: "Error uploading image", 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }, {status: 500});
  }
}

// DELETE a project
export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
    }

    const deletedProject = await Team.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// // PUT (update) a project
// export async function PUT(req : Request) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const { id, ...updates } = body; // Extract `id` and update fields
//     console.log(id);

//     if (!id) {
//       return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
//     }

//     if (!Object.keys(updates).length) {
//       return NextResponse.json({ success: false, error: 'No updates provided' }, { status: 400 });
//     }

//     const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();

//     if (!updatedProject) {
//       return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
//     }

//     return NextResponse.json(updatedProject, { status: 200 });
//   } catch (error:any) {
//     console.error('Error updating project:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 400 });
//   }
// }



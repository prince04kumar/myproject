import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect';
import Project from '../../../lib/models/Project';

// GET all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({});
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST a new project
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// PUT (update) a project
export async function PUT(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, ...updates } = body; // Extract `id` and update fields
    console.log(id);

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
    }

    if (!Object.keys(updates).length) {
      return NextResponse.json({ success: false, error: 'No updates provided' }, { status: 400 });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();

    if (!updatedProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// DELETE a project
export async function DELETE(req) {
  try {
    await dbConnect();
    const { id } = await req.json(); // Expecting `id` in the request body
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}



import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect';
import Team from '../../../lib/models/Team';

export async function GET() {
    
    try {
      await dbConnect();
      const projects = await Team.find({});
      return NextResponse.json(projects, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const newMember = await Team.create(body);
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// DELETE a project
export async function DELETE(req) {
    try {
      await dbConnect();
      const { id } = await req.json(); // Expecting `id` in the request body
      const deletedProject = await Team.findByIdAndDelete(id);
      if (!deletedProject) {
        return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Project deleted successfully' }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
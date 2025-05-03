import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbconnect';
import Admin from '../../../lib/models/Admin';


export async function GET() {
    try {
        await dbConnect();
        console.log('Fetching all admins...');
        const admins = await Admin.find({});
        console.log("this is admin list:", admins);
        return NextResponse.json(admins, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    }
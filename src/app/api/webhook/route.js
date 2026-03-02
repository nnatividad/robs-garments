import { NextResponse } from 'next/server'

export async function POST(req){
    console.log('endpoint hit');
    return NextResponse.json("Webhook endpoint reached", { status: 200 });
}
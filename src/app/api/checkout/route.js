import { NextResponse } from 'next/server'

export async function POST(req){
    const body = await req.json();
    const cart = body;
    console.log(body);
    return NextResponse.json(cart);
}
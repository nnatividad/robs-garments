import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(){
    return new NextResponse("Checkout page");
}
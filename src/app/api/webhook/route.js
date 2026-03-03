import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../../lib/stripe'

export async function POST(req){
    const body = await req.text(); // reads raw HTTP request body and returns as a string. stripe sends checkout session object data
    const sig = req.headers.get('stripe-signature'); // fetches stripe signature. used to confirm endpoint called by stripe

    try {
        // Create event
        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET_KEY
        );

        // check for if event type is checkout.session.completed
        // do nothing if event type is something else
        if (event.type == "checkout.session.completed"){
            return NextResponse.json( { message: 'Checkout session completed!'});
        }

        return NextResponse.json( { status: 200 });
    } catch(err){
        return new NextResponse(`Webhook error: ${err.message}`, { status: 400 })
    }
}
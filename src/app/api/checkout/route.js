import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { client } from '../../../../sanity/client'
import { stripe } from '../../../../lib/stripe'

const ITEMS_QUERY = `*[_type=="item" && _id in $ids]{_id, name, price, "imageUrls": images[].asset->url, isSold}`;

export async function POST(req){
    const origin = (await headers()).get('origin')
    const body = await req.json(); // receives array of productIDs
    const cart = await client.fetch(ITEMS_QUERY, {ids:body}); // queries product data: name, price, images

    // check if items are sold or not
    for(let i = 0; i < cart.length; i++){
        if (cart[i].isSold){
            const soldItemName = cart[i].name;
            return NextResponse.json({ error: `${soldItemName} already sold!`});
        }
        // price conversion price * 100 since stripe stores prices by smallest value USD
        cart[i].price *= 100;
    }

    // line items --> list of items user is purchasing
    const lineItems = cart.map( item => ({
        price_data: {
            currency: 'usd',
            unit_amount: item.price,
            product_data: {
                name: item.name,
                images: [item.imageUrls[0]]
            },
        },
        quantity: 1,
    }));
    
    // create checkout session object
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    })
    
    // returning client_secret which is used to access data of checkout session (name, price, etc.) in frontend
    return NextResponse.json(session.client_secret);
}
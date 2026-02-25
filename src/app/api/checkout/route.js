import { NextResponse } from 'next/server'
import { client } from '../../../../sanity/client'

const ITEMS_QUERY = `*[_type=="item" && _id in $ids]{_id, name, price, "imageUrls": images[].asset->url, isSold}`;

export async function POST(req){
    const body = await req.json(); // receives array of productIDs
    const cart = await client.fetch(ITEMS_QUERY, {ids:body}); // queries product data: name, price, images

    // check if items are sold or not
    for(let i = 0; i < cart.length; i++){
        if (cart[i].isSold){
            const soldItemName = cart[i].name;
            return NextResponse.json({ error: `${soldItemName} already sold!`});
        }
    }
    console.log(cart);
    
    return NextResponse.json(cart);
}
import { NextResponse } from 'next/server'
import { client } from '../../../../sanity/client'
import { stripe } from '../../../../lib/stripe'

const CHECK_ORDERS_QUERY = `*[_type=="order" && _id == $sessionId][0]`;

export async function POST(req){
    const body = await req.text(); // reads raw HTTP request body and returns as a string. stripe sends checkout session object data
    const sig = req.headers.get('stripe-signature'); // fetches stripe signature. used to confirm endpoint called by stripe

    try {
        // Create event
        const event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET_KEY
        )

        const session = event.data.object;
        // check for if event type is checkout.session.completed
        // do nothing if event type is something else
        if (event.type == "checkout.session.completed"){
             // extract session id
            const sessionId = session.id

            // idempotency check
            // check if session id exists in orders
            const existingSession = await client.fetch(CHECK_ORDERS_QUERY, {sessionId: sessionId});
            
            if (existingSession){
                return NextResponse.json({ received: true });
            } else { // add session id into orders

                // extract line items
                const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {expand:['data.price.product']});

                // query line item details from sanity
                const ids = lineItems.data.map(item => item.price.product.metadata.sanityId);

                // need product data to update isSold
               // const lineItemDetails = await client.fetch(LINE_ITEMS_QUERY, {ids: ids});
                
                // map ids to objects and have unique key of id + index
                const itemRef = ids.map((id, index) => ({
                        _key: id + index,
                        _ref: id,
                        _type: 'reference'
                }));

                // convert created from Unix to seconds
                const created = session.created;
                const date = new Date(created * 1000);

                // extract address details
                const shippingAddress = {
                    city: session.customer_details.address.city,
                    country: session.customer_details.address.country,
                    line1: session.customer_details.address.line1,
                    line2: session.customer_details.address?.line2,
                    postal_code: session.customer_details.address.postal_code,
                    state: session.customer_details.address.state
                };

                // create order session and add to sanity doc
                const newOrder = {
                    _type: 'order',
                    name: session.customer_details.name,
                    _id: sessionId,
                    email: session.customer_details.email,
                    createdAt: date.toISOString(),
                    address: shippingAddress,
                    orderTotal: session.amount_total,
                    itemsPurchased: itemRef
                };

                await client.create(newOrder);

                // update inventory
                for(let i = 0; i < ids.length; i++){
                    await client
                        .patch(ids[i])
                        .set({ isSold: true })
                        .set({ soldAt: new Date().toISOString() })
                        .commit()
                        .then((updatedDoc) => {
                            console.log('Updated doc: ', updatedDoc)
                        })
                        .catch((err) => {
                            console.error('Update failed: ', err.message)
                        })
                }

                return NextResponse.json( {message: 'Order created' });
            }
        }
        return NextResponse.json( { status: 200 });
    } catch(err){
        return new NextResponse(`Webhook error: ${err.message}`, { status: 400 })
    }
}
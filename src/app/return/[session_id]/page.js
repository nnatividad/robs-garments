import { stripe } from '../../../../lib/stripe';
import Success from '@/components/Success/Success';
import { client } from '../../../../sanity/client';

const LINE_ITEMS_QUERY = `*[_type=="item" && _id in $ids]{_id, name, price, color, size, "imageUrls": images[].asset->url}`;

export default async function Return({params}){
    const {session_id} = await(params);
    const session = await stripe.checkout.sessions.retrieve(
        session_id,
        {
            expand: ['payment_intent.payment_method']
        }
    );

    if (session?.status == 'open') {
        return <p>Payment did not work</p>;
    }

    if (session?.status == 'complete'){
        // taxes and shipping information from session
        const shippingCost = session.total_details.amount_shipping / 100;
        const tax = session.total_details.amount_tax / 100;

        // shipping and buyer information from session
        let paymentInfo;
        if (session.payment_intent && session.payment_intent.payment_method) {
            const card = session.payment_intent.payment_method.card;
            paymentInfo = {
                'brand': card.brand,
                'last4': card.last4
            };
        }

        let displayName;
        if (session.shipping_cost){
            const shippingInfo = session.shipping_cost;

            if(shippingInfo.shipping_rate){ // checks if shipping rate exists
                const shippingRate = await stripe.shippingRates.retrieve(shippingInfo.shipping_rate);
                displayName = shippingRate.display_name;
                if (displayName == 'Standard'){
                    displayName = shippingRate.display_name + ' Est. 3-5 business days';
                }
            }
        } else{
            displayName = 'Free Shipping';
        }

        // deliveryInfo object including shipping method
        const name = session.customer_details.name;
        const address = session.customer_details.address;

        // timestamp of purchase made
        const sessionDate = new Date(session.created * 1000); // multiply by 1000 to convert seconds to milliseconds

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        // convert to month day, year format
        const formattedDate = sessionDate.toLocaleDateString('en-US', options);

        // fetch lineItems from checkout session
        const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {expand:['data.price.product']});
        const ids = lineItems.data.map(item => item.price.product.metadata.sanityId);
        const lineItemDetails = await client.fetch(LINE_ITEMS_QUERY, {ids: ids});
        

        const deliveryInfo = {
            'name': name,
            'line1': address.line1,
            'city': address.city,
            'postal_code': address.postal_code,
            'shipping_method': displayName,
            'date': formattedDate
        };

        return <Success cart={lineItemDetails} id={session_id} shipping={shippingCost} tax={tax} paymentInfo={paymentInfo} deliveryInfo={deliveryInfo}/>
    }
}
import { stripe } from '../../../../lib/stripe';
import Success from '@/components/Success/Success';
import { client } from '../../../../sanity/client';

const LINE_ITEMS_QUERY = `*[_type=="item" && _id in $ids]{_id, name, price, color, size, "imageUrls": images[].asset->url}`;

export default async function Return({params}){
    const {session_id} = await(params);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session?.status == 'open') {
        return <p>Payment did not work</p>;
    }

    if (session?.status == 'complete'){
        // fetch lineItems from checkout session
        const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {expand:['data.price.product']});
        const ids = lineItems.data.map(item => item.price.product.metadata.sanityId);
        const lineItemDetails = await client.fetch(LINE_ITEMS_QUERY, {ids: ids});
        return <Success cart={lineItemDetails} id={session_id}/>
    }
}
import { stripe } from '../../../../lib/stripe';
import Success from '@/components/Success/Success'

export default async function Return({params}){
    const {session_id} = await(params);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session?.status == 'open') {
        return <p>Payment did not work</p>;
    }

    if (session?.status == 'complete'){
        return <Success/>
    }
}
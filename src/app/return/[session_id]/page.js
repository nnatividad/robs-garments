import { stripe } from '../../../../lib/stripe'

export default async function Return({params}){
    const {session_id} = await(params);
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session?.status == 'open') {
        return <p>Payment did not work</p>;
    }

    if (session?.status == 'complete'){
        return <h3>
            We appreciate your business!
        </h3>;
    }
}
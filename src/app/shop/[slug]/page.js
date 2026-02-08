import { client } from '@/sanity/client'

export default async function ItemDetails({ params }){
    const { slug } = await(params);
    const ITEM_QUERY = `*[_type=="item" && slug.current== $slug][0]`;
    const item = await client.fetch(ITEM_QUERY, { slug });

    return(
        <main>
            <h1>{item.name}</h1>
        </main>
    )
}
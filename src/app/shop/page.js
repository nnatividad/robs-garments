import Card from '@/components/Card/Card.js'
import Link from 'next/link'
import styles from '@/app/shop/page.module.css'
import { client } from '../../../sanity/client'

    const ITEMS_QUERY = `*[_type=="item" && isSold == false]{
    _id,
    category,
    price,
    name,
    "imageUrls": images[].asset->url,
    slug
    }`;

export const revalidate = 0;

export default async function AllProducts(){
    const items = await client.fetch(ITEMS_QUERY, {},{ cache: "no-store" });

    return(
        <main className={styles.pageFormat}>
            <section>
                <div className={styles.items}>
                    {items.map((item) => (
                        <Link href={`/shop/${item.category}/${item.slug?.current}`} key={item._id}>
                            <Card
                                itemName={item.name}
                                itemImages={item.imageUrls}
                                itemCategory={item.category}
                                itemSlug={item.slug}
                                itemPrice={item.price}
                            />
                        </Link>
                    ))
                    }
                </div>
            </section>
        </main>
    );
}
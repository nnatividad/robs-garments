import Card from '@/components/Card/Card.js'
import Link from 'next/link'
import styles from '@/app/shop/page.module.css'
import { client } from '../../../../sanity/client'

export default async function Shop({params}){
    const {category} = await params;
    const ITEMS_BY_CATEGORY_QUERY = `*[_type == "item" && category == "${category}" && isSold == false]{..., "imageUrls": images[].asset->url}`
    const items = await client.fetch(ITEMS_BY_CATEGORY_QUERY, {});

    return(
        <main className={styles.pageFormat}>
            <div className={styles.pageContent}>
                <div className={styles.items}>
                    {items.length > 0 ? items.map((item) => (
                        <Link href={`/shop/${item.category}/${item.slug?.current}`} key={item._id}>
                            <Card
                                itemName={item.name}
                                itemImage={item.imageUrls[0]}
                                itemCategory={item.category}
                                itemSlug={item.slug}
                                itemPrice={item.price}
                            />
                        </Link>
                    )) :
                        `No available products in this category`
                    }
                </div>
            </div>
        </main>
    );
}
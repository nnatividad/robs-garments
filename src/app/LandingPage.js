import Link from 'next/link'
import styles from './landingPage.module.css'
import Card from '@/components/Card/Card.js'
import AddToCartButton from '@/components/Buttons/AddToCartButton'
import { client } from '../../sanity/client'

const ITEMS_QUERY = `*[_type=="item" && isSold == false]{
  _id,
  category,
  price,
  name,
  "imageUrls": images[].asset->url,
  slug
}`;
  
export default async function LandingPage () {
    const items = await client.fetch(ITEMS_QUERY, {});
    return (
        <main className={styles.landingPage}>
            <div className={styles.newArrivals}>
                <div className={styles.items}>
                    {items.map((item) => (
                        <Link href={`/shop/${item.category}/${item.slug?.current}`} key={item._id}>
                            <Card 
                                itemName={item.name}
                                itemImage={item.imageUrls[0]}
                                itemCategroy={item.category}
                                itemSlug={item.slug}
                                itemPrice={item.price}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}


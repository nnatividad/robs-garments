import Link from 'next/link'
import styles from './landingPage.module.css'
import NavBar from "@/components/NavBar/NavBar.js"
import Footer from "@/components/Footer/Footer.js"
import Card from '@/components/Card/Card.js'
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
            <header>
                <NavBar />
            </header>
            <div className={styles.landingGIF}>
                <Link href='/shop' className={styles.gifLink}>
                    <img src="/robin-garments.gif" alt="loading..." />
                </Link>
            </div>
            <section>
                <div className={styles.newArrivals}>
                    <h1>New Arrivals</h1>
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
            </section>
            <footer>
                <Footer />
            </footer>
        </main>
    );
}


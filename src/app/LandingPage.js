import Image from "next/image";
import styles from './landingPage.module.css'
import NavBar from "@/components/NavBar/NavBar.js"
import Footer from "@/components/Footer/Footer.js"
import Card from '@/components/Card/Card.js'
import { client } from '@/sanity/client'

const ITEMS_QUERY = `*[_type=="item"]{
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
            <a href='#'>
                <div className={styles.landingGIF}>
                <img src="/robin-garments.gif" alt="loading..." />
                </div>
            </a>
            <section>
                <div className={styles.newArrivals}>
                    <h1>New Arrivals</h1>
                    <div className={styles.items}>
                        {items.map((item) => (
                            <a href={`/${item.category}/${item.slug?.current}`} key={item._id}>
                                <Card 
                                    itemName={item.name}
                                    itemImage={item.imageUrls[0]}
                                    itemCategroy={item.category}
                                    itemSlug={item.slug}
                                    itemPrice={item.price}
                                />
                            </a>
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


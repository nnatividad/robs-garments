import Image from "next/image";
import styles from './landingPage.module.css'
import NavBar from "@/components/NavBar/NavBar.js"
import Footer from "@/components/Footer/Footer.js"
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
        <main>
            <header>
                <NavBar />
            </header>
            <a href='#'>
                <div className={styles.landingGIF}>
                <img src="/robin-garments.gif" alt="loading..." />
                </div>
            </a>
            <section>
                <h1>New Arrivals</h1>
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                            <a href={`/items/${item.slug?.current}`}>
                            {item.imageUrls?.[0] && (
                                <Image
                                    src={item.imageUrls[0]}
                                    alt={item.name}
                                    width={300}
                                    height={300}
                                />
                            )}
                            </a>
                            <h3>{item.name}</h3>
                            <h3>${item.price.toFixed(2)} USD</h3>
                            <p>{item.category}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <footer>
                <Footer />
            </footer>
        </main>
    );
}


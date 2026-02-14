import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import Card from '@/components/Card/Card.js'
import Link from 'next/link'
import styles from '@/app/shop/page.module.css'
import { client } from '@/sanity/client'

export default async function AllProducts(){
    const ITEMS_QUERY = `*[_type=="item"]{
    _id,
    category,
    price,
    name,
    "imageUrls": images[].asset->url,
    slug
    }`;
    const items = await client.fetch(ITEMS_QUERY, {});

    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div className={styles.items}>
                    {items.map((item) => (
                        <Link href={`/shop/${item.category}/${item.slug?.current}`} key={item._id}>
                            <Card
                                itemName={item.name}
                                itemImage={item.imageUrls[0]}
                                itemCategory={item.category}
                                itemSlug={item.slug}
                                itemPrice={item.price}
                            />
                        </Link>
                    ))
                    }
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    );
}
import { client } from '@/sanity/client'
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import Image from 'next/image'
import styles from '@/app/shop/[category]/[slug]/page.module.css'

export default async function ItemDetails({ params }){
    const { category, slug } = await(params);
    const ITEM_QUERY = `*[_type=="item" && slug.current== $slug][0]{..., "imageUrls": images[].asset->url}`;
    
    const item = await client.fetch(ITEM_QUERY, { slug });
    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div className={styles.basicInfo}>
                    <div className={styles.images}>
                        <ul>
                            {item.imageUrls.map((src,index) =>(
                                    <li key={index}>
                                        <Image 
                                            src={src}
                                            alt={`${item.name} ${index + 1}`}
                                            width={500}
                                            height={500}
                                            className={styles.itemImage}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.stickInfo}>
                        <div className={styles.itemInfo}>
                            <h1>{item.name}</h1>
                            <h3>${item.price.toFixed(2)} USD</h3>
                            <button type="button" className={styles.button}>Add to Cart</button>
                            <button type="button" className={styles.button}>Purchase</button>

                            <div className={styles.details}>
                                Details:
                                <ul>
                                    <li>Condition: {item.condition}</li>
                                    <li>Color: {item.color}</li>
                                    {item?.description && <li>{item.description}</li>}
                                    <li>{item.size}</li>
                                    {item?.chest && <li>Chest: {item.chest} in.</li>}
                                    {item?.length && <li>Length: {item.length} in.</li>}
                                    {item?.waist && <li>Waist: {item.waist}.</li>}
                                    {item?.inseam && <li>Inseam: {item.inseam} in.</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={styles.moreItems}>
                    <h1>You may also like </h1>
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    )
}
import { client } from '@/sanity/client'
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import Image from 'next/image'
import styles from '@/app/shop/[slug]/page.module.css'

export default async function ItemDetails({ params }){
    const { slug } = await(params);
    const ITEM_QUERY = `*[_type=="item" && slug.current== $slug][0]{..., "imageUrls": images[].asset->url}`;
    const item = await client.fetch(ITEM_QUERY, { slug });
    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div className={styles.basicInfo}>
                    <div>
                        <ul>
                            {item.imageUrls.map((src,index) =>(
                                    <li key={index}>
                                        <Image 
                                            src={src}
                                            alt={`${item.name} ${index + 1}`}
                                            width={600}
                                            height={600}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className={styles.itemInfo}>
                        <h1>{item.name}</h1>
                        <h3>${item.price.toFixed(2)} USD</h3>
                        <button>Add to Cart</button>
                        <button>Purchase</button>
                    </div>
                </div>
                <div>
                    <h3>Item Details</h3>
                    <ul>
                        <li>{item.condition}</li>
                        <li>{item.color}</li>
                        {item?.description && <li>{item.description}</li>}
                    </ul>
                    <h3>Measurements</h3>
                    <ul>
                        <li>{item.size}</li>
                        {item?.chest && <li>{item.chest} in.</li>}
                        {item?.length && <li>{item.length} in.</li>}
                        {item?.waist && <li>{item.waist} in.</li>}
                        {item?.inseam && <li>{item.inseam} in.</li>}
                    </ul>
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    )
}
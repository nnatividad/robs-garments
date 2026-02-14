import Link from 'next/link'
import styles from './Dropdown.module.css'

const categories = ['shirts-and-tops', 'sweatshirts-and-hoodies', 'jackets-and-coats', 'shorts', 'pants', 'shoes', 'accessories'];

export default function Dropdown(){
    return(
        <main>
            <div className={styles.container}>
                <ul>
                    <Link href="/shop"><li>All Products</li></Link>
                    <Link href={`/shop/${categories[0]}`}><li>Shirts & Tops</li></Link>
                    <Link href={`/shop/${categories[1]}`}><li>Sweatshirts & Hoodies</li></Link>
                    <Link href={`/shop/${categories[2]}`}><li>Jackets & Coats</li></Link>
                    <Link href={`/shop/${categories[3]}`}><li>Shorts</li></Link>
                    <Link href={`/shop/${categories[4]}`}><li>Pants</li></Link>
                    <Link href={`/shop/${categories[5]}`}><li>Shoes</li></Link>
                    <Link href={`/shop/${categories[6]}`}><li>Accessories</li></Link>
                </ul>
            </div>
        </main>
    );
}
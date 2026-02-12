import Link from 'next/link'
import styles from './Dropdown.module.css'

export default function Dropdown(){
    return(
        <main>
            <div className={styles.container}>
                <ul>
                    <Link href="/shop"><li>All Products</li></Link>
                    <li>Shirts & Tops</li>
                    <li>Sweatshirts & Hoodies</li>
                    <li>Jackets & Coats</li>
                    <li>Shorts</li>
                    <li>Pants</li>
                    <li>Shoes</li>
                    <li>Accessories</li>
                </ul>
            </div>
        </main>
    );
}
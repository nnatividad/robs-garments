import styles from './NavBar.module.css'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.navbar}>
            <ul>
                <Link href='/shop'><li>SHOP</li></Link>
                <Link href='/cart'><li>CART</li></Link>
            </ul>
            <div className={styles.logo}>
                <Link href='/'><img src="/robin-garment-logo.jpg" alt="navbar-logo" width="150px"/></Link>
            </div>
            <ul>
                <Link href='/archive'><li>ARCHIVE</li></Link>
                <Link href='/about'><li>ABOUT</li></Link>
            </ul>
        </div>
    );
}
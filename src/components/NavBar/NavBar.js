import styles from './NavBar.module.css'

export default function NavBar() {
    return (
        <div className={styles.navbar}>
            <ul>
                <a href='#'><li>SEARCH</li></a>
                <a href='#'><li>CART</li></a>
            </ul>
            <div className={styles.logo}>
                <img src="/robin-garment-logo.jpg" alt="navbar-logo" width="200px"/>
            </div>
            <ul>
                <a href='#'><li>SHOP</li></a>
                <a href='#'><li>ARCHIVE</li></a>
            </ul>
        </div>
    );
}
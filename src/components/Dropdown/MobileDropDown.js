import Link from 'next/link'
import styles from './Dropdown.module.css'

const categories = ['shirts-and-tops', 'sweatshirts-and-hoodies', 'jackets-and-coats', 'shorts', 'pants', 'shoes', 'accessories'];

export default function MobileDropdown({ variant = 'overlay' }) {
    const containerClass = variant === 'inline' ? styles.containerInline : styles.containerOverlay;
    return(
        <div>
            <div className={containerClass}>
                <ul>
                    <Link href="/shop"><li>SHOP </li></Link>
                    <Link href={`/about`}><li>ABOUT</li></Link>
                    <Link href={`/archive`}><li>ARCHIVE</li></Link>
                    <Link href={`/support`}><li>SUPPORT</li></Link>
                </ul>
            </div>
        </div>
    );
}
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ShopDropdown from '../Dropdown/ShopDropDown'
import styles from './Dropdown.module.css'

export default function MobileDropdown({ variant = 'overlay' }) {
    const containerClass = variant === 'inline' ? styles.containerInline : styles.containerOverlay;
    const [openShopDropdown, setShopDropDown] = useState(false);
    return(
        <div>
            <div className={containerClass}>
                <ul>
                    <span onClick={() => setShopDropDown((prev) => !prev)}>SHOP</span>
                    <Link href={`/about`}><li>ABOUT</li></Link>
                    <Link href={`/archive`}><li>ARCHIVE</li></Link>
                </ul>
            </div>
            {openShopDropdown && <ShopDropdown onClose={() => setShopDropDown(false)}/>}
        </div>
    );
}
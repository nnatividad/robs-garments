'use client'
import React, { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import DesktopDropdown from '@/components/Dropdown/DesktopDropDown'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '../../app/context/CartContext'

export default function DesktopNavBar() {
    const [openDropdown, setDropDown] = useState(false);
    const cartData = useCart();
    const [cartLength, setCartLength] = useState(0);

    useEffect(()=>{
        if (cartData.cart == 0){
            setCartLength(0);
            return;
        }
        setCartLength(cartData.cart.length)
    },[cartData.cart]);

    const pathName = usePathname();
    useEffect(() => {
        setDropDown(false);
    },[pathName]);

    return (
        <div className={styles.navRoot}>
            <div className={styles.navbar}>
                <ul className={styles.navLink}>
                    <span onClick={() => setDropDown((prev) => !prev)}><li>SHOP</li></span>
                    <Link href='/about'><li>ABOUT</li></Link>
                </ul>
                <div className={styles.logo}>
                    <Link href='/'>Rob's Garments</Link>
                </div>
                <ul className={styles.navLink}>
                    <Link href='/archive'><li>ARCHIVE</li></Link>
                    {cartLength > 0 ? (
                        <Link href='/cart'><li>CART - {cartLength}</li></Link>
                    ):(
                        <Link href='/cart'><li>CART</li></Link>
                    )}
                </ul>
            </div>
            {openDropdown && <DesktopDropdown />}
        </div>
    );
}

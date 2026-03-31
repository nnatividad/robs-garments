'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../NavBar/NavBar.module.css'
import MobileDropdown from '@/components/Dropdown/MobileDropDown'
import { useCart } from '../../app/context/CartContext'

export default function MobileNavBar(){
    const cartData = useCart();
    const [openDropdown, setDropDown] = useState(false);
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

    return(
        <div className={styles.navRoot}>
            <div className={styles.mobileNavBar}>
                <ul className={styles.navLink}>
                    <span onClick={() => setDropDown((prev) => !prev)}><li>MENU</li></span>
                </ul>
                <div className={styles.logo}>
                    <Link href='/'>Robin's Garments</Link>
                </div>
                <ul className={styles.navLink}>
                    {cartLength > 0 ? (
                        <Link href='/cart'><li>CART - {cartLength}</li></Link>
                    ):(
                        <Link href='/cart'><li>CART</li></Link>
                    )}
                </ul>
            </div>
            {openDropdown && <MobileDropdown />}
        </div>        
    )
}
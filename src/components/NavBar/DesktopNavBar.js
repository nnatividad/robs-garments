'use client'
import React, { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import Dropdown from '@/components/Dropdown/Dropdown'
import Link from 'next/link'
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

    return (
        <div className={styles.navRoot}>
            <div className={styles.navbar}>
                <ul className={styles.navLink}>
                    <span onClick={() => setDropDown((prev) => !prev)}><li>SHOP</li></span>
                    <Link href='/about'><li>ABOUT</li></Link>
                </ul>
                <div className={styles.logo}>
                    <Link href='/'><img src="/robin-garment-logo.jpg" alt="navbar-logo" width="150px"/></Link>
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
            {openDropdown && <Dropdown />}
        </div>
    );
}

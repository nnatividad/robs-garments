'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../NavBar/NavBar.module.css'
import MobileDropdown from '@/components/Dropdown/MobileDropDown'

export default function MobileNavBar(){
    const [openDropdown, setDropDown] = useState(false);
    const [cartLength, setCartLength] = useState(0);

    return(
        <div className={styles.navRoot}>
            <div className={styles.mobileNavBar}>
                <ul className={styles.navLink}>
                    <span onClick={() => setDropDown((prev) => !prev)}><li>MENU</li></span>
                </ul>
                <div className={styles.logo}>
                    <Link href='/'><img src="/robin-garment-logo.jpg" alt="navbar-logo" width="150px"/></Link>
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
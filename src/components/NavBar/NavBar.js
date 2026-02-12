'use client'
import React, {useState} from 'react'
import styles from './NavBar.module.css'
import Dropdown from '@/components/Dropdown/Dropdown'
import Link from 'next/link'

export default function NavBar() {
    const [openDropdown, setDropDown] = useState(false);
    return (
        <main>
            <div className={styles.navbar}>
                <ul className={styles.navLink}>
                    <span onClick={() => setDropDown((prev) => !prev)}><li>SHOP</li></span>
                    <Link href='/cart'><li>CART</li></Link>
                </ul>
                <div className={styles.logo}>
                    <Link href='/'><img src="/robin-garment-logo.jpg" alt="navbar-logo" width="150px"/></Link>
                </div>
                <ul className={styles.navLink}>
                    <Link href='/archive'><li>ARCHIVE</li></Link>
                    <Link href='/about'><li>ABOUT</li></Link>
                </ul>
            </div>
            {
                openDropdown && <Dropdown/>
            }
        </main>
    );
}
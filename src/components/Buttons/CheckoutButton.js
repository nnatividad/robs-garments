'use client'
import styles from './ItemButton.module.css'
import { useCartUpdate } from '@/app/context/CartContext'

export default function CheckoutButton (){
    return(
        <form action="/api/checkout" method="GET">
            <button type="submit" className={styles.checkoutButton}>
                Checkout
            </button>
        </form>
    )
}
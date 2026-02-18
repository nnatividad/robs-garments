'use client'
import styles from './ItemButton.module.css'
import { useCartUpdate } from '@/app/context/CartContext'

export default function Checkout (){
    return(
        <button
            type="button"
            className={styles.checkoutButton}
            onClick={() => {
            }}
        >
            Checkout
        </button>
    )
}
'use client'
import styles from './ItemButton.module.css'

export default function CheckoutButton ( {onClick} ){
    return(
        <button type="submit" className={styles.checkoutButton} onClick={onClick}>
            Proceed to Checkout
        </button>
    )
}
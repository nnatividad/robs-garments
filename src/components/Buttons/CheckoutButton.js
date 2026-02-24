'use client'
import styles from './ItemButton.module.css'

export default function CheckoutButton ( {cart} ){
    // async function for making call to /api/checkout:
    const handleCart = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        });

        const data = await res.json();
        console.log(data);
    }

    return(
        <button type="submit" className={styles.checkoutButton} onClick={handleCart}>
            Checkout
        </button>
    )
}
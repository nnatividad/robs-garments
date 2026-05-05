'use client'
import styles from './ItemButton.module.css'
import { useCartUpdate } from '@/app/context/CartContext'

export default function AddToCart( {itemID} ){
    const addToCart = useCartUpdate();
    return(
        <button
            type="button"
            className={styles.addButton}
            onClick={() => {
                addToCart.addItem(itemID);
            }}
        >
            Add to Cart
        </button>
    )
}
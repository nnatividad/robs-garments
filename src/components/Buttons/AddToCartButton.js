'use client'
import styles from './AddToCartButton.module.css'
import { useCartUpdate } from '@/app/context/CartContext'

export default function AddToCart( {itemID} ){
    const addToCart = useCartUpdate();
    return(
        <button
            type="button"
            className={styles.button}
            onClick={() => {
                addToCart.addItem(itemID)
                alert("Item added to Cart");
            }}
        >
            Add To Cart
        </button>
    )
}
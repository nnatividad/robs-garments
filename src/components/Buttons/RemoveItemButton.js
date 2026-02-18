'use client'
import styles from './ItemButton.module.css'
import { useCartUpdate } from '@/app/context/CartContext'

export default function RemoveFromCart( {itemID} ){
    const removeFromCart = useCartUpdate();
    return(
        <button
            type="button"
            className={styles.removeButton}
            onClick={() => {
                removeFromCart.removeItem(itemID);
                alert("Item removed Cart");
            }}
        >
            Remove Item
        </button>
    )
}
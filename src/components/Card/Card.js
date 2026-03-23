import Image from "next/image";
import styles from './Card.module.css'

export default function Card({itemID, itemName, itemImage, itemPrice}){
    return(
        <div className={styles.card}>
            <div className={styles.cardImage}>
                <Image
                    src={itemImage}
                    alt={itemName}
                    height={800}
                    width={600}
                    className={styles.itemImage}
                />
            </div>
            <div className={styles.cardInfo}>
                <h3>
                    {itemName}
                </h3>
                <p>${itemPrice.toFixed(2)} USD </p>
            </div>
        </div>
    );
}
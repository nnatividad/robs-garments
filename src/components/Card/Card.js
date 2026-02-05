import Image from "next/image";
import styles from './Card.module.css'

export default function Card({itemName, itemImage, itemPrice}){
    return(
        <div className={styles.card}>
            <div className={styles.cardImage}>
                <Image
                    src={itemImage}
                    alt={itemName}
                    height={210}
                    width={210}
                    className={styles.itemImage}
                />
            </div>
            <div className={styles.cardInfo}>
                <h3>
                    {itemName}
                </h3>
                <div>
                    <span></span>
                    ${itemPrice.toFixed(2)} USD
                </div>
            </div>
        </div>
    );
}
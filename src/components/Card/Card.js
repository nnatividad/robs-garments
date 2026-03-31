'use client'

import Image from "next/image";
import styles from './Card.module.css'
import { useState } from 'react'

export default function Card({itemID, itemName, itemImages, itemPrice}){
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div 
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.cardImage}>
                <Image
                    src={itemImages[0]}
                    alt={itemName}
                    height={800}
                    width={600}
                    className={styles.itemImage}
                    style={{opacity: isHovered ? 0 : 1, transition: "opacity 0.5s ease"}}
                />


                <Image
                    src={itemImages?.[1]}
                    alt={itemName}
                    height={800}
                    width={600}
                    className={styles.itemImage}
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.5s ease",
                        position: "absolute",
                        top: 0,
                        left: 0
                    }}
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
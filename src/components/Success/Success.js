'use client'
import React, {useEffect} from 'react'
import Link from 'next/link'
import styles from './Success.module.css'

/* 
            <div className={styles.landingGIF}>
            </div>

        useEffect(()=>{
        // clear local storage cart
        localStorage.clear();
        },[])
*/

export default function Success(){

    // example data used for template order summary
    const orderNum = "#pi_3TJI";
    const exampleCart = [
        {
            'name': 'Relaxed Linen Shirt',
            'size': 'M',
            'color': 'Blue',
            'price': 68
        },
        {
            'name': 'Straight Leg Jeans',
            'size': '30x30',
            'color': 'Olive',
            'price': 80       
        }
    ];

    let subTotal = 0;
    for (let i = 0; i < exampleCart.length; i++){
        subTotal += exampleCart[i].price;
    }

    const tax = 13.12;
    const total = subTotal + tax;

    return(
        <div className={styles.container}>
            <div className={styles.confirmInfo}>
                <h1> Order Confirmed! </h1>
                <p> Thank you for your purchase! We appreciate your business and hope to see you again! </p>
                <p> Order: <span>{orderNum} </span></p>
                <p><Link href='/'>Return to Home Page</Link></p>
            </div>
            <div className={styles.orderSummary}>
                <h3>Order Summary</h3>
                <div className={styles.cartContainer}>
                    <ul>
                        <li>
                            <div className={styles.cartItem}>
                                <img src="/robin-garments.gif" alt="loading..." className={styles.itemPhoto}/>
                                <div className={styles.itemInfo}>
                                    <h3>{exampleCart[0].name}</h3>
                                    <div className={styles.itemDetail}>
                                       <p>Size: {exampleCart[0].size}</p>
                                        <p>Color: {exampleCart[0].color}</p>
                                    </div>
                                </div>
                                <span className={styles.price}>${exampleCart[0].price.toFixed(2)}</span>
                            </div>
                        </li>
                        <li>
                            <div className={styles.cartItem}>
                                <img src="/robin-garments.gif" alt="loading..." className={styles.itemPhoto}/>
                                <div className={styles.itemInfo}>
                                    <h3>{exampleCart[1].name}</h3>
                                    <div className={styles.itemDetail}>
                                       <p>Size: {exampleCart[1].size}</p>
                                        <p>Color: {exampleCart[1].color}</p>
                                    </div>
                                </div>
                                <span className={styles.price}>${exampleCart[1].price.toFixed(2)}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
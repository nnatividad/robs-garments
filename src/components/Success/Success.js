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

export default function Success({cart, id}){
    useEffect(()=>{
        // clear local storage cart
        localStorage.clear();
    },[]);

    const orderID = id.substring(5,12)
    console.log(cart);

    let subTotal = 0;
    //for (let i = 0; i < cart.length; i++){
    //    subTotal += exampleCart[i].price;
    //}

    const tax = 13.12;
    const total = subTotal + tax;

    /*
                        {items.map((item) => (
                        <Link href={`/shop/${item.category}/${item.slug?.current}`} key={item._id}>
                            <Card 
                                itemName={item.name}
                                itemImages={item.imageUrls}
                                itemCategroy={item.category}
                                itemSlug={item.slug}
                                itemPrice={item.price}
                            />
                        </Link>
                    ))}
    */

    return(
        <div className={styles.container}>
            <div className={styles.confirmInfo}>
                <h1> Order Confirmed! </h1>
                <p> Thank you for your purchase! We appreciate your business and hope to see you again! </p>
                <p> Order: <span>{orderID} </span></p>
                <p><Link href='/'>Return to Home Page</Link></p>
            </div>
            <div className={styles.orderSummary}>
                <h3>Order Summary</h3>
                <div className={styles.cartContainer}>
                    <ul>
                        {cart.map((item) => (
                            <li key={item._id}>
                                <div className={styles.cartItem}>
                                    <img src={item.imageUrls[0]} alt="loading..." className={styles.itemPhoto}/>
                                    <div className={styles.itemInfo}>
                                        <h3>{item.name}</h3>
                                        <div className={styles.itemDetail}>
                                            <p>Size: {item.size}</p>
                                            <p>Color: {item.color}</p>
                                        </div>
                                    </div>
                                    <span className={styles.price}>${item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
            </div>
        </div>
    );
}
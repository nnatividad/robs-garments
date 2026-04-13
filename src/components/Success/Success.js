'use client'
import React, {useEffect} from 'react'
import Link from 'next/link'
import styles from './Success.module.css'

export default function Success({cart, id, shipping, tax, paymentInfo, deliveryInfo, date}){
    useEffect(()=>{
        // clear local storage cart
        localStorage.clear();
    },[]);

    const orderID = '#' + id.substring(5,12);

    let subTotal = 0;
    for (let i = 0; i < cart.length; i++){
        subTotal += cart[i].price;
    }

    const total = subTotal + tax + shipping;

    return(
        <div className={styles.container}>
            <div className={styles.confirmInfo}>
                <h1> Order Confirmed! </h1>
                <p> Thank you for your purchase! </p>
                <p>We appreciate your business and hope to see you again! </p>
                <p> Order: <span>{orderID} </span></p>
            </div>
            <div className={styles.orderSummary}>
                <h2>Order Summary</h2>
                <div className={styles.cartContainer}>
                    <ul>
                        {cart.map((item) => (
                            <li key={item._id} className={styles.item}>
                                <div className={styles.cartItem}>
                                    <img src={item.imageUrls[0]} alt="loading..." className={styles.itemPhoto}/>
                                    <div className={styles.itemInfo}>
                                        <h4>{item.name}</h4>
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
                <div className={styles.totalContainer}>
                    <ul>
                        <li>Subtotal: ${subTotal.toFixed(2)}</li>
                        <li>Shipping: ${shipping.toFixed(2)}<p></p></li>
                        <li>Tax: ${tax.toFixed(2)}</li>
                        <li><span>Total: ${total.toFixed(2)}</span></li>
                    </ul>
                </div>
            </div>
            <div className={styles.orderSummary}>
                <h2>Delivery Details</h2>
                <div className={styles.deliveryDetails}>
                    <div>
                        <h4>Ship to</h4>
                        <p>{deliveryInfo.name}</p>
                        <p>{deliveryInfo.line1}</p>
                        <p>{deliveryInfo.city} {deliveryInfo.postal_code}</p>
                    </div>
                    <div>
                        <h4>Shipping Method</h4>
                        <p>{deliveryInfo.shipping_method}</p>
                    </div>
                    <div>
                        <h4>Payment</h4>
                        <p>{paymentInfo.brand} ending in {paymentInfo.last4}</p>
                    </div>
                    <div>
                        <h4>Date Placed</h4>
                        <p>{deliveryInfo.date}</p>
                    </div>
                </div>
            </div>
            <div className={styles.bottomMessage}>
                <b><Link href='/'>Continue Shopping</Link></b>
                <p>
                    Questions? Reach out via Instagram DM @robinsgarments with your order number.
                    Orders are final sale unless you received the wrong or damaged item. <u><Link href='/contact'>Return policy</Link></u>
                </p>
            </div>
        </div>
    );}
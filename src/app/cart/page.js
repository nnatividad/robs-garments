'use client'

import Image from 'next/image'
import Link from 'next/link'
import RemoveItemButton from '@/components/Buttons/RemoveItemButton'
import { useCart } from '../../app/context/CartContext'
import { client } from '../../../sanity/client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'
import CheckoutButton from '@/components/Buttons/CheckoutButton'
import Checkout from '@/components/Checkout/Checkout'

// cart stores itemIDs
// fetch itemDetails: name, image, price using GROQ Query
const CART_QUERY = `*[_type=="item" && _id in $ids && isSold == false]{_id, name, price, "imageUrls": images[].asset->url}`;

export default function Cart(){
    const cartData = useCart(); // global cart context
    const [localCart, setLocalCart] = useState([]); // local cart storing item data
    const [estimatedTotal, setEstimatedTotal] = useState(0); // cart total state
    const [clientSecret, setClientSecret] = useState(null); // stores client secret in state used for rendering embedded checkout
    
    useEffect(() => {

        if (cartData.cart.length == 0){
            setLocalCart([]);
            setEstimatedTotal(0);
            return;
        }
        
        // query cart items by id whenever the cart array is updated
        async function fetchItems(){
            const cartItems = await client.fetch(CART_QUERY, {ids: cartData.cart}); // fetching cartItems

            // calculating cart total whenever cart changes
            let total = 0;
            for(let i = 0; i < cartItems.length; i++){
                total += cartItems[i].price;
            }

            setEstimatedTotal(total);
            setLocalCart(cartItems);
        }

        fetchItems();
    }, [cartData.cart]);

    // async function for making call to /api/checkout:
    const handleCart = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData.cart)
        });

        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
    }

return (
    <main className={styles.pageFormat}>
        <section>
            {!clientSecret ? (
                cartData.cart.length > 0 ? (
                    <>
                    <div className={styles.container}>
                        <h1>Your Cart</h1>
                        <ul>
                            {localCart.map((item) => (
                                <li key={item._id}>
                                    <div className={styles.cartItem}>
                                        <Image
                                            src={item.imageUrls[0]}
                                            alt={item.name}
                                            width={200}
                                            height={200}
                                            className={styles.itemImage}
                                        />
                                        <div className={styles.detailsContainer}>
                                            <div className={styles.itemDetail}>
                                                <p>{item.name}</p>
                                                <p>${item.price.toFixed(2)}</p>
                                            </div>
                                            <RemoveItemButton itemID={item._id} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.checkoutContainer}>
                        Estimated Total: ${estimatedTotal.toFixed(2)}
                        <CheckoutButton onClick={handleCart} />
                    </div>
                </>
                ) : (
                    <div className={styles.emptyCartContainer}>
                        Cart Empty
                        <ul>
                            <li><Link href='/shop'>Continue Shopping</Link></li>
                            <li><Link href='/'>Go to homepage</Link></li>
                        </ul>
                    </div>
                )
            ) : (
                <Checkout clientSecret={clientSecret} />
            )}
        </section>
    </main>
)};
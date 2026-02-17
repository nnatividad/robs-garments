'use client'

import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import Image from 'next/image'
import { useCart } from '../../app/context/CartContext'
import { client } from '@/sanity/client'
import { useState, useEffect } from 'react'

// cart stores itemIDs
// fetch itemDetails: name, image, price using GROQ Query
const CART_QUERY = `*[_type=="item" && _id in $ids]{_id, name, price, "imageUrls": images[].asset->url}`;

export default function Cart(){
    const cartData = useCart(); // global cart context
    const [localCart, setLocalCart] = useState([]); // local cart storing item data
    
    useEffect(() => {

        if (cartData.cart.length == 0){
            setLocalCart([]);
            return;
        }
        
        // query cart items by id whenever the cart array is updated
        async function fetchItems(){
            const cartItems = await client.fetch(CART_QUERY, {ids: cartData.cart});
            setLocalCart(cartItems);
        }

        fetchItems()
    }, [cartData.cart]);

    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div>
                    <ul>
                        {localCart.length  > 0 ? localCart.map((item) => (
                            <li key={item._id}>
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <Image
                                    src={item.imageUrls[0]}
                                    alt={`${item.name}`}
                                    width = {300}
                                    height = {300}
                                    />
                                </div>
                            </li>
                        )) :
                            `No Items in Cart`
                        }
                    </ul>
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    );
}
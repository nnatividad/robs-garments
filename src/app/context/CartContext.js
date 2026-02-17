'use client'
import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext();

const CartUpdateContext = createContext();

// custom hook so that we can access CartContext from any file
export function useCart(){
    return useContext(CartContext);
}

export function useCartUpdate(){
    return useContext(CartUpdateContext);
}

export default function CartProvider ( {children} ){
    const [cart, setCart] = useState([]); // maintains cart state

    // functions addItem, removeItem
    function addItem( itemID ) {
        // adds item to cart
        // stores cart id in the array
        // called when user clicks "Add to Cart Button" in itemDetails page
        setCart(prevCart => {
                if (prevCart.includes(itemID)){
                    alert("Item already in cart!");
                    return prevCart;
                }
                return [...prevCart, itemID];
        });
        
    }

    function removeItem( itemId ) {
        // removes item from cart
        // removes by id in array
        // called in Cart Page, when user clicks "remove item" button
    }
    return (
        <CartContext.Provider value={{ cart, setCart }}>
            <CartUpdateContext.Provider value={{ addItem, removeItem }}>
                { children }
            </CartUpdateContext.Provider>
        </CartContext.Provider>
    );
};
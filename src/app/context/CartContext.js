'use client'
import React, { createContext, useState, useContext, useEffect } from 'react'

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
        setCart(prevCart => {
            let newCart = prevCart.filter(id => id !== itemId);
            return newCart;
        });

        alert("Item removed from cart!")
    };

    // functions loadCart, saveCart for local storage
    function loadCart() {
        // loads item ids from local storage
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        return storedCart.filter(Boolean);
    }

    function saveCart() {
        // saves current item ids to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // useEffect hook for load cart (on mount)
    useEffect(() => {
        const storedCart = loadCart();
        if (storedCart) {
            setCart(storedCart)
        }
    }, []);

    // useEffect hook for save cart (on cart)
    useEffect(() => {
        saveCart();
    }, [cart])

    return (
        <CartContext.Provider value={{ cart }}>
            <CartUpdateContext.Provider value={{ addItem, removeItem }}>
                { children }
            </CartUpdateContext.Provider>
        </CartContext.Provider>
    );
};
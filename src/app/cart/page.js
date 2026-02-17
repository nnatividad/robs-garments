'use client'

import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import { useCart } from '../../app/context/CartContext'

// cart stores itemIDs
// fetch itemDetails: name, image, price using GROQ Query


export default function Cart(){
    const cartData = useCart();
    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div>
                    <ul>
                        {cartData.cart.length > 0 ? cartData.cart.map((item) => (
                            <li key={item}>{item}</li>
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
import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'

export default function Cart(){
    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div>
                    Cart
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    );
}
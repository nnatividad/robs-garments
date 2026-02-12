import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'
import Dropdown from '@/components/Dropdown/Dropdown'

export default function About(){
    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div>
                    About
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    );
}
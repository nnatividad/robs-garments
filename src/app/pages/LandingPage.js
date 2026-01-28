import Image from "next/image";
import styles from './landingPage.module.css'
import NavBar from "@/components/NavBar/NavBar.js"
import Footer from "@/components/Footer/Footer.js"

export default function LandingPage () {
    return (
        <main>
            <NavBar />
            <a href='#'>
                <div className={styles.landingGIF}>
                <img src="/robin-garments.gif" alt="loading..." />
                </div>
            </a>
            <Footer />
        </main>
    );
}


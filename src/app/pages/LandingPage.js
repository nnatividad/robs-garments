import Image from "next/image";
import styles from './landingPage.module.css'
import NavBar from "@/components/NavBar/NavBar.js"

export default function LandingPage () {
    return (
        <main>
            <div className={styles.landingGIF}>
                <img src="/robin-garments.gif" alt="loading..." />
            </div>
            <NavBar />
        </main>
    );
}


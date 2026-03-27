import styles from './footer.module.css'
import Link from 'next/link'

export default function Footer() {
    return(
        <div className={styles.footer}>
            <div className={styles.footerLinks}>
                <Link href='/support'>SUPPORT</Link>
                <Link href='/policy'>POLICY</Link>
            </div>
            © 2026 ROBINSGARMENTS
        </div>
    );
}
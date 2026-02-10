import Image from "next/image";
import styles from "./page.module.css";
import LandingPage from "@/app/LandingPage"

export default function Home() {
  return (
    <main className={styles}>
      <LandingPage />
    </main>
    )
}

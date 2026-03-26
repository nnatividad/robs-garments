'use client'
import { useState, useEffect } from 'react'
import DesktopNavBar from '../NavBar/DesktopNavBar'
import MobileNavBar from '../NavBar/MobileNavBar'

export default function NavBar() {
    const [isMobile, setIsMobile] = useState(false);

    // useEffect hook that tracks size of screen
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener("resize", handleResize);
    },[])

    if (isMobile){
        return(
            <MobileNavBar/>
        )
    }else{
        return(
            <DesktopNavBar/>
        )
    }
}

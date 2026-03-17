'use client'
import React, {useEffect} from 'react'
import Link from 'next/link'

export default function Success(){
    useEffect(()=>{
        // clear local storage cart
        localStorage.clear();
    },[])

    return(
        <div>
            <h3> We appreciate your business! </h3>
            <Link href='/'>Return to Home Page</Link>
        </div>
    );
}
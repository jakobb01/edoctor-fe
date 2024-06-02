"use client"
import React, {useEffect} from "react";

export default function Pharmacy() {
    useEffect(()=>{
        window.location.assign('/dashboard')
    }, [])
    return (
        <div>
            Redirect to dashboard...
        </div>
    )
}
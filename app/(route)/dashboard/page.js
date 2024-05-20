"use client"
import React, {useEffect, useState} from "react";
import Landing from "@/app/_components/Landing";
import {getUser} from "@/app/actions/auth";
import Image from "next/image";

export default function Dashboard() {

    const [user, setUser] = useState({username: '', email: ''});

    useEffect(()=>{
        userWelcome()
    }, [])

    async function userWelcome() {
        const res = await getUser();
        if (res.ok) {
            setUser(res.data);
        } else {
            setUser({username: '', email: ''})
        }
    }

    return (
        <div className={'flex flex-col items-center '}>
            <div className={'grid grid-cols-2 gap-2'}>
                <img className={'animate-bounce ml-60 mt-5'}
                    src={'/arrow-up.svg'} alt={'logo'}
                    width={'30'} height={'30'}
                />
                <h2 className={'font-bold mt-6 ml-2'}>Click on the service!</h2>
            </div>
            <div className={'mr-80 text-4xl mt-20'}>
                {'Hi, '+user.username}
            </div>

            <div className={'ml-60 mt-20 text-2xl'}>
                How can we help today?
            </div>
        </div>
    )
}
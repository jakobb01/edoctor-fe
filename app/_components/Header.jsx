"use client"
import React, {useEffect, useState} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getUser, logout} from "@/app/actions/auth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CircleUserRound } from 'lucide-react';



function Header() {
    const Menu =[
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:2,
            name:'Search',
            path:'/search'
        },
        {
            id:3,
            name:'Services',
            path:'/dashboard'
        },
        {
            id:4,
            name:'Pharmacy',
            path:'/pharmacy'
        },
        {
            id:5,
            name:'About Us',
            path:'/about'
        }
    ]

    const [user, setUser] = useState({username: '', password: ''});
    const fetchData = async () => {
         setUser(await getUser());
    }

    const setLogout = async () => {
        await logout()
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return (
        <div className={'mx-auto max-w-screen-2xl flex items-center justify-between p-4 shadow-sm'}>
            <div className={'flex items-center gap-10'}>
                <Image src={'/logo.svg'} alt={'logo'}
                       width={'130'} height={'30'}
                />
                <ul className={'md:flex gap-8 hidden'}>
                    {Menu.map((item, index) => (
                        <Link key={item.id} href={item.path}>
                            <li key={item.id+item.id} className={'hover:text-secondary cursor-pointer hover:scale-105 transition-all ease-in-out'}>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user.username.length>0?
                <Popover>
                    <PopoverTrigger className={'bg-blue-50 p-4 rounded-full flex gap-x-2 text-primary font-bold'}>
                        <CircleUserRound/>{user.username}
                    </PopoverTrigger>
                    <PopoverContent className={'w-36'}>
                        <ul className={'flex flex-col gap-2'}>
                            <li key={'profile'} className={'text-primary cursor-pointer hover:bg-blue-50 p-2 rounded-md'}>Profile</li>
                            <li key={'booking'} className={'text-primary cursor-pointer hover:bg-blue-50 p-2 rounded-md'}>Booking</li>
                            <li key={'logout'} className={'text-primary cursor-pointer hover:bg-blue-50 p-2 rounded-md'}><button onClick={setLogout}>Logout</button></li>
                        </ul>
                    </PopoverContent>
                </Popover>
                :
                <Link href={'/login'}>
                    <Button className={'cursor-pointer hover:scale-105 transition-all ease-in-out'}>Get Started</Button>
                </Link>

            }


        </div>
    );
}

export default Header
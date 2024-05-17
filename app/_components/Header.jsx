"use client"
import React, {useEffect} from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getUser} from "@/app/actions/auth";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


function Header() {
    const Menu =[
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:2,
            name:'Explore',
            path:'/explore'
        },
        {
            id:3,
            name:'Services',
            path:'/'
        },
        {
            id:4,
            name:'Prescription medicine',
            path:'/'
        },
        {
            id:5,
            name:'Contact Us',
            path:'/'
        }
    ]

    let user = {};
    const fetchData = async () => {
         user = await getUser(true);
         console.log(user)
    }

    useEffect(()=>{
        fetchData()
    }, [])

    return (
        <div className={'mx-auto max-w-screen-2xl flex items-center justify-between p-4 shadow-sm'}>
            <div className={'flex items-center gap-10'}>
                <Image src={'/logo.svg'} alt={'logo'}
                       width={130} height={30}
                />
                <ul className={'md:flex gap-8 hidden'}>
                    {Menu.map((item, index)=>(
                        <Link href={item.path}>
                            <li className={'hover:text-secondary cursor-pointer hover:scale-105 transition-all ease-in-out'}>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            {user.username && user.username.length>0?
                <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>

                :
                <Link href={'/login'}>
                    <Button className={'cursor-pointer hover:scale-105 transition-all ease-in-out'}>Get Started</Button>
                </Link>

            }




        </div>
    )
}

export default Header
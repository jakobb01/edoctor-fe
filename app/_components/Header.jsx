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
            {user.username?
                <Popover>
                    <PopoverTrigger>{user.username}</PopoverTrigger>
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
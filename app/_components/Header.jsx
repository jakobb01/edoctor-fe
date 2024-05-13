import React from 'react'
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

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
    return (
        <div className={'flex items-center justify-between p-4 shadow-sm'}>
            <div className={'flex items-center gap-10'}>
                <Image src={'/logo.svg'} alt={'logo'}
                       width={130} height={30}
                />
                <ul className={'md:flex gap-8 hidden'}>
                    {Menu.map((item, index)=>(
                        <Link href={item.path}>
                            <li className={'hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'}>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <a href={'/login'}>
                <Button>Get Started</Button>
            </a>

        </div>
    )
}

export default Header
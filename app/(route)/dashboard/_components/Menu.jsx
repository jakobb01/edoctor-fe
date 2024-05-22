"use client"
import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";


export default function Menu() {
    const params = usePathname();
    const page = params.split('/')[2];
    const services =[
        {
            id:'prescriptions',
            name:'Medicine Prescriptions',
            path:'/dashboard/prescriptions'
        },
        {
            id:'sicknote',
            name:'Sick Note',
            path:'/dashboard/sicknote'
        },
        {
            id:'booking',
            name:'Appointments',
            path:'/dashboard/booking'
        }
    ]
    return (
        <div className={'items-center flex flex-col mt-5'}>

                <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
                    {services.map((item, index)=> (
                        <Link key={index} href={item.id===page?'/dashboard':item.path}
                              className=
                                  {item.id===page?
                                      "inline-block rounded-md bg-white px-4 py-2 text-sm text-primary shadow-sm focus:relative":
                                      "inline-block rounded-md px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-slate-200 focus:relative transition-all ease-in-out"
                                  }>
                            {item.name}
                        </Link>
                    ))}
                </div>
        </div>

    );
}
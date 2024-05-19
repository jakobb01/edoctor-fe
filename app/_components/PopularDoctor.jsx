"use client"
import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";


function PopularDoctor({doctorList, heading = 'Popular Doctors'}) {

    return (
        <div className={'mb-10 px-8'}>
            <h2 className={'font-bold text-4xl tracking-wide text-center'}>{heading}</h2>
            <div className={'grid gird-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4'}>
                {doctorList.length > 0 ? doctorList.map((doctor, index) => (
                        <div
                            className={'border-[1px] border-blue-50 rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-xl'}
                            key={doctor.id}>
                            <Image src={doctor.picture} alt={'doctor'} width={500} height={200}
                                   className={'h-[200px] w-full object-cover rounded'}></Image>
                            <div key={index+index} className={'mt-3 items-baseline flex flex-col gap-1'}>
                                <h2 key={doctor.id+'category'} className={'text-sm bg-blue-50 p-1 rounded-full px-2 text-primary'}>{doctor.category}</h2>
                                <h2 key={doctor.id+'name'} className={'font-bold'}>Dr. {doctor.name} {doctor.surname}</h2>
                                <h2 key={doctor.id+'location'} className={'text-secondary text-sm font-bold'}>{doctor.location}</h2>

                                <Link href={'/details/'+doctor.id}>
                                    <Button
                                        className={'mt-5 hover:scale-105 transition-all ease-in-out hover:bg-blue-50 hover:text-primary'}>
                                        Book Now</Button>
                                </Link>

                            </div>
                        </div>
                    ))
                    :
                    // while waiting for data -> skeleton
                    [1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div className={'h-[220px] bg-slate-200 w-full rounded-lg animate-pulse'}>


                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PopularDoctor
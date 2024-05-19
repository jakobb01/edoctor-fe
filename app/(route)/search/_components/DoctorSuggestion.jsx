"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {db_getDoctors} from "@/app/_utils/doctorApi";

export default function DoctorSuggestionList({doc_id}) {
    const [doctorList,setDoctorList]=useState([]);
    useEffect(()=>{
        getDoctorList();
    },[])
    const getDoctorList=()=>{
        db_getDoctors().then(resp=>{
            setDoctorList(resp.data);
        })
    }
    return (
        <div className='p-4 border-[1px] mt-5 md:ml-5 rounded-lg'>
            <h2 className='mb-3 font-bold text-sm'>Suggestions</h2>

            {doctorList && doctorList.map((doctor,index)=>(
                doctor.id !== doc_id ? <div>
                    <Link href={'/details/' + doctor.id} className=' mb-4 p-3 w-full border-[1px]
            cursor-pointer hover:border-primary hover:shadow-xl
            rounded-lg flex items-center gap-3'>
                        <Image src={doctor.picture}
                               width={70}
                               height={70}
                               className='w-[70px] h-[70px] rounded-full object-cover'
                               alt={'doctor-picture'+doctor.id}
                        />
                        <div className='mt-3 flex-col flex gap-1 items-baseline'>
                            <h2 className='text-xs bg-blue-50 p-1 rounded-full px-2
                     text-primary'>{doctor.category}</h2>
                            <h2 className='font-medium text-sm'>{'Dr. ' + doctor.name + ' ' + doctor.surname}</h2>
                        </div>
                    </Link>
                    </div>
                    :
                    ''

            ))}
        </div>
    )
}
"use client"
import React, {useEffect, useState} from "react";
import ClientReq from "@/app/_utils/ClientReq";
import Image from "next/image";
import {Button} from "@/components/ui/button";


function PopularDoctor() {

    // todo: move this logic to home and pass "categorylist" as a prop
    const [doctorList, setDoctorList] = useState([]);

    const fetchData = async () => {
        let doctorJson = {};
        let list = [];
        doctorJson = ClientReq.getDoctors;
        for (var i in doctorJson) {
            list.push([i, doctorJson[i]])
        }
        setDoctorList(await list)
    }
    useEffect(()=>{
        fetchData()
    })

    return (
        <div className={'mb-10 px-8 flex flex-col items-center'}>
            <h2 className={'font-bold text-4xl tracking-wide'}>Popular Doctors</h2>
            <div className={'grid gird-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4'}>
                {doctorList && doctorList.map((doctor, index)=>(
                    <div className={'border-[1px] border-blue-50 rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-xl'} key={index}>
                        <Image src={doctor[1].pic} alt={'doctor'} width={500} height={200} className={'h-[200px] w-full object-cover rounded'}></Image>
                        <div className={'mt-3 items-baseline flex flex-col gap-1'}>
                            <h2 className={'text-sm bg-blue-50 p-1 rounded-full px-2 text-primary'}>{doctor[1].category}</h2>
                            <h2 className={'font-bold'}>Dr. {doctor[1].name} {doctor[1].surname}</h2>
                            <h2 className={'text-secondary text-sm font-bold'}>{doctor[1].location}</h2>

                            <Button className={'mt-5 hover:scale-105 transition-all ease-in-out hover:bg-blue-50 hover:text-primary'}>Book Now</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularDoctor
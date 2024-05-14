"use client"
import React, {useEffect, useState} from "react";
import ClientReq from "@/app/_utils/ClientReq";
import Image from "next/image";


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
        <div className={'mb-10 px-8'}>
            <h2 className={'font-bold text-xl'}>Popular Doctors</h2>
            <div>
                {doctorList && doctorList.map((doctor, index)=>(
                    <div>
                        <Image src={doctor[1].pic} alt={'doctor'} width={500} height={200}></Image>
                        <label>{doctor[1].surname}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularDoctor
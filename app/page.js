"use client"
import Landing from "@/app/_components/Landing";
import CategorySearch from "@/app/_components/CategorySearch";
import PopularDoctor from "@/app/_components/PopularDoctor";
import {useEffect, useState} from "react";
import {db_getDoctors} from "@/app/_utils/doctorApi";

export default function Home() {
    const [doctorList, setDoctorList] = useState([]);

    useEffect(()=>{
        getDoctorList();
    }, [])
    const getDoctorList=()=>{
        // getFunction(params.recordId)
        db_getDoctors().then(resp => {
            setDoctorList(resp.data);
        })
    }

    return (
        <div>
            <Landing/>

            <CategorySearch categoryOnOff={true}/>

            {doctorList && <PopularDoctor doctorList={doctorList}/>}

        </div>
    );
};

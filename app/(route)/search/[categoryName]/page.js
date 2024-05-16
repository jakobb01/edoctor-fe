"use client"
import React, {useEffect, useState} from "react";
import ClientReq from "@/app/_utils/ClientReq";
import PopularDoctor from "@/app/_components/PopularDoctor";

function Search({params}) {

    const category = params.categoryName
    const [doctorList, setDoctorList] = useState([]);

    const fetchData = async () => {
        let doctorJson = {};
        let list = [];
        doctorJson = ClientReq.getDoctors;
        for (var i in doctorJson) {
            if (doctorJson[i].category===category) {
                list.push([i, doctorJson[i]])
            }
        }
        setDoctorList(await list)
    }
    useEffect(()=>{
        fetchData()
    }, [])


    return (
        <div className={'mt-5'}>
            <PopularDoctor doctorList={doctorList} heading={category}/>
        </div>
    )
}

export default Search
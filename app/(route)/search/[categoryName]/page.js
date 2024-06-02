"use client"
import React, {useEffect, useState} from "react";
import PopularDoctor from "@/app/_components/PopularDoctor";
import {db_getDoctorsByCategory} from "@/app/_utils/doctorApi";

function Search({params}) {
    const category = params.categoryName.replace(/%20/g, " ");
    const [doctorList, setDoctorList] = useState([]);

    useEffect(()=>{
        getDoctorsByCat();
    }, [])
    const getDoctorsByCat=()=>{
        // getFunction(params.recordId)
        db_getDoctorsByCategory(category).then(resp => {
            setDoctorList(resp.data);
        })
    }


    return (
        <div className={'mt-5'}>
            <PopularDoctor doctorList={doctorList} heading={category}/>
        </div>
    )
}

export default Search
"use client"
import React, {useEffect, useState} from "react";
import {db_getDoctorById} from "@/app/_utils/doctorApi";
import DoctorDetail from "@/app/(route)/details/_components/DoctorDetail";
import DoctorSuggestionList from "@/app/(route)/details/_components/DoctorSuggestion";

function Details ({params}) {

    const [doctor, setDoctor] = useState ();

    useEffect (() => {
        getDoctorById ();
    }, [])
    const getDoctorById = () => {
        // getFunction(params.recordId)
        db_getDoctorById (params.recordId).then (resp => {
            setDoctor (resp.data);
        })
    }

    return (
        <div className={ 'p-5 md:text-sm items-center flex flex-col h-screen' }>
            <h2 className={ 'font-bold text-lg' }>Details</h2>

            <div className={ 'grid grid-cols-1 lg:grid-cols-4' }>
                <div className={ 'col-span-3' }>
                    { doctor && <DoctorDetail doctor={ doctor }/> }

                </div>


                <div>
                    <DoctorSuggestionList doc_id={ params.recordId }/>

                </div>

            </div>
        </div>
    )
}

export default Details
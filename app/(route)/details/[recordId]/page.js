import React, {useEffect, useState} from "react";

function Details({params}) {

    const [doctor, setDoctor]=useState();

    useEffect(()=>{
        getDoctorById();
    })
    const getDoctorById=()=>{
        // getFunction(params.recordId)
        setDoctor( {id: 1, name:"Gregory", surname:"House", category:"Surgeon", location:'Plainsboro Rd 25, NJ 08540', pic:"https://www.nbc.com/sites/nbcblog/files/2023/12/house-316-dr-gregory-house.jpg"});

    }


    return (
        <div>Details of a doctor</div>
    )
}

export default Details
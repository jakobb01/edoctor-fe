"use client"
import Landing from "@/app/_components/Landing";
import CategorySearch from "@/app/_components/CategorySearch";
import PopularDoctor from "@/app/_components/PopularDoctor";
import {useEffect, useState} from "react";
import {db_getDoctors} from "@/app/_utils/doctorApi";
import {auth_login} from "@/app/actions/auth";

export default function Home() {
    const [doctorList, setDoctorList] = useState([]);
    const [userLogged, setUserLogged] = useState(false);

    useEffect(()=>{
        getDoctorList();
        userLoggedIn();
    }, [])
    const getDoctorList=()=>{
        // getFunction(params.recordId)
        db_getDoctors().then(resp => {
            setDoctorList(resp.data);
        })
    }

    const userLoggedIn=() =>{
        auth_login().then(resp => {
            setUserLogged(resp.ok)
        })
    }

    return (
        <div>
            <Landing user={userLogged}/>

            <CategorySearch categoryOnOff={true}/>

            {doctorList && <PopularDoctor doctorList={doctorList}/>}

        </div>
    );
};

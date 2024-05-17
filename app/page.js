"use client"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import Landing from "@/app/_components/Landing";
import CategorySearch from "@/app/_components/CategorySearch";
import PopularDoctor from "@/app/_components/PopularDoctor";
import {useEffect, useState} from "react";
import ClientReq from "@/app/_utils/ClientReq";

export default function Home() {
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
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <Landing/>

            <CategorySearch categoryOnOff={true}/>

            <PopularDoctor doctorList={doctorList}/>

        </div>
    );
};

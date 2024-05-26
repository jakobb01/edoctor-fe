"use client"
import React, {useEffect, useState} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {auth_login} from "@/app/actions/auth";
import {db_getUserPrescription} from "@/app/_utils/medicineApi";
import Image from "next/image";
import moment from "moment";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"




export default function OrderMedicine({prescription_id}){

    const [medicineList, setMedicineList] = useState([]);
    const [prescriptionList, setPrescriptionList] = useState([]);

    useEffect(()=>{
        getPrescriptionList();
    }, [])

    const getPrescriptionList=async () => {
        let user_id;
        let res = await auth_login();
        if (res.ok) {
            user_id = res.auth.value;
        }
        db_getUserPrescription(user_id).then(resp => {
            setPrescriptionList(resp.data);
        });
    }


    return (
        <div className={'flex flex-col items-center justify-center mt-20 mb-20'}>
            <h1 className={'text-xl p-2 font-bold bg-blue-50 rounded-lg mb-4'}>Order your Medicine</h1>
            <Carousel className="w-full max-w-xl">
                <CarouselContent>
                    {prescriptionList.length>0?prescriptionList.map((prescription, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-lg font-bold">
                                            <h2>{'Name: '+prescription.drug_name}</h2>
                                            <h2>{'Order it until: '+moment(prescription.till).format('DD-MMM-YYYY')}</h2>
                                            <div className="translate-y-20 translate-x-20 flex items-center space-x-2">
                                                <Switch id="select-medicine" />
                                                <Label htmlFor="select-medicine">Select a Medicine</Label>
                                            </div>
                                        </span>
                                        {/*<Image src={'/'+prescription.drug_picture} alt={'drug_picture'} width={100} height={100}/>*/}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>))
                        :
                        <div>Loading</div>
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
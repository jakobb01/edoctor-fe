"use client"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {db_getDoctors} from "@/app/_utils/doctorApi";

export default function Prescriptions() {

    const [prescriptionList, setPrescriptionList] = useState([]);
    const [doctorList, setDoctorList]=useState([]);
    const [selectedDoctor, setSelectedDoctor]=useState({});
    const [medicineList, setMedicineList]=useState([]);
    const [selectedMedicine, setSelectedMedicine]=useState({});


    useEffect(() => {
        getDoctorList();
        getMedicineList();
    }, [])

    const getDoctorList=()=>{
        db_getDoctors().then(resp=>{
            setDoctorList(resp.data);
        })
    }

    const getMedicineList=()=>{
        db_getDoctors().then(resp=>{
            setDoctorList(resp.data);
        })
    }

    return (
        <div>
            <div className="overflow-x-auto m-5">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Prescription</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Drug name</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Valid from</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Valid until</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Doctor</th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                        <th className="px-4 py-2"></th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                    {!prescriptionList.length > 0 ?
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{'PRS'+1}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">iBUPROFEN</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">25.5.2024</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24.6.2024</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">10</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Dr. Gregory House</td>
                            <td className="whitespace-nowrap px-4 py-2">
                                <Button
                                    className="inline-block px-4 py-2 text-xs font-medium hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out"
                                >
                                    Order
                                </Button>
                            </td>
                        </tr>
                        :
                        <div className={'animate-pulse text-lg text-center mt-5'}>Loading...</div>
                    }
                    </tbody>
                </table>
            </div>
            {/*create a new prescription*/}
            <div className={'m-5 mt-20'}>
                <h2 className={'font-bold text-lg p-1 bg-blue-50 rounded-lg text-center'}>Request a new prescription</h2>
                <div className={'grid grid-cols-2'}>
                    <h2>Medicine:</h2>
                    <Select
                        onValueChange={(value) => {
                            const fullnameDoc = 'Dr. '+value.name+' '+value.surname;
                            setSelectedMedicine({id: value.id, fullname: fullnameDoc})
                        }}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select medicine" />
                        </SelectTrigger>
                        <SelectContent>
                            {doctorList&&doctorList.map((medicine, index)=>(
                                <SelectItem key={index} value={medicine}>{medicine.name}</SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                    <h2>Valid from:</h2>
                    <h2>Quantity:</h2>
                    <h2>Select your doctor</h2>
                    {/* get list of doctors and display their names -> on click store id and name of the doctor */}
                    <Select
                        onValueChange={(value) => {
                            const fullnameDoc = 'Dr. '+value.name+' '+value.surname;
                            setSelectedDoctor({id: value.id, fullname: fullnameDoc})
                        }}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            {doctorList&&doctorList.map((doctor, index)=>(
                                <SelectItem key={index} value={doctor}>{'Dr. '+doctor.name+' '+doctor.surname}</SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

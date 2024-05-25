"use client"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {db_getDoctors} from "@/app/_utils/doctorApi";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import Image from "next/image";
import {db_getMedicine} from "@/app/_utils/medicineApi";

export default function Prescriptions() {

    const [prescriptionList, setPrescriptionList] = useState([]);
    const [doctorList, setDoctorList]=useState([]);
    const [selectedDoctor, setSelectedDoctor]=useState({});
    const [medicineList, setMedicineList]=useState([]);
    const [selectedMedicine, setSelectedMedicine]=useState({});
    const [date, setDate] = useState(new Date());
    const [quantity, setQuantity] = useState(1);



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
        db_getMedicine().then(resp=>{
            setMedicineList(resp.data);
        })
    }

    const handleMinus = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handlePlus = () => {
        setQuantity(prev => Math.min(20, prev + 1));
    };

    const handleChange = (event) => {
        let value = event.target.value;
        if (value === '') {
            setQuantity('');
            return;
        }
        value = Math.max(1, Math.min(20, parseInt(value)));
        setQuantity(value);
    };
    
    async function submitPrescription() {
        
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
                <div className={'grid grid-cols-2 gap-2 mt-5'}>
                    <h2 className={''}>Medicine</h2>
                    <Select
                        onValueChange={(value) => {
                            setSelectedMedicine({id: value.id, name: value.name})
                        }}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select a medicine" />
                        </SelectTrigger>
                        <SelectContent>
                            {medicineList&&medicineList.map((medicine, index)=>(
                                <SelectItem key={index} value={medicine}>{medicine.name}</SelectItem>
                            ))}

                        </SelectContent>
                    </Select>
                    <h2>Valid from</h2>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[180px] justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <h2>Desired quantity</h2>
                    <div>
                        <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                        <div className="flex items-center rounded border border-gray-200 w-[180px]">
                            <button type="button" onClick={handleMinus} className="size-10 leading-10 text-secondary hover:scale-110 hover:text-primary transition-all ease-in-out">
                                &minus;
                            </button>

                            <input
                                value={quantity}
                                onChange={handleChange}
                                type="number"
                                id="Quantity"
                                placeholder={"1"}
                                min={"1"}
                                max={"20"}
                                className="h-10 w-24 border-transparent text-primary text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                            />

                            <button type="button" onClick={handlePlus} className="size-10 leading-10 text-secondary hover:scale-110 hover:text-primary transition-all ease-in-out">
                                &#43;
                            </button>
                        </div>
                    </div>
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
                <Button onClick={() => submitPrescription()} className={'md:ml-96 mt-4 hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out'}>Send a request</Button>
            </div>
        </div>
    );
};

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
import {db_getMedicine, db_getUserPrescription, db_insertPrescription} from "@/app/_utils/medicineApi";
import {auth_login} from "@/app/actions/auth";
import {toast} from "sonner";
import moment from "moment/moment";
import Link from "next/link";

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
        getPrescriptionList();
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
        // get user id from cookies
        let user;
        const res = await auth_login();
        if (res.ok) {
            user = res.auth;
        } else {
            alert("Problem occurred during submitting, please try again!")
            window.location.reload()
        }

        // pack data
        const from = date
        const until = new Date(date.getTime() + (60 * 60 * 24 * 1000 * 14));
        const data = {
            data: {
                user_id: user.value,
                from: from,
                till: until,
                quantity: quantity,
                doctor_id: selectedDoctor.id,
                doctor_fullname: selectedDoctor.fullname,
                drug_id: selectedMedicine.id,
                drug_name: selectedMedicine.name
            }
        }

        if (data) {
            const insertPrescription = await db_insertPrescription(data)
            if (insertPrescription.ok) {
                toast(<div>
                    <h2 className={'text-bold text-lg text-primary'}>Request for prescription successful</h2>
                    <p className={'text-secondary text-base'}>We will notify you when the prescription will be ready.</p>
                </div>)
                await getPrescriptionList();
            } else {
                alert("Db insertion fail")
                window.location.reload()
            }
        } else {
            alert("Data not ok")
            window.location.reload()
        }
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
                    {prescriptionList.length > 0 ? prescriptionList.map((prescription, index) =>(
                            <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{'PRS'+0+(index+1)}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{prescription.drug_name}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(prescription.from).format('DD-MMM-YYYY')}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{moment(prescription.till).format('DD-MMM-YYYY')}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{prescription.quantity}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{prescription.doctor_fullname}</td>
                                <td className="whitespace-nowrap px-4 py-2">
                                    <Link href={`/pharmacy/order?prescriptionId=${prescription.id}`}>
                                        <Button
                                            className="inline-block px-4 py-2 text-xs font-medium hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out"
                                        >
                                            Order
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                    ))

                        :
                        <tr className={'animate-pulse text-lg text-center mt-5'}><td>Loading...</td></tr>
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

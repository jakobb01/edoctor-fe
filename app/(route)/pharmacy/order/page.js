"use client"
import React, {useEffect, useState} from "react";
import {db_deletePrescriptionById, db_getMedicineById, db_getPrescriptionById} from "@/app/_utils/medicineApi";
import {Switch} from "@/components/ui/switch"
import {Label} from "@/components/ui/label"
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import moment from "moment";
import Link from "next/link";


export default function OrderMedicine () {

    const [medicinePrescribed, setMedicinePrescribed] = useState ({});
    const [prescription, setPrescription] = useState ();
    // todo: merge counter into one component
    const [quantity, setQuantity] = useState (1);
    const [address, setAddress] = useState ('');


    const handleMinus = () => {
        setQuantity (prev => Math.max (1, prev - 1));
    };

    const handlePlus = () => {
        setQuantity (prev => Math.min (prescription.quantity, prev + 1));
    };

    const handleChange = (event) => {
        let value = event.target.value;
        if (value === '') {
            setQuantity ('');
            return;
        }
        value = Math.max (1, Math.min (prescription.quantity, parseInt (value)));
        setQuantity (value);
    };

    useEffect (() => {
        // Extract prescriptionId from URL query string
        const prescription_id = window.location.search.split ('=')[1];
        if (prescription_id) {
            getPrescription (prescription_id);
        }
    }, [])

    const getPrescription = async (prescription_id) => {
        const resp = await db_getPrescriptionById (prescription_id)
        if (resp.ok) {
            await setPrescription (resp.data)
        } else {
            // todo: handle failiure
            alert ('failed to connect!')
            window.location.assign ('/dashboard/prescriptions')
        }
    }

    useEffect (() => {
        if (prescription) {
            getMedicine ();
        }
    }, [prescription]);

    const getMedicine = async () => {
        const resp = await db_getMedicineById (prescription.drug_id)
        if (resp.ok) {
            setMedicinePrescribed (resp.data)
        } else {
            // todo: handle failiure
            alert ('failed to get medicine data!')
            window.location.assign ('/dashboard/prescriptions')
        }
    }

    // delay for toast
    const delay = ms => new Promise (res => setTimeout (res, ms));

    const placeOrder = async () => {
        toast (<div>
            <h2 className={ 'text-bold text-lg text-primary' }>Order confirmation sent on Email</h2>
            <p className={ 'text-secondary text-base' }>{ 'Selected medicine: ' + medicinePrescribed.name }</p>
            <p className={ 'text-secondary text-base' }>{ 'Selected quantity: ' + quantity }</p>
            <p className={ 'text-secondary text-base' }>{ 'Expected delivery: ' + moment (new Date ((new Date).getTime () + (60 * 60 * 24 * 1000 * 2))).format ('DD-MMM-YYYY') }</p>
        </div>)
        await delay (3000);
        const resp = await db_deletePrescriptionById (prescription.id)
        if (resp.ok) {
            window.location.assign ('/dashboard/prescriptions')
        }

    }


    return (
        <div>
            <Link href={ '/dashboard/prescriptions' }><Button variant="outline"
                                                              className="mt-5 text-primary border-primary">Back to
                prescriptons</Button></Link>
            <div className={ 'mt-16 mb-20 h-screen' }>
                <h1 className={ 'text-xl p-2 font-bold bg-blue-50 text-center rounded-lg mb-4' }>Your order</h1>
                <div className={ 'flex justify-center' }>
                    { medicinePrescribed && prescription && prescription.id.length > 0 ?
                        <div className={ 'inline-flex gap-2 mt-8' }>
                            {/*Drug Image*/ }
                            <div className={ 'inline-block' }>
                                <h2 className={ 'text-primary font-bold text-base' }>{ 'Medicine name: ' + medicinePrescribed.name }</h2>
                                <Image src={ '/' + medicinePrescribed.name + '.png' } alt={ 'medicine-image' }
                                       width={ 300 } height={ 300 }
                                       className={ ' rounded-xl h-[200px] w-auto object-cover' }/>
                            </div>
                            {/*Counter*/ }
                            <div className={ 'inline-block mt-10 ml-16' }>
                                <h2 className={ 'text-secondary ml-3 text-sm mb-0.5' }>Quantity</h2>
                                <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                                <div className="flex items-center rounded border border-gray-200 w-[180px]">
                                    <button type="button" onClick={ handleMinus }
                                            className="size-10 leading-10 text-secondary hover:scale-110 hover:text-primary transition-all ease-in-out">
                                        &minus;
                                    </button>

                                    <input
                                        value={ quantity }
                                        onChange={ handleChange }
                                        type="number"
                                        id="Quantity"
                                        placeholder={ "1" }
                                        min={ "1" }
                                        max={ "20" }
                                        className="h-10 w-24 border-transparent text-primary text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                    />

                                    <button type="button" onClick={ handlePlus }
                                            className="size-10 leading-10 text-secondary hover:scale-110 hover:text-primary transition-all ease-in-out">
                                        &#43;
                                    </button>
                                </div>

                                {/*Address*/ }
                                <div className={ 'mt-5 w-[180px]' }>
                                    <h2 className={ 'text-secondary ml-3 text-sm mb-0.5' }>Shipping Address</h2>
                                    <label
                                        htmlFor="Address"
                                        className="p-2 bg-white relative block rounded-md border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-black"
                                    >
                                        <input
                                            onChange={ (e) => setAddress (e.target.value) }
                                            type="text"
                                            id="Address"
                                            className="w-[160px] peer border-none bg-white placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                            placeholder="Username"
                                        />
                                    </label>
                                    <div className={ 'flex items-center space-x-2 mt-3 text-secondary' }>
                                        <Switch id="select-delivery"/>
                                        <Label htmlFor="select-medicine">Next day delivery</Label>
                                    </div>
                                </div>
                                <Button onClick={ placeOrder }
                                        className={ 'mt-8 ml-24 hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out' }>Place
                                    order</Button>
                            </div>
                        </div>
                        :
                        <div>Loading....</div>
                    }
                </div>
            </div>
        </div>

    )
}
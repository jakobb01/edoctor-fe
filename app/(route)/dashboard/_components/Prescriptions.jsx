"use client"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";

export default function Prescriptions() {

    const [prescriptionList, setPrescriptionList] = useState([]);

    useEffect(() => {

    }, [])

    return (
        <div>
            <div className="overflow-x-auto m-5">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">John Doe</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">24/05/1995</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">Web Developer</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
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
            <div>Create new prescription</div>
        </div>
    );
};

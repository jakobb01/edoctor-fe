import React from "react";
import {Button} from "@/components/ui/button";

export default function ActiveSickNote({sicknote}) {
    // if you want to display to user: date.toString().split(' ')[2]+' '+date.toString().split(' ')[1]+' '+date.toString().split(' ')[3]

    return (
        <div className={'m-5 bg-blue-50 rounded-lg p-3 shadow-xl'}>
            <div className={'inline-flex gap-5'}>
                <h2 className={'inline-block text-lg font-bold p-2 border-2 border-blue-50'}>Active sick note: </h2>
                <h2 className={'inline-block bg-white p-2 text-red-500 border-red-500 border-2 rounded-xl text-base'}>3 days remaining </h2>
            </div>
            <div className="mt-5 flow-root rounded-lg border border-gray-100 py-3 shadow-sm bg-white">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Name</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.username}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Reason</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.reason}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Valid from</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.start}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Ending on</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.end}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Doctor</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.doctor_fullname}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Note</dt>
                        <dd className="text-gray-700 sm:col-span-2">{sicknote.note}</dd>
                    </div>
                </dl>
            </div>
            <div className={'mt-5 mb-2 items-end flex flex-col mr-10'}>
                <Button className={'hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out'}>Download document</Button>
            </div>
        </div>
    )
};
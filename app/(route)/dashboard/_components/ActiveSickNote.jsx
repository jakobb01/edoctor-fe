"use client"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import CancelSickNote from "@/app/(route)/dashboard/_components/CancelSickNote";
import {db_deleteSickNote} from "@/app/_utils/sicknoteApi";
import moment from "moment";

export default function ActiveSickNote({sicknote}) {

    const [daysLeft, setDaysLeft] = useState(0);
    useEffect(()=>{
        updateTime();
    }, [])

    async function updateTime() {
        const end = Date.parse(sicknote.end)
        const today = new Date()
        const difference_in_miliseconds = end - today.getTime();
        setDaysLeft(Math.round(difference_in_miliseconds / (1000 * 3600 * 24)))

        if (daysLeft<0){
            await onDeleteSickNote(sicknote.id)
        }
    }

    async function onDeleteSickNote(sick_note_id) {
        const resp = await db_deleteSickNote(sick_note_id)
        if (resp.ok) {
            window.location.assign('/dashboard')
        } else {
            alert("Sorry, something went wrong")
        }
    }

    return (
        <div className={'m-5 bg-blue-50 rounded-lg p-3 shadow-xl'}>
            <div className={'inline-flex gap-5'}>
                <h2 className={'inline-block text-lg font-bold p-2 border-2 border-blue-50'}>Active sick note: </h2>
                <h2 className={'inline-block bg-white p-2 text-red-500 border-red-500 border-2 rounded-xl text-base'}>{ daysLeft +' days remaining' }</h2>
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
                        <dd className="text-gray-700 sm:col-span-2">{moment(sicknote.start).format('DD-MMM-YYYY')}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900">Ending on</dt>
                        <dd className="text-gray-700 sm:col-span-2">{moment(sicknote.end).format('DD-MMM-YYYY')}</dd>
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
            <div className={'mt-5 mb-2 justify-end flex mr-10 gap-2'}>
                <CancelSickNote onContinueClick={()=>onDeleteSickNote(sicknote.id)}/>
                <Button className={'hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out'}>Download document</Button>
            </div>
        </div>
    )
};
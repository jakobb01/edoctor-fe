"use client"
import React, {useEffect, useState} from "react";
import {
    validateGoogleFontFunctionCall
} from "next/dist/compiled/@next/font/dist/google/validate-google-font-function-call";
import ActiveSickNote from "@/app/(route)/dashboard/_components/ActiveSickNote";
import CreateSickNote from "@/app/(route)/dashboard/_components/CreateSickNote";

export default function SickNote() {

    const [sicknote, setSickNote] = useState({ok: false, data: {username: '', start:'', end:'', reason:'', note:'', doctor_fullname: ''}});

    function getCurrentSickNote() {
        // todo: get user
        // todo: get sick notes from db
        // if sicknote is active -> display active sicknote
        // else -> display "do you want to request a new sicknote?"
        setSickNote({ok: true, data: {username: 'Fake name 123', start:'24-3-2024', end:'28-5-2024', reason:'Flu', note:'Pacient should check again before going to work', doctor_fullname: 'Dr. Glue House'}})
    }

    useEffect(() => {
        getCurrentSickNote();
    }, [])

    return (
        <div className={'m-5'}>
            {!sicknote.ok ?
                <ActiveSickNote sicknote={sicknote.data} />
                :
                <CreateSickNote/>
            }

            {/*
            <div>
                Expired sick notes
            </div>
            */}
        </div>
    );
}
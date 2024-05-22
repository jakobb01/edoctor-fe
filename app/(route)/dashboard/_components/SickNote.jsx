"use client"
import React, {useEffect, useState} from "react";
import {
    validateGoogleFontFunctionCall
} from "next/dist/compiled/@next/font/dist/google/validate-google-font-function-call";
import ActiveSickNote from "@/app/(route)/dashboard/_components/ActiveSickNote";
import CreateSickNote from "@/app/(route)/dashboard/_components/CreateSickNote";
import {db_getUserSickNote} from "@/app/_utils/sicknoteApi";
import {getUser} from "@/app/actions/auth";

export default function SickNote() {

    const [sicknote, setSickNote] = useState();

    async function getCurrentSickNote() {
        // get user data from cookies
        let user;
        const res = await getUser();
        if (res.ok) {
            user = res.data;
        } else {
            alert("Problem occurred during -getting user-, please try again!")
            window.location.reload()
        }
        // call to db for all bookings a user has made
        if (user.username) {
            const resp = await db_getUserSickNote(user.username);
            if (resp.ok) {
                setSickNote(resp)
            } else {
                alert("Problem occurred during -database resp-, please try again!")
                window.location.reload()
            }
        } else {
            alert("Data not ok")
            window.location.reload()
        }
        //setSickNote({ok: true, data: {username: 'Fake name 123', start:'24-3-2024', end:'28-5-2024', reason:'Flu', note:'Pacient should check again before going to work', doctor_fullname: 'Dr. Glue House'}})
    }

    useEffect(() => {
        getCurrentSickNote();
    }, [])

    return (
        <div className={'m-5'}>
            {/*sicknote && sicknote.ok*/ false ?
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
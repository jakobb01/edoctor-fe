"use client"
import React, {useEffect, useState} from "react";
import ActiveSickNote from "@/app/(route)/dashboard/_components/ActiveSickNote";
import CreateSickNote from "@/app/(route)/dashboard/_components/CreateSickNote";
import {db_getUserSickNote} from "@/app/_utils/sicknoteApi";
import {getUser} from "@/app/actions/auth";
import {toast} from "sonner";

export default function SickNote() {

    const [sicknote, setSickNote] = useState({ok: false, data: null});

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
                // toast that user has currently no active sick note
                toast(<div>
                    <h2 className={'text-bold text-lg text-primary'}>No active sick note.</h2>
                    <p className={'text-secondary text-base'}>You can request one if you think you are sick.</p>
                </div>)
            }
        } else {
            alert("Data not ok")
            window.location.reload()
        }
    }

    useEffect(() => {
        getCurrentSickNote();
    }, [])

    // todo: skeleton loading for sicknote
    return (
        <div className={'m-5'}>
            {sicknote && sicknote.ok ?
                <ActiveSickNote sicknote={sicknote.data}/>
                :
                <CreateSickNote getCurrentSickNote={getCurrentSickNote}/>
            }

            {/*
            <div>
                Expired sick notes
            </div>
            */}
        </div>
    );
}
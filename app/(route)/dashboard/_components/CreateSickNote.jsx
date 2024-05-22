import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {getUser} from "@/app/actions/auth";
import {toast} from "sonner";
import {db_insertSickNote} from "@/app/_utils/sicknoteApi";
import {Textarea} from "@/components/ui/textarea";
import {redirect} from "next/navigation";

export default function CreateSickNote() {


    const [reason, setreason] = useState('');
    const [note, setNote] = useState('');

    async function submitSickNote() {
        // get user data from cookies
        let user;
        const res = await getUser();
        if (res.ok) {
            user = res.data;
        } else {
            alert("Problem occurred during submitting, please try again!")
            window.location.reload()
        }

        // check that note is not longer then 250 characters
        if (note.length >= 250) {
            alert("Note is too long, please try again!")
            window.location.reload()
        }

        const start = new Date();
        const end = new Date(Date.now() + (60 * 60 * 24 * 1000 * 7));

        // pack data todo: complete the data
        const data = {
            data: {
                username: user.username,
                start: start,
                end: end,
                reason: reason,
                note: note,
                doctor_id: 1,
                doctor_fullname: 'doctor.name +  + doctor.surname',

            }
        }

        console.log(data)
        // insert data into db
        if (data) {
            const insertSickNote = await db_insertSickNote(data)
            if (insertSickNote.ok) {
                toast(<div>
                    <h2 className={'text-bold text-lg text-primary'}>Submit successful</h2>
                    <p className={'text-secondary text-base'}>We will notify you when the document will be ready.</p>
                </div>)
                // todo: do smth after successful insertion
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
        <div className={'m-5 bg-blue-50 rounded-lg p-3 shadow-xl'}>
            <h2 className={'text-lg font-bold p-2 border-2 border-blue-50'}>Request a new sick note</h2>

            <div>
                <h2>Reason</h2>
                <h2>Select your doctor</h2>
                <h2>When did your sickness started?</h2>
                <Textarea className="mt-3" placeholder="Note" onChange={(e) => setNote(e.target.value)}/>

            </div>


            <div className={'mt-5 mb-2 flex gap-5'}>
                <Button variant={'outline'} onC
                        className={'hover:bg-white hover:border-red-500 hover:text-red-500'}>
                    Close
                </Button>
                <Button onClick={() => submitSickNote()} className={'hover:bg-blue-50 hover:text-primary hover:scale-105 transition-all ease-in-out'}>
                    Submit sick note
                </Button>

            </div>
        </div>
    )
};
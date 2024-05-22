import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {getUser} from "@/app/actions/auth";
import {toast} from "sonner";
import {db_insertSickNote} from "@/app/_utils/sicknoteApi";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

export default function CreateSickNote() {

    const [date, setDate] = useState(new Date());
    const [reason, setReason] = useState('');
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

        const start = date
        const end = new Date(date.getTime() + (60 * 60 * 24 * 1000 * 7));

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

            <div className={'mt-3'}>
                {/* reason */}
                <label
                    htmlFor="Reason"
                    className="p-2 relative block rounded-md border border-gray-200 shadow-sm focus-within:border-black focus-within:ring-1 focus-within:ring-black"
                >
                    <input
                        onChange={(e)=>setReason(e.target.value)}
                        type="text"
                        id="Reason"
                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Username"
                    />

                    <span
                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-blue-50 p-0.5 text-xs text-primary font-bold transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Reason
                    </span>
                </label>

                {/* select doctor */}
                <h2>Select your doctor</h2>
                {/* todo: get list of doctors and display their names -> on click store id and name of the doctor -> when building data use that values */}

                {/* start date */}
                <h2>When did your sickness started?</h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
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

                {/* notes */}
                <Textarea className="mt-3" placeholder="Note" onChange={(e) => setNote(e.target.value)}/>

            </div>


            <div className={'mt-5 mb-2 flex gap-5'}>
                <Button variant={'outline'}
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
import React, {useEffect, useState} from "react";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import {CalendarDays, Clock} from "lucide-react";
import { Textarea } from '@/components/ui/textarea'
import {getUser} from "@/app/actions/auth";
import { Toaster } from "@/components/ui/sonner"
import {toast} from "sonner";
import {db_insertBooking} from "@/app/_utils/bookingApi";

export default function BookAppointment({doctor}) {

    const [date, setDate] = useState(new Date())
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState();
    const [note, setNote] = useState('');

    useEffect(() => {
        getTime();
    }, [])

    const getTime = () => {
        const timeList = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }

        setTimeSlot(timeList)
    }

    const saveBooking = async () => {
        // get user data from cookies
        let user;
        console.log(note)
        const res = await getUser();
        if (res.ok) {
            user = res.data;
        } else {
            alert("Problem occurred during booking, please try again!")
            window.location.reload()
        }

        // check that note is not longer then 250 characters
        if (note.length >= 250) {
            alert("Note is too long, please try again!")
            window.location.reload()
        }

        // pack data
        const data = {
            data: {
                username: user.username,
                email: user.email,
                time: selectedTimeSlot,
                date: date,
                doctor_id: doctor.id,
                doctor_fullname: doctor.name + ' ' + doctor.surname,
                doctor_picture: doctor.picture,
                doctor_location: doctor.location,
                note: note
            }
        }
        console.log(data)

        // call db function to store booking
        if (data) {
            const insertBooking = await db_insertBooking(data)
            if (insertBooking.ok) {
                toast(<div>
                    <h2 className={'text-bold text-lg text-primary'}>Booking confirmation sent on Email</h2>
                    <p className={'text-secondary text-base'}>{'Selected time: '+date.toString().split(' ')[2]+' '+date.toString().split(' ')[1]+' '+date.toString().split(' ')[3]+' at ' + selectedTimeSlot}</p>
                </div>)
                setDate(null);
                setSelectedTimeSlot(null);
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
        <Dialog>
            <DialogTrigger>
                <Button
                    className={'mt-5 hover:scale-105 transition-all ease-in-out hover:bg-blue-50 hover:text-primary'}>Book
                    Appointment</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className={'grid grid-cols-1 md:grid-cols-2 mt-5'}>
                                {/*calendar*/}
                                <div className={'flex flex-col gap-3 items-baseline'}>
                                    <h2 className={'flex gap-2 items-center'}>
                                        <CalendarDays className={'text-primary h-5 w-5'}/>Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(day) => {
                                            return day <= new Date();
                                        }}
                                        className="rounded-md border"
                                    />
                                </div>
                                {/*time slot*/}
                                <div className={'mt-3 md:mt-0'}>
                                    <h2 className={'flex gap-2 items-center mb-3'}>
                                        <Clock className={'text-primary h-5 w-5'}/>Select Time Slot
                                    </h2>
                                    <div className={'grid grid-cols-3 gap-2 border rounded-lg p-5'}>
                                        {timeSlot?.map((item, index) => (
                                            <h2 key={index}
                                                onClick={() => selectedTimeSlot !== item.time ? setSelectedTimeSlot(item.time) : setSelectedTimeSlot(null)}
                                                className={`p-2 border rounded-full text-center text-xs hover:text-white hover:bg-black hover:shadow-2xl hover:scale-110 cursor-pointer transition-all ease-in-out ${item.time === selectedTimeSlot ? 'scale-110 bg-black text-white' : 'bg-blue-50 text-primary'}`}>{item.time}</h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Textarea className="mt-3" placeholder="Note" onChange={(e) => setNote(e.target.value)}/>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={'sm:justify-end'}>
                    <DialogClose>
                        <Button type={'button'} variant={'outline'}
                                className={'hover:bg-white hover:border-red-500 hover:text-red-500'}>
                            Close
                        </Button>
                        <Button type={'button'} disabled={!(date && selectedTimeSlot)} onClick={() => saveBooking()}
                                className={'ml-4 text-primary bg-blue-50 hover:scale-105 transition-all ease-in-out hover:bg-black hover:text-white'}>
                            Book
                        </Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>

    );

};
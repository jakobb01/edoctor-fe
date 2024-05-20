import React from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import CancelAppointment from "@/app/(route)/booking/_components/CancelAppointment";
import { toast } from 'sonner'

export default function BookingList({bookingList,expired,updateRecord}) {

    const onDeleteBooking=(item)=>{
        console.log(item)
        // todo: call delete to do
        const resp = false;
        console.log(resp);
        if(resp)
        {
            toast('Booking Delete Successfully!');
            updateRecord()
        }
    }
    return (
        <div>
            {bookingList.length>0?bookingList.map((item,index)=>(
                    <div className=' flex gap-4 items-center border p-5 m-3 rounded-lg'>
                        <Image src={item.picture}
                               className='rounded-full h-[70px] w-[70px] object-cover'
                               width={70}
                               height={70}
                               alt='doctor-image'
                        />
                        <div className='flex flex-col gap-2 w-full'>
                            <h2 className='font-bold text-[18px] items-center flex justify-between'>{item.name}
                                {!expired&&<CancelAppointment onContinueClick={()=>onDeleteBooking(item)}/>}
                            </h2>
                            <h2 className='flex gap-2 text-gray-500'> <MapPin className='text-primary h-5 w-5'/>
                                {item.location}</h2>
                            <h2 className='flex gap-2'><Calendar className='text-primary h-5 w-5'/> Appointment On:
                                { moment(item.date).format('DD-MMM-YYYY')} </h2>
                            <h2 className='flex gap-2'><Clock className='text-primary h-5 w-5'/> At Time : {item.time} </h2>
                        </div>
                    </div>
                ))
                :
                <div className='h-[150px] w-full bg-slate-100 animate-pulse rounded-lg'>
                </div>
            }
        </div>
    )
}

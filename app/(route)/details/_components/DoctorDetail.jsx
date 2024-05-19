import React from "react";
import Image from "next/image";
import {MapPin} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function DoctorDetail({doctor}) {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg'}>
            {/*Doctor Image*/}
            <div>
                <Image src={doctor.picture} alt={'doctor-image'} width={200} height={200} className={'rounded-lg h-[270px] w-full object-cover'}/>
            </div>
            {/*Doctor Info*/}
            <div className={'col-span-2 mt-5 flex flex-col gap-3 items-baseline md:px-10'}>
                <h2 className={'font-bold text-2xl'}>{'Dr. ' + doctor.name + ' ' + doctor.surname}</h2>
                <h2 className={'text-md flex gap-2 text-secondary'}>
                    <MapPin/>
                    <span>{doctor.location}</span>
                </h2>
                <h2 key={doctor.id+'category'} className={'text-sm bg-blue-50 p-1 rounded-full px-2 text-primary'}>{doctor.category}</h2>

                <Button className={'mt-5 hover:scale-105 transition-all ease-in-out hover:bg-blue-50 hover:text-primary'}>Book Appointment</Button>
            </div>
        </div>
    )
}
import React from "react";
import Booking from "@/app/(route)/booking/page";
import SickNote from "@/app/(route)/dashboard/_components/SickNote";
import Dashboard from "@/app/(route)/dashboard/page";
import Prescriptions from "@/app/(route)/dashboard/_components/Prescriptions";

export default function ServiceHandler({params}) {
    return (
        <div>
            {params.service==='prescriptions'?<Prescriptions/>:''}
            {params.service==='sicknote'?<SickNote/>:''}
            {params.service==='booking'?<Booking/>:''}
            {params.service!=='booking'&&params.service!=='sicknote'&&params.service!=='prescriptions'?<Dashboard/>:''}
        </div>
    )
}
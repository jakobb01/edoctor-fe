import React from "react";
import Booking from "@/app/(route)/booking/page";

export default function Prescrition({params}) {
    return (
        <div>
            {params.service==='booking'?<Booking/>:''}
        </div>
    )
}
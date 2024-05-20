import React from "react";
import Menu from "@/app/(route)/dashboard/_components/Menu";

export default function Layout({children, params}) {
    return (
        <div className={'h-screen'}>
            <Menu page={params.service}/>
            {children}
        </div>
    )
}
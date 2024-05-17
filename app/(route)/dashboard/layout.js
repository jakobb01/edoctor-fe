import React from "react";
import Landing from "@/app/_components/Landing";

function Layout({children, params}) {
    return (
        <div className={'h-screen'}>
            {/*todo: create a menu for choosing services*/}
            {children}
        </div>
    )
}

export default Layout
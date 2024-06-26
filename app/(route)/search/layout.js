import React from "react";
import CategoryList from "@/app/(route)/search/_components/CategoryList";

function Layout({children, params}) {
    return (
        <div className={'grid grid-cols-4 h-screen'}>
            <div className={'hidden md:block'}>
                <CategoryList category={params.categoryName}/>
            </div>
            <div className={'col-span-4 md:col-span-3'}>
                {children}
            </div>
        </div>
    )
}

export default Layout
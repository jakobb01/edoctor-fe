"use client"
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {db_getCategory} from "@/app/_utils/doctorApi";


function CategoryList () {

    const params = usePathname ();
    // todo: fix categories with space in between (%20)
    const category = params.split ('/')[2];
    // todo: move this logic to home and pass "categorylist" as a prop
    const [categoryList, setCategoryList] = useState ([]);

    useEffect (() => {
        getCategories ()
    }, [])

    const getCategories = async () => {
        const resp = await db_getCategory ();
        if (resp.ok) {
            setCategoryList (resp.data)
        } else {
            console.log ("problem getting categories!")
        }
    }

    return (
        <div className={ 'h-screen mt-5 flex flex-col' }>
            <ul className="space-y-1">
                { categoryList && categoryList.map ((item, index) => (
                    <li key={ index }>
                        <Link
                            href={ '/search/' + item.category }
                            className={ 'rounded-lg p-2 font-medium items-center flex hover:bg-blue-50 hover:text-gray-700 '
                                + (category === item.category ? 'bg-blue-50 text-bold text-primary' : 'text-secondary') }
                        >
                            { item.category }
                        </Link>
                    </li>
                )) }

            </ul>
        </div>
    );

}

export default CategoryList
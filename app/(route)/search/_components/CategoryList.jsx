"use client"
import React, {useEffect, useState} from "react";
import ClientReq from "@/app/_utils/ClientReq";
import {usePathname} from "next/navigation";
import Link from "next/link";


function CategoryList() {

    const params = usePathname();
    const category = params.split('/')[2];
    // todo: move this logic to home and pass "categorylist" as a prop
    const [categoryList, setCategoryList] = useState([]);

    const fetchData = async () => {
        let categoryJson = {};
        let list = [];
        categoryJson = ClientReq.getCategory;
        for (var i in categoryJson) {
            list.push([i, categoryJson[i]])
        }
        setCategoryList(await list)
    }
    useEffect(()=>{
        fetchData()
    })

    return (
        <div className={'h-full mt-5 flex flex-col'}>
            <ul className="space-y-1">
                {categoryList && categoryList.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={'/search/'+item[1].name}
                            className={'block rounded-lg p-2 font-medium items-center flex hover:bg-blue-50 hover:text-gray-700 '
                                + (category===item[1].name?'bg-blue-50 text-bold text-primary':'text-sm text-secondary')}
                        >
                            {item[1].name}
                        </Link>
                    </li>
                ))}

            </ul>
        </div>
    );

}

export default CategoryList
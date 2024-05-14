"use client"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import GetCategory from "@/app/_utils/GetCategory";
import Image from "next/image";

function CategorySearch() {

    let categoryJson = {};
    const [categoryList, setCategoryList] = useState([]);

    const fetchData = async () => {
        let list = [];
        categoryJson = GetCategory.getCategory;
        for (var i in categoryJson) {
            list.push([i, categoryJson[i]])
        }
        setCategoryList(await list)
    }
    useEffect(()=>{
        fetchData()
    })


    return (
        <div className={'mb-10 items-center px-5 flex flex-col'}>
            <h2 className={'font-bold text-4xl tracking-wide'}>Search Doctors</h2>
            <h3 className={'text-secondary text-xl'}>Search your doctor and book appointment in one click.</h3>

            <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                <Input type="text" placeholder="Search..." />
                <Button type="submit">
                    <Search className={'h-4 w-4 mr-2'}/>
                    Search</Button>
            </div>

            <div className={'grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-5'}>
            {categoryList && categoryList.map((item, index)=>(
                <div key={index} className={'flex flex-col text-center items-center p-5 bg-blue-50 m-2 rounded-lg cursor-pointer gap-2 hover:scale-105 transition-all ease-in-out'}>
                    <label className={'cursor-pointer'}>{item[1].name}</label>
                </div>
            ))}
            </div>

        </div>



    )
}

export default CategorySearch
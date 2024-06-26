"use client"
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import Link from "next/link";
import {db_getCategory} from "@/app/_utils/doctorApi";

function CategorySearch ({categoryOnOff = false}) {

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
        <div className={ 'mb-10 mt-5 px-5 items-center flex flex-col' }>
            <h2 className={ 'font-bold text-4xl tracking-wide' }>Search Doctors</h2>
            <h3 className={ 'text-secondary text-xl' }>Search your doctor and book appointment in one click.</h3>

            <div className="flex w-full max-w-sm items-center space-x-2 mt-5">
                <Input type="text" placeholder="Search..."/>
                <Button type="submit" className={ 'hover:scale-105 hover:bg-blue-50 hover:text-primary' }>
                    <Search className={ 'h-4 w-4 mr-2' }/>
                    Search</Button>
            </div>

            { categoryOnOff ?
                <div className={ 'grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 mt-5' }>
                    { categoryList ? categoryList.map ((item, index) => (
                            <Link href={ '/search/' + item.category } key={ index }
                                  className={ 'flex flex-col text-center items-center p-5 bg-blue-50 m-2 rounded-lg cursor-pointer gap-2 hover:scale-105 transition-all ease-in-out' }>
                                <label className={ 'cursor-pointer' }>{ item.category }</label>
                            </Link>
                        ))
                        :
                        [1, 2, 3].map ((item, index) => (
                            <div className={ 'h-[60px] bg-slate-200 w-[100px] m-2 rounded-lg animate-pulse' }>


                            </div>
                        ))
                    }
                </div>
                :
                <div/>
            }


        </div>


    );
}

export default CategorySearch
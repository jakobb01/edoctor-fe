import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

function CategorySearch() {
    return (
        <div className={'mb-10 items-center flex flex-col'}>
            <h2 className={'font-bold text-4xl tracking-wide'}>Search Doctors</h2>
            <h3 className={'text-secondary text-xl'}>Search your doctor and book appointment in one click.</h3>

            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search..." />
                <Button type="submit">
                    <Search className={'h-4 w-4 mr-2'}/>
                    Search</Button>
            </div>

        </div>



    )
}

export default CategorySearch
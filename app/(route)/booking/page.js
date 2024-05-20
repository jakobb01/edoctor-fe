"use client"
import React, { useEffect, useState }  from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from "@/app/(route)/booking/_components/BookingList";
import {db_getUserBooking} from "@/app/_utils/bookingApi";
import {getUser} from "@/app/actions/auth";

export default function Booking() {

    const [bookingList,setBookingList]=useState([]);


    useEffect(()=>{
        getUserBookingList();
    },[])


    const getUserBookingList = async () => {
        // get user data from cookies
        let user;
        const res = await getUser();
        console.log(res)
        if (res.ok) {
            user = res.data;
        } else {
            alert("Problem occurred during -getting user-, please try again!")
            window.location.reload()
        }
        // call to db for all bookings a user has made
        if (user.username) {
            const resp = await db_getUserBooking(user.username);
            if (resp.ok) {
                setBookingList(resp.data)
            } else {
                alert("Problem occurred during -database resp-, please try again!")
                window.location.reload()
            }
        } else {
            alert("Data not ok")
            window.location.reload()
        }
    }

    /**
     * Used to Filter User Booking
     * @param {bool} type
     * @returns
     */
    const filterUserBooking=(type)=>{
        const result=bookingList.filter(item=>
            // todo: how to tell if an appointment is in upcoming or not
            type? new Date(item.date)>=new Date()
                :new Date(item.date)<=new Date()
        )
        console.log(result)
        return result;
    }
    return (
        <div className='px-4 sm:px-10 mt-10'>
            <h2 className='font-bold text-2xl'>My Booking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList
                        bookingList={filterUserBooking(true)}
                        updateRecord={()=>getUserBookingList()}
                        expired={false}
                    />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList bookingList={filterUserBooking(false)}
                                 updateRecord={()=>getUserBookingList()}
                                 expired={true}
                    />
                </TabsContent>
            </Tabs>

        </div>
    )
}
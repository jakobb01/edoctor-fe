"use server"
import React from "react";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function db_insertBooking(req) {
    const { username, email, time, date, doctor_id, doctor_fullname, doctor_picture, doctor_location, note } = req.data;
    const id = uuidv4();
    let result;
    try {
        result = await sql`INSERT INTO "Booking" (id, username, email, time, date, doctor_id, doctor_fullname, doctor_picture, doctor_location, note)
        VALUES (${id}, ${username}, ${email}, ${time}, ${date}, ${doctor_id}, ${doctor_fullname}, ${doctor_picture}, ${doctor_location}, ${note});`;
        console.log(result.rows[0])
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows[0]};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getUserBooking(username) {
    let result;
    try {
        result = await sql`SELECT * FROM "Booking" WHERE username = ${username};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_deleteBooking(booking_id) {
    let result;
    try {
        result = await sql`DELETE FROM "Booking" WHERE id = ${booking_id};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}
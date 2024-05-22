"use server"
import React from "react";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function db_insertSickNote(req) {
    const { username, start, end, reason, note, doctor_id, doctor_fullname } = req.data;
    const id = uuidv4();
    let result;
    try {
        result = await sql`INSERT INTO "Sicknote" (id, username, start, "end", reason, note, doctor_id, doctor_fullname)
        VALUES (${id}, ${username}, ${start}, ${end}, ${reason}, ${note}, ${doctor_id}, ${doctor_fullname});`;
        console.log(result.rows[0])
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows[0]};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getUserSickNote(username) {
    let result;
    try {
        result = await sql`SELECT * FROM "Sicknote" WHERE username = ${username};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows[0]};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}
/*

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

 */
"use server"
import React from "react";
import { sql } from "@vercel/postgres";

export async function db_insertBooking(req) {
    const { username, email, time, date, doctor, note } = req.data;
    let result;
    try {
        result = await sql`INSERT INTO "Booking" (username, email, time, date, doctor, note)
        VALUES (${username}, ${email}, ${time}, ${date}, ${doctor}, ${note});`;
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
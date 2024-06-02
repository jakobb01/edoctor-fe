"use server"
import React from "react";
import {sql} from "@vercel/postgres";
import {v4 as uuidv4} from 'uuid';

export async function db_insertPrescription (req) {
    const {user_id, from, till, quantity, doctor_id, doctor_fullname, drug_id, drug_name} = req.data;
    const id = uuidv4 ();
    let result;
    try {
        result = await sql`INSERT INTO "Prescription" (id, user_id, "from", till, quantity, doctor_id, doctor_fullname, drug_id, drug_name)
        VALUES (${id}, ${user_id}, ${from}, ${till}, ${quantity}, ${doctor_id}, ${doctor_fullname}, ${drug_id}, ${drug_name});`;
        //console.log(result.rows[0])
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getUserPrescription (user_id) {
    let result;
    try {
        result = await sql`SELECT * FROM "Prescription" WHERE user_id = ${user_id};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getPrescriptionById (prescription_id) {
    let result;
    try {
        result = await sql`SELECT * FROM "Prescription" WHERE id = ${prescription_id};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result.rows.length > 0) {
        return {ok: true, data: result.rows[0]};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_deletePrescriptionById (prescription_id) {
    let result;
    try {
        result = await sql`DELETE FROM "Prescription" WHERE id = ${prescription_id};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}


export async function db_getMedicine () {
    let result;
    try {
        result = await sql`SELECT * FROM "Drug";`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getMedicineById (medicine_id) {
    let result;
    try {
        result = await sql`SELECT * FROM "Drug" WHERE id = ${medicine_id};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result.rows.length > 0) {
        return {ok: true, data: result.rows[0]};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

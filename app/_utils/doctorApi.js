"use server"
import React from "react";
import {sql} from "@vercel/postgres";

export async function db_getDoctorById (id) {
    let result;
    try {
        result = await sql`SELECT * FROM "Doctor" WHERE id = ${id};`;
        //console.log(result.rows[0])
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows[0]};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}

}

export async function db_getDoctors () {
    let result;
    try {
        result = await sql`SELECT * FROM "Doctor";`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getDoctorsByCategory (category) {
    let result;
    try {
        result = await sql`SELECT * FROM "Doctor" WHERE category = ${category};`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}

export async function db_getCategory () {
    let result;
    try {
        result = await sql`SELECT * FROM "Category"`;
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    if (result) {
        return {ok: true, data: result.rows};
    }
    return {ok: false, data: {error: 'Smth went wrong.'}}
}
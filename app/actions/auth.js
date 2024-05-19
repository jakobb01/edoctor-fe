"use server"
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { sql } from "@vercel/postgres";
import {compare, hash} from "@/app/bcrypt/custom_bcrypt";
import { cookies } from 'next/headers';


export async function signup(formData) {
    // Get form fields
    const username = formData.username;
    const email = formData.email;
    const password = formData.password;


    // generate uuid && hash pasword
    const id = uuidv4();
    const hash_pass = hash(password)
    try {
        await sql`INSERT INTO "User" (uuid, username, email, password) VALUES (${id}, ${username}, ${email}, ${hash_pass});`;
    } catch (error) {
        return {error};
    }
    const result = await sql`SELECT * FROM "User";`;
    return {ok: result.rows};
}

export async function auth_login() {
    // check user session
    const token = cookies().get('token');
    if (token) {
        return {ok: true, auth: token};
    } else {
        return {ok: false, auth: ''};
    }
}

export async function getUser() {
    // get uuid and use it in query to get user data
    let uuid = '';
    const user = await auth_login();
    console.log(user)
    if (user.ok) {
        uuid = user.auth.value;
    } else {
        return {ok: false, data: {username: '', password: ''}}
    }

    let result;
    try {
        result = await sql`SELECT username, email FROM "User" WHERE uuid = ${uuid};`;
        // should look like that: {username: 'Jakob', email: 'jakob@test.com'}
        // console.log(result.rows[0])
    } catch (error) {
        return {ok: false, data: {error: error.message}};
    }
    return {ok: true, data: result.rows[0]}
}

export async function login(formData) {
    // Get form fields
    const username = formData.username;
    const password = formData.password;
    let result;
    let compare_psw;

    try {
        result = await sql`SELECT uuid, password FROM "User" WHERE username = ${username};`;
    } catch (error) {
        return {ok: false, status: error.message};
    }

    try {
        compare_psw = compare(password, result.rows[0].password);
    } catch (error) {
        return {ok: false, status: error.message};
    }

    if (compare_psw) {
        // get uuid and set cookies
        cookies().set('token', result.rows[0].uuid, { maxAge: 3600 });
        return {ok: true, status: result.rows[0].uuid};
    } else {
        return {ok: false, status: 'Password does not match'};
    }

    return {ok: false, data: 'Smth went wrong'};

}

export async function logout() {
    // logout user -> cancel session
    cookies().delete('token');
}
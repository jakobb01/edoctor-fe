"use server"
import React from "react";
import {redirect} from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import simplecrypt from "simplecrypt";

let user_bool = true;
export async function signup(formData) {
    // Validate form fields
    const username = formData.username;
    const email = formData.email;
    const password = formData.password;



    const success =  username.length > 0 && email.length > 0 && password.length > 3;
    // generate uuid && hash pasword
    const id = uuidv4();
    var sc = simplecrypt();
    var hash = sc.encrypt(password);
    if (success) {
        try {
            sql`INSERT INTO "User" (uuid, username, email, password) VALUES (${id}, ${username}, ${email}, ${hash});`;
        } catch (error) {
            return NextResponse.json({error});
        }

        const result = await sql`SELECT * FROM "User";`;
        return NextResponse.json({ result });

    } else {
        user_bool = false
        return redirect('/KRNEKINEDELA')
    }

    // todo: call to db/backend to create a user THEN return bool
}

export async function auth_login() {
    // todo: check user session
    return user_bool;
}

export async function getUser() {
    // todo: check if session is still going an return user name and email
    if (user_bool)
        return {username: 'Jakob', email: 'jakob@test.com'};
    else
        return {username: '', email: ''};
}

export async function login({formData}) {
    // todo: try to login user
    user_bool = true;
    return redirect('/');
}

export async function logout() {
    // todo: logout the user
    user_bool = false;
    return redirect('/login');
}
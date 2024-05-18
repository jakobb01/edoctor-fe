"use server"
import React from "react";
import {redirect} from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';
import {hash} from "@/app/bcrypt/custom_bcrypt";

let user_bool = true;

export async function signup(formData) {
    // Validate form fields
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
    return {ok: result};


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
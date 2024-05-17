"use server"
import React from "react";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
const saltRounds = 6;
import conn from "@/app/config/db";

let user_bool = true;
export async function signup(formData) {
    // Validate form fields
    const username = formData.username;
    const email = formData.email;
    const password = formData.password;

    // generate uuid
    const id = uuidv4();

    const success =  username.length > 0 && email.length > 0 && password.length > 3;
    if (success) {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            try {
                const results = await new Promise((resolve, reject) => {
                    conn.query(`INSERT INTO User (uuid, username, email, password) VALUES (?, ?, ?, ?)`, [id, username, email, hash], (err, res) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(res)
                        }
                    });
                });
                return NextResponse.json(results);
            } catch (err) {
                return NextResponse.json(
                    {message: err}
                )
            }
        })





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
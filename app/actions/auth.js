"use server"
import React from "react";
import {redirect} from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import sqlPool from "@/app/config/dbConfig";
import { NextResponse } from 'next/server';
//import simplecrypt from "simplecrypt";

let user_bool = true;


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
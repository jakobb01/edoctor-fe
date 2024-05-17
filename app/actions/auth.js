"use server"
import React from "react";
import {redirect} from "next/navigation";

export async function signup(formData) {
    // Validate form fields
    const name = formData.username;
    const email = formData.email;
    const password = formData.password;

    const success =  name.length > 0 && email.length > 0 && password.length > 3;
    if (success) {
        return redirect('/')
    } else {
        return redirect('/login')
    }

    // todo: call to db/backend to create a user THEN return bool
}

export async function auth_login() {
    // todo: check user session
    return false;
}
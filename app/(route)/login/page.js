"use client"
import React, {useState} from "react";
import {login} from '@/app/actions/auth'
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function LoginForm() {
    const [fail, setFail] = useState(false);
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setFail(false);
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const success =  formState.username.length > 0 && formState.password.length > 3;
        if (success) {
            const res = await login(formState);
            if (res.ok) {
                await window.location.assign('/dashboard')
            } else {
                setFail(true)
                document.getElementById("loginForm").reset();
            }
        } else {
            setFail(true)
        }
    }

    return (
        <div className="flex flex-col items-center mt-10">
            {fail?<p className={'text-center m-2 text-red-500 text-xs italic'}>Wrong password or username, please try again.</p>:''}
            <form id={'loginForm'} onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className={'text-center text-lg mb-2'}>LOGIN</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" name="username" type="text" placeholder="Username" onChange={handleChange}/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" name="password" type="password" placeholder="******************" onChange={handleChange}/>
                    </div>

                <div className="flex items-center justify-between">
                    <Button
                        className="hover:bg-blue-50 hover:text-primary hover:scale-105 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </Button>
                    <Link className="ml-4 inline-block align-baseline font-bold text-sm text-primary hover:text-secondary"
                       href={"/signup"}>
                        Don't have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}

"use client"
import React, {useState} from "react";
import {signup} from '@/app/actions/auth'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useRouter} from "next/navigation";

function SignupForm () {
    const router = useRouter ()
    const [fail, setFail] = useState (false);
    const [formState, setFormState] = useState ({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFail (false);
        const {name, value} = e.target;
        setFormState ((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    async function handleSubmit (e) {
        e.preventDefault ();
        const success = formState.username.length > 0 && formState.email.length > 0 && formState.password.length > 3;
        if (success) {
            const res = await signup (formState);
            if (res) {
                await router.push ('/login')
            } else {
                setFail (true)
                document.getElementById ("signupForm").reset ();
            }
        } else {
            setFail (true)
        }
    }

    return (
        <div className="flex flex-col items-center mt-10">
            { fail ? <p className={ 'text-center m-2 text-red-500 text-xs italic' }>Something went wrong, please try
                again.</p> : '' }
            <form id={ 'signupForm' } onSubmit={ handleSubmit }
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className={ 'text-center text-lg mb-2' }>CREATE AN ACCOUNT</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" name="username" type="text" placeholder="Username" onChange={ handleChange }/>
                    { formState.username.length < 2 ?
                        <p className="text-red-500 text-xs italic">Username is too short.</p> : '' }

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" name="email" placeholder="Email" onChange={ handleChange }/>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" name="password" type="password" placeholder="******************"
                        onChange={ handleChange }/>
                    { formState.password.length < 4 ?
                        <p className="text-red-500 text-xs italic">Password must be at least 4 characters
                            long.</p> : '' }
                </div>

                <div className="flex items-center justify-between">
                    <Button
                        className="hover:bg-blue-50 hover:text-primary hover:scale-105 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign Up
                    </Button>
                    <Link
                        className="ml-4 inline-block align-baseline font-bold text-sm text-primary hover:text-secondary"
                        href={ "/login" }>
                        Already have an account?
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default SignupForm

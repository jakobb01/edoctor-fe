import React from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";

function Footer() {
    return(
    <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
            <div
                className="mt-16 grid grid-cols-1 gap-8 border-t border-primary pt-16 md:grid-cols-3 lg:grid-cols-5"
            >
                <div className="text-center sm:text-left">
                    <p className="text-lg font-medium text-gray-900">About Us</p>

                    <ul className="mt-8 space-y-4 text-sm">
                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Company History
                            </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Meet the Team </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Employee Handbook
                            </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
                        </li>
                    </ul>
                </div>

                <div className="text-center sm:text-left">
                    <p className="text-lg font-medium text-gray-900">Our Services</p>

                    <ul className="mt-8 space-y-4 text-sm">
                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Doctor search
                            </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Book appointments
                            </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Request a fit note
                            </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Request a prescription
                            </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#">
                                Access to medical records
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="text-center sm:text-left">
                    <p className="text-lg font-medium text-gray-900">Helpful Links</p>

                    <ul className="mt-8 space-y-4 text-sm">
                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> FAQs </a>
                        </li>

                        <li>
                            <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Support </a>
                        </li>

                        <li>
                            <a
                                className="group flex justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                href="#"
                            >
                                <span className="text-gray-700 transition group-hover:text-gray-700/75"> Live Chat </span>

                                <span className="relative flex h-2 w-2">
                <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"
                ></span>
                <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
              </span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="text-center sm:text-left md:col-span-4 lg:col-span-2">
                    <p className="text-lg font-medium text-gray-900">Stay in Touch</p>

                    <div className="mx-auto mt-8 max-w-md sm:ms-0">
                        <p className="text-center leading-relaxed text-gray-500 ltr:sm:text-left rtl:sm:text-right">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum id, iure consectetur et
                            error hic!
                        </p>

                        <form className="mt-4">
                            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-start">
                                <label htmlFor="email" className="sr-only">Email</label>

                                <input
                                    className="w-full rounded-full border-gray-200 px-6 py-3 shadow-sm"
                                    type="email"
                                    placeholder="Enter your email"
                                />

                                <Button
                                    className="hover:scale-105 transition-all ease-in-out hover:bg-blue-50 hover:text-primary"
                                    type="submit"
                                >
                                    Subscribe
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-100 pt-6 sm:flex sm:items-center sm:justify-between">
                <p className="text-center text-sm text-gray-500 sm:text-left">
                    Copyright &copy; 2024. All rights reserved.
                </p>

                <ul className="mt-4 flex justify-center gap-6 sm:mt-0 sm:justify-start">
                    <li>
                        <a
                            href="https://github.com/jakobb01/edoctor-fe"
                            rel="noreferrer"
                            target="_blank"
                            className="text-teal-700 transition hover:text-teal-700/75"
                        >
                            <span className="sr-only">GitHub</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    )

}

export default Footer
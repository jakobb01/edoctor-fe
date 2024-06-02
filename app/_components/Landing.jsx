import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";


function Landing ({user}) {
    return (
        <section className={ 'flex flex-col items-center' }>
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
                    <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                        <h2 className="text-3xl font-bold sm:text-4xl">What can we do for you today?</h2>

                        <p className="mt-4 text-secondary">
                            Simply choose a service you need. We will navigate you through.
                        </p>
                        <p className={'mt-1 text-secondary'}>
                            You can do it from anywhere, anytime.
                        </p>

                        {user?''
                            :
                            <Link href={ '/login' }>
                                <Button
                                    className="mt-8 cursor-pointer hover:scale-105 transition-all ease-in-out"
                                >
                                    Get Started Today
                                </Button>
                            </Link>

                        }

                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        <Link
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/search"
                        >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-stethoscope"><path
                    d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path
                    d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
              </span>

                            <h2 className="mt-2 font-bold">Find a doctor</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                Get checked with a professional.
                            </p>
                        </Link>

                        <Link
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/dashboard/prescriptions"
                        >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-file-text"><path
                    d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path
                    d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
              </span>

                            <h2 className="mt-2 font-bold">Manage prescriptions</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                Easy to request, easy to manage.
                            </p>
                        </Link>

                        <Link
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="dashboard/sicknote"
                        >
                            <span className="inline-block rounded-lg bg-gray-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-shield-plus"><path
                    d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path
                    d="M9 12h6"/><path d="M12 9v6"/></svg>
              </span>

                            <h2 className="mt-2 font-bold">Request a sick note</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                Sent to your employer directly.
                            </p>
                        </Link>

                        <a
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/dashboard/booking"
                        >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-bookmark-check"><path
                    d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="m9 10 2 2 4-4"/></svg>
              </span>

                            <h2 className="mt-2 font-bold">Manage your bookings</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                Get up to date with your doctor.
                            </p>
                        </a>

                        <a
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/dashboard/prescriptions"
                        >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       className="lucide lucide-pill"><path
                      d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path
                      d="m8.5 8.5 7 7"/></svg>
              </span>
                            <h2 className="mt-2 font-bold">Order a medicine</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                Order prescribed medicine with a few clicks.
                            </p>
                        </a>

                        <a
                            className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                            href="/profile"
                        >
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12"
                                                                                                          cy="10"
                                                                                                          r="4"/><circle
                    cx="12" cy="12" r="10"/></svg>
              </span>
                            <h2 className="mt-2 font-bold">Your profile</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                See, update or delete your account.
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Landing
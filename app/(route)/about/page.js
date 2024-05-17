import React from "react";

export default function About() {
    return (
        <div className="text-center mt-5">
            <p className="text-xl font-bold text-primary">About Us</p>

            <ul className="mt-8 space-y-4 text-sm">
                <li>
                    <a className="text-secondary transition hover:text-primary" href="#">
                        Company History
                    </a>
                </li>

                <li>
                    <a className="text-secondary transition hover:text-primary" href="#"> Meet the Team </a>
                </li>

                <li>
                    <a className="text-secondary transition hover:text-primary" href="#">
                        Employee Handbook
                    </a>
                </li>

                <li>
                    <a className="text-secondary transition hover:text-primary" href="#"> Careers </a>
                </li>
            </ul>
        </div>
    );
}
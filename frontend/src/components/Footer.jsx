import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div className="md:mx-10 mb-3">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* Left Section */}
                <div>
                    <img className=" w-40 bg-white" src={assets.logo} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6 mt-[-8px]">Prescripto360Care is a comprehensive healthcare platform designed to make medical services accessible and efficient. Patients can discover trusted specialists, schedule appointments, and manage healthcare needs effortlessly.</p>
                </div>

                {/* Center Section */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <p className="text-xl font-medium mb-5">Get In Touch</p>
                    <ul className="flex flex-col gap-2 text-gray-700 text-lg">
                        <li>Made By :- Mihir Gupta</li>
                        <li>+91-72755-21650</li>
                        <li>mihirgupta665@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* CopyRight Declaration */}
            <div>
                <hr />
                <div className="flex-col sm:flex sm:flex-row gap-2 justify-center">
                    <p className=" text-lg text-center">Copyright 2026&copy; |</p>
                    <p className="text-lg text-center">Prescripto 360 Care |</p>
                    <p className=" text-lg text-center">{ } All Rights Reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
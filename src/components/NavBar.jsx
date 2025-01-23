import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // For navigation
import logo from "../assets/navbar/logo.png";
import arrow from "../assets/navbar/arrow.png";
import user from "../assets/navbar/signin.png";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        navigate("/login");
    };


    const handlePostAd = () => {
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <nav className="lg:px-32 px-5 flex justify-between items-center lg:h-[90px] h-auto"
            style={{ boxShadow: "0 4px 6px rgba(149, 157, 165, 0.2)" }}>
            <div onClick={() => navigate("/")}>
                <img src={logo} alt="Logo" className="lg:w-[186px] lg:h-[40px] w-20 h-auto" />
            </div>

            <div className="flex gap-7">

                {!isLoggedIn ? (
                    <div className="flex gap-1 items-center cursor-pointer"
                        onClick={() => navigate("/login")}>
                        <img src={user} alt="user" className="w-[12px] h-[14px]" />
                        <div className="font-semibold text-sm">Sign In</div>
                    </div>
                ) : (
                    <div className="flex gap-1 items-center cursor-pointer"
                        onClick={handleLogout}>
                        <img src={user} alt="user" className="w-[12px] h-[14px]" />
                        <div className="font-semibold text-sm">Logout</div>
                    </div>
                )}


                <div
                    className="flex gap-2 rounded-3xl h-[50px] w-[170px]
                    justify-center items-center bg-[#F50963] text-white font-semibold text-sm cursor-pointer"
                    onClick={handlePostAd}
                >
                    <div>Post Your Ad</div>
                    <img src={arrow} alt="arrow" className="w-[18px] h-[18px]" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

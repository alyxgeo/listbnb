import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../services/authApi";
import logo from "../assets/navbar/logo.png";
import key from "../assets/input/key.png";
import messagebox from "../assets/input/messagebox.png";
import arrow from "../assets/navbar/arrow.png";
import register from "../assets/register/register.png";

const Login = ({ setIsLoggedIn }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await authApi.post("/api/auth/local", { identifier, password });
            if (response.data?.jwt) {
                localStorage.setItem("jwt", response.data.jwt);
                console.log(" response.data.jwt", response.data.jwt);
                setIsLoggedIn(true);
                alert("Login successful!");
                navigate("/");
            }
        } catch (err) {
            if (err.response?.data?.error?.status === 400) {
                alert("Invalid credentials");
            } else {
                setError(err.response?.data?.error?.message || "Login failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex border-2 border-[#DFDFDF] w-[1287px] m-auto rounded-[30px] mb-[100px] mt-20 h-full ">
            <div className="w-full flex justify-center items-center py-[53px]">
                <div className="max-w-[531px] w-full">
                    <div className="flex justify-center">
                        <img src={logo} alt="Logo" className="lg:w-[186px] lg:h-[40px] w-20 h-auto" />
                    </div>
                    <div className="text-base mt-3 font-jakarta text-center">
                        <span className="font-bold">Listbnb</span>
                        <span className="text-[#666666]">a Largest Classified Listing Marketplace offers perfect Ads classifieds...</span>
                    </div>
                    <div className=" text-center text-2xl font-semibold mt-3 flex justify-center">Login To Your <br /> Account</div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-3">
                        {error && <p className="text-red-500 mb-2">{error}</p>}

                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium mb-1">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="pl-4 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img src={messagebox} alt="icon" className="h-[26px] w-[29px]" />
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium mb-1">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="pl-4 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img src={key} alt="icon" className="h-[26px] w-[29px]" />
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex gap-2 rounded-3xl h-[50px] w-full justify-center items-center bg-[#F50963] text-white font-semibold text-sm"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                            <img src={arrow} alt="arrow" className="w-[18px] h-[18px]" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-full bg-[#F509640A] flex justify-center">
                <div className="max-w-[344px] w-full flex flex-col gap-1 items-center pt-[60px]">
                    <img src={register} alt="register" className="w-[325px] h-[344px]" />
                    <div className="pt-[30px] font-semibold font-jakarta text-base">Don’t Have an Account?</div>
                    <div className="text-sm font-normal text-[#666666]">To connect with us please register for a new <br /> account if you are not having one already.</div>
                    <div className="mt-[30px] mb-[60px] flex gap-2 rounded-3xl h-[50px] w-[129px] justify-center items-center bg-[#F50963] text-white font-semibold text-sm">
                        <div onClick={() => navigate("/register")}>Register</div>
                        <img src={arrow} alt="arrow" className="w-[18px] h-[18px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

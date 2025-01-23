import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../services/authApi";
import logo from "../assets/navbar/logo.png";
import key from "../assets/input/key.png";
import messagebox from "../assets/input/messagebox.png";
import arrow from "../assets/navbar/arrow.png";
import register from "../assets/register/register.png";

const Register = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const res = await authApi.post("/api/auth/local/register", formData);
            localStorage.setItem("jwt", res.data.jwt);
            setIsLoggedIn(true);
            navigate("/dashboard");
        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response) {
                const { status, name, message, details } = error.response.data.error;
                if (status === 400 && name === "ApplicationError") {
                    setErrorMessage("Email or Username are already taken. Try another one.");
                } else if (status === 400 && details?.errors?.length > 0) {
                    setErrorMessage(details.errors[0].message);
                } else {
                    setErrorMessage(message || "Registration failed. Please try again.");
                }
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex border-2 border-[#DFDFDF] w-[1287px] m-auto rounded-[30px] mb-[100px] mt-20 h-full">
            <div className="w-full flex justify-center items-center py-[53px]">
                <div className="max-w-[531px] w-full">
                    <div className="flex justify-center">
                        <img src={logo} alt="Logo" className="lg:w-[186px] lg:h-[40px] w-20 h-auto" />
                    </div>
                    <div className="text-base mt-3 font-jakarta text-center">
                        <span className="font-bold">Listbnb</span>
                        <span className="text-[#666666]">a Largest Classified Listing Marketplace offers perfect Ads classifieds...</span>
                    </div>
                    <div className="text-2xl text-center font-semibold mt-3 flex justify-center">Create Your <br /> Account</div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
                        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type="email" name="email" placeholder="Type here" className="pl-4 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img src={messagebox} alt="icon" className="h-[26px] w-[29px]" />
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium mb-1">Username <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type="text" name="username" placeholder="Type here" className="pl-4 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img src={messagebox} alt="icon" className="h-[26px] w-[29px]" />
                                </span>
                            </div>
                        </div>


                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium mb-1">Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type="password" name="password" placeholder="Type here" className="pl-4 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img src={key} alt="icon" className="h-[26px] w-[29px]" />
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col w-full">
                            <label className="text-gray-700 font-medium mb-1">Confirm Password <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <input type="password" name="password" placeholder="Type here" className="pl-4 pr-10 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <img src={key} alt="icon" className="h-[26px] w-[29px]" />
                                </span>
                            </div>
                        </div>

                        <button type="submit" className="flex gap-2 rounded-3xl h-[50px] w-full justify-center items-center bg-[#F50963] text-white font-semibold text-sm">
                            Register
                            <img src={arrow} alt="arrow" className="w-[18px] h-[18px]" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="w-full bg-[#F509640A] flex justify-center">
                <div className="max-w-[344px] w-full flex flex-col gap-1 items-center pt-[60px]">
                    <img src={register} alt="register" className="w-[325px] h-[344px]" />
                    <div className="pt-[30px] font-semibold font-jakarta text-base">Already Have an Account?</div>
                    <div className="text-sm font-normal text-[#666666]">To access your account, please log in if you have already registered.</div>
                    <div className="mt-[30px] mb-[60px] flex gap-2 rounded-3xl h-[50px] w-[129px] justify-center items-center bg-[#F50963] text-white font-semibold text-sm">
                        <div onClick={() => navigate("/login")}>Login</div>
                        <img src={arrow} alt="arrow" className="w-[18px] h-[18px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

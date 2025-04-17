import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import { EyeIcon, EyeOffIcon, Lock, Mail, RefreshCw } from "lucide-react";
import { useForm } from 'react-hook-form';
import { loginSchema } from "../../schema/OrganizationSchema";
import { api } from "../../Api/index";



const Login = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) })

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await axios.post(`${api}/auth/login`, data);

            console.log(response.data.data);
            setLoading(false);

            // SET COOKIE FUNCTION
            const setCookie = (options) => {
                let expires = "";
                if (options.days) {
                    const date = new Date();
                    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
                    expires = "; expires=" + date.toUTCString();
                }
                const value = encodeURIComponent(JSON.stringify(options.value));
                document.cookie = `${options.name}=${value}${expires}; path=/`;
            };

            setCookie({
                name: "EmployeeData",
                value: {
                    id: response.data.data.id,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    access_token: response.data.data.access_token,
                },
                days: 7,
            });
            window.location.href = "/";

        } catch (error) {
            setLoading(false);
            // setMessage(error.response.data.message);
            console.log(error.response.data.message);
        }

        // console.log(data);
    }

    const inputClass = "mt-1 pl-10 block w-full focus:outline-blue-500 bg-gray-100 block sm:text-sm py-3 px-3"


    return (
        <div className="bg-gray-50 flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 w-full lg:w-1/4 [&_small]:text-red-500 [&_small]:italic">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md ">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={inputClass}
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                        {errors.email && <small>{errors.email.message}</small>}
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className={inputClass}
                            placeholder="********"
                            {...register("password")}
                        />
                        {errors.password && <small>{errors.password.message}</small>}
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <Link to="/forgot-password"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center"
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                Logging in...
                            </>
                        ) : (
                            <>Sign in</>
                        )}
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Register now
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login
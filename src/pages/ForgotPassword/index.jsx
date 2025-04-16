import React, { useState } from 'react'
import { Mail, RefreshCw } from "lucide-react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fogortPasswordSchema } from "../../schema/OrganizationSchema"

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(fogortPasswordSchema) })

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);

        // `/api/auth/forgot-password/${forgotPasswordForm.email}`
    }

    const inputClass = "mt-1 pl-10 block w-full focus:outline-blue-500 bg-gray-200 block sm:text-sm py-3 px-3"

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:w-full sm:max-w-md [&_small]:text-red-500 [&_small]:italic">
                <div>
                    <h2 className="font-medium text-2xl text-start mb-1">Retrieve Password</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Enter your email address and we'll send you a new password.
                    </p>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            className={inputClass}
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                    </div>
                    {errors.email && <small>{errors.email.message}</small>}
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
                                Sending...
                            </>
                        ) : (
                            <>Send New Password</>
                        )}
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Back to login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword
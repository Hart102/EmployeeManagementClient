import { useState } from "react";
import { EyeIcon, EyeOffIcon, Lock, Mail, User, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchama } from "../../schema/OrganizationSchema"

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(registrationSchama) })

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
        // "/api/auth/register"
    }





    const inputClass = "mt-1 pl-10 block w-full focus:outline-blue-500 bg-gray-50 block sm:text-sm py-3 px-3"

    return (

        <div className="bg-gray-50 flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-md w-full md:w-1/2 lg:w-1/4 space-y-5 [&_small]:text-red-500 [&_small]:italic">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Organization Name
                    </label>
                    <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            name="name"
                            className={inputClass}
                            placeholder="Your Organization"
                            {...register("name")}
                        />
                        {errors.name && <small>{errors.name.message}</small>}
                    </div>
                </div>

                <div>
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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            className={inputClass}
                            placeholder="********"
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
                    </div>
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
                                Registering...
                            </>
                        ) : (
                            <>Register</>
                        )}
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register
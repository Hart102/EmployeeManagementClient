import { useState } from "react"
import { EyeIcon, Lock, RefreshCw, EyeOffIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassword } from "../../schema/OrganizationSchema"

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(resetPassword) });

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
    }


    const inputClass = "mt-1 pl-10 block w-full focus:outline-blue-500 bg-white block sm:text-sm py-3 px-3"


    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 lg:px-6 mt-10 [&_small]:text-red-500 [&_small]:italic">
            <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Reset Password</h3>
                <p className="text-sm text-gray-500 mt-2">
                    Please enter your current password and the new password you want to set.
                </p>
            </div>
            <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                    Current Password
                </label>
                <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="oldPassword"
                        name="oldPassword"
                        className={inputClass}
                        placeholder="********"
                        {...register("oldPassword")}
                    />
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
                {errors.oldPassword && <small>{errors.oldPassword.message}</small>}
            </div>

            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                    New Password
                </label>
                <div className="mt-1 relative rounded-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        className={inputClass}
                        placeholder="********"
                        {...register("newPassword")}
                    />
                </div>
                {errors.newPassword && <small>{errors.newPassword.message}</small>}
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
                            Resetting...
                        </>
                    ) : (
                        <>Reset Password</>
                    )}
                </button>
            </div>
        </form>
    )
}

export default ResetPassword
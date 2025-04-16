import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { updateOrganization } from "../../schema/OrganizationSchema"


const EditForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(updateOrganization) })

    const onSubmit = async (data) => {
        console.log(data);
        setLoading(true);
    }

    const inputClass = "mt-1 p-4 focus:outline-blue-500 bg-gray-100 block w-full shadow-sm1 sm:text-sm rounded-md";


    return (
        <div className="border-t border-gray-100 px-4 py-5 sm:px-6">
            <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 [&_small]:text-red-500 [&_small]:italic">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Organization Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        className={inputClass}
                        {...register("name")}
                    />
                </div>
                {errors.name && <small>{errors.name.message}</small>}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={inputClass}
                        {...register("email")}
                    />
                </div>
                {errors.email && <small>{errors.email.message}</small>}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditForm
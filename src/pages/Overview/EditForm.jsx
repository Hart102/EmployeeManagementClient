import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'


const EditForm = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target; Users, Building, Briefcase, CreditCard
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // This would be your actual API call
            setTimeout(() => {
                setOrganization({
                    ...organization,
                    name: formData.name,
                    email: formData.email
                });
                setIsEditing(false);
                setSuccess('Organization details updated successfully!');
                setTimeout(() => setSuccess(null), 3000);
                setLoading(false);
            }, 800);
        } catch (err) {
            setError('Failed to update organization details.');
            setLoading(false);
        }
    };

    const inputClass = "mt-1 p-4 focus:outline-blue-500 bg-gray-100 block w-full shadow-sm1 sm:text-sm rounded-md";


    return (
        <div className="border-t border-gray-100 px-4 py-5 sm:px-6">
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Organization Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={inputClass}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={inputClass}
                    />
                </div>
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
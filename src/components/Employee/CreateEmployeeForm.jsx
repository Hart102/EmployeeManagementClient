import React, { useState } from 'react'
import { X } from 'lucide-react';
import {currencyOptions,jobOptions, statusOptions} from "../../constants/index"

const CreateEmployeeForm = ({ cancle }) => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        salary: '',
        currency: 'USD',
        employeeStatus: 'ACTIVE',
        jobId: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const labelStyling = "block text-sm font-medium text-gray-700 mb-1"
    const inputStyle = "w-full p-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"


    return (
        <div className="fixed inset-0 bg-gray-400/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-lg font-medium">Add New Employee</h3>
                    <button onClick={cancle} className="text-gray-400 hover:text-gray-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyling}>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <label className={labelStyling}>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <label className={labelStyling}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <label className={labelStyling}>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <label className={labelStyling}>Salary</label>
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleInputChange}
                                className={inputStyle}
                            />
                        </div>
                        <div>
                            <label className={labelStyling}>Currency</label>
                            <select
                                name="currency"
                                value={formData.currency}
                                onChange={handleInputChange}
                                className={inputStyle}
                            >
                                {currencyOptions.map((currency) => (
                                    <option key={currency} value={currency}>
                                        {currency}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyling}>Job</label>
                            <select
                                name="jobId"
                                value={formData.jobId}
                                onChange={handleInputChange}
                                className={inputStyle}
                            >
                                <option value="">Select a job</option>
                                {jobOptions.map((job) => (
                                    <option key={job.id} value={job.id}>
                                        {job.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelStyling}>Status</label>
                            <select
                                name="employeeStatus"
                                value={formData.employeeStatus}
                                onChange={handleInputChange}
                                className={inputStyle}
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3 [&_button]:cursor-pointer">
                        <button
                            onClick={cancle}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            // onClick={createEmployee}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Create Employee
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployeeForm
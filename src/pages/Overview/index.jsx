import React, { useState } from 'react'
import { Edit } from 'lucide-react'
import EditForm from "./EditForm";
import StatCard from '../../components/StatCard';
import EmployeesTable from '../../components/EmployeesTable';


const Overview = ({ organizationData }) => {
    const [isEditing, setIsEditing] = useState(false);


    return (
        <div className="lg:py-5">
            {/* Stats */}
            <StatCard />


            {/* Organization info card */}
            <div className="mt-5 bg-white rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Organization Information</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about your organization.</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-400 cursor-pointer text-white rounded text-sm font-medium"
                    >
                        <Edit className="mr-1.5 h-4 w-4" />
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>

                {isEditing ? (
                    <EditForm />
                ) : (
                    <div className="border-t border-gray-100">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Organization name</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{organizationData?.name}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{organizationData?.email}</dd>
                            </div>
                        </dl>
                    </div>
                )}
            </div>

            {/* Recent employees table */}
            <div className='mt-5 bg-white'>
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Employees</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Recent additions to your organization.</p>
                </div>
                <EmployeesTable isDisplay={false} />
            </div>
        </div>
    )
}

export default Overview
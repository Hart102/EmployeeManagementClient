import React, { useState, useEffect } from 'react';
import {
  Users, Building, Settings, LogOut, Bell, Search,
  UserPlus, ChevronDown, Menu, X, Edit, Trash2,
  Shield, CreditCard, BarChart2, Briefcase, Loader2
} from 'lucide-react';

import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import Overview from '../../components/Overview';

const OrganizationDashboard = () => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Mock data for dashboard stats and tables
  const stats = [
    { name: 'Total Employees', value: '246', icon: Users },
    { name: 'Departments', value: '12', icon: Building },
    { name: 'Active Projects', value: '8', icon: Briefcase },
    { name: 'Monthly Budget', value: '$48,500', icon: CreditCard }
  ];

  const recentEmployees = [
    { id: 1, name: 'Jane Cooper', role: 'Developer', department: 'Engineering', joined: 'Jan 12, 2025' },
    { id: 2, name: 'Alex Wong', role: 'Manager', department: 'Marketing', joined: 'Feb 03, 2025' },
    { id: 3, name: 'Sarah Mills', role: 'Designer', department: 'Product', joined: 'Mar 14, 2025' },
    { id: 4, name: 'Robert Brown', role: 'Analyst', department: 'Finance', joined: 'Mar 28, 2025' }
  ];

  useEffect(() => {
    fetchOrganization();
  }, []);

  const fetchOrganization = async () => {
    setLoading(true);
    try {
      // This would be your actual API call
      // Simulating API call with timeout
      setTimeout(() => {
        setOrganization({
          name: 'Acme Corporation',
          email: 'admin@acmecorp.com',
          employeeCount: 246,
          foundedYear: 2015,
          industry: 'Technology'
        });
        setFormData({
          name: 'Acme Corporation',
          email: 'admin@acmecorp.com'
        });
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to load organization data.');
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top navigation */}
      <Header
        currentTab={activeTab}
        handleSetActiveTable={setActiveTab}
        handleMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        organizationEmail={organization?.email}
        organizationName={organization?.name}
      />



      {/* Main content */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Error and success messages */}
          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="h-5 w-5 text-red-400">!</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="h-5 w-5 text-green-400">✓</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Page header */}
          <PageHeader currentTab={activeTab} />


          {/* Dashboard content based on active tab */}
          {/* Overview Tab */}
          <div className="mt-4">
            {activeTab === 'overview' && <Overview organizationData={organization} />}
          </div>


          <div>
            {/* Employees Tab */}
            {activeTab === 'employees' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Employee Directory</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your organization's employees.</p>
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search employees..."
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentEmployees.map((employee) => (
                          <tr key={employee.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{employee.role}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{employee.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {employee.joined}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
                              <a href="#" className="text-red-600 hover:text-red-900">Delete</a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-5">
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Account Settings</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your organization account.</p>
                  </div>
                  <div className="border-t border-gray-200">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Organization name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                          <span>{organization?.name}</span>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between">
                          <span>{organization?.email}</span>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Danger Zone</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Irreversible actions for your organization account.</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Shield className="h-5 w-5 text-red-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Delete Organization Account</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>Once you delete your organization account, there is no going back. Please be certain.</p>
                          </div>
                          <div className="mt-4">
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(true)}
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Account
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default OrganizationDashboard
{/* Delete confirmation modal
      {deleteConfirm && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w- */}
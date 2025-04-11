import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Search, Loader } from 'lucide-react';

export default function JobManagementDashboard() {
    const [jobs, setJobs] = useState(
        [
            { id: 1, title: "Frontend Developer" },
            { id: 2, title: "Backend Developer" },
            { id: 3, title: "UI/UX Designer" },
            { id: 4, title: "Product Manager" },
            { id: 5, title: "DevOps Engineer" },
        ]
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'update'
    const [currentJob, setCurrentJob] = useState({ id: null, title: '' });

    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState({ show: false, message: '', isError: false });

    // Fetch all jobs on component mount
    // useEffect(() => {
    //     fetchJobs();
    // }, []);

    // const fetchJobs = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch('/api/jobs/all');
    //         const data = await response.json();

    //         if (data.error) {
    //             throw new Error(data.message);
    //         }

    //         setJobs(data.data || []);
    //         setError(null);
    //     } catch (err) {
    //         setError('Failed to fetch jobs. Please try again later.');
    //         console.error('Error fetching jobs:', err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleCreateJob = async () => {
        if (!currentJob.title.trim()) {
            showNotification('Job title cannot be empty', true);
            return;
        }

        try {
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: currentJob.title }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message);
            }

            setJobs([...jobs, data.data]);
            closeModal();
            showNotification('Job created successfully');
        } catch (err) {
            showNotification(err.message || 'Failed to create job', true);
        }
    };

    const handleUpdateJob = async () => {
        if (!currentJob.title.trim()) {
            showNotification('Job title cannot be empty', true);
            return;
        }

        try {
            const response = await fetch(`/api/jobs/update/${currentJob.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: currentJob.title }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message);
            }

            setJobs(jobs.map(job => job.id === currentJob.id ? data.data : job));
            closeModal();
            showNotification('Job updated successfully');
        } catch (err) {
            showNotification(err.message || 'Failed to update job', true);
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) {
            return;
        }

        try {
            const response = await fetch(`/api/jobs/delete/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.message);
            }

            setJobs(jobs.filter(job => job.id !== id));
            showNotification('Job deleted successfully');
        } catch (err) {
            showNotification(err.message || 'Failed to delete job', true);
        }
    };

    const openCreateModal = () => {
        setCurrentJob({ id: null, title: '' });
        setModalMode('create');
        setIsModalOpen(true);
    };

    const openUpdateModal = (job) => {
        setCurrentJob({ ...job });
        setModalMode('update');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentJob({ id: null, title: '' });
    };

    const showNotification = (message, isError = false) => {
        setNotification({ show: true, message, isError });
        setTimeout(() => {
            setNotification({ show: false, message: '', isError: false });
        }, 3000);
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="">
                <div className="w-full mb-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                    >
                        <Plus className="h-5 w-5 mr-2 cursor-pointer" />
                        Add New Job
                    </button>
                </div>


                {/* Jobs List */}
                <div className="bg-white overflow-hidden sm:rounded-md">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <Loader className="h-8 w-8 text-blue-500 animate-spin" />
                            <span className="ml-2 text-gray-600">Loading jobs...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600 py-8">
                            {error}
                        </div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="text-center text-gray-500 py-8">
                            {searchTerm ? 'No jobs match your search.' : 'No jobs found. Create one to get started.'}
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {filteredJobs.map(job => (
                                <li key={job.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {job.title}
                                        </p>
                                        {/* <p className="text-sm text-gray-500">
                                            ID: {job.id}
                                        </p> */}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openUpdateModal(job)}
                                            className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 cursor-pointer"
                                        >
                                            <Pencil className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteJob(job.id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 cursor-pointer"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-gray-400/50 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {modalMode === 'create' ? 'Create New Job' : 'Update Job'}
                                </h3>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                                    <X className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="job-title" className="block text-sm font-medium text-gray-700">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    id="job-title"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={currentJob.title}
                                    onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                                    placeholder="Enter job title"
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded flex items-center"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={modalMode === 'create' ? handleCreateJob : handleUpdateJob}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
                                >
                                    <Check className="h-5 w-5 mr-2" />
                                    {modalMode === 'create' ? 'Create' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {/* Notification */}
            {/* {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg ${
          notification.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {notification.message}
        </div>
      )} */}


        </>
    );
}
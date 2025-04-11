import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import PageHeader from '../components/PageHeader';

const MainLaout = () => {
    const pathName = useLocation().pathname.slice(1);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <PageHeader currentTab={pathName}/>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLaout










// import React, { useState, useEffect } from 'react';
// import { AlertCircle, Save, Trash2, Loader2 } from 'lucide-react';

// const OrganizationManagement = () => {
//   const [organization, setOrganization] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: ''
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [deleteConfirm, setDeleteConfirm] = useState(false);

//   useEffect(() => {
//     fetchOrganization();
//   }, []);

//   const fetchOrganization = async () => {
//     setLoading(true);
//     try {
//       // This would be your actual API call
//       const response = await fetch('/api/organization');
//       if (!response.ok) throw new Error('Failed to fetch organization data');
      
//       const data = await response.json();
//       setOrganization(data);
//       setFormData({
//         name: data.name,
//         email: data.email
//       });
//     } catch (err) {
//       setError('Unable to load organization details. Please try again later.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
    
//     try {
//       // This would be your actual API call
//       const response = await fetch('/api/organization', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to update organization');
//       }
      
//       const updatedOrg = await response.json();
//       setOrganization(updatedOrg);
//       setIsEditing(false);
//       setSuccess('Organization details updated successfully!');
      
//       // Clear success message after 3 seconds
//       setTimeout(() => setSuccess(null), 3000);
//     } catch (err) {
//       setError(err.message || 'An error occurred while updating. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // This would be your actual API call
//       const response = await fetch('/api/organization', {
//         method: 'DELETE',
//       });
      
//       if (!response.ok) throw new Error('Failed to delete organization account');
      
//       setSuccess('Organization account deleted successfully. Redirecting...');
      
//       // In a real app, you would redirect to a logout or landing page
//       setTimeout(() => {
//         window.location.href = '/logout';
//       }, 2000);
//     } catch (err) {
//       setError('Failed to delete account. Please try again later.');
//     } finally {
//       setLoading(false);
//       setDeleteConfirm(false);
//     }
//   };

//   if (loading && !organization) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
//         <span className="ml-2 text-gray-600">Loading organization data...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
//           <h2 className="text-xl font-semibold text-gray-800">Organization Profile</h2>
//         </div>
        
//         {error && (
//           <div className="bg-red-50 p-4 flex items-start">
//             <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
//             <span className="ml-2 text-red-700">{error}</span>
//           </div>
//         )}
        
//         {success && (
//           <div className="bg-green-50 p-4">
//             <span className="text-green-700">{success}</span>
//           </div>
//         )}
        
//         <div className="p-6">
//           {isEditing ? (
//             <form onSubmit={handleUpdate}>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                     Organization Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
                
//                 <div className="flex justify-end space-x-3 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setIsEditing(false);
//                       setFormData({
//                         name: organization.name,
//                         email: organization.email
//                       });
//                       setError(null);
//                     }}
//                     className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="w-4 h-4 mr-2 inline" />
//                         Save Changes
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Organization Name</h3>
//                 <p className="mt-1 text-lg text-gray-900">{organization?.name}</p>
//               </div>
              
//               <div>
//                 <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
//                 <p className="mt-1 text-lg text-gray-900">{organization?.email}</p>
//               </div>
              
//               <div className="flex justify-between pt-4">
//                 <button
//                   onClick={() => setDeleteConfirm(true)}
//                   className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   <Trash2 className="w-4 h-4 mr-2 inline" />
//                   Delete Account
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Edit Details
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
//             <h3 className="text-lg font-medium text-gray-900">Delete Organization Account</h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Are you sure you want to delete your organization account? This action cannot be undone and all your data will be permanently removed.
//             </p>
//             <div className="mt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setDeleteConfirm(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
//                     Deleting...
//                   </>
//                 ) : (
//                   "Confirm Delete"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrganizationManagement;
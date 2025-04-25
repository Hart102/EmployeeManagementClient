import React, { useState } from 'react'
import { Trash2, Shield, Loader2 } from 'lucide-react';
import ResetPassword from '../../components/ResetPassword';



const AccountSettings = () => {
  const [organization, setOrganization] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleDelete = () => {
    console.log("something")
    // try {

    // } catch (error) {
    //   setLoading(false);
    //   setMessage(error.response.data.message);
    //   setTimeout(() => {
    //     setMessage("");
    //   }, 5000)
    // }

  }



  return (
    <>
      <div className="space-y-5">
        {/* RESET PASSWORD */}
        <ResetPassword />

        <div className="bg-white rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Danger Zone</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Irreversible actions for your organization account.</p>
          </div>
          <div className="border-t border-gray-100 px-4 py-5 sm:px-6">
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
                      onClick={() => setConfirmDelete(true)}
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



      {confirmDelete && (
        <div className="fixed inset-0 bg-gray-400/50 bg-opacity-501 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-medium text-gray-900">Delete Organization Account</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete your organization account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                    Deleting...
                  </>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AccountSettings
import { Loader2 } from 'lucide-react';

const confirmDelete = ({nameOfItemToDelete, cancel, handleDelete, loading}) => {
    return (
        <div className="fixed inset-0 bg-gray-400/50 bg-opacity-501 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                <h3 className="text-lg font-medium text-gray-900">Confirm Delete</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Are you sure you want to delete {nameOfItemToDelete}? This action cannot be undone and all your data will be permanently removed.
                </p>
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        onClick={cancel}
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
    )
}

export default confirmDelete
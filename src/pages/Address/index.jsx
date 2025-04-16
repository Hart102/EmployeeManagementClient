import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash, ArrowLeft, Check } from "lucide-react";

// Address type definition based on your backend model
const initialAddressForm = {
  street: "",
  city: "",
  state: "",
  country: ""
};

export default function AddressManagement() {
  // States
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addressForm, setAddressForm] = useState(initialAddressForm);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [mode, setMode] = useState("view"); // view, create, edit
  const [employeeId, setEmployeeId] = useState("");
  const [searchId, setSearchId] = useState("");

  // API methods
  const fetchAddress = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/addresses/${id}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.message);
      } else {
        setAddresses([data.data]);
      }
    } catch (err) {
      setError("Failed to fetch address. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const createAddress = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/addresses/create?userAddress=${employeeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addressForm)
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.message);
      } else {
        setAddresses([...addresses, data.data]);
        setMode("view");
        resetForm();
      }
    } catch (err) {
      setError("Failed to create address. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const updateAddress = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/addresses/update/address-id/${selectedAddressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addressForm)
      });
      
      const data = await response.json();
      
      if (data.error) {
        setError(data.message);
      } else {
        // Update address in local state
        const updatedAddresses = addresses.map(address => 
          address.id === selectedAddressId ? data.data : address
        );
        setAddresses(updatedAddresses);
        setMode("view");
        resetForm();
      }
    } catch (err) {
      setError("Failed to update address. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Helper functions
  const resetForm = () => {
    setAddressForm(initialAddressForm);
    setSelectedAddressId(null);
    setEmployeeId("");
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value
    });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId) {
      fetchAddress(searchId);
    }
  };
  
  const handleEditAddress = (address) => {
    setAddressForm({
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country
    });
    setSelectedAddressId(address.id);
    setMode("edit");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "create") {
      createAddress();
    } else if (mode === "edit") {
      updateAddress();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Employee Address Management</h1>
          <p className="text-gray-600 mt-2">View, create, and update employee addresses</p>
        </header>
        
        {/* Search and Add Section */}
        <div className="flex items-center justify-between mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by address ID"
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Search
            </button>
          </form>
          
          {mode === "view" && (
            <button 
              onClick={() => setMode("create")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2"
            >
              <Plus size={18} />
              Add Address
            </button>
          )}
        </div>
        
        {/* Form Section */}
        {(mode === "create" || mode === "edit") && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {mode === "create" ? "Add New Address" : "Edit Address"}
              </h2>
              <button 
                onClick={() => {
                  setMode("view");
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {mode === "create" && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Street</label>
                <input
                  type="text"
                  name="street"
                  value={addressForm.street}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={addressForm.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={addressForm.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={addressForm.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <Check size={18} />
                  {mode === "create" ? "Create" : "Update"}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Results Section */}
        {mode === "view" && (
          <>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                {error}
              </div>
            ) : addresses.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No addresses found. Search for an address or add a new one.</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Street</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {addresses.map((address) => (
                      <tr key={address.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.street}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.city}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.state}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{address.country}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleEditAddress(address)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit size={18} />
                            </button>
                            {/* Uncomment if delete functionality is required */}
                            {/* <button 
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={18} />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
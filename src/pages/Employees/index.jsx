import React, { useEffect, useState } from 'react'
import { UserPlus, Search } from 'lucide-react';
import EmployeesTable from '../../components/EmployeesTable'
import CreateEmployeeForm from '../../components/Employee/CreateEmployeeForm';
import { recentEmployees } from "../../constants/index"
import EditEmployeeForm from '../../components/Employee/EditEmployeeForm';
import ConfirmDelete from '../../components/ConformDelete';

const Employees = () => {
  const [employee, setEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [employeeId, setEmployeeId] = useState()

  useEffect(() => {
    if (employee !== null) setShowEditModal(true);
  }, [employee])

  useEffect(() => {
    if (employeeId !== undefined) setConfirmDelete(true)
  },[employeeId])

  // const handleEdit = (id) => {
  //   if (id) {

  //   }
  // }

  const handleDelete = () => {
    setLoading(true)
    console.log(employeeId)
  }


  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between my-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-medium leading-7 text-gray-900 sm:text-3xl sm:truncate">Employee Management</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="mt-2 lg:mt-0 lg:ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </button>
      </div>

      <div>
        <div className="relative my-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          // value={searchTerm}
          // onChange={handleSearch}
          />
        </div>
        <EmployeesTable
          displayAction={true}
          employees={recentEmployees}
          deleteEmployeeId={setEmployeeId}
          getSelectedEmployee={setEmployee}
        />
      </div>

      {showCreateModal && <CreateEmployeeForm cancle={() => setShowCreateModal(false)} />}

      {showEditModal && <EditEmployeeForm employeeData={employee} cancel={() => setShowEditModal(false)} />}

      {confirmDelete && (
        <ConfirmDelete
          loading={loading}
          handleDelete={() => handleDelete()}
          cancel={() => setConfirmDelete(false)}
          nameOfItemToDelete={"this record"}
        />
      )}
    </div>
  )
}

export default Employees
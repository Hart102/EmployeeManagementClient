
const EmployeesTable = ({ employees, displayAction, getSelectedEmployee, deleteEmployeeId }) => {

    const edit = (id) => {
        if (id) {
            const result = employees.find((employee) => employee.id == id);
            getSelectedEmployee(result);
        }
    }

    const getEmployeeId = (id) => {
        if (id) {
            deleteEmployeeId(id)
        }
    }

    const thStyling = "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"

    return (
        <div className="bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className={thStyling}>Name</th>
                            <th scope="col" className={thStyling}>Email</th>
                            <th scope="col" className={thStyling}>Job</th>
                            <th scope="col" className={thStyling}>Status</th>
                            <th scope="col" className={thStyling}>Salary</th>

                            {displayAction && (
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {employees?.map((employee) => (
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
                                <td></td>
                                {displayAction && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => edit(employee.id)} className="text-blue-600 hover:text-blue-900 mr-3 cursor-pointer">Edit</button>
                                        <button onClick={() => getEmployeeId(employee.id)} className="text-red-600 hover:text-red-900 cursor-pointer">Delete</button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmployeesTable
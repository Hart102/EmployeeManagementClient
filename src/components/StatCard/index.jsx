import { Users, Building, Briefcase, CreditCard } from 'lucide-react'

const StatCard = () => {

    const stats = [
        { name: 'Total Employees', value: '246', icon: Users },
        { name: 'Departments', value: '12', icon: Building },
        { name: 'Active Projects', value: '8', icon: Briefcase },
        { name: 'Monthly Budget', value: '$48,500', icon: CreditCard }
    ];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <stat.icon className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="lg:text-[20px] font-medium text-gray-500 truncate">{stat.name}</dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatCard
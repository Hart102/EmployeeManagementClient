import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, ChevronDown, X, Menu } from 'lucide-react';
import { links } from '../../constants';

const Header = ({ organizationName, organizationEmail }) => {
    const currentTab = useLocation().pathname;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    return (
        <nav className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            {/* <Building className="h-8 w-8 text-blue-600" /> */}
                            <span className="ml-2 text-xl font-bold text-gray-800">OrgManager</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {links.map((link) => {
                                return (
                                    <Link
                                        key={link.title}
                                        to={link.href}
                                        className={`${currentTab === link.href ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} hidden sm:inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                                        {link.title}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                            <Bell className="h-6 w-6" />
                        </button>
                        <div className="ml-3 relative">
                            <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                    {organizationName?.charAt(0) || 'A'}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">{organizationName || 'Loading...'}</span>
                                <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {links.map((link) => {
                            return (
                                <Link
                                    key={link.title}
                                    to={link.href}
                                    onClick={() => { setMobileMenuOpen(false); }}
                                    className={`${currentTab === link.href ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'} block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}>
                                    {link.title}
                                </Link>
                            )
                        })}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-4">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                    {organizationName?.charAt(0) || 'A'}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">{organizationName || 'Loading...'}</div>
                                <div className="text-sm font-medium text-gray-500">{organizationEmail || ''}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                Your Profile
                            </a>
                            <a href="#" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                                Sign out
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header
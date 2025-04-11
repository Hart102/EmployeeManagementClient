import React from 'react'
import { UserPlus } from 'lucide-react';

const PageHeader = ({ currentTab }) => {
  return (
    <>
      {currentTab !== "employees" && (
        <div className="md:flex md:items-center md:justify-between my-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-medium leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {currentTab === '' && 'Organization Dashboard'}
              {currentTab === 'job-management' && 'Job Management'}
              {currentTab === 'settings' && 'Organization Settings'}
            </h1>
          </div>
        </div>
      )}
    </>
  )
}

export default PageHeader
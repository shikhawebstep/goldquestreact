import React from "react";
import { BellIcon, UserCircleIcon, CogIcon } from "@heroicons/react/24/outline";
import { MdMessage } from "react-icons/md";
import { FaShareAlt, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="p-4 flex flex-wrap flex-col-reverse md:flex-row items-center justify-between bg-white shadow-lg">
      <div className="flex items-center space-x-4 mt-6 md:mt-0 w-full md:w-2/4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search..."
            className="pl-6 pr-4 py-3 border w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <FaSearch className="h-6 w-6 absolute right-2 top-3 text-gray-500" />
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <div className="relative">
          <BellIcon className="h-8 w-8 text-blue-600 bg-blue-200 p-1 rounded-md" />
          <span className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white rounded-full px-1">5</span>
        </div>
        <div className="relative">
          <MdMessage className="h-8 w-8 text-blue-600 bg-blue-200 p-1 rounded-md" />
          <span className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white rounded-full px-1">3</span>
        </div>
        <CogIcon className="h-8 w-8 text-gray-600 bg-gray-200 p-1 rounded-md" />
        <FaShareAlt className="h-8 w-8 text-red-600 bg-red-200 p-1 rounded-md" />
        <div className="flex items-center space-x-2">
          <UserCircleIcon className="h-8 w-8 text-white bg-gray-200 p-1 rounded-full" />
          <span className="text-gray-700">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

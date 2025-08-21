import { Download, Search, Trash, Upload } from "lucide-react";
import React from "react";

const TableActions = () => {
  return (
    <div className="flex justify-between py-6 px-6 bg-white dark:bg-slate-700 dark:border-slate-800 dark:border  rounded-lg items-center gap-2 mx-3">
      <button className="flex items-center space-x-2 border-slate-700 border dark:border-slate-400 rounded-lg py-2 px-4 hover:bg-green-600 hover:border-green-700 ">
        <Upload />
        <span className="text-sm">Export</span>
      </button>
      <button className="flex items-center space-x-2 border-slate-700 border dark:border-slate-400 rounded-lg py-2 px-4 hover:bg-blue-600 hover:border-blue-700 ">
        <Download />
        <span className="text-sm">Import</span>
      </button>

      <div className="flex-grow  ">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search />
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-full py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>

      <button className="flex space-x-2 bg-red-600 text-white py-2 px-6 rounded-lg items-center">
        <Trash /> <span className="text-sm">Bulk Delete</span>
      </button>
    </div>
  );
};

export default TableActions;

"use client";

import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/");
  pathArray.shift();
  return (
    <nav className="flex my-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <a
            href="?"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Home className="w-3 h-3 me-2.5" />
            Home
          </a>
        </li>
        {pathArray.map((item, idx) => {
          return (
            <li key={idx}>
              <div className="flex items-center">
                <ChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white capitalize">
                  {item}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

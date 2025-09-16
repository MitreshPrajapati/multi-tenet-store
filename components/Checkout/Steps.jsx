"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

export default function Steps({ steps = [] }) {
  const currentStep = useSelector((store) => store.checkout.currentStep);

  return (
    <nav className="flex mb-8">
      <ol
        role="list"
        className="flex flex-wrap gap-y-5 md:gap-y-0 items-center gap-x-1.5"
      >
        <li>
          <div className="-m-1">
            <Link
              href="#"
              title=""
              className="inline-flex items-center p-1 text-sm md:text-base font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 hover:text-green-500"
            >
              Cart
              <span className="inline-flex items-center justify-center w-5 h-5 ml-2 text-xs font-bold bg-green-500 rounded-full text-gray-50">
                {currentStep}
              </span>
            </Link>
          </div>
        </li>

        {steps?.map((step, indx) => {
          return (
            <li key={indx}>
              <div className="flex items-center">
                <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                <div className="-m-1">
                  <p
                    // href="#"
                    // title=""
                    className={`p-1 ml-1.5 text-sm md:text-base font-medium text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:text-gray-900 focus:ring-gray-900 ${step.id === currentStep ? "text-green-500" : ""}`}
                  >
                    {" "}
                    {step?.name}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

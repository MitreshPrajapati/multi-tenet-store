'use client';

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const FormHeader = ({ title }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-6 px-12 bg-white dark:bg-slate-700 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold dark:text-slate-50 text-slate-800">
        {title}
      </h2>
      <button
        className="bg-slate-200 dark:bg-slate-600 p-2 rounded-lg"
        onClick={() => router.back()}
      >
        <X className="text-slate-800 dark:text-slate-50"/>
      </button>
    </div>
  );
};

export default FormHeader;

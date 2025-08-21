import React from "react";

export default function SelectInput({
  label,
  name,
  register,
  multiple = false,
  className = "sm:col-span-2",
  options = [],
}) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 dark:text-slate-50 text-gray-900 mb-2"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(`${name}`)}
          id={name}
          name={name}
          multiple={multiple}
          className="block w-full rounded-md border-0 py-2 dark:bg-gray-600 text-gray-900 dark:text-slate-50 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        >
          {options.map((option, i) => {
            return (
              <option key={i} value={option.id} className="py-2 text-lg">
                {option.title}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

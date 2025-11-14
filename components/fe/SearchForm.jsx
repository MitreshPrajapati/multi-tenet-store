"use client";
import { DoorOpen, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export const SearchForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "asc";
  
  const router = useRouter();

  // const {} = searchParams;

  const handleSearch = (data) => {
    const { searchQuery } = data;
    console.log("Searching for:", searchQuery);
    reset();
    router.push(`/search?query=${searchQuery}&sort=${sort}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex items-center px-4"
    >
      <label for="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <DoorOpen className="w-4 h-4 text-gray-500 dark:text-gray-400 " />
        </div>
        <input
          {...register("searchQuery")}
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Products, Categories..."
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
      >
        <Search className="w-5 h-5 text-sm font-normal mr-1 " />
        Search
      </button>
    </form>
  );
};

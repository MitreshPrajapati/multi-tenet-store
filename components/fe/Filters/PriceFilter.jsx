"use client";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function PriceFilter({ slug }) {
  const searchParam = useSearchParams();
  const minParam = searchParam.get("min");
  const maxParam = searchParam.get("max");
  const { handleSubmit, reset, register } = useForm();
  const router = useRouter();

  function onSubmit(data) {
    const { min, max } = data;
    const pushUrl = `/category/${slug}?sort=asc${min ? "&min=" + min : ""}${max ? "&max=" + max : ""}`;
    router.push(pushUrl);
    reset();
  }
  const priceRanges = [
    {
      display: "under 200",
      max: 200,
    },
    {
      display: "between 200 - 500",
      min: 200,
      max: 500,
    },
    {
      display: "between 500 - 1000",
      min: 500,
      max: 1000,
    },
    {
      display: "between 1000 - 2000",
      min: 1000,
      max: 2000,
    },
    {
      display: "2000 & above",
      min: 2000,
    },
  ];

  return (
    <div>
      <div className="flex justify-between ">
        <h2>Price </h2>
        <Link href={`/category/${slug}?sort=asc`}>Reset</Link>
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-2">
        {priceRanges?.map((range, idx) => {
          return (
            <Link
              key={idx}
              href={`/category/${slug}?sort=asc${range.max ? "&max=" + range.max : ""}${range.min ? "&min=" + range.min : ""}`}
              className={`${
                range?.min === minParam ||
                range?.max === maxParam ||
                (range.min &&
                  range.max &&
                  range.min == minParam &&
                  range.max == maxParam)
                  ? "text-green-500"
                  : ""
              } flex gap-2 items-center`}
            >
              <Circle className="w-4 h-4 flex-shrink-0" />
              {range.display}
            </Link>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4 my-4 "
      >
        <div className="col-span-1">
          <input
            type="number"
            {...register("min")}
            id="cvv-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Min"
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            {...register("max")}
            id="cvv-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Max"
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 "
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

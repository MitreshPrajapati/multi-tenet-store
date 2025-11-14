"use client";
import { Circle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function PriceFilter({ slug, isSearch = false }) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "";
  const search = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "asc";
  const minParam = searchParams.get("min");
  const maxParam = searchParams.get("max");

  const { handleSubmit, reset, register } = useForm();
  const router = useRouter();

  function onSubmit(data) {
    const { min, max } = data;
    const pushUrl = `/category/${slug}?sort=asc${min ? `&min=${min}` : ""}${max ? `&max=${max}` : ""}`;
    router.push(pushUrl);
    reset();
  }

  const priceRanges = [
    { display: "Under 200", max: 200 },
    { display: "200 - 500", min: 201, max: 500 },
    { display: "500 - 1000", min: 501, max: 1000 },
    { display: "1000 - 2000", min: 1001, max: 2000 },
    { display: "2000 & Above", min: 2000 },
  ];

  const minValue = Number(minParam);
  const maxValue = Number(maxParam);

  const baseUrl = isSearch ? `/search` : `/category/${slug}`;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Price</h2>
        <Link
          href={`${baseUrl}?sort=asc`}
          className="mr-4 text-sm text-green-500 underline hover:text-green-600"
        >
          Reset
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 mt-2">
        {priceRanges.map((range, idx) => {
          const isActive =
            (range.min === minValue && range.max === maxValue) ||
            (!range.min && range.max === maxValue) ||
            (range.min === minValue && !range.max);

          const params = new URLSearchParams({
            ...(isSearch ? { search } : {}),
            page,
            sort,
            min: range.min?.toString() || "0",
            max: range.max?.toString() || "",
          });

          return (
            <Link
              key={idx}
              href={`${baseUrl}?${params.toString()}`}
              className={`${isActive ? "text-green-500" : ""} flex gap-2 items-center`}
            >
              <Circle className="w-4 h-4 flex-shrink-0" />
              {range.display}
            </Link>
          );
        })}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4 my-4"
      >
        <div className="col-span-1">
          <input
            type="number"
            {...register("min")}
            id="min-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Min"
          />
        </div>
        <div className="col-span-1">
          <input
            type="number"
            {...register("max")}
            id="max-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="Max"
          />
        </div>
        <div className="col-span-1">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 
                       focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm 
                       px-5 py-2.5 me-2 mb-2"
          >
            Go
          </button>
        </div>
      </form>
    </div>
  );
}

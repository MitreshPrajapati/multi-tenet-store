"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function Sorting({ title, slug, isSearch = false }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const query = searchParams.get("query") || "";

  // Helper function to build sort URLs dynamically
  const buildSortUrl = (order) => {
    const params = new URLSearchParams({
      ...(isSearch ? { query } : {}),
      ...(min ? { min } : {}),
      ...(max ? { max } : {}),
      ...(order ? { sort: order } : {}),
    });

    return isSearch
      ? `?${params.toString()}`
      : `/category/${slug}?${params.toString()}`;
  };

  const sortingLinks = [
    { title: "Relevance", order: "" },
    { title: "Price - High to Low", order: "desc" },
    { title: "Price - Low to High", order: "asc" },
  ];

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <h2 className="text-2xl font-medium">
        {isSearch && "Search Results - "} {title}
      </h2>

      <div className="flex items-center gap-2 text-sm">
        <p className="font-medium">Sort by:</p>
        <div className="flex items-center">
          {sortingLinks.map((link, idx) => {
            const isActive =
              (link.order === "" && sort === "") ||
              (link.order === "asc" && sort === "asc") ||
              (link.order === "desc" && sort === "desc");

            return (
              <Link
                key={idx}
                href={buildSortUrl(link.order)}
                className={`border px-3 py-1 transition-colors first:rounded-l last:rounded-r
                  ${
                    isActive
                      ? "border-green-400 bg-green-600 text-white"
                      : "border-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

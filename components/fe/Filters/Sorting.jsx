"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sorting({ title, slug }) {
  // console.log(title, products, "from SORTING")
  const pathname = usePathname();

  const sortingLinks = [
    {
      title: "Relevance",
      href: `/category/${slug}`,
    },
    {
      title: "Price - High to Low",
      href: `/category/${slug}?sort=desc`,
    },
    {
      title: "Price - Low to High",
      href: `/category/${slug}?sort=asc`,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* <h2 className="text-2xl">Serarch Results - Electronics</h2> */}
      <h2 className="text-2xl font-medium ">{title}</h2>
      <div className="flex items-center gap-3 text-sm">
        <p>Sort by:</p>
        <div className="flex items-center">
          {sortingLinks?.map((link, idx) => {
            const actualPath = `${pathname}${link.params}`;
            return (
              <Link
                key={idx}
                className={`${
                  actualPath === link.href
                    ? "border-green-400 bg-slate-800  text-green-500"
                    : " border-slate-500 "
                } border px-2 py-1 first:rounded-l last:rounded-r`}
                href={link?.href}
              >
                {link?.title}
              </Link>
            );
          })}
          {/* <Link
            className={`${pathname === href ? "border-green-400 bg-slate-800 px-2 py-1 text-green-500" : " border-slate-500 px-2 py-1"} border`}
            href={relevance}
          >
            Relevance
          </Link>
          <Link className="border border-slate-500 px-2 py-1 " href={"#"}>
            Price - High to Low
          </Link>
          <Link className="border border-slate-500 px-2 py-1 " href={"#"}>
            Price - Low to High
          </Link> */}
        </div>
      </div>
    </div>
  );
}

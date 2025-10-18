import Link from "next/link";
import React from "react";

export default function PriceFilter({ slug }) {
  const priceRanges = [
    {
      display: "under 200",
      max: 200,
    },
    {
      display: "200 to 500",
      min: 200,
      max: 500,
    },
    {
      display: "500 to 1000",
      min: 500,
      max: 1000,
    },
    {
      display: "1000 to 2000",
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
      <div className="flex ">
        <h2>Price </h2>
        <button>Reset</button>
      </div>
      {/* Filters */}
      <div className="flex flex-col gap-2">
        {priceRanges?.map((range, idx) => {
          return (
            <Link
              key={idx}
              href={`/category/${slug}?sort=asc&max=${range?.max}&min=${range?.min}`}
              className="block"
            >
              {range.display}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

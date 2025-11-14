import Link from "next/link";
import React from "react";
import CategoryCarousel from "./CategoryCarousel";

const CategoryList = async ({ category, isMarketPage = false }) => {
  return (
    <div className="w-full bg-slate-100 dark:text-slate-100 text-slate-800  rounded-lg overflow-hidden shadow">
      <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-800 px-4 py-2">
        <h2 className="text-lg font-semibold capitalize">
          {category.title}
        </h2>
        <Link
          href={`/category/${category.slug}`}
          className="py-2 px-4 bg-green-700 hover:bg-green-500 text-white transition-all delay-100 rounded-sm"
        >
          See All
        </Link>
      </div>
      <div className="bg-slate-100 dark:bg-slate-700  px-4 pt-4 pb-8">
        <CategoryCarousel
          isMarketPage={isMarketPage}
          products={category.products}
        />
      </div>
    </div>
  );
};

export default CategoryList;

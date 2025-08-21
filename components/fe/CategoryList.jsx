import Link from "next/link";
import React from "react";
import CategoryCarousel from "./CategoryCarousel";
import { getData } from "@/lib/getData";

const CategoryList = async ({ category }) => {
 return (
    <div className="w-full mt-6 bg-slate-100 rounded-lg overflow-hidden shadow">
      <div className="flex justify-between items-center bg-slate-200 px-4 py-2">
        <h2 className="text-lg font-semibold dark:text-slate-800 capitalize">
          {category.title}
        </h2>
        <Link
          href="/"
          className="py-2 px-4 bg-green-700 hover:bg-green-500 text-white transition-all delay-100 rounded-sm"
        >
          See All
        </Link>
      </div>
      <div className="bg-green-100 px-4 pt-4 pb-8">
        <CategoryCarousel products={category.products} />
      </div>
    </div>
  );
};

export default CategoryList;

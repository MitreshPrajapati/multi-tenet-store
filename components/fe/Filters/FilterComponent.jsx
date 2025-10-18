import React from "react";
import Breadcrumb from "./BreadCrumb";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";

export default function FilterComponent({ category = [], products = [] }) {
  const { title, slug } = category;
// console.log(category);
  return (
    <div>
      <div className="bg-white space-y-6 text-slate-900 py-8 px-4  ">
        <Breadcrumb title={title} />
        <Sorting products={products} title={title} slug={slug} />
      </div>

      <div className="grid grid-cols-12 py-8">
        <div className="col-span-3">
          <Filters slug={slug} />
        </div>
        <div className="col-span-9">
          <FilteredProducts products={products} />
        </div>
      </div>
    </div>
  );
}

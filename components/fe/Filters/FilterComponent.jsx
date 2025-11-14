import React from "react";
import Breadcrumb from "./BreadCrumb";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";

export default function FilterComponent({ category = [], products = [] }) {
  const { title, slug } = category;
  const productCount = category?.products.length;
  // console.log("category",category.products.length);
  return (
    <div>
      <div className="space-y-6 dark:text-slate-50 text-slate-900 py-8 px-4  ">
        <Breadcrumb title={title} resultCount={productCount} />
        <Sorting
          products={products}
          title={title}
          slug={slug}
          isSearch={category?.isSearch}
        />
      </div>
      <hr className="border-b-2" />

      <div className="grid grid-cols-12 py-8">
        <div className="col-span-3">
          <Filters slug={slug} isSearch={category?.isSearch} />
        </div>
        <div className="col-span-9">
          <FilteredProducts productCount={productCount} products={products} isSearch={category?.isSearch} />
        </div>
      </div>
    </div>
  );
}

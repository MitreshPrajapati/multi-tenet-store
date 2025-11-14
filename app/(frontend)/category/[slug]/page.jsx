import FilterComponent from "@/components/fe/Filters/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { slug }, searchParams }) {
  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;
  const category = await getData(`categories/filter/${slug}`);

  // let products;
  // if (sort) {
  const products = await getData(
    `products?categoryId=${category.id}&page=${page}&sort=${sort}${min ? "&min=" + min : ""}${max ? "&max=" + max : ""}`
  );
  // } else {
  //   products = await getData(`products?categoryId=${category.id}&page=${page}`);
  // }

  return (
    <div>
      <FilterComponent category={category} products={products} />
    </div>
  );
}

import FilterComponent from "@/components/fe/Filters/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { slug }, searchParams }) {
  const { sort, min, max } = searchParams;
  const category = await getData(`categories/filter/${slug}`);
  const page = searchParams.page || 1;

  let products;
  if (sort) {
    products = await getData(
      `products?categoryId=${category.id}&page=${page}&sort=${sort}${max ? "&max=" + max : ""}${min ? "&min=" + min : ""}`
    );
  } else {
    products = await getData(`products?categoryId=${category.id}&page=${page}`);
  }

  //   const { products } = category;
  //   console.log(category);
  return (
    <div>
      <h2>Slug: {slug}</h2>
      <FilterComponent category={category} products={products} />
    </div>
  );
}

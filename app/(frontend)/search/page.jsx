import FilterComponent from "@/components/fe/Filters/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function Search({ searchParams }) {
  const { query, sort, min, max } = searchParams;
  // const category = await getData(`categories/filter/${slug}`);
  const page = searchParams.page || 1;

  let products;
  if (query) {
    products = await getData(
      `products?search=${query}&page=${page}&sort=${sort}${max ? "&max=" + max : ""}${min ? "&min=" + min : ""}`
    );
  } else {
    products = await getData(`products?search=`);
  }
  const category = {
    title: query,
    slug: "",
    products,
    isSearch: true,
  };
  //   const { products } = category;
  //   console.log(category);
  return (
    <div>
      <h2>Slug: {query}</h2>
      <FilterComponent
        isSearch={true}
        category={category}
        products={products}
      />
    </div>
  );
}

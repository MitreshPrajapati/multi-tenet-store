import FilterComponent from "@/components/fe/Filters/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { slug }, searchParams }) {
  const { sort } = searchParams;
  const category = await getData(`categories/filter/${slug}`);
  
  let products;
  if (sort) {
    products = await getData(`products?categoryId=${category.id}&sort=${sort}`);
  } else {
    products = await getData(`products?categoryId=${category.id}`);
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

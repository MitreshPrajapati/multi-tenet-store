import React, { Suspense } from "react";
import Product from "../Product";
import Paginate from "./Paginate";

export default async function FilteredProducts({
  products = [],
  productCount,
}) {
  const pageSize = 2;
  const totalPages = Math.ceil(productCount / pageSize);
  //   const products = await getData("products");
  return (
    <div>
      <Suspense
        fallback={
          <div className="text-green-500 text-2xl ">Loading products...</div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
          {products.length > 0 &&
            products?.map((product, i) => {
              return <Product key={product.id || i} product={product} />;
            })}
        </div>
        {products.length > 0 && (
          <div className="flex justify-between items-center py-8">
            <Paginate totalPages={totalPages} />
          </div>
        )}
      </Suspense>
    </div>
  );
}

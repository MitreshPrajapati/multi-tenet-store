import React from "react";
import Product from "../Product";
import Paginate from "./Paginate";

export default async function FilteredProducts({ products = [] }) {
  const pageSize = 1;
  const totalProductCount = products.length;
  const totalPages = Math.ceil(totalProductCount / pageSize);
  //   const products = await getData("products");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
        {products.length > 0 &&
          products?.map((product, i) => {
            return <Product key={product.id || i} product={product} />;
          })}
      </div>
      <div className="flex justify-between items-center py-8">
        <Paginate totalPages={totalPages} />
      </div>
    </div>
  );
}

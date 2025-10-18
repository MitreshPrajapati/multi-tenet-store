import React from "react";
import Product from "../Product";
import Paginate from "./Paginate";

export default async function FilteredProducts({products=[]}) {
//   const products = await getData("products");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 ">
        {products?.map((product, i) => {
          return <Product key={product.id || i} product={product} />;
        })}
      </div>
      <div className="flex justify-between items-center py-8">
        <Paginate />
      </div>
    </div>
  );
}

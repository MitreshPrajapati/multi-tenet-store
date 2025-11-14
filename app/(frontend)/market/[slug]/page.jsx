import Breadcrumb from "@/components/fe/Breadcrumb";
import CategoryList from "@/components/fe/CategoryList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import React from "react";

export default async function Market({ params: { slug } }) {
  const market = await getData(`markets/details/${slug}`);
  const marketCategoryIds = market.categoryIds;
  // console.log(market);
  const categories = await getData(`categories`);
  const marketCategories = categories?.filter((category) =>
    marketCategoryIds?.includes(category?.id)
  );
  console.log("MARKET CATEGORIES", marketCategories);
  return (
    <div>
      <Breadcrumb />
      <div className=" bg-white p-4 text-slate-800 dark:text-slate-200 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 overflow-hidden flex items-center  ">
        <div className="">
          <Image
            width={50}
            height={50}
            alt=""
            className="w-16 h-16 rounded-full object-cover"
            src={market?.logoUrl || "/vegetables.png"}
          />
        </div>
        <div className="ml-4 flex flex-col ">
          <h2 className="py-2 text-base lg:text-2xl">{market?.title}</h2>
          <p className="text-sm line-clamp-4 mb-4 ">{market?.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 py-8 gap-4 ">
        <div className="col-span-full sm:col-span-12 space-y-4 ">
          {marketCategories?.map((category, index) => {
            if (category.products.length) {
              return (
                <div className="" key={index}>
                  <CategoryList category={category} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

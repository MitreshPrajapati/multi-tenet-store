import Breadcrumb from "@/components/fe/Breadcrumb";
import CategoryCarousel from "@/components/fe/CategoryCarousel";
import { getData } from "@/lib/getData";
import { Minus, Plus, Send, Share2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductDetailPage = async ({ params: { slug } }) => {
  const product = await getData(`/products/product/${slug}`);
  const category = await getData(`/categories/${product.categoryId}`);
  return (
    <div>
      <Breadcrumb />
      {product && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <Image
              src={product?.imageUrl}
              alt={product?.title}
              width={1152}
              height={768}
              className="w-full object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col">
            <div className="flex items-center justify-between">
              <h2 className="text-xl lg:text-3xl font-bold">
                {product?.title}
              </h2>
              <button className="py-2 px-4">
                <Share2 />
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <p>SKU: {product.sku}</p>
              <p
                className={`${product.quantity > 0 ? "bg-green-300" : "bg-red-300"} py-2 px-4 rounded-full dark:text-slate-800`}
              >
                {" "}
                <b>Stock</b>:{" "}
                {product.quantity}
                {/* {product.quantity > 0 ? "In Stock" : "Out of Stock"} */}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-500">
              <div className="flex gap-2 items-center">
                <h4 className="text-2xl text-green-500">
                  {" "}
                  ${product.salePrice}
                </h4>
                <del className="text-slate-400 text-sm -mt-1">
                  ${product.productPrice}
                </del>
              </div>
              <p className="flex items-center space-x-2 ">
                <Tag className="w-4 h-4 text-slate-500" />
                <span>Save 50% right now</span>
              </p>
            </div>

            <p className="py-8">{product?.description} </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center ">
                <button className="border py-2 px-4 rounded-tl-lg rounded-bl-lg">
                  <Minus />
                </button>
                <span className="border border-l-0 border-r-0 py-2 px-8 flex-grow ">
                  {product.quantity}
                </span>
                <button className="border py-2 px-4 rounded-tr-lg rounded-br-lg">
                  <Plus />
                </button>
              </div>

              <button className="bg-green-500 text-white py-2 px-4 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-3  border border-gray-200 dark:border-gray-800 text-slate-800 bg-green-100 dark:bg-slate-700 rounded-md overflow-hidden">
            <h2 className="bg-slate-100 uppercase dark:bg-slate-800 py-4 px-6 dark:text-slate-50 font-bold border border-b-2 dark:border-slate-800 ">
              Delivery & Return
            </h2>
            <div className="px-4 py-3">
              <div className="flex rounded-lg py-2 px-4 bg-orange-400 text-slate-50 items-center gap-4">
                <span>MVS Express</span>
                <Send />
              </div>
              <div className="py-3 text-slate-800 dark:text-slate-100 border-b border-gray-500">
                Eligible for Free Delivery
                <Link href={"/"}> View Details</Link>
              </div>

              <h2 className="dark:text-slate-200 py-2 ">
                Choose your Location
              </h2>
              <div className=" py-2">
                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div className=" py-2">
                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div className=" py-2">
                <label
                  for="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mt-6 bg-slate-100 rounded-lg overflow-hidden shadow">
        <div className="flex justify-between items-center bg-slate-200 px-4 py-2">
          <h2 className="text-lg font-semibold dark:text-slate-800 capitalize">
            Similar Products
          </h2>
        </div>
        <div className="bg-green-100 px-4 pt-4 pb-8">
          <CategoryCarousel products={category.products} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

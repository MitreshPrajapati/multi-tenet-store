import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidebarCategories = async () => {
  const categories = await getData("categories");
  return (
    <div className="hidden sm:col-span-3 sm:block border border-gray-200 dark:border-gray-700 text-slate-800 bg-green-100 rounded-md overflow-hidden">
      <h2 className="bg-slate-100 dark:bg-slate-700 py-4 px-6 dark:text-slate-50 font-bold border border-b-2 dark:border-slate-700">
        Shop By Category ({categories.length})
      </h2>
      <div className="py-3 px-6 h-[300px] overflow-y-scroll scroll-smooth no-scrollbar ">
        {categories &&
          categories?.map((category, index) => (
            <Link
              key={category.slug}
              href={"/"}
              className="flex items-center gap-3 hover:bg-slate-100 duration-500 transition-all rounded-md my-2 rounded-tl-full rounded-bl-full rounded-tr-full rounded-br-full"
            >
              <Image
                src={category?.imageUrl || "/vegetables.png"}
                width={554}
                height={554}
                className="w-12 h-12 rounded-full border-green-400 "
                alt={category.title}
              />{" "}
              <span className="text-sm">{category.title}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SidebarCategories;

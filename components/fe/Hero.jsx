import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";
import SidebarCategories from "./SidebarCategories";
import { getData } from "@/lib/getData";

const Hero = async () => {
  const banners = await getData("banners");

  return (
    <div className="grid grid-cols-12 py-6 gap-4 ">
      <SidebarCategories />

      {banners && (
        <div className="col-span-full sm:col-span-9 md:col-span-7 rounded-md h-fit shadow">
          <HeroCarousel banners={banners} />
        </div>
      )}

      <div className="col-span-2 hidden md:block bg-slate-100 p-4 rounded-md dark:text-slate-800 justify-center">
        <Link href="/" className="flex items-center space-x-3 mb-3 ">
          <HelpCircle className="shrink-0 w-5 h-5 text-green-500" />
          <div className="flex flex-col gap-1">
            <h3 className="uppercase my-0">Help Center</h3>
            <p className="text-xs">Guide to Customer Care</p>
          </div>
        </Link>
        <Link href="/" className="flex items-center space-x-3 mb-3">
          <FolderSync className="shrink-0 w-5 h-5 text-green-500" />
          <div className="flex flex-col gap-1">
            <h3 className="uppercase my-0">Easy Return</h3>
            <p className="text-xs">Quick Refund</p>
          </div>
        </Link>
        <Link href="/" className="flex items-center space-x-3 mb-3">
          <CircleDollarSign className="shrink-0 w-5 h-5 text-green-500" />
          <div className="flex flex-col gap-1">
            <h3 className="uppercase my-0">Sell in MVS</h3>
            <p className="text-xs">Million of Visitors</p>
          </div>
        </Link>

        <Image
          src="/livenow.gif"
          width={250}
          height={250}
          className="w-full mb-12 rounded-md"
        />
      </div>
    </div>
  );
};

export default Hero;

import Link from "next/link";
import React from "react";
import CategoryCarousel from "./CategoryCarousel";
import CommunityCarousel from "./CommunityCarousel";
import { getData } from "@/lib/getData";

const CommunityTraining = async() => {
  const trainings = await getData('trainings')
  return (
    <div className="w-full mt-6 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-50 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-slate-200 dark:bg-slate-800 px-4 py-2">
        <h2 className="text-lg font-semibold">MVS Community</h2>
        <Link
          href="/"
          className="py-2 px-4 bg-green-700 hover:bg-green-500 text-white transition-all delay-100 rounded-sm"
        >
          See All
        </Link>
      </div>
      <div className=" p-4 pb-8">
        <CommunityCarousel trainings={trainings} />
      </div>
    </div>
  );
};

export default CommunityTraining;

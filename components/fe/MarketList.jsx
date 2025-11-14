import React from "react";
import MarketCarousel from "./MarketCarousel";
import { getData } from "@/lib/getData";

const MarketList = async () => {
  const markets = await getData("markets");
  return (
    <div className="">
      <div className="bg-green-600 dark:bg-green-600 rounded-lg px-4 py-6 pb-8">
        <h2 className="text-xl font-semibold text-center mb-4 text-slate-50 ">
          Market List
        </h2>
        <MarketCarousel markets={markets} />
      </div>
    </div>
  );
};

export default MarketList;

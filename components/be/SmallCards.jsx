import React from "react";
import SmallCard from "./SmallCard";
import { CheckCheck, Loader2, RefreshCcw, ShoppingCart } from "lucide-react";

const SmallCards = () => {
  const orderStats = [
    {
      title: "Today Order",
      icon: <ShoppingCart className="text-green-700 dark:text-white"/>,
      sales: 500,
      darkiconBg: "bg-green-600",
      lighticonBg: "bg-green-400",
    },
    {
      title: "Orders Pending",
      icon: <Loader2 className="text-blue-700 dark:text-white"/>,
      sales: 100,
      darkiconBg: "bg-blue-600",
      lighticonBg: "bg-blue-400",
    },
    {
      title: "Order Processing",
      icon: <RefreshCcw className="text-orange-700 dark:text-white"/>,
      sales: 200,
      darkiconBg: "bg-orange-600",
      lighticonBg: "bg-orange-400",
    },
    {
      title: "Orders Delivered",
      icon: <CheckCheck className="text-purple-700 dark:text-white"/>,
      sales: 300,
      darkiconBg: "bg-purple-600",
      lighticonBg: "bg-purple-400",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {orderStats?.map((item, i) => {
        return <SmallCard item={item} key={i} />;
      })}
    </div>
  );
};

export default SmallCards;

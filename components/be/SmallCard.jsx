
import React from "react";

const SmallCard = ({item}) => {
    const {title, darkiconBg, lighticonBg, sales, icon} = item;
  return (
    <div className="rounded-lg shadow-lg bg-white border border-slate-200 dark:border-slate-700 dark:bg-slate-700 p-4">
      {/* Icon */}
      <div className="flex space-x-4 items-center">
        <div className={`w-12 h-12 rounded-full ${lighticonBg} dark:${darkiconBg} items-center flex justify-center`}>
          {icon}
        </div>

        <div className="flex flex-col">
          <p className="text-slate-800 dark:text-white">{title}</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{sales}</h3>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default SmallCard;

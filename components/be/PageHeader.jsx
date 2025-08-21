import React from "react";
import Heading from "./Heading";
import Link from "next/link";

const PageHeader = ({ title, linkTitle, href, icon }) => {
  return (
    <div className="flex justify-between py-4 px-3 items-center">
      <Heading title={title} />
      <Link
        href={href}
        className="px-4 py-2 flex items-center space-x-2 rounded-lg border-transparent bg-green-600 text-white"
      >
        {icon}
        <span className="text-lg ">{linkTitle}</span>
      </Link>
    </div>
  );
};

export default PageHeader;

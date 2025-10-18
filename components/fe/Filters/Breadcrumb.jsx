import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Breadcrumb({ title }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center">
        <Link href={"/"}>Home</Link>
        <ChevronRight className="size-5" />
        <p>{title}</p>
        {/* <Link href={"#"}>{title}</Link> */}
      </div>
      <p>1-40 of 1,000 results </p>
    </div>
  );
}

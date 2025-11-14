import { Plus } from "lucide-react";
import React from "react";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

export default function Filters({ slug, isSearch = false }) {
  return (
    <div>
      <h2 className="font-semibold">Filters</h2>
      <PriceFilter slug={slug} isSearch={isSearch} />
      {/* <BrandFilter /> */}
    </div>
  );
}

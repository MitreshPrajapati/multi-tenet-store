import { Plus } from "lucide-react";
import React from "react";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";

export default function Filters({slug}) {
  return (
    <div>
      <h2>Filters</h2>
      <PriceFilter slug={slug} />
      <BrandFilter />
    </div>
  );
}

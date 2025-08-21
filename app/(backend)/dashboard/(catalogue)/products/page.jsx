import PageHeader from "@/components/be/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { Plus, } from "lucide-react";
import React from "react";
import { columns } from "./columns";

const Page = async() => {
  const products = await getData("products")
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      {/* Header */}
      <PageHeader
        title="Products"
        linkTitle="Add Product"
        href="/dashboard/products/new"
        icon=<Plus />
      />
      <div className="py-6 px-2">
        <DataTable data={products} columns={columns} filterKeys={["title"]} />
      </div>
    </div>
  );
};

export default Page;

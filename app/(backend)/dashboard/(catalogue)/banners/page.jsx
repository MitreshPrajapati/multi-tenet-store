import Heading from "@/components/be/Heading";
import PageHeader from "@/components/be/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { Plus, } from "lucide-react";
import React from "react";
import { columns } from "./column";
import { getData } from "@/lib/getData";

const Page = async() => {
  const banners = await getData("banners");
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      {/* Header */}
      <PageHeader
        title="Banners"
        linkTitle="Add Banner"
        href="/dashboard/banners/new"
        icon=<Plus />
      />

      <div className="py-6">
        <DataTable data={banners} columns={columns}  />
      </div>
    </div>
  );
};

export default Page;

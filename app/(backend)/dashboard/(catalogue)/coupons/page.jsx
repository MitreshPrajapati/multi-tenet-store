import PageHeader from "@/components/be/PageHeader";
import { getData } from "@/lib/getData";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./column";
import { DataTable } from "@/components/data-table-components/DataTable";

const Page = async () => {
  const coupons = await getData("coupons");
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      <PageHeader
        title="Coupons"
        linkTitle="Add Coupons"
        href="/dashboard/coupons/new"
        icon=<Plus />
      />

      <div className="py-6 px-2">
        <DataTable data={coupons} columns={columns} />
      </div>
    </div>
  );
};

export default Page;

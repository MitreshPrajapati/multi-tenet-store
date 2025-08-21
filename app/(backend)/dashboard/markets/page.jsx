import Heading from "@/components/be/Heading";
import PageHeader from "@/components/be/PageHeader";
import TableActions from "@/components/be/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { Plus, } from "lucide-react";
import React from "react";
import { columns } from "./columns";

const Page = async() => {
  const markets = await getData("markets");
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800   ">
      {/* Header */}
      <PageHeader
        title="Markets"
        linkTitle="Add Markets"
        href="/dashboard/markets/new"
        icon=<Plus />
      />

      <div className="py-6">
        <DataTable data={markets} columns={columns} />
      </div>
    </div>
  );
};

export default Page;

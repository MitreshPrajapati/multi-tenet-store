import Heading from "@/components/be/Heading";
import PageHeader from "@/components/be/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";

const Page = async () => {
  const farmers = await getData("farmers");
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      {/* Header */}
      <PageHeader
        title="Farmers"
        linkTitle="Add Farmers"
        href="/dashboard/farmers/new"
        icon={<Plus />}
      />
      <div className="py-6">
        <DataTable
          data={farmers}
          columns={columns}
          filterKeys={["name", "email"]}
        />
      </div>
    </div>
  );
};

export default Page;

import Heading from "@/components/be/Heading";
import PageHeader from "@/components/be/PageHeader";
import TableActions from "@/components/be/TableActions";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";

const Page = async () => {
  const trainings = await getData("trainings");
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 bg-slate-100  ">
      {/* Header */}
      <PageHeader
        title="Community"
        linkTitle="Add Community"
        href="/dashboard/community/new"
        icon={<Plus />}
      />

      {/* Table Actions */}

      {/* Export | Import | Bulk Delete */}
      <div className="py-6 px-2">
        <DataTable data={trainings} columns={columns} />
      </div>
    </div>
  );
};

export default Page;

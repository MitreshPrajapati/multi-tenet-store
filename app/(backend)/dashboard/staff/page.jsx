import Heading from "@/components/be/Heading";
import PageHeader from "@/components/be/PageHeader";
import TableActions from "@/components/be/TableActions";
import { Plus, } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 bg-slate-100 dark:bg-slate-700 ">
      {/* Header */}
      <PageHeader
        title="Staff"
        linkTitle="Add Staff"
        href="/dashboard/staff/new"
        icon= <Plus/>
      />

      {/* Table Actions */}

      {/* Export | Import | Bulk Delete */}
      <TableActions />

      <div className="py-6">{/* Table */}</div>
    </div>
  );
};

export default Page;

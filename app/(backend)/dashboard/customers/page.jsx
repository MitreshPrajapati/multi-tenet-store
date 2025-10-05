import PageHeader from "@/components/be/PageHeader";
import { getData } from "@/lib/getData";
import { Plus } from "lucide-react";
import React from "react";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { columns } from "./columns";

const Customers = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center">Access Denied</p>;
  }
  const { role, id } = session?.user;
  
  // if (role !== "ADMIN") {
  //   return <p className="text-center">Access Denied</p>;
  // }

  const customers = await getData("customers");
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      <div className="py-6 px-2">
        <DataTable data={customers} columns={columns} />
      </div>
    </div>
  );
};

export default Customers;

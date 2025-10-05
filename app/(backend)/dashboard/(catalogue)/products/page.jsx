import PageHeader from "@/components/be/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center">Access Denied</p>;
  }

  const { role, id } = session?.user;
  // console.log("session :", session);

  const products = await getData("products");
  const farmerProducts = products?.filter((product) => product.userId === id);
  // console.log("farmerProducts :", farmerProducts);
  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      {/* Header */}
      <PageHeader
        title="Products"
        linkTitle="Add Product"
        href="/dashboard/products/new"
        icon={<Plus />}
      />
      <div className="py-6 px-2">
        <DataTable
          data={role === "ADMIN" ? products : farmerProducts}
          columns={columns}
          filterKeys={["title"]}
        />
      </div>
    </div>
  );
};

export default Page;

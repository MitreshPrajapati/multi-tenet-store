import PageHeader from "@/components/be/PageHeader";
import { getData } from "@/lib/getData";
import { Plus } from "lucide-react";
import React from "react";
import { columns } from "./column";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p className="text-center">Access Denied</p>;
  }

  const { role, id } = session?.user;

  const sales = await getData("sales");

  const farmerSales = sales?.filter((sale) => sale.vendorId === id);
  // if (role === "FARMER" && coupons) {
  //   farmerCoupons = coupons?.filter((coupon) => coupon.vendorId === id);
  // }

  return (
    <div className="w-full h-screen dark:text-slate-50 text-slate-800 ">
      {/* <PageHeader
        title="Coupons"
        linkTitle="Add Coupons"
        href="/dashboard/coupons/new"
        icon={<Plus />}
      /> */}

      <div className="py-6 px-2">
        {/* {role === "ADMIN" ? (
          <DataTable data={coupons} columns={columns} />
        ) : (
          <DataTable data={farmerCoupons} columns={columns} />
        )} */}
        <DataTable
          data={role === "ADMIN" ? sales : farmerSales}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Page;

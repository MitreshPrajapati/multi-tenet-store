import CustomDataTable from "@/components/be/CustomDataTable";
import DashboardCharts from "@/components/be/DashboardCharts";
import Heading from "@/components/be/Heading";
import LargeCards from "@/components/be/LargeCards";
import SmallCards from "@/components/be/SmallCards";
import React from "react";

const Page = () => {
  return (
    <div>
      <Heading title="Dashboard Overview" />

      {/* Large cards */}
      <LargeCards />

      {/* Small cards */}
      <SmallCards />

      {/* Charts */}
      <DashboardCharts />

      {/* Recents Orders Table */}
      <CustomDataTable />
      
    </div>
  );
};

export default Page;

import CustomDataTable from "@/components/be/CustomDataTable";
import DashboardCharts from "@/components/be/DashboardCharts";
import FarmerDashboard from "@/components/be/FarmerDashboard";
import Heading from "@/components/be/Heading";
import LargeCards from "@/components/be/LargeCards";
import SmallCards from "@/components/be/SmallCards";
import UserDashboard from "@/components/be/UserDashboard";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  
  if (role === "USER") {
    return <UserDashboard />;
  } else if (role === "FARMER") {
    return <FarmerDashboard />;
  }

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
      {/* <CustomDataTable /> */}
    </div>
  );
};

export default Page;

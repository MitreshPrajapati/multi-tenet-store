import FormHeader from "@/components/be/FormHeader";
import NewFarmerForm from "@/components/be/NewFarmerForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateFarmer = async ({ params: { id } }) => {
  const farmer = await getData(`/farmers/${id}`);
  console.log("farmer Profile", farmer)
  return (
    <div>
      <FormHeader title={"Update Farmer"} />
      <NewFarmerForm updateData={farmer.farmerProfile} />
    </div>
  );
};

export default UpdateFarmer;

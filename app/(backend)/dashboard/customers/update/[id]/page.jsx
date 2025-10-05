import FormHeader from "@/components/be/FormHeader";
import CustomerForm from "@/components/be/Forms/CustomerForm";
import NewFarmerForm from "@/components/be/NewFarmerForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateCustomer = async ({ params: { id } }) => {
  const farmer = await getData(`/farmers/${id}`);
  console.log("farmer Profile", farmer)
  return (
    <div>
      <FormHeader title={"Update Customer"} />
      {/* <NewFarmerForm updateData={farmer.farmerProfile} /> */}

      <CustomerForm updateData={farmer.profile} />
    </div>
  );
};

export default UpdateCustomer;

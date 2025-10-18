import FormHeader from "@/components/be/FormHeader";
import CustomerForm from "@/components/be/Forms/CustomerForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateCustomer = async ({ params: { id } }) => {
  const user = await getData(`/users/${id}`);
  console.log("user Profile", user);
  return (
    <div>
      <FormHeader title={"Update Customer"} />

      <CustomerForm user={user} />
    </div>
  );
};

export default UpdateCustomer;

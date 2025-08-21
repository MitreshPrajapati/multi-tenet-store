import NewFarmerForm from "@/components/be/NewFarmerForm";
import { getData } from "@/lib/getData";
import React from "react";

const page = async ({params:{id}}) => {
  
  const user = await getData(`users/${id}`);
  console.log( user);

  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl p-4 mx-auto">
        <h2 className="text-center "> {user?.name} Tell More About Your Self</h2>
      </div>
      <NewFarmerForm user={user} />
    </div>
  );
};

export default page;

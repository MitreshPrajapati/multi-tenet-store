import FormHeader from "@/components/be/FormHeader";
import NewTraningForm from "@/components/be/NewTraningForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateTranning = async ({ params: { id } }) => {
  const training = await getData(`trainings/${id}`);
  const categoriesData = await getData("categories");
  const categories = categoriesData.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

  console.log(training);
  return (
    <div>
      <FormHeader title={"Update Training"} />
      <NewTraningForm updateData={training} categories={categories} />
    </div>
  );
};

export default UpdateTranning;

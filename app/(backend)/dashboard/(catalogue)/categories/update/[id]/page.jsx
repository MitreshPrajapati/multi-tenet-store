import FormHeader from "@/components/be/FormHeader";
import NewCategoryForm from "@/components/be/Forms/NewCategoryForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateCategory = async ({ params: { id } }) => {
  const category = await getData(`categories/${id}`);
  // console.log(category);
  return (
    <div>
      <FormHeader title={"Update Category"} />
      <NewCategoryForm updateData={category} />
    </div>
  );
};

export default UpdateCategory;

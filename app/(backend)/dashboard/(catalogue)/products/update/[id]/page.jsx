import FormHeader from "@/components/be/FormHeader";
import NewProductForm from "@/components/be/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateProduct = async ({ params: { id } }) => {
  const product = await getData(`products/${id}`);
  console.log(product);
  const categoriesData = await getData("categories");
  const usersData = await getData("users");
  const farmersData = usersData.filter((user) => user.role === "FARMER");

  const farmers = farmersData?.map((farmer) => {
    return {
      id: farmer.id,
      title: farmer.name,
    };
  });

  const categories = categoriesData?.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });

  return (
    <div>
      <FormHeader title="Update Product" />
      <NewProductForm
       updateData={product}
       categories={categories}
       farmers={farmers}
      />
    </div>
  );
};

export default UpdateProduct;

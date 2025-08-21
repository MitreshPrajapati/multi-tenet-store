import NewProductForm from "@/components/be/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";

const NewProduct = async () => {
  const categoriesData = await getData("categories");
  const usersData = await getData("users");
  const farmersData = usersData.filter(user => user.role === "FARMER");

  const farmers = farmersData?.map((farmer)=>{
    return {
      id: farmer.id,
      title: farmer.name,
    }
  })

  const categories = categoriesData?.map((category) => {
    return {
      id: category.id,
      title: category.title,
    };
  });
  
  return (
    <NewProductForm categories={categories} farmers={farmers} />
  );
};

export default NewProduct;

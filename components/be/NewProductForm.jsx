"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

// Import Components
import AddArrayItems from "@/components/FormInput/AddArrayItems";
import ImageInput from "@/components/FormInput/ImageInput";
import SelectInput from "@/components/FormInput/SelectInput";
import SubmitButton from "@/components/FormInput/SubmitButton";
import TextareaInput from "@/components/FormInput/TextArea";
import TextInput from "@/components/FormInput/TextInput";
import ToggleInput from "@/components/FormInput/ToggleInput";

// Import Functions
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserUniqueCode } from "@/lib/generateUserCode";

const NewProductForm = ({ updateData = {}, farmers, categories }) => {
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(updateData.tags || []);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });

  // const categories = [
  //   {
  //     id: 1,
  //     title: "Category 1",
  //   },
  //   {
  //     id: 2,
  //     title: "Category 2",
  //   },
  //   {
  //     id: 3,
  //     title: "Category 3",
  //   },
  //   {
  //     id: 4,
  //     title: "Category 4",
  //   },
  //   {
  //     id: 5,
  //     title: "Category 5",
  //   },
  // ];

  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");
  const router = useRouter();

  function redirect() {
    router.push("/dashboard/products");
  }

  async function onSubmit(data) {
    const slug = await generateSlug(data.title);
    const productCode = generateUserUniqueCode("MVS-FP", data.title);
    data.slug = slug;
    data.productCode = productCode;
    data.imageUrl = imageUrl;
    data.tags = tags;
    data.quantity = 1;
    data.isActive = isActive;

    console.log(data);
    if (id) {
      makePutRequest(
        setLoading,
        `api/products/${id}`,
        data,
        "Product",
        redirect
      );
    } else {
      makePostRequest(
        setLoading,
        "api/products",
        data,
        "Product",
        reset,
        redirect
      );
    }
    setImageUrl("");
    setTags([]);
  }

  return (
    <div>
      {/* <FormHeader title={"New Product"} /> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 p-4 dark:bg-slate-700 dark:border-slate-600 mx-auto my-8"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Product Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Product SKU"
            name="sku"
            register={register}
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Product Barcode"
            name="barcode"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Price (Before Discount)"
            name="productPrice"
            register={register}
            type="number"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Sale Price (Discounted)"
            name="salePrice"
            register={register}
            type="number"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Product Stock"
            name="productStock"
            register={register}
            type="number"
            errors={errors}
            className="w-full"
          />

          <TextInput
            label="Unit of measurement(eg. Kilograms)"
            name="unit"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Select Category"
            name="categoryId"
            register={register}
            errors={errors}
            className="w-full"
            options={categories}
          />
          <SelectInput
            label="Select Farmer"
            name="farmerId"
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
          />

          <AddArrayItems items={tags} setItems={setTags} itemTitle="Tag" />
          <TextareaInput
            label={"Product Description"}
            name={"description"}
            register={register}
            errors={errors}
          />

          <ToggleInput
            label="Publish your Product"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
          <ToggleInput
            label="Support Wholesale Selling"
            name="isWholesale"
            trueTitle="Support Wholesale"
            falseTitle="Not Support Wholesale"
            register={register}
          />

          {isWholesale ? (
            <>
              <TextInput
                label="Wholesale Price"
                name="wholesalePrice"
                register={register}
                type="number"
                errors={errors}
                className="w-full"
              />
              <TextInput
                label="Minimum Wholesale Quantity"
                name="wholesaleQuantity"
                register={register}
                type="number"
                errors={errors}
                className="w-full"
              />
            </>
          ) : null}

          <ImageInput
            label="Product Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImageUploader"
          />
        </div>

        <SubmitButton
          isLoading={loading}
          title={id ? "Update Product" : "Create Product"}
          loadingButtonTitle={
            id ? "Updating Product..." : "Creating Product..."
          }
        />
      </form>
    </div>
  );
};

export default NewProductForm;

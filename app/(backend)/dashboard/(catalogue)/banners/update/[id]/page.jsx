import FormHeader from "@/components/be/FormHeader";
import BannerForm from "@/components/be/Forms/BannerForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateBanner = async ({ params: { id } }) => {
  const banner = await getData(`banners/${id}`);
  return (
    <div>
      <FormHeader title="Update Banner" />
      <BannerForm updateData={banner} />
    </div>
  );
};

export default UpdateBanner;

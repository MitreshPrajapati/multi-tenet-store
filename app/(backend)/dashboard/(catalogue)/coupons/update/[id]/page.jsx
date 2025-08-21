import FormHeader from "@/components/be/FormHeader";
import CouponForm from "@/components/be/Forms/CouponForm";
import { getData } from "@/lib/getData";
import React from "react";

const UpdateCoupon = async ({ params: { id } }) => {
  const coupon = await getData(`coupons/${id}`);
  return (
    <div>
      <FormHeader title="Update Coupon" />
      <CouponForm updatedData={coupon} />
    </div>
  );
};

export default UpdateCoupon;

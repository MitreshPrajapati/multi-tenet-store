import SalesInvoice from "@/components/orders/SalesInvoice";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { id } }) {
  const order = await getData(`orders/${id}`);
  if (!order) {
    return <p>Order not found</p>;
  }
  return <SalesInvoice order={order} />;
}

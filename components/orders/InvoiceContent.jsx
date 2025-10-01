import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import Image from "next/image";
import React, { forwardRef } from "react";

const InvoiceContent = forwardRef(({ order }, ref) => {
  const invoiceDate = convertIsoDateToNormal(order.createdAt);
  const subtotal =
    order?.orderItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2) ?? 0;
  const shippingCost = order.shippingCost;
  const total = (parseFloat(subtotal) + parseFloat(shippingCost)).toFixed(2);
  return (
    <div ref={ref}>
      <div className="max-w-4xl mx-auto border border-gray-500 p-8 rounded-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 ">
        {/* Header */}
        <div className="flex justify-between border-b border-gray-500 pb-8">
          <div className="flex flex-col">
            <h2>Bill From:</h2>
            <p>Shoppify Hardware Store</p>
            <p>150 Eleign Street</p>
            <p>Canada</p>
            <p>shopiifystore@gmail.com</p>
          </div>
          <Image
            src={"/logo.svg"}
            alt="limifood logo"
            width={250}
            height={250}
            className="w-36 h-16"
            priority={true}
          />
        </div>
        {/* Header End */}
        <div className="flex justify-between border-b border-gray-500 py-8 gap-12 ">
          <div className="flex flex-col">
            <h2>Bill To:</h2>
            <p>
              {order?.firstName} {order?.lastName}
            </p>
            <p>
              {order?.streetAddress} {order?.city} {order?.zipcode}
            </p>
            <p>{order?.country}</p>
            <p>{order?.email}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <p>Invoice #</p>
              <p>{order?.orderNumber}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Invoice Date</p>
              <p>{invoiceDate}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Amount Due</p>
              <p>${subtotal}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Item
                </th>
                {/* <th scope="col" className="px-6 py-3">
                        Item Description
                      </th> */}
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit Cost
                </th>
                <th scope="col" className="px-6 py-3">
                  Line Total
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item, idx) => {
                const lineTotal = (item.price * item.quantity).toFixed(2);
                return (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.title}
                    </th>
                    {/* <td className="px-6 py-4">{item.description}</td> */}
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">${item.price}</td>
                    <td className="px-6 py-4">${lineTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between border-b border-gray-500 py-8">
          <div className="flex flex-col">
            <h2>NOTES</h2>
            <p>Free Shipping for 30 Days Money back guarantee</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <p>SubTotal</p>
              <p>${subtotal}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Tax</p>
              <p>${shippingCost}</p>
            </div>
            <div className="flex justify-between gap-4">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <Image
            src={"/logo.svg"}
            alt="limifood logo"
            width={250}
            height={250}
            className="w-36 h-16"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
});

export default InvoiceContent;
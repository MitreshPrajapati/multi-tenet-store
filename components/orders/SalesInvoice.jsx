"use client";

import React, { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceContent from "./InvoiceContent";

export default function SalesInvoice({ order }) {
  const invoiceRef = useRef(null);

  const downloadInvoice = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `invoice-${order?.orderNumber}`,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { -webkit-print-color-adjust: exact; }
    `,
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-end justify-end mb-8">
        <button
          onClick={downloadInvoice}
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold dark:text-slate-900 text-slate-200  transition-all duration-200 bg-gray-800 dark:bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
        >
          Download/Print Invoice
        </button>
      </div>

      {/* Invoice */}
      <InvoiceContent ref={invoiceRef} order={order} />
    </div>
  );
}

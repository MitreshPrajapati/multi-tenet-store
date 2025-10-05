"use client";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import ActionsColumn from "@/components/DataTableColumns/ActionsColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productTitle",
    header: ({ column }) => <SortableColumn column={column} title="Product Title" />,
  },

  {
    accessorKey: "productImage",
    header: "Product Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="productImage" />,
  },
  {
    accessorKey: "productPrice",
    header: "Product Price",
  },
  {
    accessorKey: "productQuantity",
    header: ({ column }) => <SortableColumn column={column} title="Product Quantity" />,
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const product = row.original;
  //     return (
  //       <ActionsColumn
  //         row={row}
  //         title="Product"
  //         endpoint={`products/${product.id}`}
  //       />
  //     );
  //   },
  // },
];

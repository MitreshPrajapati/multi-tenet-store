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
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  {
    accessorKey: "imageUrl",
    header: "Category Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "description",
    header: "Descritption",
    cell: ({ row }) => {
      const description = row.getValue("description");
      return <div className="line-clamp-1">{description}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: "IsActive",
  },
  {
    accessorKey: "isWholesale",
    header: "IsWholesale",
  },
  {
    accessorKey: "productPrice",
    header: "Product Price",
  },
  {
    accessorKey: "salePrice",
    header: "Sale Price",
  },
  {
    accessorKey: "isWholesale",
    header: "IsWholesale",
  },
  {
    accessorKey: "productStock",
    header: "Product stock",
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <ActionsColumn
          row={row}
          title="Product"
          endpoint={`products/${product.id}`}
        />
      );
    },
  },
];

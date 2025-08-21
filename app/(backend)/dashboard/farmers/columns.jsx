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
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  // {
  //   accessorKey: "profileImageUrl",
  //   header: "Farmer Image",
  //   cell: ({ row }) => <ImageColumn row={row} accessorKey="profileImageUrl" />,
  // },
  {
    accessorKey: "email",
    header: "Email" ,
    // header: ({ column }) => <SortableColumn column={column} title="Email" />,
  },
  // {
  //   accessorKey: "farmerProfile.farmerCode",
  //   header: "Farmer Code",
  // },
  // {
  //   accessorKey: "farmerProfile",
  //   header: "Mobile",
  //   cell: ({ row }) => {
  //     const farmer = row.getValue("farmerProfile");
  //     return <div className="line-clamp-1">{farmer?.phone}</div>;
  //   },
  // },
  {
    accessorKey: "role",
    header: "Role",
  },
  // {
  //   accessorKey: "isActive",
  //   header: "IsActive",
  // },
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
      const farmer = row.original;
      return (<ActionsColumn row={row} title="Farmer" endpoint={`farmers/${farmer.id}`} />)},
  }
];

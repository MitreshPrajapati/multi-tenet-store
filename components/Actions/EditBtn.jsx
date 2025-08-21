import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

const EditBtn = ({ title, editEndpoint }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endpoint = editEndpoint.split("/");
  
  return (
    <Link
      href={`${baseUrl}/dashboard/${endpoint[0]}/update/${endpoint[1]}`}
      className="font-medium flex items-center text-green-600 space-x-1"
    >
      <Pencil className="w-4 h-4" />
      <span>Edit {title}</span>
    </Link>
  );
};

export default EditBtn;

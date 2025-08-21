import Image from "next/image";
import React from "react";

const ImageColumn = ({ row, accessorKey }) => {
  const imageUrl = row.getValue(accessorKey);
  return (
    <div className="shrink-0">
      <Image
        src={imageUrl}
        width={500}
        height={500}
        className="w-16 h-16 rounded-full object-cover"
        alt="image"
      />
    </div>
  );
};

export default ImageColumn;

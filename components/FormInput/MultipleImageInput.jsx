import { UploadDropzone } from "@/lib/uploadThing";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function MultipleImageInput({
  label,
  imageUrls = [],
  setImageUrls,
  className = "col-span-full",
  endpoint = "categoryImageUploader",
}) {
  function removeImage(index) {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-800 dark:text-slate-50"
        >
          {label}
        </label>
        {/* {imageUrls && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex space-x-2  bg-slate-900 rounded-md shadow text-slate-50  py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )} */}
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls?.map((imageUrl, idx) => {
            return (
              <div key={idx} className="relative bg-white">
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-4 -right-2 z-10 rounded-full bg-slate-100 "
                  type="button"
                >
                  <XCircle className="text-red-500" />
                </button>
                <Image
                  src={imageUrl}
                  alt="Item image"
                  width={1000}
                  height={667}
                  className="w-full h-32 object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            const urls = res?.map((r) => r.url);
            setImageUrls(urls);
            // toast.success("Image upload successful.");
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Image upload failed");
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
}

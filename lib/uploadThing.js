import { ourFileRouter } from "@/app/api/uploadthing/core";
import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";


export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
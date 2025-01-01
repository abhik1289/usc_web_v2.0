import { cloudinary } from "@/lib/configCloudnary"; // your config path
import { NextRequest } from "next/server";

type UploadResponse =
    { success: true; result?: any } |
    { success: false; error: any };

export const uploadToCloudinary = (
    fileUri: string, fileName: string, folderName: string): Promise<UploadResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload(fileUri, {
                invalidate: true,
                resource_type: "auto",
                filename_override: fileName,
                folder: folderName, // any sub-folder name in your cloud
                use_filename: true,
            })
            .then((result: any) => {
                resolve({ success: true, result });
            })
            .catch((error: any) => {
                reject({ success: false, error });
            });
    });
};
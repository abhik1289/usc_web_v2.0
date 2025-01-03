import { Context } from "hono";
import { v4 as uuidv4 } from "uuid";
import { uploadToCloudinary } from "./uploadCloudnary";

async function ImageUploadToDb(c: Context, files: any) {
    try {
        // Ensure files is an array
        const fileArray = Array.isArray(files) ? files : [files];

        // Process and upload each file
        const uploadResults = await Promise.all(
            fileArray.map(async (file) => {
                if (!(file instanceof File)) {
                    throw new Error(`Invalid file type. Expected File, received ${typeof file}`);
                }

                // Read file as base64
                const buffer = await file.arrayBuffer();
                const base64Data = Buffer.from(buffer).toString("base64");
                const mimeType = file.type;

                // Create data URI
                const fileUri = `data:${mimeType};base64,${base64Data}`;

                // Upload to Cloudinary
                const res = await uploadToCloudinary(fileUri, file.name, "testimonial");
                if (!res.success) {
                    throw new Error(`Cloudinary upload failed for file: ${file.name}`);
                }

                // Extract secure_url and public_id
                const { secure_url, public_id } = res.result;
                return { secure_url, public_id };
            })
        );

        // Return upload results
        return { success: true, uploads: uploadResults };
    } catch (error: any) {
        // Handle errors
        console.error("Error uploading file:", error.message);
        return {
            success: false,
            message: "Failed to upload files",
            error: error.message,
        };
    }
}

export default ImageUploadToDb;

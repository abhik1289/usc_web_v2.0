import { v2 as cloudinary } from 'cloudinary';

async function deleteImage(publicId: string): Promise<{ success: boolean; result?: any; error?: any; }> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return { success: true, result };
    } catch (error: any) {
        return { success: false, error };
    }
}


export { deleteImage };
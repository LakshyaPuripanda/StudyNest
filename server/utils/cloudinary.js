import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
});

export const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
             
            resource_type: 'auto' // Automatically detect the resource type (image, video, etc.)
        });
        return uploadResponse;
    } catch (error) {
        console.error('Error uploading media:', error);
        throw new Error('Failed to upload media');
    }
};

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        const deleteResponse = await cloudinary.uploader.destroy(publicId);
        return deleteResponse;
    } catch (error) {
        console.error('Error deleting media:', error);
        throw new Error('Failed to delete media');
    }
};

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        const deleteResponse = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video"
        });
        return deleteResponse;
    }
    catch (error) {
        console.error('Error deleting video:', error);
        throw new Error('Failed to delete video');
    }
}
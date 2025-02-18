import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});
//upload method on clouiinary

export const uploadOnCloudinary =async (localPath)=>{
    try {
        if(!localPath) return null;
        const response = await cloudinary.uploader.upload(localPath,{resource_type:'auto'});
       // console.log('file uploaded on cloudinary',response.url);
       fs.unlinkSync(localPath);
        return response;
    } catch (error) {
        fs.unlinkSync(localPath);
        console.log('cloudinary upload error :',error)
        return null;
        
    }
}
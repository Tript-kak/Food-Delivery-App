import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import path from 'path'



    const uploadOnCloudinary = async (file) => {
    try {
       

        cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET

        
    });
        const normalizedPath = path.resolve(file)
        console.log("uploading:", normalizedPath)
        const result = await cloudinary.uploader.upload(normalizedPath)
        console.log("upload success:", result.secure_url)
        fs.unlinkSync(file)
        return result.secure_url
    } catch(error) {
        console.log("Cloudinary upload error:", JSON.stringify(error, null, 2))
        try { fs.unlinkSync(file) } catch(e) {}  // safe delete
    }
}





export default uploadOnCloudinary
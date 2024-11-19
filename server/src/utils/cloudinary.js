import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (LocalFilePath) => {
  if (!LocalFilePath) return null;

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY, // Correct environment variable name
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    const UploadResult = await cloudinary.uploader.upload(LocalFilePath, {
      resource_type: "auto",
    });

    console.log(UploadResult);

    // Remove the local file only if the upload was successful
    fs.unlinkSync(LocalFilePath);

    return UploadResult;
  } catch (error) {
    // Remove the local file in case of an error
    fs.unlinkSync(LocalFilePath);
    console.log("ERROR CONNECTING WITH CLOUDINARY", error);
    return null;
  }
};

export { uploadOnCloudinary };

import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { cloudApiKey, cloudApiSecret, cloudName } from "./config.mjs";

dotenv.config();

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
});

export default cloudinaryConfig;

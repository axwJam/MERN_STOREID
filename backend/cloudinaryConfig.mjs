import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { cloudName, cloudApiKey, cloudApiSecret } from "./config.mjs";

dotenv.config();

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
});

export default cloudinary;

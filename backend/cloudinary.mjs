import cloudinary from "cloudinary";
import { cloudName, cloudApiKey, cloudApiSecret } from "./config.mjs";

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
});

export default cloudinary;

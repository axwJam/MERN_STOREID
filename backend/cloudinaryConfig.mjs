import cloudinary from "cloudinary";
import { cloudName, cloudApiKey, cloudApiSecret } from "./config.mjs";

cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: cloudApiKey,
  api_secret: cloudApiSecret,
  secure: true,
});

export default cloudinary.v2;

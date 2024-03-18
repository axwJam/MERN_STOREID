import dotenv from "dotenv";

dotenv.config();

export const urlPort = 5555;
export const mongoDBURL = `mongodb://127.0.0.1:27017/store_id`;
export const jwtSecret = process.env.JWT_SECRET;
export const cloudName = process.env.CLOUD_NAME;
export const cloudApiKey = process.env.CLOUD_API_KEY;
export const cloudApiSecret = process.env.CLOUD_API_SECRET;

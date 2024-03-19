import dotenv from "dotenv";

dotenv.config();

export const urlPort = 5555;
export const mongoDBURL = `mongodb+srv://root:root@mern.n3yeiix.mongodb.net/store_id?retryWrites=true&w=majority&appName=mern`;
export const jwtSecret = process.env.JWT_SECRET;
export const cloudName = process.env.CLOUD_NAME;
export const cloudApiKey = process.env.CLOUD_API_KEY;
export const cloudApiSecret = process.env.CLOUD_API_SECRET;

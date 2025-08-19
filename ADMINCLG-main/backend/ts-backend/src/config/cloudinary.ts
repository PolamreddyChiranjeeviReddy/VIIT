import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // make sure env variables are loaded
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.ping()
  .then(() => console.log('✅ Cloudinary connected'))
  .catch(error => console.error('❌ Cloudinary connection failed:', error));

export default cloudinary;

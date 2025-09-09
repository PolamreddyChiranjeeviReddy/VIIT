// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config(); // make sure env variables are loaded
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// cloudinary.api.ping()
//   .then(() => console.log('✅ Cloudinary connected'))
//   .catch(error => console.error('❌ Cloudinary connection failed:', error));

// export default cloudinary;



// import AWS from "aws-sdk";
// import dotenv from "dotenv";

// dotenv.config();

// const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT || "");

// export const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.SPACES_KEY,
//   secretAccessKey: process.env.SPACES_SECRET,
// });






// import AWS from "aws-sdk";
// import dotenv from "dotenv";

// dotenv.config();

// const spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT || "");

// export const s3 = new AWS.S3({
//   endpoint: spacesEndpoint,
//   accessKeyId: process.env.SPACES_KEY,
//   secretAccessKey: process.env.SPACES_SECRET,
// });

// // ✅ Test connection
// (async () => {
//   try {
//     const result = await s3.listBuckets().promise();
//     console.log("✅ Connected to DigitalOcean Spaces successfully!");
//     console.log("Buckets available:", result.Buckets?.map(b => b.Name));
//   } catch (error: any) {
//     console.error("❌ Failed to connect to DigitalOcean Spaces:", error.message);
//   }
// })();








// import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";

// dotenv.config();

// export const s3 = new S3Client({
//   region: "us-east-1", // DigitalOcean requires this (use dummy region)
//   endpoint: process.env.SPACES_ENDPOINT, // e.g. https://blr1.digitaloceanspaces.com
//   credentials: {
//     accessKeyId: process.env.SPACES_KEY || "",
//     secretAccessKey: process.env.SPACES_SECRET || "",
//   },
//   forcePathStyle: false,
// });

// // ✅ Test connection
// (async () => {
//   try {
//     const result = await s3.send(new ListBucketsCommand({}));
//     console.log("✅ Connected to DigitalOcean Spaces successfully!");
//     console.log("Buckets available:", result.Buckets?.map(b => b.Name));
//   } catch (error: any) {
//     console.error("❌ Failed to connect to DigitalOcean Spaces:", error.message);
//   }
// })();






























// import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";

// dotenv.config();

// const s3 = new S3Client({
//   endpoint: process.env.SPACES_ENDPOINT,
//   region: "blr1",
//   credentials: {
//     accessKeyId: process.env.SPACES_KEY || "",
//     secretAccessKey: process.env.SPACES_SECRET || "",
//   },
// });

// (async () => {
//   try {
//     const buckets = await s3.send(new ListBucketsCommand({}));
//     console.log("✅ Connected! Buckets:", buckets.Buckets);
//   } catch (err) {
//     console.error("❌ Failed to connect to DigitalOcean Spaces:", err);
//   }
// })();

// export { s3 };









// import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
// import dotenv from "dotenv";

// dotenv.config();

// export const s3 = new S3Client({
//   endpoint: process.env.SPACES_ENDPOINT,
//   region: "blr1", // must match your region
//   credentials: {
//     accessKeyId: process.env.SPACES_KEY || "",
//     secretAccessKey: process.env.SPACES_SECRET || "",
//   },
// });

// // Quick test on startup
// (async () => {
//   try {
//     const res = await s3.send(new ListBucketsCommand({}));
//     console.log("✅ Connected to DigitalOcean Spaces. Buckets:", res.Buckets);
//   } catch (err) {
//     console.error("❌ Failed to connect to DigitalOcean Spaces:", err);
//   }
// })();















import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT, // e.g. https://blr1.digitaloceanspaces.com
  region: "blr1", // region
  credentials: {
    accessKeyId: process.env.SPACES_KEY || "",
    secretAccessKey: process.env.SPACES_SECRET || "",
  },
});

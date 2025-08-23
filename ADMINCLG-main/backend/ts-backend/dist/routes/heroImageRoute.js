"use strict";
// import express from "express";
// import multer from 'multer';
// import path from 'path';
// // import upload from "../middlewares/upload";
// import {
//   createHeroImage,
//   getHeroImages,
//   deleteHeroImage,
//   updateHeroImage,
// } from "../controllers/heroImageController";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)+ file.originalname.replace(/\s+/g, '-');
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage : storage });
// const router = express.Router();
// router.post(
//   "/add",
//   upload.fields([
//     { name: "desktopImage", maxCount: 1 },
//     { name: "mobileImage", maxCount: 1 },
//   ]),
//   createHeroImage
// );
// router.get("/list", getHeroImages);
// router.delete("/delete/:_id", deleteHeroImage);
// router.put("/update/:_id",upload.fields([
//     { name: "desktopImage", maxCount: 1 },
//     { name: "mobileImage", maxCount: 1 },
//   ]),updateHeroImage);
// export default router;
// import express from "express";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary";
// import {
//   createHeroImage,
//   getHeroImages,
//   deleteHeroImage,
//   updateHeroImage,
// } from "../controllers/heroImageController";
// const sanitizeFileName = (filename: string): string => {
//   return filename
//     .toLowerCase()
//     .replace(/[^a-z0-9.]/g, '-') // Replace any non-alphanumeric chars with dash
//     .replace(/^-+|-+$/g, '')     // Remove leading/trailing dashes
//     .replace(/\..*$/, '');       // Remove file extension
// };
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const cleanName = sanitizeFileName(file.originalname);
//     const uniqueId = Date.now();
//     const randomNum = Math.round(Math.random() * 1e9);
//     return {
//       folder: "departments",
//       resource_type: "image",
//       allowed_formats: ['jpg', 'jpeg', 'png'],
//       public_id: `${uniqueId}-${randomNum}-${cleanName}`,
//       quality: 100,
//       raw_transform: false,
//       use_filename: true,
//       unique_filename: true
//     };
//   },
// });
// // Add file validation
// const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//   const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
//   if (!allowedMimes.includes(file.mimetype)) {
//     return cb(new Error('Invalid file type. Only JPG and PNG allowed.'));
//   }
//   cb(null, true);
// };
// // Update multer configuration
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024  // 5MB limit
//   }
// });
// const router = express.Router();
// router.post(
//   "/add",
//   upload.fields([
//     { name: "desktopImage", maxCount: 1 },
//     { name: "mobileImage", maxCount: 1 },
//   ]),
//   createHeroImage
// );
// router.get("/list", getHeroImages);
// router.delete("/delete/:_id", deleteHeroImage);
// router.put(
//   "/update/:_id",
//   upload.fields([
//     { name: "desktopImage", maxCount: 1 },
//     { name: "mobileImage", maxCount: 1 },
//   ]),
//   updateHeroImage
// );
// export default router;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const heroImageController_1 = require("../controllers/heroImageController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)(); // stores files in memory (buffer)
router.post("/add", upload.single("image"), heroImageController_1.createHeroImage);
router.get("/list", heroImageController_1.getHeroImages);
router.put("/update/:_id", upload.single("image"), heroImageController_1.updateHeroImage);
router.delete("/delete/:_id", heroImageController_1.deleteHeroImage);
exports.default = router;
//# sourceMappingURL=heroImageRoute.js.map
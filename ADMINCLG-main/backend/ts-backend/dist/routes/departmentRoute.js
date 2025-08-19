"use strict";
// import express from 'express';
// import upload from '../middleware/upload';
// import { addDepartment, updateDepartment } from '../controllers/departmentController';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = express.Router();
// router.post(
//   '/add',
//   upload.fields([
//     { name: 'heroImage', maxCount: 1 },
//     { name: 'hodImage', maxCount: 1 }
//   ]),
//   addDepartment
// );
// router.put(
//   '/edit/:id',
//   upload.fields([
//     { name: 'heroImage', maxCount: 1 },
//     { name: 'hodImage', maxCount: 1 }
//   ]),
//   updateDepartment
// );
// export default router;
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { addDepartment, updateDepartmentByCode, getDepartmentByCode, getDepartment, deleteDepartment } from '../controllers/departmentController';
// const router = express.Router();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)+ file.originalname.replace(/\s+/g, '-');
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage: storage });
// router.get('/list/:code', getDepartmentByCode);
// router.get('/list',getDepartment);
// router.post(
//   '/add',
//   upload.fields([
//     { name: 'heroImage', maxCount: 1 },
//     { name: 'hodImage', maxCount: 1 }
//   ]),
//   addDepartment
// );
// router.put('/update/:_id', upload.fields([
//   { name: 'heroImage', maxCount: 1 },
//   { name: 'hodImage', maxCount: 1 }
// ]), updateDepartmentByCode);
// router.delete('/delete/:_id',deleteDepartment);
// export default router;
// import express from 'express';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../config/cloudinary';
// import {
//   addDepartment,
//   updateDepartmentByCode,
//   getDepartmentByCode,
//   getDepartment,
//   deleteDepartment,
// } from '../controllers/departmentController';
// const router = express.Router();
// // const upload = multer({ storage });
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
// // Routes
// router.get('/list/:code', getDepartmentByCode);
// router.get('/list', getDepartment);
// const uploadMiddleware = upload.fields([
//   { name: 'heroImage', maxCount: 1 },
//   { name: 'hodImage', maxCount: 1 }
// ]);
// router.post('/add', 
//   (req, res, next) => {
//     // console.log('⭐ Before upload middleware');
//     uploadMiddleware(req, res, (err) => {
//       if (err instanceof multer.MulterError) {
//         // console.error('Multer error:', err);
//         return res.status(400).json({ error: `Upload error: ${err.message}` });
//       } else if (err) {
//         // console.error('Unknown upload error:', err);
//         return res.status(500).json({ error: `Upload error: ${err.message}` });
//       }
//       // console.log('✅ Upload successful');
//       next();
//     });
//   },
//   (req, res, next) => {
//     // console.log('⭐ After upload middleware');
//     // console.log('Files received:', req.files);
//     next();
//   },
//   addDepartment
// );
// router.put(
//   '/update/:_id',
//   upload.fields([
//     { name: 'heroImage', maxCount: 1 },
//     { name: 'hodImage', maxCount: 1 },
//   ]),
//   updateDepartmentByCode
// );
// router.delete('/delete/:_id', deleteDepartment);
// export default router;
// routes/departmentRoute.ts
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const departmentController_1 = require("../controllers/departmentController");
const router = express_1.default.Router();
// --- Utility to sanitize filenames ---
const sanitizeFileName = (filename) => {
    return filename
        .toLowerCase()
        .replace(/[^a-z0-9.]/g, "-") // Replace non-alphanumeric chars with dash
        .replace(/^-+|-+$/g, "") // Remove leading/trailing dashes
        .replace(/\..*$/, ""); // Remove file extension
};
// --- Cloudinary storage configuration ---
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (_req, file) => {
        const cleanName = sanitizeFileName(file.originalname);
        const uniqueId = Date.now();
        const randomNum = Math.round(Math.random() * 1e9);
        return {
            folder: "departments",
            resource_type: "image",
            allowed_formats: ["jpg", "jpeg", "png"],
            public_id: `${uniqueId}-${randomNum}-${cleanName}`,
            quality: "auto:best",
            use_filename: true,
            unique_filename: true,
        };
    },
});
// --- File validation ---
const fileFilter = (_req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimes.includes(file.mimetype)) {
        return cb(new Error("Invalid file type. Only JPG and PNG allowed."));
    }
    cb(null, true);
};
// --- Multer instance ---
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});
// --- Routes ---
router.get("/list/:code", departmentController_1.getDepartmentByCode);
router.get("/list", departmentController_1.getDepartment);
// Upload middleware for addDepartment
const uploadMiddleware = upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "hodImage", maxCount: 1 },
]);
router.post("/add", (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).json({ error: `Upload error: ${err.message}` });
        }
        else if (err instanceof Error) {
            return res.status(500).json({ error: `Upload error: ${err.message}` });
        }
        next();
    });
}, departmentController_1.addDepartment);
router.put("/update/:_id", upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "hodImage", maxCount: 1 },
]), departmentController_1.updateDepartmentByCode);
router.delete("/delete/:_id", departmentController_1.deleteDepartment);
exports.default = router;
//# sourceMappingURL=departmentRoute.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
// import path from 'path';
// import fs from 'fs';
const newsEventsController_1 = require("../controllers/newsEventsController");
const sanitizeFileName = (filename) => {
    return filename
        .toLowerCase()
        .replace(/[^a-z0-9.]/g, '-') // Replace any non-alphanumeric chars with dash
        .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
        .replace(/\..*$/, ''); // Remove file extension
};
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.default,
    params: async (req, file) => {
        const cleanName = sanitizeFileName(file.originalname);
        const uniqueId = Date.now();
        const randomNum = Math.round(Math.random() * 1e9);
        return {
            folder: "departments",
            resource_type: "image",
            allowed_formats: ['jpg', 'jpeg', 'png'],
            public_id: `${uniqueId}-${randomNum}-${cleanName}`,
            quality: 100,
            raw_transform: false,
            use_filename: true,
            unique_filename: true
        };
    },
});
// Add file validation
const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPG and PNG allowed.'));
    }
    cb(null, true);
};
// Update multer configuration
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});
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
const router = express_1.default.Router();
router.post('/add', upload.single("image"), newsEventsController_1.createEvent);
router.get('/list', newsEventsController_1.getAllEvents);
router.put('/update/:_id', upload.single("image"), newsEventsController_1.updateEvent);
router.delete('/delete/:_id', newsEventsController_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=newsEventsRoute.js.map
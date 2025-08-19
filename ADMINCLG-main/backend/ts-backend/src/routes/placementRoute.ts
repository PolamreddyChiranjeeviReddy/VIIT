import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";
import {
  createPlacement,
  getAllPlacements,
  updatePlacement,
  deletePlacement
} from '../controllers/placementController';

const sanitizeFileName = (filename: string): string => {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-') // Replace any non-alphanumeric chars with dash
    .replace(/^-+|-+$/g, '')     // Remove leading/trailing dashes
    .replace(/\..*$/, '');       // Remove file extension
};

const storage = new CloudinaryStorage({
  cloudinary,
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
const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type. Only JPG and PNG allowed.'));
  }
  cb(null, true);
};

// Update multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024  // 5MB limit
  }
});

const router = express.Router();

// Multiple file upload: image & companyLogo
router.post(
  '/add',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]),
  createPlacement
);

router.get('/list', getAllPlacements);

router.put(
  '/update/:_id',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'companyLogo', maxCount: 1 }]),
  updatePlacement
);

router.delete('/delete/:_id', deletePlacement);

export default router;

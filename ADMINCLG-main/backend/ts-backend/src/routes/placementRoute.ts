import express from 'express';
import multer from 'multer';

import {
  createPlacement,
  getAllPlacements,
  updatePlacement,
  deletePlacement
} from '../controllers/placementController';

// Update multer configuration
const upload = multer({storage: multer.memoryStorage()});

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

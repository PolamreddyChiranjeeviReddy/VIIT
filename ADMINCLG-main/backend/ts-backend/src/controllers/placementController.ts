import { Request, Response } from 'express';
import Placement from '../models/placementModel';
import HeroImage from "../models/heroImageModel";
import cloudinary from "../config/cloudinary";

type MulterCloudinaryFile = Express.Multer.File & {
  path: string;      // cloudinary URL provided by multer-storage-cloudinary
  filename: string;  // cloudinary public_id provided by multer-storage-cloudinary
};

type UploadedFiles = {
  [field: string]: MulterCloudinaryFile[];
} | undefined;

export const createPlacement = async (req: Request, res: Response) => {
  try {
    const { student, company, package: pkg } = req.body;

    // const image = req.files && (req.files as any).image ? (req.files as any).image[0].filename : '';
    // const companyLogo = req.files && (req.files as any).companyLogo ? (req.files as any).companyLogo[0].filename : '';
    const files = req.files as UploadedFiles;
    const image = files?.image?.[0];
    const companyLogo  = files?.companyLogo?.[0];

    const newPlacement = await Placement.create({
      student,
      company,
      package: pkg,
      image:{
        url: image?.path || '',
        public_id: image?.filename || '',
      },
      companyLogo:{
        url: companyLogo?.path || '',
        public_id: companyLogo?.filename || '',
      },
    });

    res.status(201).json(newPlacement);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllPlacements = async (_req: Request, res: Response) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.status(200).json(placements);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { student, company, package: pkg } = req.body;

    const files = req.files as UploadedFiles;
    const image = files?.desktopImage?.[0];
    const companyLogo  = files?.mobileImage?.[0];

    const placement = await Placement.findById(_id);
    if (!placement) {
      return res.status(404).json({ error: 'Placement not found' });
    }

    // Update text fields
    placement.student = student || placement.student;
    placement.company = company || placement.company;
    placement.package = pkg || placement.package;

    // Replace image if uploaded
    // Replace desktop image
    if (image) {
      // remove old from cloudinary
      await cloudinary.uploader.destroy(placement.image.public_id);
      placement.image = {
        url: image.path,
        public_id: image.filename,
      };
    }

    // Replace mobile image
    if (companyLogo) {
      await cloudinary.uploader.destroy(placement.companyLogo.public_id);
      placement.companyLogo = {
        url: companyLogo.path,
        public_id: companyLogo.filename,
      };
    }

    const updatedPlacement = await placement.save();
    return res.status(200).json(updatedPlacement);
  } catch (err:any) {
    return res.status(500).json({ error: err });
  }
};

export const deletePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const placement = await Placement.findById(_id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    // Delete from cloudinary
      await cloudinary.uploader.destroy(placement.image.public_id);
      await cloudinary.uploader.destroy(placement.companyLogo.public_id);
    
    await placement.deleteOne();
    res.status(200).json({ message: 'Placement deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

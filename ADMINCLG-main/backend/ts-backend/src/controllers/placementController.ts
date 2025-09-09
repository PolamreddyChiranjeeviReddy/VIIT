// import { Request, Response } from 'express';
// import Placement from '../models/placementModel';


// export const createPlacement = async (req: Request, res: Response) => {
//   try {
//     const { student, company, package: pkg } = req.body;

//     // const image = req.files && (req.files as any).image ? (req.files as any).image[0].filename : '';
//     // const companyLogo = req.files && (req.files as any).companyLogo ? (req.files as any).companyLogo[0].filename : '';
//     // console.log(req.files)
//     const image = req.files?.image?.[0]?.buffer;
//     const companyLogo  = req.files?.companyLogo?.[0]?.buffer;
//     if (!image || !companyLogo) {
//       return res.status(400).json({ error: 'image, companyLogo are required' });
//     }

//     const newPlacement = await Placement.create({
//       student,
//       company,
//       package: pkg,
//       image,
//       companyLogo,
//     });

//     res.status(201).json(newPlacement);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

// export const getAllPlacements = async (_req: Request, res: Response) => {
//   try {
//     const placements = await Placement.find().sort({ createdAt: -1 });
//     if (!placements || placements.length === 0) {
//       return res.status(404).json({ error: "Placements not found" });
//     }
//     const formatted = placements.map((placement) => ({
//       _id: placement._id,
//       student: placement.student,
//       company: placement.company,
//       package: placement.package,
//       image: `data:${placement.contentType};base64,${placement.image.toString("base64")}`,
//       companyLogo: `data:${placement.contentType};base64,${placement.companyLogo.toString("base64")}`,
//     }));

//     return res.status(200).json(formatted);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

// export const updatePlacement = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const { student, company, package: pkg } = req.body;
//     // console.log(req.files);

//     // const image = req.files?.image?.[0]?.buffer;
//     // const companyLogo  = req.files?.companyLogo?.[0]?.buffer;

//     const placement = await Placement.findById(_id);
//     if (!placement) {
//       return res.status(404).json({ error: 'Placement not found' });
//     }

//     // Update text fields
//     placement.student = student || placement.student;
//     placement.company = company || placement.company;
//     placement.package = pkg || placement.package;
//     // placement.image = image || placement.image;
//     // placement.companyLogo = companyLogo || placement.companyLogo; 
//     // Replace image if uploaded
//     // Replace desktop image
//     if(req.files?.heroImage?.[0]){
//     placement.image = req.files.image[0].buffer;
//     }
//     if(req.files?.companyLogo?.[0]){
//     placement.companyLogo = req.files.companyLogo[0].buffer;
//     }


//     const updatedPlacement = await placement.save();
//     return res.status(200).json(updatedPlacement);
//   } catch (err:any) {
//     return res.status(500).json({ error: err });
//   }
// };


// export const deletePlacement = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const placement = await Placement.findByIdAndDelete(_id);

//     if (!placement) {
//       return res.status(404).json({ message: 'Placement not found' });
//     }

//     res.status(200).json({ message: 'Placement deleted successfully' });
//   } catch (err:unknown) {
//     res.status(500).json({ error: err });
//   }
// };








import { Request, Response } from 'express';
import Placement from '../models/placementModel';
import {s3} from '../config/spaces';
import {v4 as uuidv4} from 'uuid';
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';



interface ImageFile {
  url: string;
  key: string;
  contentType: string;
}

/**
 * Uploads a file to your S3/Spaces bucket.
 */
const uploadFileToS3 = async (file: Express.Multer.File, path: string): Promise<ImageFile> => {
  const key = `${path}/${uuidv4()}-${file.originalname.replace(/\s+/g, "_")}`;
  
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET!,
      Key: key,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    })
  );

  return {
    url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`,
    key: key,
    contentType: file.mimetype,
  };
};

/**
 * Deletes a file from your S3/Spaces bucket.
 */
const deleteFileFromS3 = async (key: string): Promise<void> => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.SPACES_BUCKET!,
      Key: key,
    })
  );
};

// --- Prerequisites ---
// Make sure you have these S3 helper functions available in this file,
// either by importing them from a utility file or defining them here.
/*
import { uploadFileToS3, deleteFileFromS3 } from '../utils/s3Helpers'; 
*/

// --- Controller Functions ---

export const createPlacement = async (req: Request, res: Response) => {
  try {
    const { student, company, package: pkg } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const imageFile = files?.image?.[0];
    const companyLogoFile = files?.companyLogo?.[0];

    if (!student || !company || !pkg) {
      return res.status(400).json({ error: 'Student, company, and package are required' });
    }
    if (!imageFile || !companyLogoFile) {
      return res.status(400).json({ error: 'Student image and company logo are required' });
    }

    // Upload images to S3
    const image = await uploadFileToS3(imageFile, "placements/studentImages");
    const companyLogo = await uploadFileToS3(companyLogoFile, "placements/companyLogos");

    const newPlacement = new Placement({
      student,
      company,
      package: pkg,
      image,
      companyLogo,
    });

    const savedPlacement = await newPlacement.save();
    res.status(201).json(savedPlacement);
  } catch (error: any) {
    console.error("Error creating placement:", error);
    res.status(500).json({ error: "Server error while creating placement", details: error.message });
  }
};

export const getAllPlacements = async (_req: Request, res: Response) => {
  try {
    // The data is already in the correct format, no need to map and convert to base64
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.status(200).json(placements);
  } catch (error: any) {
    console.error("Error fetching placements:", error);
    res.status(500).json({ error: "Server error while fetching placements", details: error.message });
  }
};

export const updatePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { student, company, package: pkg } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const placement = await Placement.findById(_id);
    if (!placement) {
      return res.status(404).json({ error: 'Placement not found' });
    }

    // Update text fields
    placement.student = student || placement.student;
    placement.company = company || placement.company;
    placement.package = pkg || placement.package;

    // Check for and handle new student image upload
    const imageFile = files?.image?.[0];
    if (imageFile) {
      if (placement.image?.key) {
        await deleteFileFromS3(placement.image.key); // Delete the old image
      }
      placement.image = await uploadFileToS3(imageFile, "placements/studentImages"); // Upload the new one
    }

    // Check for and handle new company logo upload
    const companyLogoFile = files?.companyLogo?.[0];
    if (companyLogoFile) {
      if (placement.companyLogo?.key) {
        await deleteFileFromS3(placement.companyLogo.key); // Delete the old logo
      }
      placement.companyLogo = await uploadFileToS3(companyLogoFile, "placements/companyLogos"); // Upload the new one
    }

    const updatedPlacement = await placement.save();
    res.status(200).json(updatedPlacement);
  } catch (error: any) {
    console.error("Error updating placement:", error);
    res.status(500).json({ error: "Server error while updating placement", details: error.message });
  }
};

export const deletePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const placement = await Placement.findById(_id);
    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    // Delete associated images from S3 before deleting the database record
    if (placement.image?.key) {
      await deleteFileFromS3(placement.image.key);
    }
    if (placement.companyLogo?.key) {
      await deleteFileFromS3(placement.companyLogo.key);
    }

    await placement.deleteOne();

    res.status(200).json({ message: 'Placement deleted successfully' });
  } catch (error: any) {
    console.error("Error deleting placement:", error);
    res.status(500).json({ error: "Server error while deleting placement", details: error.message });
  }
};
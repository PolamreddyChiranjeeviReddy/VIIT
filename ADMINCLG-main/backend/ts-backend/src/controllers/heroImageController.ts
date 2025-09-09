// import { Request, Response } from "express";
// import HeroImage from "../models/heroImageModel";
// import path from 'path';
// import fs from 'fs';

// // Add new hero image
// export const createHeroImage = async (req: Request, res: Response) => {
//   try {
//     const {title}=req.body;
//     const desktopImage = req.files?.desktopImage?.[0]?.filename;
//     const mobileImage = req.files?.mobileImage?.[0]?.filename;

//     if (!desktopImage || !mobileImage) {
//       return res.status(400).json({ message: "Both images are required." });
//     }

//     const newImage = new HeroImage({ title, desktopImage, mobileImage });
//     await newImage.save();

//     res.status(201).json(newImage);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to upload hero image" });
//   }
// };

// // Get all hero images
// export const getHeroImages = async (_req: Request, res: Response) => {
//   try {
//     const images = await HeroImage.find();
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch hero images" });
//   }
// };

// export const updateHeroImage = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const {title}=req.body;
//     const desktopImage = req.files?.desktopImage?.[0]?.filename;
//     const mobileImage = req.files?.mobileImage?.[0]?.filename;

//     const heroImage = await HeroImage.findOne({ _id });
//     if (!heroImage) {
//       return res.status(404).json({ error: 'Hero Image not found' });
//     }

//     heroImage.title = title || heroImage.title;

//     // Replace images if uploaded
//     if (req.files?.desktopImage) {
//       const heroPath = path.join(__dirname, '..', 'uploads', heroImage.desktopImage);
//       if (heroImage.desktopImage && fs.existsSync(heroPath)) {
//       fs.unlinkSync(heroPath);
//       }

//       heroImage.desktopImage = req.files.desktopImage[0].filename;
//     }

//     if (req.files?.mobileImage) {
//         const hodPath = path.join(__dirname, '..', 'uploads', heroImage.mobileImage);
//         if (heroImage.mobileImage && fs.existsSync(hodPath)) {
//         fs.unlinkSync(hodPath);
//       }
//       heroImage.mobileImage = req.files.mobileImage[0].filename;
//     }

//     const updated = await heroImage.save();
//     res.status(200).json(updated);

//   } catch (err) {
//   console.error('Update error:', err);  // already done ✅
//   res.status(500).json({ error: err.message || 'Something went wrong while updating' }); // <-- update this
// }

// };


// // Delete hero image
// export const deleteHeroImage = async (req: Request, res: Response) => {
 
//   try {
//     const { _id } = req.params;
//     const heroImage = await HeroImage.findOne({_id});
//     console.log("sorry");

//     if (!heroImage) return res.status(404).json({ message: 'hero image not found' });

//     // Delete image from disk
//     const imagePathM = path.join(__dirname, '..', 'uploads', heroImage.mobileImage);
//     if (fs.existsSync(imagePathM)) fs.unlinkSync(imagePathM);

//     const imagePathD = path.join(__dirname, '..', 'uploads', heroImage.desktopImage);
//     if (fs.existsSync(imagePathD)) fs.unlinkSync(imagePathD);


//     await heroImage.deleteOne();
//     res.status(200).json({ message: 'hero image deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }

// };







// import { Request, Response } from "express";
// import HeroImage from "../models/heroImageModel";
// import cloudinary from "../config/cloudinary";

// // // Add new hero image
// // export const createHeroImage = async (req: Request, res: Response) => {
// //   try {
// //     const { title } = req.body;

// //     // const desktopImage = req.files?.["desktopImage"]?.[0];
// //     // const mobileImage = req.files?.["mobileImage"]?.[0];
// //     const desktopImage = req.files && 'desktopImage' in req.files ? req.files['desktopImage'][0].filename : undefined;
// //     const mobileImage = req.files && 'mobileImage' in req.files ? req.files['mobileImage'][0].filename : undefined;
// //     if (!desktopImage || !mobileImage) {
// //       return res.status(400).json({ message: "Both images are required." });
// //     }

// //     const newImage = new HeroImage({
// //       title,
// //       desktopImage: {
// //         url: (desktopImage as any).path,
// //         public_id: (desktopImage as any).filename,
// //       },
// //       mobileImage: {
// //         url: (mobileImage as any).path,
// //         public_id: (mobileImage as any).filename,
// //       },
// //     });

// //     await newImage.save();
// //     res.status(201).json(newImage);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Failed to upload hero image" });
// //   }
// // };


// type MulterCloudinaryFile = Express.Multer.File & {
//   path: string;      // cloudinary URL provided by multer-storage-cloudinary
//   filename: string;  // cloudinary public_id provided by multer-storage-cloudinary
// };

// type UploadedFiles = {
//   [field: string]: MulterCloudinaryFile[];
// } | undefined;


// export const createHeroImage = async (req: Request, res: Response) => {
//   try {
//     const { title } = req.body;
    
//     const files = req.files as UploadedFiles;
//     const desktopFile = files?.desktopImage?.[0];
//     const mobileFile  = files?.mobileImage?.[0];

//     if (!desktopFile || !mobileFile) {
//       return res.status(400).json({ message: "Both images are required." });
//     }

//     const newImage = new HeroImage({
//       title,
//       desktopImage: {
//         url: desktopFile.path,
//         public_id: desktopFile.filename,
//       },
//       mobileImage: {
//         url: mobileFile.path,
//         public_id: mobileFile.filename,
//       },
//     });

//     await newImage.save();
//     return res.status(201).json(newImage);
//   } catch (err: any) {
//     console.error("createHeroImage error:", err);
//     return res.status(500).json({ error: err.message || "Failed to upload hero image" });
//   }
// };

// export const updateHeroImage = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const { title } = req.body;

//     const doc = await HeroImage.findById(_id);
//     if (!doc) return res.status(404).json({ error: "Hero Image not found" });

//     if (title) doc.title = title;

//     const files = req.files as UploadedFiles;
//     const desktopFile = files?.desktopImage?.[0];
//     const mobileFile  = files?.mobileImage?.[0];

//     // Replace desktop image
//     if (desktopFile) {
//       // remove old from cloudinary
//       await cloudinary.uploader.destroy(doc.desktopImage.public_id);
//       doc.desktopImage = {
//         url: desktopFile.path,
//         public_id: desktopFile.filename,
//       };
//     }

//     // Replace mobile image
//     if (mobileFile) {
//       await cloudinary.uploader.destroy(doc.mobileImage.public_id);
//       doc.mobileImage = {
//         url: mobileFile.path,
//         public_id: mobileFile.filename,
//       };
//     }

//     const updated = await doc.save();
//     return res.status(200).json(updated);
//   } catch (err: any) {
//     console.error("updateHeroImage error:", err);
//     return res.status(500).json({ error: err.message || "Something went wrong while updating" });
//   }
// };

// // Get all hero images
// export const getHeroImages = async (_req: Request, res: Response) => {
//   try {
//     const images = await HeroImage.find();
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch hero images" });
//   }
// };

// // Update hero image
// // export const updateHeroImage = async (req: Request, res: Response) => {
// //   try {
// //     const { _id } = req.params;
// //     const { title } = req.body;

// //     const heroImage = await HeroImage.findById(_id);
// //     if (!heroImage) {
// //       return res.status(404).json({ error: "Hero Image not found" });
// //     }

// //     heroImage.title = title || heroImage.title;
// //     const desktopImage = req.files && 'desktopImage' in req.files ? req.files['desktopImage'][0].filename : undefined;
// //     const mobileImage = req.files && 'mobileImage' in req.files ? req.files['mobileImage'][0].filename : undefined;
// //     // Replace desktopImage
// //     if (desktopImage) {
// //       // Delete old from cloudinary
// //       await cloudinary.uploader.destroy(heroImage.desktopImage.public_id);

// //       // const desktopImage = req.files["desktopImage"][0] as any;
// //       const deskImage = desktopImage as any;
// //       heroImage.desktopImage = {
// //         url: deskImage.path,
// //         public_id: deskImage.filename,
// //       };
// //     }

// //     // Replace mobileImage
// //     if (mobileImage) {
// //       await cloudinary.uploader.destroy(heroImage.mobileImage.public_id);

// //       const mobImage = mobileImage as any;
// //       heroImage.mobileImage = {
// //         url: mobImage.path,
// //         public_id: mobImage.filename,
// //       };
// //     }

// //     const updated = await heroImage.save();
// //     res.status(200).json(updated);
// //   } catch (err: any) {
// //     console.error("Update error:", err);
// //     res.status(500).json({ error: err.message || "Something went wrong while updating" });
// //   }
// // };

// // Delete hero image
// export const deleteHeroImage = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const heroImage = await HeroImage.findById(_id);

//     if (!heroImage) return res.status(404).json({ message: "Hero image not found" });

//     // Delete from cloudinary
//     await cloudinary.uploader.destroy(heroImage.desktopImage.public_id);
//     await cloudinary.uploader.destroy(heroImage.mobileImage.public_id);

//     await heroImage.deleteOne();
//     res.status(200).json({ message: "Hero image deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };






// import { Request, Response } from "express";
// import { HeroImage } from "../models/heroImageModel";

// // Upload (Create)
// export const createHeroImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ message: "No image uploaded" });
//       return;
//     }

//     const newImage = new HeroImage({
//       number: req.body.number,
//       image: req.file.buffer,
//       contentType: req.file.mimetype,
//     });

//     await newImage.save();
//     res.status(201).json({ message: "Hero image uploaded successfully", image: newImage });
//   } catch (error) {
//     res.status(500).json({ message: "Error uploading image", error });
//   }
// };

// // Get all
// // export const getHeroImages = async (_req: Request, res: Response): Promise<void> => {
// //   try {
// //     const images = await HeroImage.find().sort({ number: 1 });
// //     res.json(images);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching images", error });
// //   }
// // };

// export const getHeroImages = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const images = await HeroImage.find().sort({ number: 1 });

//     const formatted = images.map((img) => ({
//       _id: img._id,
//       number: img.number,
//       image: `data:${img.contentType};base64,${img.image.toString("base64")}`
//     }));

//     res.json(formatted);
//   } catch (error: any) {
//     res.status(500).json({ message: "Failed to fetch images", error: error.message });
//   }
// };

// // const department = new departmentModel({
// //       code,
// //       name,
// //       heroImage: {
// //         url: heroImage.path,
// //         public_id: heroImage.filename,
// //       },
// //       about,
// //       hodMessage,
// //       hodName,
// //       hodImage: {
// //         url: hodImage.path,
// //         public_id: hodImage.filename,
// //       },
// //       vision,
// //       mission: parsedMission,
// //       faculty: parsedFaculty
// //     });

// // Update
// export const updateHeroImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const updateData: any = {};
//     if (req.body.number) updateData.number = req.body.number;
//     if (req.file) {
//       updateData.image = req.file.buffer;
//       updateData.contentType = req.file.mimetype;
//     }

//     const updated = await HeroImage.findByIdAndUpdate(req.params._id, updateData, { new: true });

//     if (!updated) {
//       res.status(404).json({ message: "Hero image not found" });
//       return;
//     }

//     res.json({ message: "Hero image updated successfully", image: updated });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating image", error });
//   }
// };

// // Delete
// export const deleteHeroImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const deleted = await HeroImage.findByIdAndDelete(req.params._id);

//     if (!deleted) {
//       res.status(404).json({ message: "Hero image not found" });
//       return;
//     }

//     res.json({ message: "Hero image deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting image", error });
//   }
// };















// import { Request, Response } from "express";
// import { HeroImage } from "../models/heroImageModel";
// import { s3 } from "../config/spaces";
// import { v4 as uuidv4 } from "uuid";

// // Create / Upload
// export const createHeroImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     if (!req.file) {
//       res.status(400).json({ message: "No image uploaded" });
//       return;
//     }

//     const key = `hero/${uuidv4()}-${req.file.originalname.replace(/\s+/g, "_")}`;

//     await s3
//       .putObject({
//         Bucket: process.env.SPACES_BUCKET || "",
//         Key: key,
//         Body: req.file.buffer,
//         ACL: "public-read",
//         ContentType: req.file.mimetype,
//       })
//       .promise();

//     const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;

//     const newImage = new HeroImage({
//       number: req.body.number,
//       url,
//       key,
//       contentType: req.file.mimetype,
//     });

//     await newImage.save();

//     res.status(201).json({ message: "Hero image uploaded successfully", image: newImage });
//   } catch (error: any) {
//     res.status(500).json({ message: "Error uploading image", error: error.message });
//   }
// };

// // Get All
// export const getHeroImages = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     const images = await HeroImage.find().sort({ number: 1 });
//     res.json(images);
//   } catch (error: any) {
//     res.status(500).json({ message: "Failed to fetch images", error: error.message });
//   }
// };

// // Update
// export const updateHeroImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const existing = await HeroImage.findById(req.params._id);
//     if (!existing) {
//       res.status(404).json({ message: "Hero image not found" });
//       return;
//     }

//     let updateData: any = { number: req.body.number || existing.number };

//     if (req.file) {
//       // Delete old from Spaces
//       await s3
//         .deleteObject({
//           Bucket: process.env.SPACES_BUCKET || "",
//           Key: existing.key,
//         })
//         .promise();

//       // Upload new
//       const key = `hero/${uuidv4()}-${req.file.originalname.replace(/\s+/g, "_")}`;

//       await s3
//         .putObject({
//           Bucket: process.env.SPACES_BUCKET || "",
//           Key: key,
//           Body: req.file.buffer,
//           ACL: "public-read",
//           ContentType: req.file.mimetype,
//         })
//         .promise();

//       updateData.url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
//       updateData.key = key;
//       updateData.contentType = req.file.mimetype;
//     }

//     const updated = await HeroImage.findByIdAndUpdate(req.params._id, updateData, { new: true });

//     res.json({ message: "Hero image updated successfully", image: updated });
//   } catch (error: any) {
//     res.status(500).json({ message: "Error updating image", error: error.message });
//   }
// };

// // Delete
// export const deleteHeroImage = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const existing = await HeroImage.findById(req.params._id);
//     if (!existing) {
//       res.status(404).json({ message: "Hero image not found" });
//       return;
//     }

//     // Delete from Spaces
//     await s3
//       .deleteObject({
//         Bucket: process.env.SPACES_BUCKET || "",
//         Key: existing.key,
//       })
//       .promise();

//     // Delete from DB
//     await HeroImage.findByIdAndDelete(req.params._id);

//     res.json({ message: "Hero image deleted successfully" });
//   } catch (error: any) {
//     res.status(500).json({ message: "Error deleting image", error: error.message });
//   }
// };

















import { Request, Response } from "express";
import { HeroImage } from "../models/heroImageModel";
import { s3 } from "../config/spaces";
import { v4 as uuidv4 } from "uuid";
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// Create / Upload
export const createHeroImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "No image uploaded" });
      return;
    }

    const key = `hero/${uuidv4()}-${req.file.originalname.replace(/\s+/g, "_")}`;

    // Upload to Spaces
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
        Body: req.file.buffer,
        ACL: "public-read",
        ContentType: req.file.mimetype,
      })
    );

    const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;

    const newImage = new HeroImage({
      number: req.body.number,
      url,
      key,
      contentType: req.file.mimetype,
    });

    await newImage.save();

    res.status(201).json({ message: "Hero image uploaded successfully", image: newImage });
  } catch (error: any) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};

// Get All
export const getHeroImages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const images = await HeroImage.find().sort({ number: 1 });
    res.json(images);
  } catch (error: any) {
    res.status(500).json({ message: "Failed to fetch images", error: error.message });
  }
};

// Update
export const updateHeroImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await HeroImage.findById(req.params._id);
    if (!existing) {
      res.status(404).json({ message: "Hero image not found" });
      return;
    }

    let updateData: any = { number: req.body.number || existing.number };

    if (req.file) {
      console.log("Updating image...");
      // Delete old file
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.SPACES_BUCKET,
          Key: existing.key,
        })
      );

      // Upload new file
      const key = `hero/${uuidv4()}-${req.file.originalname.replace(/\s+/g, "_")}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.SPACES_BUCKET,
          Key: key,
          Body: req.file.buffer,
          ACL: "public-read",
          ContentType: req.file.mimetype,
        })
      );

      updateData.url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
      updateData.key = key;
      updateData.contentType = req.file.mimetype;
    }

    const updated = await HeroImage.findByIdAndUpdate(req.params._id, updateData, { new: true });

    res.json({ message: "Hero image updated successfully", image: updated });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating image", error: error.message });
  }
};

// Delete
export const deleteHeroImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await HeroImage.findById(req.params._id);
    if (!existing) {
      res.status(404).json({ message: "Hero image not found" });
      return;
    }

    // Delete from Spaces
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: existing.key,
      })
    );

    // Delete from DB
    await HeroImage.findByIdAndDelete(req.params._id);

    res.json({ message: "Hero image deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting image", error: error.message });
  }
};

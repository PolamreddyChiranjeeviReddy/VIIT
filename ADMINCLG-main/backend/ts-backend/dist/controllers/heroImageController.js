"use strict";
// import { Request, Response } from "express";
// import HeroImage from "../models/heroImageModel";
// import path from 'path';
// import fs from 'fs';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroImage = exports.getHeroImages = exports.updateHeroImage = exports.createHeroImage = void 0;
const heroImageModel_1 = __importDefault(require("../models/heroImageModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createHeroImage = async (req, res) => {
    try {
        const { title } = req.body;
        const files = req.files;
        const desktopFile = files?.desktopImage?.[0];
        const mobileFile = files?.mobileImage?.[0];
        if (!desktopFile || !mobileFile) {
            return res.status(400).json({ message: "Both images are required." });
        }
        const newImage = new heroImageModel_1.default({
            title,
            desktopImage: {
                url: desktopFile.path,
                public_id: desktopFile.filename,
            },
            mobileImage: {
                url: mobileFile.path,
                public_id: mobileFile.filename,
            },
        });
        await newImage.save();
        return res.status(201).json(newImage);
    }
    catch (err) {
        console.error("createHeroImage error:", err);
        return res.status(500).json({ error: err.message || "Failed to upload hero image" });
    }
};
exports.createHeroImage = createHeroImage;
const updateHeroImage = async (req, res) => {
    try {
        const { _id } = req.params;
        const { title } = req.body;
        const doc = await heroImageModel_1.default.findById(_id);
        if (!doc)
            return res.status(404).json({ error: "Hero Image not found" });
        if (title)
            doc.title = title;
        const files = req.files;
        const desktopFile = files?.desktopImage?.[0];
        const mobileFile = files?.mobileImage?.[0];
        // Replace desktop image
        if (desktopFile) {
            // remove old from cloudinary
            await cloudinary_1.default.uploader.destroy(doc.desktopImage.public_id);
            doc.desktopImage = {
                url: desktopFile.path,
                public_id: desktopFile.filename,
            };
        }
        // Replace mobile image
        if (mobileFile) {
            await cloudinary_1.default.uploader.destroy(doc.mobileImage.public_id);
            doc.mobileImage = {
                url: mobileFile.path,
                public_id: mobileFile.filename,
            };
        }
        const updated = await doc.save();
        return res.status(200).json(updated);
    }
    catch (err) {
        console.error("updateHeroImage error:", err);
        return res.status(500).json({ error: err.message || "Something went wrong while updating" });
    }
};
exports.updateHeroImage = updateHeroImage;
// Get all hero images
const getHeroImages = async (_req, res) => {
    try {
        const images = await heroImageModel_1.default.find();
        res.json(images);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch hero images" });
    }
};
exports.getHeroImages = getHeroImages;
// Update hero image
// export const updateHeroImage = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const { title } = req.body;
//     const heroImage = await HeroImage.findById(_id);
//     if (!heroImage) {
//       return res.status(404).json({ error: "Hero Image not found" });
//     }
//     heroImage.title = title || heroImage.title;
//     const desktopImage = req.files && 'desktopImage' in req.files ? req.files['desktopImage'][0].filename : undefined;
//     const mobileImage = req.files && 'mobileImage' in req.files ? req.files['mobileImage'][0].filename : undefined;
//     // Replace desktopImage
//     if (desktopImage) {
//       // Delete old from cloudinary
//       await cloudinary.uploader.destroy(heroImage.desktopImage.public_id);
//       // const desktopImage = req.files["desktopImage"][0] as any;
//       const deskImage = desktopImage as any;
//       heroImage.desktopImage = {
//         url: deskImage.path,
//         public_id: deskImage.filename,
//       };
//     }
//     // Replace mobileImage
//     if (mobileImage) {
//       await cloudinary.uploader.destroy(heroImage.mobileImage.public_id);
//       const mobImage = mobileImage as any;
//       heroImage.mobileImage = {
//         url: mobImage.path,
//         public_id: mobImage.filename,
//       };
//     }
//     const updated = await heroImage.save();
//     res.status(200).json(updated);
//   } catch (err: any) {
//     console.error("Update error:", err);
//     res.status(500).json({ error: err.message || "Something went wrong while updating" });
//   }
// };
// Delete hero image
const deleteHeroImage = async (req, res) => {
    try {
        const { _id } = req.params;
        const heroImage = await heroImageModel_1.default.findById(_id);
        if (!heroImage)
            return res.status(404).json({ message: "Hero image not found" });
        // Delete from cloudinary
        await cloudinary_1.default.uploader.destroy(heroImage.desktopImage.public_id);
        await cloudinary_1.default.uploader.destroy(heroImage.mobileImage.public_id);
        await heroImage.deleteOne();
        res.status(200).json({ message: "Hero image deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteHeroImage = deleteHeroImage;
//# sourceMappingURL=heroImageController.js.map
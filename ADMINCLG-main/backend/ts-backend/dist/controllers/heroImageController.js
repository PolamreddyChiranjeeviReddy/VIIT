"use strict";
// import { Request, Response } from "express";
// import HeroImage from "../models/heroImageModel";
// import path from 'path';
// import fs from 'fs';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroImage = exports.updateHeroImage = exports.getHeroImages = exports.createHeroImage = void 0;
const heroImageModel_1 = require("../models/heroImageModel");
// Upload (Create)
const createHeroImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No image uploaded" });
            return;
        }
        const newImage = new heroImageModel_1.HeroImage({
            number: req.body.number,
            image: req.file.buffer,
            contentType: req.file.mimetype,
        });
        await newImage.save();
        res.status(201).json({ message: "Hero image uploaded successfully", image: newImage });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading image", error });
    }
};
exports.createHeroImage = createHeroImage;
// Get all
// export const getHeroImages = async (_req: Request, res: Response): Promise<void> => {
//   try {
//     const images = await HeroImage.find().sort({ number: 1 });
//     res.json(images);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching images", error });
//   }
// };
const getHeroImages = async (req, res) => {
    try {
        const images = await heroImageModel_1.HeroImage.find().sort({ number: 1 });
        const formatted = images.map((img) => ({
            _id: img._id,
            number: img.number,
            image: `data:${img.contentType};base64,${img.image.toString("base64")}`
        }));
        res.json(formatted);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch images", error: error.message });
    }
};
exports.getHeroImages = getHeroImages;
// const department = new departmentModel({
//       code,
//       name,
//       heroImage: {
//         url: heroImage.path,
//         public_id: heroImage.filename,
//       },
//       about,
//       hodMessage,
//       hodName,
//       hodImage: {
//         url: hodImage.path,
//         public_id: hodImage.filename,
//       },
//       vision,
//       mission: parsedMission,
//       faculty: parsedFaculty
//     });
// Update
const updateHeroImage = async (req, res) => {
    try {
        const updateData = {};
        if (req.body.number)
            updateData.number = req.body.number;
        if (req.file) {
            updateData.image = req.file.buffer;
            updateData.contentType = req.file.mimetype;
        }
        const updated = await heroImageModel_1.HeroImage.findByIdAndUpdate(req.params._id, updateData, { new: true });
        if (!updated) {
            res.status(404).json({ message: "Hero image not found" });
            return;
        }
        res.json({ message: "Hero image updated successfully", image: updated });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating image", error });
    }
};
exports.updateHeroImage = updateHeroImage;
// Delete
const deleteHeroImage = async (req, res) => {
    try {
        const deleted = await heroImageModel_1.HeroImage.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "Hero image not found" });
            return;
        }
        res.json({ message: "Hero image deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting image", error });
    }
};
exports.deleteHeroImage = deleteHeroImage;
//# sourceMappingURL=heroImageController.js.map
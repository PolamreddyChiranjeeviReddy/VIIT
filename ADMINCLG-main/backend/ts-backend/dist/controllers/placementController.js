"use strict";
// import { Request, Response } from 'express';
// import Placement from '../models/placementModel';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlacement = exports.updatePlacement = exports.getAllPlacements = exports.createPlacement = void 0;
const placementModel_1 = __importDefault(require("../models/placementModel"));
const spaces_1 = require("../config/spaces");
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
/**
 * Uploads a file to your S3/Spaces bucket.
 */
const uploadFileToS3 = async (file, path) => {
    const key = `${path}/${(0, uuid_1.v4)()}-${file.originalname.replace(/\s+/g, "_")}`;
    await spaces_1.s3.send(new client_s3_1.PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
    }));
    return {
        url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`,
        key: key,
        contentType: file.mimetype,
    };
};
/**
 * Deletes a file from your S3/Spaces bucket.
 */
const deleteFileFromS3 = async (key) => {
    await spaces_1.s3.send(new client_s3_1.DeleteObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
    }));
};
// --- Prerequisites ---
// Make sure you have these S3 helper functions available in this file,
// either by importing them from a utility file or defining them here.
/*
import { uploadFileToS3, deleteFileFromS3 } from '../utils/s3Helpers';
*/
// --- Controller Functions ---
const createPlacement = async (req, res) => {
    try {
        const { student, company, package: pkg } = req.body;
        const files = req.files;
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
        const newPlacement = new placementModel_1.default({
            student,
            company,
            package: pkg,
            image,
            companyLogo,
        });
        const savedPlacement = await newPlacement.save();
        res.status(201).json(savedPlacement);
    }
    catch (error) {
        console.error("Error creating placement:", error);
        res.status(500).json({ error: "Server error while creating placement", details: error.message });
    }
};
exports.createPlacement = createPlacement;
const getAllPlacements = async (_req, res) => {
    try {
        // The data is already in the correct format, no need to map and convert to base64
        const placements = await placementModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(placements);
    }
    catch (error) {
        console.error("Error fetching placements:", error);
        res.status(500).json({ error: "Server error while fetching placements", details: error.message });
    }
};
exports.getAllPlacements = getAllPlacements;
const updatePlacement = async (req, res) => {
    try {
        const { _id } = req.params;
        const { student, company, package: pkg } = req.body;
        const files = req.files;
        const placement = await placementModel_1.default.findById(_id);
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
    }
    catch (error) {
        console.error("Error updating placement:", error);
        res.status(500).json({ error: "Server error while updating placement", details: error.message });
    }
};
exports.updatePlacement = updatePlacement;
const deletePlacement = async (req, res) => {
    try {
        const { _id } = req.params;
        const placement = await placementModel_1.default.findById(_id);
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
    }
    catch (error) {
        console.error("Error deleting placement:", error);
        res.status(500).json({ error: "Server error while deleting placement", details: error.message });
    }
};
exports.deletePlacement = deletePlacement;
//# sourceMappingURL=placementController.js.map
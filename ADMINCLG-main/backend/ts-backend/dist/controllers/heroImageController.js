"use strict";
// import { Request, Response } from "express";
// import HeroImage from "../models/heroImageModel";
// import path from 'path';
// import fs from 'fs';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHeroImage = exports.updateHeroImage = exports.getHeroImages = exports.createHeroImage = void 0;
const heroImageModel_1 = require("../models/heroImageModel");
const spaces_1 = require("../config/spaces");
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
// Create / Upload
const createHeroImage = async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No image uploaded" });
            return;
        }
        const key = `hero/${(0, uuid_1.v4)()}-${req.file.originalname.replace(/\s+/g, "_")}`;
        // Upload to Spaces
        await spaces_1.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: key,
            Body: req.file.buffer,
            ACL: "public-read",
            ContentType: req.file.mimetype,
        }));
        const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
        const newImage = new heroImageModel_1.HeroImage({
            number: req.body.number,
            url,
            key,
            contentType: req.file.mimetype,
        });
        await newImage.save();
        res.status(201).json({ message: "Hero image uploaded successfully", image: newImage });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading image", error: error.message });
    }
};
exports.createHeroImage = createHeroImage;
// Get All
const getHeroImages = async (_req, res) => {
    try {
        const images = await heroImageModel_1.HeroImage.find().sort({ number: 1 });
        res.json(images);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch images", error: error.message });
    }
};
exports.getHeroImages = getHeroImages;
// Update
const updateHeroImage = async (req, res) => {
    try {
        const existing = await heroImageModel_1.HeroImage.findById(req.params._id);
        if (!existing) {
            res.status(404).json({ message: "Hero image not found" });
            return;
        }
        let updateData = { number: req.body.number || existing.number };
        if (req.file) {
            console.log("Updating image...");
            // Delete old file
            await spaces_1.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: process.env.SPACES_BUCKET,
                Key: existing.key,
            }));
            // Upload new file
            const key = `hero/${(0, uuid_1.v4)()}-${req.file.originalname.replace(/\s+/g, "_")}`;
            await spaces_1.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: process.env.SPACES_BUCKET,
                Key: key,
                Body: req.file.buffer,
                ACL: "public-read",
                ContentType: req.file.mimetype,
            }));
            updateData.url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
            updateData.key = key;
            updateData.contentType = req.file.mimetype;
        }
        const updated = await heroImageModel_1.HeroImage.findByIdAndUpdate(req.params._id, updateData, { new: true });
        res.json({ message: "Hero image updated successfully", image: updated });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating image", error: error.message });
    }
};
exports.updateHeroImage = updateHeroImage;
// Delete
const deleteHeroImage = async (req, res) => {
    try {
        const existing = await heroImageModel_1.HeroImage.findById(req.params._id);
        if (!existing) {
            res.status(404).json({ message: "Hero image not found" });
            return;
        }
        // Delete from Spaces
        await spaces_1.s3.send(new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: existing.key,
        }));
        // Delete from DB
        await heroImageModel_1.HeroImage.findByIdAndDelete(req.params._id);
        res.json({ message: "Hero image deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting image", error: error.message });
    }
};
exports.deleteHeroImage = deleteHeroImage;
//# sourceMappingURL=heroImageController.js.map
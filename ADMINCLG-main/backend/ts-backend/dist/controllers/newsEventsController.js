"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getAllEvents = exports.createEvent = void 0;
const newsEventsModel_1 = __importDefault(require("../models/newsEventsModel"));
const spaces_1 = require("../config/spaces");
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
const createEvent = async (req, res) => {
    try {
        const { type, title, date, description, pathlink, bgColor } = req.body;
        // const files = req.files as UploadedFiles;
        // const image = files?.image?.[0];
        // const file = req.file?.buffer;
        if (!req.file) {
            return res.status(400).json({ message: "Image is required." });
        }
        const key = `newsEvents/${(0, uuid_1.v4)()}-${req.file.originalname.replace(/\s+/g, '-')}`;
        await spaces_1.s3.send(new client_s3_1.PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: key,
            Body: req.file.buffer,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
        }));
        const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
        const newEvent = await newsEventsModel_1.default.create({
            type,
            title,
            date,
            description,
            pathlink,
            bgColor,
            image: {
                url,
                key,
                contentType: req.file.mimetype,
            }
        });
        res.status(201).json(newEvent);
    }
    catch (err) {
        // console.error("create newsEvents error:", err);
        return res.status(500).json({ error: err.message || "Failed to upload News and Events" });
    }
};
exports.createEvent = createEvent;
// export const getAllEvents = async (_req: Request, res: Response) => {
//   try {
//     const events = await NewsEvent.find().sort({ createdAt: -1 });
//     const formatted = events.map((img) => ({
//       _id: img._id,
//       type: img.type,
//       image: `data:${img.contentType};base64,${img.image.toString("base64")}`,
//       title: img.title,
//       date: img.date,
//       description: img.description,
//       pathlink: img.pathlink,
//       bgColor: img.bgColor,
//     }));
//     res.status(200).json(formatted);
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };
const getAllEvents = async (_req, res) => {
    try {
        const events = await newsEventsModel_1.default.find().sort({ date: 1 });
        const formatted = events.map((event) => {
            let safePathlink = event.pathlink;
            // If the pathlink is a full external URL, wrap it in our safe redirect link
            if (event.pathlink && (event.pathlink.startsWith('https://'))) {
                // We MUST encode the URL so it can be passed as a parameter safely
                safePathlink = `/redirect?url=${encodeURIComponent(event.pathlink)}`;
            }
            return {
                _id: event._id,
                type: event.type,
                title: event.title,
                date: event.date,
                description: event.description,
                pathlink: safePathlink, // Send the NEW, SAFE pathlink to the frontend
                image: event.image, // Send the image object as is
                bgColor: event.bgColor,
            };
        });
        res.status(200).json(formatted);
        // res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getAllEvents = getAllEvents;
const updateEvent = async (req, res) => {
    try {
        const { _id } = req.params;
        const { type, title, date, description, pathlink, bgColor } = req.body;
        const newsEvents = await newsEventsModel_1.default.findById(_id);
        if (!newsEvents) {
            return res.status(404).json({ error: 'News Event not found' });
        }
        // Update text fields
        newsEvents.title = title || newsEvents.title;
        newsEvents.date = date || newsEvents.date;
        newsEvents.type = type || newsEvents.type;
        newsEvents.description = description || newsEvents.description;
        newsEvents.pathlink = pathlink || newsEvents.pathlink;
        newsEvents.bgColor = bgColor || newsEvents.bgColor;
        if (req.file) {
            await spaces_1.s3.send(new client_s3_1.DeleteObjectCommand({
                Bucket: process.env.SPACES_BUCKET,
                Key: newsEvents.image.key,
            }));
            const key = `newsEvents/${(0, uuid_1.v4)()}-${req.file.originalname}.replace(/\s+/g, '-')}`;
            await spaces_1.s3.send(new client_s3_1.PutObjectCommand({
                Bucket: process.env.SPACES_BUCKET,
                Key: key,
                Body: req.file.buffer,
                ACL: 'public-read',
                ContentType: req.file.mimetype,
            }));
            const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
            newsEvents.image = {
                url,
                key,
                contentType: req.file.mimetype,
            };
        }
        const updated = await newsEvents.save();
        return res.status(200).json(updated);
    }
    catch (err) {
        // console.error('Update error:', err);
        res.status(500).json({ error: err.message || 'Something went wrong while updating' });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const { _id } = req.params;
        const event = await newsEventsModel_1.default.findById({ _id });
        if (!event)
            return res.status(404).json({ message: 'Event not found' });
        await spaces_1.s3.send(new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.SPACES_BUCKET,
            Key: event.image.key,
        }));
        await event.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=newsEventsController.js.map
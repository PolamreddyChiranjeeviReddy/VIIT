"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getAllEvents = exports.createEvent = void 0;
const newsEventsModel_1 = __importDefault(require("../models/newsEventsModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createEvent = async (req, res) => {
    try {
        const { type, title, date, description, pathlink, bgColor } = req.body;
        // const files = req.files as UploadedFiles;
        // const image = files?.image?.[0];
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Both images are required." });
        }
        const newEvent = await newsEventsModel_1.default.create({
            type,
            title,
            date,
            description,
            pathlink,
            bgColor,
            image: {
                url: file.path,
                public_id: file.filename,
            },
        });
        res.status(201).json(newEvent);
    }
    catch (err) {
        console.error("create newsEvents error:", err);
        return res.status(500).json({ error: err.message || "Failed to upload News and Events" });
    }
};
exports.createEvent = createEvent;
const getAllEvents = async (_req, res) => {
    try {
        const events = await newsEventsModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(events);
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
        // const files = req.files as UploadedFiles;
        // const image = files?.image?.[0];
        // If new image is uploaded, delete old one
        // if (image) {
        //       // remove old from cloudinary
        //       await cloudinary.uploader.destroy(newsEvents.image.public_id);
        //       newsEvents.image = {
        //         url: image.path,
        //         public_id: image.filename,
        //       };
        //     }
        const file = req.file;
        if (file) {
            await cloudinary_1.default.uploader.destroy(newsEvents.image.public_id);
            newsEvents.image = {
                url: file.path,
                public_id: file.filename,
            };
        }
        const updated = await newsEvents.save();
        return res.status(200).json(updated);
    }
    catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ error: err.message || 'Something went wrong while updating' });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const { _id } = req.params;
        const event = await newsEventsModel_1.default.findOne({ _id });
        if (!event)
            return res.status(404).json({ message: 'Event not found' });
        await cloudinary_1.default.uploader.destroy(event.image.public_id);
        await event.deleteOne();
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deleteEvent = deleteEvent;
//# sourceMappingURL=newsEventsController.js.map
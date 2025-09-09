"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.updateAnnouncement = exports.getAnnouncements = exports.createAnnouncement = void 0;
const announcementModel_1 = __importDefault(require("../models/announcementModel"));
//  Create Announcement
const createAnnouncement = async (req, res) => {
    try {
        // console.log("hello");
        // console.log(req);
        const { date, title, path, description } = req.body;
        // console.log("hello");
        // console.log(date, title, path, description);
        const newAnnouncement = new announcementModel_1.default({
            date,
            title,
            path,
            description,
        });
        await newAnnouncement.save();
        res.status(201).json(newAnnouncement);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
exports.createAnnouncement = createAnnouncement;
// Get All Announcements
const getAnnouncements = async (_req, res) => {
    try {
        const announcements = await announcementModel_1.default.find().sort({ date: 1 });
        const formatted = announcements.map((announcement) => {
            let safePathlink = announcement.path;
            // If the pathlink is a full external URL, wrap it in our safe redirect link
            if (announcement.path && (announcement.path.startsWith('https://'))) {
                // We MUST encode the URL so it can be passed as a parameter safely
                safePathlink = `/redirect?url=${encodeURIComponent(announcement.path)}`;
            }
            return {
                _id: announcement._id,
                title: announcement.title,
                date: announcement.date,
                description: announcement.description,
                path: safePathlink, // Send the NEW, SAFE pathlink to the frontend
            };
        });
        res.status(200).json(formatted);
        // res.status(200).json(announcements);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
exports.getAnnouncements = getAnnouncements;
//  Update Announcement
const updateAnnouncement = async (req, res) => {
    try {
        const { date, title, path, description } = req.body;
        const updatedAnnouncement = await announcementModel_1.default.findByIdAndUpdate(req.params._id, { date, title, path, description }, { new: true });
        if (!updatedAnnouncement) {
            return res.status(404).json({ success: false, message: "Announcement not found" });
        }
        // const updated = await updatedAnnouncement.save();
        res.status(200).json(updatedAnnouncement);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
exports.updateAnnouncement = updateAnnouncement;
//  Delete Announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const deleted = await announcementModel_1.default.findByIdAndDelete(req.params._id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Announcement not found" });
        }
        res.status(200).json({ success: true, message: "Announcement deleted" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error });
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
//# sourceMappingURL=announcementController.js.map
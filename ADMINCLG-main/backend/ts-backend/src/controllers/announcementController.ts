import { Request, Response } from "express";
import Announcement from "../models/announcementModel";

//  Create Announcement
export const createAnnouncement = async (req: Request, res: Response) => {
  try {
    // console.log("hello");
    // console.log(req);
    const { date, title, path, description } = req.body;
    // console.log("hello");
    // console.log(date, title, path, description);

    const newAnnouncement = new Announcement({
      date,
      title,
      path,
      description,
    });

    await newAnnouncement.save();
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Get All Announcements
export const getAnnouncements = async (_req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find().sort({ date: 1 });
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};



//  Update Announcement
export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const { date, title, path, description } = req.body;

    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params._id,
      { date, title, path, description },
      { new: true }
    );

    if (!updatedAnnouncement) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    // const updated = await updatedAnnouncement.save();
    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

//  Delete Announcement
export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params._id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Announcement not found" });
    }

    res.status(200).json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

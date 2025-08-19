import { Request, Response } from 'express';
import NewsEvent from '../models/newsEventsModel';
import cloudinary from "../config/cloudinary";

type MulterCloudinaryFile = Express.Multer.File & {
  path: string;      // cloudinary URL provided by multer-storage-cloudinary
  filename: string;  // cloudinary public_id provided by multer-storage-cloudinary
};

type UploadedFiles = {
  [field: string]: MulterCloudinaryFile[];
} | undefined;

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { type, title, date, description, pathlink, bgColor } = req.body;
    // const files = req.files as UploadedFiles;
    // const image = files?.image?.[0];
    const file = req.file as MulterCloudinaryFile | undefined;
    if (!file) {
      return res.status(400).json({ message: "Both images are required." });
    }
    const newEvent = await NewsEvent.create({
      type,
      title,
      date,
      description,
      pathlink,
      bgColor,
      image:{
        url: file.path,
        public_id: file.filename,
      },
    });

    res.status(201).json(newEvent);
  } catch (err: any) {
    console.error("create newsEvents error:", err);
    return res.status(500).json({ error: err.message || "Failed to upload News and Events" });
  }
};

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await NewsEvent.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateEvent = async (req: Request, res:Response) => {
  try {
    const { _id } = req.params;
    const { type, title, date, description, pathlink, bgColor } = req.body;

    const newsEvents = await NewsEvent.findById(_id);
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
      const file = req.file as MulterCloudinaryFile | undefined;
    if (file) {
      await cloudinary.uploader.destroy(newsEvents.image.public_id);
      newsEvents.image = {
        url: file.path,
        public_id: file.filename,
      };
    }

    const updated = await newsEvents.save();
    return res.status(200).json(updated);
  } catch (err:any) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong while updating' });
  }
};



export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const event = await NewsEvent.findOne({_id});

    if (!event) return res.status(404).json({ message: 'Event not found' });

    await cloudinary.uploader.destroy(event.image.public_id);

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err:any) {
    res.status(500).json({ error: err });
  }
};

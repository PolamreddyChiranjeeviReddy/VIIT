// import { Request, Response } from 'express';
// import NewsEvent from '../models/newsEventsModel';
// import {s3} from '../config/spaces';
// import {v4 as uuidv4} from 'uuid';
// import {
//   PutObjectCommand,
//   DeleteObjectCommand,
// } from '@aws-sdk/client-s3';


// export const createEvent = async (req: Request, res: Response) => {
//   try {
//     const { type, title, date, description, pathlink, bgColor } = req.body;
//     // const files = req.files as UploadedFiles;
//     // const image = files?.image?.[0];
//     // const file = req.file?.buffer;
//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required." });
//     }

//     const key = `newsEvents/${uuidv4()}-${req.file.originalname.replace(/\s+/g, '-')}`;
//     await s3.send(new PutObjectCommand({
//       Bucket: process.env.SPACES_BUCKET,
//       Key: key,
//       Body: req.file.buffer,
//       ACL: 'public-read',
//       ContentType: req.file.mimetype,
//     }));

//     const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
    

//     const newEvent = await NewsEvent.create({
//       type,
//       title,
//       date,
//       description,
//       pathlink,
//       bgColor,
//       image:{
//         url,
//         key,
//         contentType: req.file.mimetype,
//       }});

//     res.status(201).json(newEvent);
//   } catch (err: any) {
//     // console.error("create newsEvents error:", err);
//     return res.status(500).json({ error: err.message || "Failed to upload News and Events" });
//   }
// };

// // export const getAllEvents = async (_req: Request, res: Response) => {
// //   try {
// //     const events = await NewsEvent.find().sort({ createdAt: -1 });
// //     const formatted = events.map((img) => ({
// //       _id: img._id,
// //       type: img.type,
// //       image: `data:${img.contentType};base64,${img.image.toString("base64")}`,
// //       title: img.title,
// //       date: img.date,
// //       description: img.description,
// //       pathlink: img.pathlink,
// //       bgColor: img.bgColor,
// //     }));
// //     res.status(200).json(formatted);
// //   } catch (err) {
// //     res.status(500).json({ error: err });
// //   }
// // };


// export const getAllEvents = async (_req: Request, res: Response) => {
//   try {
//     const events = await NewsEvent.find().sort({ date: 1 });
//     const formatted = events.map((event) => {
//       let safePathlink = event.pathlink;
      
//       // If the pathlink is a full external URL, wrap it in our safe redirect link
//       if (event.pathlink && (event.pathlink.startsWith('https://'))) {
//         // We MUST encode the URL so it can be passed as a parameter safely
//         safePathlink = `/redirect?url=${encodeURIComponent(event.pathlink)}`;
//       }

//       return {
//         _id: event._id,
//         type: event.type,
//         title: event.title,
//         date: event.date,
//         description: event.description,
//         pathlink: safePathlink, // Send the NEW, SAFE pathlink to the frontend
//         image: event.image, // Send the image object as is
//         bgColor: event.bgColor,
//       };
//     });
//     res.status(200).json(formatted); 
//     // res.status(200).json(events);
//   } catch (err:any) {
//     res.status(500).json({ error: err });
//   }
// };

// export const updateEvent = async (req: Request, res:Response) => {
//   try {
//     const { _id } = req.params;
//     const { type, title, date, description, pathlink, bgColor } = req.body;

//     const newsEvents = await NewsEvent.findById(_id);
//     if (!newsEvents) {
//       return res.status(404).json({ error: 'News Event not found' });
//     }
//     // Update text fields
//     newsEvents.title = title || newsEvents.title;
//     newsEvents.date = date || newsEvents.date;
//     newsEvents.type = type || newsEvents.type;
//     newsEvents.description = description || newsEvents.description;
//     newsEvents.pathlink = pathlink || newsEvents.pathlink;
//     newsEvents.bgColor = bgColor || newsEvents.bgColor;
    

//     if(req.file){
//       await s3.send(new DeleteObjectCommand({
//         Bucket: process.env.SPACES_BUCKET,
//         Key: newsEvents.image.key,
//       }));

//       const key = `newsEvents/${uuidv4()}-${req.file.originalname}.replace(/\s+/g, '-')}`;

//       await s3.send(new PutObjectCommand({
//         Bucket: process.env.SPACES_BUCKET,
//         Key: key,
//         Body: req.file.buffer,
//         ACL: 'public-read',
//         ContentType: req.file.mimetype,
//       }));

//       const url = `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`;
      
//       newsEvents.image = {
//         url,
//         key,
//         contentType: req.file.mimetype,
//       };
//     }

  

//     const updated = await newsEvents.save();
//     return res.status(200).json(updated);
//   } catch (err:any) {
//     // console.error('Update error:', err);
//     res.status(500).json({ error: err.message || 'Something went wrong while updating' });
//   }
// };



// export const deleteEvent = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const event = await NewsEvent.findById({_id});

//     if (!event) return res.status(404).json({ message: 'Event not found' });


//     await s3.send(new DeleteObjectCommand({
//       Bucket: process.env.SPACES_BUCKET,
//       Key: event.image.key,
//     }));

//     await event.findByIdAndDelete(_id);

//     res.status(200).json({ message: 'Event deleted successfully' });
//   } catch (err:any) {
//     res.status(500).json({ error: err });
//   }
// };





import { Request, Response } from 'express';
import NewsEvent from '../models/newsEventsModel';
import { s3 } from '../config/spaces';
import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// --- Reusable S3 Helper Functions (Recommended) ---
// It's good practice to have these in a separate utility file

const uploadFileToS3 = async (file: Express.Multer.File, path: string) => {
  const key = `${path}/${uuidv4()}-${file.originalname.replace(/\s+/g, '-')}`;
  await s3.send(new PutObjectCommand({
    Bucket: process.env.SPACES_BUCKET!,
    Key: key,
    Body: file.buffer,
    ACL: 'public-read',
    ContentType: file.mimetype,
  }));
  return {
    url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`,
    key,
    contentType: file.mimetype,
  };
};

const deleteFileFromS3 = async (key: string) => {
  await s3.send(new DeleteObjectCommand({
    Bucket: process.env.SPACES_BUCKET!,
    Key: key,
  }));
};


// --- Controller Functions ---

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { type, title, date, description, pathlink, bgColor } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required." });
    }

    const image = await uploadFileToS3(req.file, 'newsEvents');

    const newEvent = await NewsEvent.create({
      type,
      title,
      date,
      description,
      pathlink,
      location,
      bgColor,
      image, // Use the returned image object
    });

    res.status(201).json(newEvent);
  } catch (err: any) {
    console.error("Create newsEvents error:", err);
    return res.status(500).json({ error: err.message || "Failed to create News and Events" });
  }
};

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await NewsEvent.find().sort({ date: -1 }); // Sort descending for newest first
    res.status(200).json(events);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch events" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { type, title, date, description, pathlink, location, bgColor } = req.body;

    const newsEvent = await NewsEvent.findById(_id);
    if (!newsEvent) {
      return res.status(404).json({ error: 'News Event not found' });
    }

    // ✅ IMPROVED: More robustly update fields only if they exist in the request
    if (title !== undefined) newsEvent.title = title;
    if (date !== undefined) newsEvent.date = date;
    if (type !== undefined) newsEvent.type = type;
    if (description !== undefined) newsEvent.description = description;
    if (pathlink !== undefined) newsEvent.pathlink = pathlink;
    if (location !== undefined) newsEvent.location = location;
    if (bgColor !== undefined) newsEvent.bgColor = bgColor;

    // Handle new file upload
    if (req.file) {
      // Delete the old image from S3 if it exists
      if (newsEvent.image?.key) {
        await deleteFileFromS3(newsEvent.image.key);
      }
      
      // ✅ CORRECTED: Upload new image and update the image object
      newsEvent.image = await uploadFileToS3(req.file, 'newsEvents');
    }

    const updated = await newsEvent.save();
    return res.status(200).json(updated);
  } catch (err: any) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong while updating' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    
    // ✅ CORRECTED: Use findById to be more direct
    const event = await NewsEvent.findById(_id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete the associated image from S3
    if (event.image?.key) {
      await deleteFileFromS3(event.image.key);
    }
    
    // ✅ CORRECTED: Use deleteOne() on the found document instance
    await event.deleteOne();

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete event" });
  }
};

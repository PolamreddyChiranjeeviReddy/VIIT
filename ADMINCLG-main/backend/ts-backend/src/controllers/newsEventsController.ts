import { Request, Response } from 'express';
import NewsEvent from '../models/newsEventsModel';


export const createEvent = async (req: Request, res: Response) => {
  try {
    const { type, title, date, description, pathlink, bgColor } = req.body;
    // const files = req.files as UploadedFiles;
    // const image = files?.image?.[0];
    const file = req.file?.buffer;
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
      image:file});

    res.status(201).json(newEvent);
  } catch (err: any) {
    // console.error("create newsEvents error:", err);
    return res.status(500).json({ error: err.message || "Failed to upload News and Events" });
  }
};

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


export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await NewsEvent.find().sort({ createdAt: -1 });
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
        // Assuming your imageUrl logic is fixed as per our last discussion
        image: `data:${event.contentType};base64,${event.image.toString("base64")}`, 
        title: event.title,
        date: event.date,
        description: event.description,
        pathlink: safePathlink, // Send the NEW, SAFE pathlink to the frontend
        bgColor: event.bgColor,
      };
    });
    res.status(200).json(formatted);
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
    
    newsEvents.image = req.file?.buffer || newsEvents.image;

  

    const updated = await newsEvents.save();
    return res.status(200).json(updated);
  } catch (err:any) {
    // console.error('Update error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong while updating' });
  }
};



export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const event = await NewsEvent.findByIdAndDelete({_id});

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err:any) {
    res.status(500).json({ error: err });
  }
};

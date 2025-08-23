// import departmentModel from '../models/departmentModel';

// // Add Department
// export const addDepartment = async (req, res) => {
//   try {
//     const {
//       code, name, about, hodMessage, hodName,
//       vision, mission, faculty
//     } = req.body;

//     // Parse JSON strings if sent from form as string
//     const missionArray = JSON.parse(mission);
//     const facultyArray = JSON.parse(faculty);

//     const newDept = new departmentModel({
//       code,
//       name,
//       about,
//       hodMessage,
//       hodName,
//       hodImage: req.files['hodImage']?.[0]?.path,
//       heroImage: req.files['heroImage']?.[0]?.path,
//       vision,
//       mission: missionArray,
//       faculty: facultyArray
//     });

//     await newDept.save();
//     res.status(201).json({ message: 'Department added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error adding department' });
//   }
// };

// // Edit/Update Department
// export const updateDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       code, name, about, hodMessage, hodName,
//       vision, mission, faculty
//     } = req.body;

//     const missionArray = JSON.parse(mission);
//     const facultyArray = JSON.parse(faculty);

//     const updatedFields = {
//       code,
//       name,
//       about,
//       hodMessage,
//       hodName,
//       vision,
//       mission: missionArray,
//       faculty: facultyArray,
//     };

//     if (req.files['hodImage']) {
//       updatedFields.hodImage = req.files['hodImage'][0].path;
//     }

//     if (req.files['heroImage']) {
//       updatedFields.heroImage = req.files['heroImage'][0].path;
//     }

//     const updatedDept = await departmentModel.findByIdAndUpdate(id, updatedFields, { new: true });

//     if (!updatedDept) {
//       return res.status(404).json({ message: 'Department not found' });
//     }

//     res.status(200).json({ message: 'Department updated successfully', data: updatedDept });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating department' });
//   }
// };


// import { Request, Response } from 'express';
// import departmentModel from '../models/departmentModel';
// import path from 'path';
// import fs from 'fs';

// export const getDepartment = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const department = await departmentModel.find();
//     if (!department) {
//       return res.status(404).json({ error: 'Department not found' });
//     }
//     res.status(200).json(department);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching department' });
//   }
// };


// export const getDepartmentByCode = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const department = await departmentModel.find({code});
//     if (!department) {
//       return res.status(404).json({ error: 'Department not found' });
//     }
//     res.status(200).json(department);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching department' });
//   }
// };


// export const updateDepartmentByCode = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const {
//       name,
//       about,
//       hodName,
//       hodMessage,
//       vision,
//       mission,
//       faculty,
//     } = req.body;

//     const department = await departmentModel.findOne({ _id });
//     if (!department) {
//       return res.status(404).json({ error: 'Department not found' });
//     }

//     department.name = name || department.name;
//     department.about = about || department.about;
//     department.hodName = hodName || department.hodName;
//     department.hodMessage = hodMessage || department.hodMessage;
//     department.vision = vision || department.vision;
//     department.mission = mission ? JSON.parse(mission) : department.mission;
//     department.faculty = faculty ? JSON.parse(faculty) : department.faculty;

//     // Replace images if uploaded
//     if (req.files?.heroImage) {
//       const heroPath = path.join(__dirname, '..', 'uploads', department.heroImage);
//       if (department.heroImage && fs.existsSync(heroPath)) {
//       fs.unlinkSync(heroPath);
//       }

//       department.heroImage = req.files.heroImage[0].filename;
//     }

//     if (req.files?.hodImage) {
//         const hodPath = path.join(__dirname, '..', 'uploads', department.hodImage);
//         if (department.hodImage && fs.existsSync(hodPath)) {
//         fs.unlinkSync(hodPath);
//       }
//       department.hodImage = req.files.hodImage[0].filename;
//     }

//     const updated = await department.save();
//     res.status(200).json(updated);

//   } catch (err) {
//   console.error('Update error:', err);  // already done ✅
//   res.status(500).json({ error: err.message || 'Something went wrong while updating' }); // <-- update this
// }

// };


// export const addDepartment = async (req: Request, res: Response) => {
//   try {
//     const {
//       code,
//       name,
//       about,
//       hodMessage,
//       hodName,
//       vision,
//       mission,
//       faculty
//     } = req.body;

//     const heroImage = req.files?.['heroImage']?.[0]?.filename;
//     const hodImage = req.files?.['hodImage']?.[0]?.filename;

//     if (!heroImage || !hodImage) {
//       return res.status(400).json({ error: 'Images are required' });
//     }

//     const department = new departmentModel({
//       code,
//       name,
//       heroImage,
//       about,
//       hodMessage,
//       hodName,
//       hodImage,
//       vision,
//       mission: JSON.parse(mission),
//       faculty: JSON.parse(faculty)
//     });

//     await department.save();
//     res.status(201).json({ message: 'Department added successfully', department });

//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err.message || 'Server error' });
//   }
// };


// export const deleteDepartment = async (req: Request, res: Response) => {
 
//   try {
//     const { _id } = req.params;
//     const department = await departmentModel.findOne({_id});
//     console.log("sorry");

//     if (!department) return res.status(404).json({ message: 'department not found' });

//     // Delete image from disk
//     const heroImage = path.join(__dirname, '..', 'uploads', department.heroImage);
//     if (fs.existsSync(heroImage)) fs.unlinkSync(heroImage);

//     const hodImage = path.join(__dirname, '..', 'uploads', department.hodImage);
//     if (fs.existsSync(hodImage)) fs.unlinkSync(hodImage);


//     await department.deleteOne();
//     res.status(200).json({ message: 'hero image deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }

// };



// import { Request, Response } from 'express';
// import departmentModel from '../models/departmentModel';
// import cloudinary from '../config/cloudinary';

// interface FileRequest extends Request {
//   files: {
//     heroImage?: CloudinaryFile[];
//     hodImage?: CloudinaryFile[];
//   };
// }

// // Get all
// export const getDepartment = async (_req: Request, res: Response) => {
//   try {
//     const department = await departmentModel.find();
//     if (!department) return res.status(404).json({ error: 'Department not found' });
//     res.status(200).json(department);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching department' });
//   }
// };

// // Get by code
// export const getDepartmentByCode = async (req: Request, res: Response) => {
//   try {
//     const { code } = req.params;
//     const department = await departmentModel.find({ code });
//     if (!department) return res.status(404).json({ error: 'Department not found' });
//     res.status(200).json(department);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching department' });
//   }
// };



// export const addDepartment = async (req: FileRequest, res: Response) => {
//   console.log('⭐ Starting addDepartment function');
//   console.log('Request body:', req.body);
//   console.log('Request files:', req.files);
//   try {
//     const { code, name, about, hodMessage, hodName, vision, mission, faculty } = req.body;
    
//     // Validate required fields
//     if (!code || !name) {
//       return res.status(400).json({ error: 'Code and name are required' });
//     }

//     // Check if files exist
//     if (!req.files?.heroImage?.[0] || !req.files?.hodImage?.[0]) {
//       return res.status(400).json({ error: 'Both heroImage and hodImage are required' });
//     }

//     const heroImage = req.files.heroImage[0];
//     const hodImage = req.files.hodImage[0];

//     // Validate file uploads
//     if (!heroImage.path || !heroImage.filename || !hodImage.path || !hodImage.filename) {
//       return res.status(400).json({ error: 'Invalid file upload' });
//     }

//     // Safely parse mission and faculty
//     let parsedMission, parsedFaculty;
//     try {
//       parsedMission = typeof mission === "string" ? JSON.parse(mission) : mission;
//       parsedFaculty = typeof faculty === "string" ? JSON.parse(faculty) : faculty;
//     } catch (error) {
//       return res.status(400).json({ error: 'Invalid mission or faculty data format' });
//     }

//     const department = new departmentModel({
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

//     const savedDepartment = await department.save();
//     res.status(201).json(savedDepartment);
    
//   } catch (error:unknown) {
//     const err = error as Error;
//     console.error('Department creation error:', error);
//     res.status(500).json({ 
//       error: 'Server error while creating department',
//       details: err.message 
//     });
//   }
// };


// export const updateDepartmentByCode = async (req: FileRequest, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const { name, about, hodName, hodMessage, vision, mission, faculty } = req.body;

//     const department = await departmentModel.findById(_id);
//     if (!department) {
//       return res.status(404).json({ error: "Department not found" });
//     }

//     // Update simple fields
//     department.name = name || department.name;
//     department.about = about || department.about;
//     department.hodName = hodName || department.hodName;
//     department.hodMessage = hodMessage || department.hodMessage;
//     department.vision = vision || department.vision;

//     // Safely parse mission & faculty
//     try {
//       department.mission = mission ? JSON.parse(mission) : department.mission;
//       department.faculty = faculty ? JSON.parse(faculty) : department.faculty;
//     } catch (parseError: unknown) {
//       const err = parseError as Error;
//       return res.status(400).json({ error: "Invalid mission or faculty format", details: err.message });
//     }

//     // Replace heroImage if new uploaded
//     if (req.files?.heroImage?.[0]) {
//       await cloudinary.uploader.destroy(department.heroImage.public_id);
//       const heroImage = req.files.heroImage[0];
//       department.heroImage = { url: heroImage.path, public_id: heroImage.filename };
//     }

//     // Replace hodImage if new uploaded
//     if (req.files?.hodImage?.[0]) {
//       await cloudinary.uploader.destroy(department.hodImage.public_id);
//       const hodImage = req.files.hodImage[0];
//       department.hodImage = { url: hodImage.path, public_id: hodImage.filename };
//     }

//     const updated = await department.save();
//     return res.status(200).json(updated);

//   } catch (error: unknown) {
//     const err = error as Error;
//     console.error("Update error:", err);
//     return res.status(500).json({ error: err.message || "Something went wrong while updating" });
//   }
// };



import { Request, Response } from "express";
import departmentModel from "../models/departmentModel";







// -----------------------------
// Get all departments
// -----------------------------
export const getDepartment = async (_req: Request, res: Response) => {
  try {
    const department = await departmentModel.find();
     if (!department || department.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    const formatted = department.map((img) => ({
      _id: img._id,
      code: img.code,
      name: img.name,
      heroImage: `data:${img.heroImage.contentType};base64,${img.heroImage.toString("base64")}`,
      about: img.about,
      hodMessage: img.hodMessage,
      hodName: img.hodName,
      hodImage: `data:${img.hodImage.contentType};base64,${img.hodImage.toString("base64")}`,
      vision: img.vision,
      mission: img.mission,
      faculty: img.faculty.map((f:any) => ({
        sno: f.sno,
        name: f.name,
        designation: f.designation
      }))
    //   number: img.number,
    //   image: `data:${img.contentType};base64,${img.image.toString("base64")}`
    }));
    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Error fetching department" });
  }
};

// -----------------------------
// Get department by code
// -----------------------------
export const getDepartmentByCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const img = await departmentModel.find({ code });
    if (!img || img.length === 0) {
      return res.status(404).json({ error: "Department not found" });
    }
    const department = img.map((img) => ({
      _id: img._id,
      code: img.code,
      name: img.name,
      heroImage: `data:${img.heroImage.contentType};base64,${img.heroImage.toString("base64")}`,
      about: img.about,
      hodMessage: img.hodMessage,
      hodName: img.hodName,
      hodImage: `data:${img.hodImage.contentType};base64,${img.hodImage.toString("base64")}`,
      vision: img.vision,
      mission: img.mission,
      faculty: img.faculty.map((f:any) => ({
        sno: f.sno,
        name: f.name,
        designation: f.designation
      }))
    }));
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: "Error fetching department" });
  }
};

// -----------------------------
// Add new department
// -----------------------------
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { code, name, about, hodMessage, hodName, vision, mission, faculty } = req.body;
    // const files = req.files as UploadedFiles;
    // console.log('Request body:', req.body);
    // console.log('Request files:', req.files);
    const heroImage = req.files?.heroImage[0]?.buffer;
    const hodImage = req.files?.hodImage[0]?.buffer;
    if (!code || !name) {
      return res.status(400).json({ error: "Code and name are required" });
    }

    if (!heroImage || !hodImage) {
      return res.status(400).json({ error: "Both heroImage and hodImage are required" });
    }


    // Safely parse JSON arrays
    let parsedMission: string[] = [];
    let parsedFaculty: { sno: number; name: string; designation: string }[] = [];

    try {
      parsedMission = typeof mission === "string" ? JSON.parse(mission) : mission;
      parsedFaculty = typeof faculty === "string" ? JSON.parse(faculty) : faculty;
    } catch (err) {
      return res.status(400).json({ error: "Invalid mission or faculty format" });
    }

    const department = new departmentModel({
      code,
      name,
      heroImage,
      about,
      hodMessage,
      hodName,
      hodImage,
      vision,
      mission: parsedMission,
      faculty: parsedFaculty,
    });

    const saved = await department.save();
    res.status(201).json(saved);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({
      error: "Server error while creating department",
      details: err.message,
    });
  }
};

// -----------------------------
// Update department by _id
// -----------------------------
export const updateDepartmentByCode = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { code,name, about, hodName, hodMessage, vision, mission, faculty } = req.body;
    // const files = req.files as UploadedFiles;
    // console.log(req.files);

    const department = await departmentModel.findById(_id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Update basic fields
    department.code = code || department.code;
    department.name = name || department.name;
    department.about = about || department.about;
    department.hodName = hodName || department.hodName;
    department.hodMessage = hodMessage || department.hodMessage;
    department.vision = vision || department.vision;
    if(req.files?.heroImage?.[0]){
    department.heroImage = req.files.heroImage[0].buffer;
    }
    if(req.files?.hodImage?.[0]){
    department.hodImage = req.files.hodImage[0].buffer;
    }



    // Parse arrays if provided
    try {
      department.mission = mission ? JSON.parse(mission) : department.mission;
      department.faculty = faculty ? JSON.parse(faculty) : department.faculty;
    } catch (err) {
      const e = err as Error;
      return res.status(400).json({ error: "Invalid mission/faculty format", details: e.message });
    }

 

    const updated = await department.save();
    return res.status(200).json(updated);
  } catch (err: any) {
    // const err = error as Error;
    // console.error("Update error:", err);
    return res.status(500).json({ error: err.message || "Something went wrong while updating" });
  }
};

// -----------------------------
// Delete department by _id
// -----------------------------
export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const department = await departmentModel.findByIdAndDelete(_id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message || "Server error while deleting department" });
  }
};




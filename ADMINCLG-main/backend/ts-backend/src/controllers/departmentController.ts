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
import {s3} from "../config/spaces";
import {v4 as uuidv4} from "uuid";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { title } from "process";
import { privateEncrypt, pseudoRandomBytes } from "crypto";







// -----------------------------
// Get all departments
// -----------------------------
// export const getDepartment = async (_req: Request, res: Response) => {
//   try {
//     const department = await departmentModel.find();
//      if (!department || department.length === 0) {
//       return res.status(404).json({ error: "Department not found" });
//     }

//     // Helper function to safely convert Buffer to base64 data URL
//     const bufferToDataUrl = (buf?: Buffer, mime = "image/*") =>
//       buf ? `data:${mime};base64,${buf.toString("base64")}` : null;

//     const formatted = department.map((img) => ({
//       _id: img._id,
//       code: img.code,
//       name: img.name,
//       heroImage: bufferToDataUrl(img.heroImage),
//       about: img.about,
//       hodMessage: img.hodMessage,
//       hodName: img.hodName,
//       hodImage: bufferToDataUrl(img.hodImage),
//       vision: img.vision,
//       mission: Array.isArray(img.mission) ? img.mission : [],
//       peos: Array.isArray(img.peos) ? img.peos : [],
//       pos: Array.isArray(img.pos) ? img.pos : [],
//       faculty: Array.isArray(img.faculty) ? img.faculty.map((f:any) => ({
//         sno: f.sno,
//         name: f.name,
//         designation: f.designation,
//       })) : [],

//       placementStats: Array.isArray(img.placementStats) ? img.placementStats.map((ps:any) => ({
//         overallPlacementPercentage: ps.overallPlacementPercentage,
//         highestPackage: ps.highestPackage,
//         averagePackage: ps.averagePackage,
//         recruiters: ps.recruiters || [],
//       })) : [],

//       careerSupport: Array.isArray(img.careerSupport) ? img.careerSupport : [],

//       // Fix: use 'labs' (schema name), not 'labImages'
//       labs: Array.isArray(img.labs) ? img.labs.map((ps:any) => ({
//         name: ps.name,
//         image: bufferToDataUrl(ps.image)
//       })) : [],

//       eventsOrganized: Array.isArray(img.eventsOrganized) ? img.eventsOrganized.map((ps:any) => ({
//         title: ps.title,
//         description: ps.description,
//       })) : [],

//       sponsoredProjects: Array.isArray(img.sponsoredProjects) ? img.sponsoredProjects.map((ps:any) => ({
//         principalInvestigator: ps.principalInvestigator,
//         researchProjectName: ps.researchProjectName, 
//         fundingAgency: ps.fundingAgency || ps.FundingAgency || ""
//       })) : [],

//       facultyAwards: Array.isArray(img.facultyAwards) ? img.facultyAwards.map((ps:any) => ({
//         sno: ps.sno,
//         name: ps.name,
//         count: ps.count,
//       })) : [],

//       studentAwards: Array.isArray(img.studentAwards) ? img.studentAwards.map((ps:any) => ({
//         sno: ps.sno,
//         awardName: ps.awardName,
//         studentsCount: ps.studentsCount,
//       })) : [],

//       certifications: Array.isArray(img.certifications) ? img.certifications.map((ps:any) => ({
//         title: ps.title,
//         count: ps.count,
//       })) : [],

//       clubs: Array.isArray(img.clubs) ? img.clubs.map((ps:any) => ({
//         clubName: ps.clubName,
//         description: ps.description,
//         image: bufferToDataUrl(ps.image),
//         studentCoordinator: ps.studentCoordinator
//       })) : [],

//       research: Array.isArray(img.research) ? img.research.map((ps:any) => ({
//         sno: ps.sno,
//         patentTitle: ps.patentTitle,
//         agency: ps.agency,
//         year: ps.year,
//         status: ps.status
//       })) : [],

//       // Fix: contact is an object in schema, not an array
//       contact: img.contact ? {
//         email: img.contact.email || "",
//         phone: img.contact.phone || "",
//         location: img.contact.location || ""
//       } : { email: "", phone: "", location: "" }
//     }));
//     res.status(200).json(formatted);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching department" });
//   }
// };


export const getDepartment = async (_req: Request, res: Response) => {
  try{
    const department = await departmentModel.find();
    if (!department || department.length === 0) {
      return res.status(500).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  } catch (err:any) {
    res.status(500).json({ error: "Error fetching department" });
  }};


// // -----------------------------
// // Get department by code
// // -----------------------------
// export const getDepartmentByCode = async (req: Request, res: Response) => {
//   try {
//     const { code } = req.params;
//     const img = await departmentModel.find({ code });
//     if (!img || img.length === 0) {
//       return res.status(404).json({ error: "Department not found" });
//     }

//     // Helper function to safely convert Buffer to base64 data URL
//     const bufferToDataUrl = (buf?: Buffer, mime = "image/*") =>
//       buf ? `data:${mime};base64,${buf.toString("base64")}` : null;

//     const department = img.map((img) => ({
//       _id: img._id,
//       code: img.code,
//       name: img.name,
//       heroImage: bufferToDataUrl(img.heroImage),
//       about: img.about,
//       hodMessage: img.hodMessage,
//       hodName: img.hodName,
//       hodImage: bufferToDataUrl(img.hodImage),
//       vision: img.vision,
//       mission: Array.isArray(img.mission) ? img.mission : [],
//       peos: Array.isArray(img.peos) ? img.peos : [],
//       pos: Array.isArray(img.pos) ? img.pos : [],
//       faculty: Array.isArray(img.faculty) ? img.faculty.map((f:any) => ({
//         sno: f.sno,
//         name: f.name,
//         designation: f.designation
//       })) : [],

//       placementStats: Array.isArray(img.placementStats) ? img.placementStats.map((ps:any) => ({
//         overallPlacementPercentage: ps.overallPlacementPercentage,
//         highestPackage: ps.highestPackage,
//         averagePackage: ps.averagePackage,
//         recruiters: ps.recruiters || [],
//       })) : [],

//       careerSupport: Array.isArray(img.careerSupport) ? img.careerSupport : [],

//       // Fix: use 'labs' (schema name), not 'labImages'
//       labs: Array.isArray(img.labs) ? img.labs.map((ps:any) => ({
//         name: ps.name,
//         image: bufferToDataUrl(ps.image)
//       })) : [],

//       eventsOrganized: Array.isArray(img.eventsOrganized) ? img.eventsOrganized.map((ps:any) => ({
//         title: ps.title,
//         description: ps.description,
//       })) : [],

//       sponsoredProjects: Array.isArray(img.sponsoredProjects) ? img.sponsoredProjects.map((ps:any) => ({
//         principalInvestigator: ps.principalInvestigator,
//         researchProjectName: ps.researchProjectName, 
//         fundingAgency: ps.fundingAgency || ps.FundingAgency || ""
//       })) : [],

//       facultyAwards: Array.isArray(img.facultyAwards) ? img.facultyAwards.map((ps:any) => ({
//         sno: ps.sno,
//         name: ps.name,
//         count: ps.count,
//       })) : [],

//       studentAwards: Array.isArray(img.studentAwards) ? img.studentAwards.map((ps:any) => ({
//         sno: ps.sno,
//         awardName: ps.awardName,
//         studentsCount: ps.studentsCount,
//       })) : [],

//       certifications: Array.isArray(img.certifications) ? img.certifications.map((ps:any) => ({
//         title: ps.title,
//         count: ps.count,
//       })) : [],

//       clubs: Array.isArray(img.clubs) ? img.clubs.map((ps:any) => ({
//         clubName: ps.clubName,
//         description: ps.description,
//         image: bufferToDataUrl(ps.image),
//         studentCoordinator: ps.studentCoordinator
//       })) : [],

//       research: Array.isArray(img.research) ? img.research.map((ps:any) => ({
//         sno: ps.sno,
//         patentTitle: ps.patentTitle,
//         agency: ps.agency,
//         year: ps.year,
//         status: ps.status
//       })) : [],

//       // Fix: contact is an object in schema, not an array
//       contact: img.contact ? {
//         email: img.contact.email || "",
//         phone: img.contact.phone || "",
//         location: img.contact.location || ""
//       } : { email: "", phone: "", location: "" }
//     }));
//     res.status(200).json(department);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching department" });
//   }
// };

export const getDepartmentByCode = async (_req: Request, res: Response) => {
  try{
    const code = _req.params.code;
    const department = await departmentModel.find({code});
    if (!department || department.length === 0) {
      return res.status(500).json({ error: "Department not found" });
    }
    res.status(200).json(department);
  }
  catch (err:any) {
    res.status(500).json({ error: "Error fetching department" });
  }
};


// -----------------------------
// Add new department
// -----------------------------
// export const createDepartment = async (req: Request, res: Response) => {
//   try {
//     const {
//       code,
//       name,
//       about,
//       hodMessage,
//       hodName,
//       vision,
//       mission,
//       faculty,
//       placementStats,
//       careerSupport,
//       eventsOrganized,
//       sponsoredProjects,
//       facultyAwards,
//       studentAwards,
//       certifications,
//       research,
//       contact
//     } = req.body;

//     // Basic validation
//     if (!code || !name) {
//       return res.status(400).json({ error: "Code and name are required" });
//     }

//     // Get image files from upload.any() format
//     const files = (req.files as unknown as Express.Multer.File[]) || [];
//     const heroImageFile = files.find(file => file.fieldname === 'heroImage');
//     const hodImageFile = files.find(file => file.fieldname === 'hodImage');
//     const labImageFiles = files.filter(file => file.fieldname === 'labImages');
//     const clubImageFiles = files.filter(file => file.fieldname === 'clubImages');

//     // const heroImage = heroImageFile?.buffer;
//     // const hodImage = hodImageFile?.buffer;

//     if (!heroImageFile || !hodImageFile) {
//       return res.status(400).json({ error: "Hero image and HOD image are required" });
//     }

//     const herokey=`department/heroImage/${uuidv4()}-${heroImageFile.originalname}.replace(/\s+/g,'')}`;
//     await s3.send(new PutObjectCommand({
//       Bucket:process.env.SPACES_BUCKET,
//       Key:herokey,
//       Body:heroImageFile.buffer,
//       ACL:'public-read',
//       ContentType:heroImageFile.mimetype
//     }));
//     const heroImage=`${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${herokey}`;
//     // Create HOD image in S3
//     const hodKey=`department/hodImage/${uuidv4()}-${hodImageFile.originalname}.replace(/\s+/g,'')}`;
//     await s3.send(new PutObjectCommand({
//       Bucket:process.env.SPACES_BUCKET,
//       Key:hodKey,
//       Body:hodImageFile.buffer,
//       ACL:'public-read',
//       ContentType:hodImageFile.mimetype
//     }));
//     const hodImage=`${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${hodKey}`;

//     // Parse JSON arrays
//     const parsedData = {
//       mission: typeof mission === "string" ? JSON.parse(mission) : mission,
//       peos: typeof peos === "string" ? JSON.parse(peos) : peos,
//       pos: typeof pos === "string" ? JSON.parse(pos) : pos,
//       faculty: typeof faculty === "string" ? JSON.parse(faculty) : faculty,
//       placementStats: typeof placementStats === "string" ? JSON.parse(placementStats) : placementStats,
//       careerSupport: typeof careerSupport === "string" ? JSON.parse(careerSupport) : careerSupport,
//       eventsOrganized: typeof eventsOrganized === "string" ? JSON.parse(eventsOrganized) : eventsOrganized,
//       sponsoredProjects: typeof sponsoredProjects === "string" ? JSON.parse(sponsoredProjects) : sponsoredProjects,
//       facultyAwards: typeof facultyAwards === "string" ? JSON.parse(facultyAwards) : facultyAwards,
//       studentAwards: typeof studentAwards === "string" ? JSON.parse(studentAwards) : studentAwards,
//       certifications: typeof certifications === "string" ? JSON.parse(certifications) : certifications,
//       research: typeof research === "string" ? JSON.parse(research) : research,
//       contact: typeof contact === "string" ? JSON.parse(contact) : contact
//     };


//     if(!labImageFiles && !clubImageFiles){
//       return res.status(400).json({error:" labImageFiles or clubImageFiles are required"});
//     }
//     // Process lab images
//     const labNames = req.body.labNames ? (Array.isArray(req.body.labNames) ? req.body.labNames : [req.body.labNames]) : [];

//     const labs = labImageFiles.map((file: Express.Multer.File, index: number) => ({
//       name: labNames[index] || file.originalname,
      
//       const labKey=`department/labImages/${uuidv4()}-${file.originalname}.replace(/\s+/g,'')}`;
//       await s3.send(new PutObjectCommand({
//         Bucket:process.env.SPACES_BUCKET,
//         Key:labKey,
//         Body:file.buffer,
//         ACL:'public-read',
//         ContentType:file.mimetype
//       }));
//       const labImage=`${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${labKey}`;

//     }));

//     // Process club images - get club info from form data arrays
//     const clubNames = req.body.clubNames ? (Array.isArray(req.body.clubNames) ? req.body.clubNames : [req.body.clubNames]) : [];
//     const clubDescriptions = req.body.clubDescriptions ? (Array.isArray(req.body.clubDescriptions) ? req.body.clubDescriptions : [req.body.clubDescriptions]) : [];
//     const clubCoordinators = req.body.clubCoordinators ? (Array.isArray(req.body.clubCoordinators) ? req.body.clubCoordinators : [req.body.clubCoordinators]) : [];
    
//     const clubs = clubImageFiles.map((file: Express.Multer.File, index: number) => ({
//       clubName: clubNames[index] || "",
//       description: clubDescriptions[index] || "",
//       image: file.buffer,
//       studentCoordinator: clubCoordinators[index] || ""
//     }));

//     const department = new departmentModel({
//       code,
//       name,
//       heroImage,
//       about,
//       hodMessage,
//       hodName,
//       hodImage,
//       vision,
//       mission: parsedData.mission,
//       peos: parsedData.peos,
//       pos: parsedData.pos,
//       faculty: parsedData.faculty,
//       placementStats: parsedData.placementStats,
//       careerSupport: parsedData.careerSupport,
//       labs,
//       eventsOrganized: parsedData.eventsOrganized,
//       sponsoredProjects: parsedData.sponsoredProjects,
//       facultyAwards: parsedData.facultyAwards,
//       studentAwards: parsedData.studentAwards,
//       certifications: parsedData.certifications,
//       clubs,
//       research: parsedData.research,
//       contact: parsedData.contact
//     });

//     const saved = await department.save();
//     res.status(201).json(saved);
//   } catch (error: unknown) {
//     const err = error as Error;
//     console.error("Error creating department:", err);
//     res.status(500).json({
//       error: "Server error while creating department",
//       details: err.message,
//     });
//   }
// };


export const createDepartment = async (req: Request, res: Response) => {
  try {
    const {
      code,
      name,
      about,
      hodMessage,
      hodName,
      vision,
      mission,
      peos,
      pos,
      faculty,
      placementStats,
      careerSupport,
      eventsOrganized,
      sponsoredProjects,
      facultyAwards,
      studentAwards,
      certifications,
      research,
      contact,
    } = req.body;

    if (!code || !name) {
      return res.status(400).json({ error: "Code and name are required" });
    }

    // Get image files
    const files = (req.files as unknown as Express.Multer.File[]) || [];
    const heroImageFile = files.find((f) => f.fieldname === "heroImage");
    const hodImageFile = files.find((f) => f.fieldname === "hodImage");
    const labImageFiles = files.filter((f) => f.fieldname === "labImages");
    const clubImageFiles = files.filter((f) => f.fieldname === "clubImages");

    if (!heroImageFile || !hodImageFile) {
      return res
        .status(400)
        .json({ error: "Hero image and HOD image are required" });
    }

    // ===== Upload Hero Image =====
    const heroKey = `department/heroImage/${uuidv4()}-${heroImageFile.originalname.replace(/\s+/g, "_")}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET!,
        Key: heroKey,
        Body: heroImageFile.buffer,
        ACL: "public-read",
        ContentType: heroImageFile.mimetype,
      })
    );
    const heroImage = {
      url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${heroKey}`,
      key: heroKey,
      contentType: heroImageFile.mimetype,
    };

    // ===== Upload HOD Image =====
    const hodKey = `department/hodImage/${uuidv4()}-${hodImageFile.originalname.replace(/\s+/g, "_")}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET!,
        Key: hodKey,
        Body: hodImageFile.buffer,
        ACL: "public-read",
        ContentType: hodImageFile.mimetype,
      })
    );
    const hodImage = {
      url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${hodKey}`,
      key: hodKey,
      contentType: hodImageFile.mimetype,
    };

    // ===== Upload Lab Images =====
    const labNames = req.body.labNames
      ? Array.isArray(req.body.labNames)
        ? req.body.labNames
        : [req.body.labNames]
      : [];

    const labs = await Promise.all(
      labImageFiles.map(async (file, index) => {
        const labKey = `department/labImages/${uuidv4()}-${file.originalname.replace(/\s+/g, "_")}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET!,
            Key: labKey,
            Body: file.buffer,
            ACL: "public-read",
            ContentType: file.mimetype,
          })
        );
        return {
          name: labNames[index] || file.originalname,
          image: {
            url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${labKey}`,
            key: labKey,
            contentType: file.mimetype,
          },
        };
      })
    );

    // ===== Upload Club Images =====
    const clubNames = req.body.clubNames
      ? Array.isArray(req.body.clubNames)
        ? req.body.clubNames
        : [req.body.clubNames]
      : [];
    const clubDescriptions = req.body.clubDescriptions
      ? Array.isArray(req.body.clubDescriptions)
        ? req.body.clubDescriptions
        : [req.body.clubDescriptions]
      : [];
    const clubCoordinators = req.body.clubCoordinators
      ? Array.isArray(req.body.clubCoordinators)
        ? req.body.clubCoordinators
        : [req.body.clubCoordinators]
      : [];

    const clubs = await Promise.all(
      clubImageFiles.map(async (file, index) => {
        const clubKey = `department/clubImages/${uuidv4()}-${file.originalname.replace(/\s+/g, "_")}`;
        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.SPACES_BUCKET!,
            Key: clubKey,
            Body: file.buffer,
            ACL: "public-read",
            ContentType: file.mimetype,
          })
        );
        return {
          clubName: clubNames[index] || "",
          description: clubDescriptions[index] || "",
          studentCoordinator: clubCoordinators[index] || "",
          image: {
            url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${clubKey}`,
            key: clubKey,
            contentType: file.mimetype,
          },
        };
      })
    );

    // ===== Parse JSON Arrays =====
    const parsedData = {
      mission: typeof mission === "string" ? JSON.parse(mission) : mission,
      peos: typeof peos === "string" ? JSON.parse(peos) : peos,
      pos: typeof pos === "string" ? JSON.parse(pos) : pos,
      faculty: typeof faculty === "string" ? JSON.parse(faculty) : faculty,
      placementStats:
        typeof placementStats === "string"
          ? JSON.parse(placementStats)
          : placementStats,
      careerSupport:
        typeof careerSupport === "string"
          ? JSON.parse(careerSupport)
          : careerSupport,
      eventsOrganized:
        typeof eventsOrganized === "string"
          ? JSON.parse(eventsOrganized)
          : eventsOrganized,
      sponsoredProjects:
        typeof sponsoredProjects === "string"
          ? JSON.parse(sponsoredProjects)
          : sponsoredProjects,
      facultyAwards:
        typeof facultyAwards === "string"
          ? JSON.parse(facultyAwards)
          : facultyAwards,
      studentAwards:
        typeof studentAwards === "string"
          ? JSON.parse(studentAwards)
          : studentAwards,
      certifications:
        typeof certifications === "string"
          ? JSON.parse(certifications)
          : certifications,
      research:
        typeof research === "string" ? JSON.parse(research) : research,
      contact: typeof contact === "string" ? JSON.parse(contact) : contact,
    };

    // ===== Create Department =====
    const department = new departmentModel({
      code,
      name,
      heroImage,
      about,
      hodMessage,
      hodName,
      hodImage,
      vision,
      mission: parsedData.mission,
      peos: parsedData.peos,
      pos: parsedData.pos,
      faculty: parsedData.faculty,
      placementStats: parsedData.placementStats,
      careerSupport: parsedData.careerSupport,
      labs,
      eventsOrganized: parsedData.eventsOrganized,
      sponsoredProjects: parsedData.sponsoredProjects,
      facultyAwards: parsedData.facultyAwards,
      studentAwards: parsedData.studentAwards,
      certifications: parsedData.certifications,
      clubs,
      research: parsedData.research,
      contact: parsedData.contact,
    });

    const saved = await department.save();
    res.status(201).json(saved);
  } catch (error: any) {
    console.error("Error creating department:", error);
    res.status(500).json({
      error: "Server error while creating department",
      details: error.message,
    });
  }
};


// -----------------------------
// Update department by _id
// -----------------------------
// export const updateDepartmentByCode = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const {
//       code,
//       name,
//       about,
//       hodName,
//       hodMessage,
//       vision,
//       mission,
//       peos,
//       pos,
//       faculty,
//       placementStats,
//       careerSupport,
//       eventsOrganized,
//       sponsoredProjects,
//       facultyAwards,
//       studentAwards,
//       certifications,
//       research,
//       contact
//     } = req.body;

//     const department = await departmentModel.findById(_id);
//     if (!department) {
//       return res.status(404).json({ error: "Department not found" });
//     }

//     // Update basic fields
//     if (code) department.code = code;
//     if (name) department.name = name;
//     if (about) department.about = about;
//     if (hodName) department.hodName = hodName;
//     if (hodMessage) department.hodMessage = hodMessage;
//     if (vision) department.vision = vision;

//     // Update images if provided - handle upload.any() format
//     const files = (req.files as unknown as Express.Multer.File[]) || [];
//     const heroImageFile = files.find(file => file.fieldname === 'heroImage');
//     const hodImageFile = files.find(file => file.fieldname === 'hodImage');
//     const labImageFiles = files.filter(file => file.fieldname === 'labImages');
//     const clubImageFiles = files.filter(file => file.fieldname === 'clubImages');

//     if (heroImageFile) {
//       department.heroImage = heroImageFile.buffer;
//     }
//     if (hodImageFile) {
//       department.hodImage = hodImageFile.buffer;
//     }

//     // Process lab images if provided
//     if (labImageFiles.length > 0) {
//       const newLabs = labImageFiles.map((file: Express.Multer.File) => ({
//         name: file.originalname,
//         image: file.buffer
//       }));
//       department.labs = newLabs;
//     }

//     // Process club images if provided
//     if (clubImageFiles.length > 0) {
//       const clubNames = req.body.clubNames ? (Array.isArray(req.body.clubNames) ? req.body.clubNames : [req.body.clubNames]) : [];
//       const clubDescriptions = req.body.clubDescriptions ? (Array.isArray(req.body.clubDescriptions) ? req.body.clubDescriptions : [req.body.clubDescriptions]) : [];
//       const clubCoordinators = req.body.clubCoordinators ? (Array.isArray(req.body.clubCoordinators) ? req.body.clubCoordinators : [req.body.clubCoordinators]) : [];
      
//       const newClubs = clubImageFiles.map((file: Express.Multer.File, index: number) => ({
//         clubName: clubNames[index] || "",
//         description: clubDescriptions[index] || "",
//         image: file.buffer,
//         studentCoordinator: clubCoordinators[index] || ""
//       }));
//       department.clubs = newClubs;
//     }

//     // Parse and update arrays if provided
//     try {
//       if (mission) department.mission = typeof mission === "string" ? JSON.parse(mission) : mission;
//       if (peos) department.peos = typeof peos === "string" ? JSON.parse(peos) : peos;
//       if (pos) department.pos = typeof pos === "string" ? JSON.parse(pos) : pos;
//       if (faculty) department.faculty = typeof faculty === "string" ? JSON.parse(faculty) : faculty;
//       if (placementStats) department.placementStats = typeof placementStats === "string" ? JSON.parse(placementStats) : placementStats;
//       if (careerSupport) department.careerSupport = typeof careerSupport === "string" ? JSON.parse(careerSupport) : careerSupport;
//       if (eventsOrganized) department.eventsOrganized = typeof eventsOrganized === "string" ? JSON.parse(eventsOrganized) : eventsOrganized;
//       if (sponsoredProjects) department.sponsoredProjects = typeof sponsoredProjects === "string" ? JSON.parse(sponsoredProjects) : sponsoredProjects;
//       if (facultyAwards) department.facultyAwards = typeof facultyAwards === "string" ? JSON.parse(facultyAwards) : facultyAwards;
//       if (studentAwards) department.studentAwards = typeof studentAwards === "string" ? JSON.parse(studentAwards) : studentAwards;
//       if (certifications) department.certifications = typeof certifications === "string" ? JSON.parse(certifications) : certifications;
//       if (research) department.research = typeof research === "string" ? JSON.parse(research) : research;
//       if (contact) department.contact = typeof contact === "string" ? JSON.parse(contact) : contact;
//     } catch (error) {
//       const err = error as Error;
//       return res.status(400).json({ error: "Invalid data format", details: err.message });
//     }

//     const updated = await department.save();
//     return res.status(200).json(updated);
//   } catch (error: unknown) {
//     const err = error as Error;
//     console.error("Update error:", err);
//     return res.status(500).json({ error: err.message || "Something went wrong while updating" });
//   }
// };
interface ImageFile {
  url: string;
  key: string;
  contentType: string;
}

/**
 * Uploads a file to your S3/Spaces bucket.
 */
const uploadFileToS3 = async (file: Express.Multer.File, path: string): Promise<ImageFile> => {
  const key = `${path}/${uuidv4()}-${file.originalname.replace(/\s+/g, "_")}`;
  
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.SPACES_BUCKET!,
      Key: key,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype,
    })
  );

  return {
    url: `${process.env.SPACES_ENDPOINT}/${process.env.SPACES_BUCKET}/${key}`,
    key: key,
    contentType: file.mimetype,
  };
};

/**
 * Deletes a file from your S3/Spaces bucket.
 */
const deleteFileFromS3 = async (key: string): Promise<void> => {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.SPACES_BUCKET!,
      Key: key,
    })
  );
};



// In your department controller file...

export const updateDepartmentByCode = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const department = await departmentModel.findById(_id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // --- 1. Basic & JSON Field Updates ---
    const fieldsToUpdate = [
      'code', 'name', 'about', 'hodName', 'hodMessage', 'vision', 'mission',
      'peos', 'pos', 'faculty', 'placementStats', 'careerSupport',
      'eventsOrganized', 'sponsoredProjects', 'facultyAwards', 'studentAwards',
      'certifications', 'research', 'contact'
    ];

    for (const field of fieldsToUpdate) {
      if (req.body[field]) {
        try {
            // Check if it's a field that needs parsing
            if (['mission', 'peos', 'pos', 'faculty', 'placementStats', 'careerSupport', 'eventsOrganized', 'sponsoredProjects', 'facultyAwards', 'studentAwards', 'certifications', 'research', 'contact'].includes(field)) {
                 (department as any)[field] = JSON.parse(req.body[field]);
            } else {
                 (department as any)[field] = req.body[field];
            }
        } catch (e) {
            console.error(`Error parsing JSON for field: ${field}`, e);
            // continue to next field
        }
      }
    }

    const files = (req.files as unknown as Express.Multer.File[]) || [];

    // --- 2. Handle Single Image Updates (Hero & HOD) ---
    const heroImageFile = files.find(f => f.fieldname === "heroImage");
    if (heroImageFile) {
      if (department.heroImage?.key) {
        await deleteFileFromS3(department.heroImage.key); // Delete old one
      }
      department.heroImage = await uploadFileToS3(heroImageFile, "department/heroImage");
    }

    const hodImageFile = files.find(f => f.fieldname === "hodImage");
    if (hodImageFile) {
      if (department.hodImage?.key) {
        await deleteFileFromS3(department.hodImage.key);
      }
      department.hodImage = await uploadFileToS3(hodImageFile, "department/hodImage");
    }

    // --- 3. Synchronize Labs ---
    if (req.body.labs) {
      const incomingLabs = JSON.parse(req.body.labs);
      const labImageFiles = files.filter(f => f.fieldname === "labImages");
      const labImageMap = new Map(labImageFiles.map(file => [file.originalname, file]));

      // Identify and delete labs & images that were removed
      const incomingLabIds = incomingLabs.map((lab: any) => lab._id).filter(Boolean);
      for (const existingLab of department.labs) {
        if (!incomingLabIds.includes(existingLab._id.toString())) {
          if (existingLab.image?.key) {
            await deleteFileFromS3(existingLab.image.key);
          }
        }
      }

      // Process incoming labs to update/create
      department.labs = await Promise.all(
        incomingLabs.map(async (lab: any) => {
          const newImageFile = labImageMap.get(lab.name);
          let imagePayload = lab.image; // Default to existing image

          if (newImageFile) {
            // If there's a new file, delete the old image if it exists
            if (lab.image?.key) {
              await deleteFileFromS3(lab.image.key);
            }
            imagePayload = await uploadFileToS3(newImageFile, "department/labImages");
          }

          return { ...lab, image: imagePayload };
        })
      );
    }

    // --- 4. Synchronize Clubs ---
    if (req.body.clubs) {
      const incomingClubs = JSON.parse(req.body.clubs);
      const clubImageFiles = files.filter(f => f.fieldname === "clubImages");
      const clubImageMap = new Map(clubImageFiles.map(file => [file.originalname, file]));

      // Identify and delete clubs & images that were removed
      const incomingClubIds = incomingClubs.map((club: any) => club._id).filter(Boolean);
      for (const existingClub of department.clubs) {
        if (!incomingClubIds.includes(existingClub._id.toString())) {
          if (existingClub.image?.key) {
            await deleteFileFromS3(existingClub.image.key);
          }
        }
      }

      // Process incoming clubs to update/create
      department.clubs = await Promise.all(
        incomingClubs.map(async (club: any) => {
          const newImageFile = clubImageMap.get(club.clubName);
          let imagePayload = club.image;

          if (newImageFile) {
            if (club.image?.key) {
              await deleteFileFromS3(club.image.key);
            }
            imagePayload = await uploadFileToS3(newImageFile, "department/clubImages");
          }
          
          return { ...club, image: imagePayload };
        })
      );
    }

    const updatedDepartment = await department.save();
    res.status(200).json(updatedDepartment);

  } catch (error: any) {
    console.error("Error updating department:", error);
    res.status(500).json({
      error: "Server error while updating department",
      details: error.message,
    });
  }
};

// export const updateDepartmentByCode = async (req: Request, res: Response) => {
//   try {
//     const { _id } = req.params;
//     const {
//       code,
//       name,
//       about,
//       hodName,
//       hodMessage,
//       vision,
//       mission,
//       peos,
//       pos,
//       faculty,
//       placementStats,
//       careerSupport,
//       eventsOrganized,
//       sponsoredProjects,
//       facultyAwards,
//       studentAwards,
//       certifications,
//       research,
//       contact
//     } = req.body;

//     const department = await departmentModel.findById(_id);
//     if (!department) {
//       return res.status(404).json({ error: "Department not found" });
//     }

//     // ✅ Update only provided basic fields
//     if (code) department.code = code;
//     if (name) department.name = name;
//     if (about) department.about = about;
//     if (hodName) department.hodName = hodName;
//     if (hodMessage) department.hodMessage = hodMessage;
//     if (vision) department.vision = vision;

//     // ✅ Handle uploaded files safely
//     const files = (req.files as unknown as Express.Multer.File[]) || [];
//     const heroImageFile = files.find(file => file.fieldname === "heroImage");
//     const hodImageFile = files.find(file => file.fieldname === "hodImage");
//     const labImageFiles = files.filter(file => file.fieldname === "labImages");
//     const clubImageFiles = files.filter(file => file.fieldname === "clubImages");

//     if (heroImageFile) {
//       department.heroImage = heroImageFile.buffer; // overwrite only if new file uploaded
//     }
//     if (hodImageFile) {
//       department.hodImage = hodImageFile.buffer;
//     }

//     // ✅ Append or replace lab images if provided
//     if (labImageFiles.length > 0) {
//       const newLabs = labImageFiles.map((file: Express.Multer.File) => ({
//         name: file.originalname,
//         image: file.buffer
//       }));
//       // Instead of replacing, you can merge with existing
//       department.labs = [...(department.labs || []), ...newLabs];
//     }

//     // ✅ Append or replace club images if provided
//     if (clubImageFiles.length > 0) {
//       const clubNames = req.body.clubNames ? (Array.isArray(req.body.clubNames) ? req.body.clubNames : [req.body.clubNames]) : [];
//       const clubDescriptions = req.body.clubDescriptions ? (Array.isArray(req.body.clubDescriptions) ? req.body.clubDescriptions : [req.body.clubDescriptions]) : [];
//       const clubCoordinators = req.body.clubCoordinators ? (Array.isArray(req.body.clubCoordinators) ? req.body.clubCoordinators : [req.body.clubCoordinators]) : [];
      
//       const newClubs = clubImageFiles.map((file: Express.Multer.File, index: number) => ({
//         clubName: clubNames[index] || "",
//         description: clubDescriptions[index] || "",
//         image: file.buffer,
//         studentCoordinator: clubCoordinators[index] || ""
//       }));

//       department.clubs = [...(department.clubs || []), ...newClubs];
//     }

//     // ✅ Parse and update arrays safely
//     try {
//       if (mission) department.mission = typeof mission === "string" ? JSON.parse(mission) : mission;
//       if (peos) department.peos = typeof peos === "string" ? JSON.parse(peos) : peos;
//       if (pos) department.pos = typeof pos === "string" ? JSON.parse(pos) : pos;
//       if (faculty) department.faculty = typeof faculty === "string" ? JSON.parse(faculty) : faculty;
//       if (placementStats) department.placementStats = typeof placementStats === "string" ? JSON.parse(placementStats) : placementStats;
//       if (careerSupport) department.careerSupport = typeof careerSupport === "string" ? JSON.parse(careerSupport) : careerSupport;
//       if (eventsOrganized) department.eventsOrganized = typeof eventsOrganized === "string" ? JSON.parse(eventsOrganized) : eventsOrganized;
//       if (sponsoredProjects) department.sponsoredProjects = typeof sponsoredProjects === "string" ? JSON.parse(sponsoredProjects) : sponsoredProjects;
//       if (facultyAwards) department.facultyAwards = typeof facultyAwards === "string" ? JSON.parse(facultyAwards) : facultyAwards;
//       if (studentAwards) department.studentAwards = typeof studentAwards === "string" ? JSON.parse(studentAwards) : studentAwards;
//       if (certifications) department.certifications = typeof certifications === "string" ? JSON.parse(certifications) : certifications;
//       if (research) department.research = typeof research === "string" ? JSON.parse(research) : research;
//       if (contact) department.contact = typeof contact === "string" ? JSON.parse(contact) : contact;
//     } catch (error) {
//       const err = error as Error;
//       return res.status(400).json({ error: "Invalid data format", details: err.message });
//     }

//     const updated = await department.save();
//     return res.status(200).json(updated);
//   } catch (error: unknown) {
//     const err = error as Error;
//     console.error("Update error:", err);
//     return res.status(500).json({ error: err.message || "Something went wrong while updating" });
//   }
// };





// -----------------------------
// Delete department by _id
// -----------------------------

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    // 1. Find the department
    const department = await departmentModel.findById(_id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    // 2. Collect all S3 keys for deletion (if stored in Spaces)
    const deleteKeys: string[] = [];

    if (department.heroImage?.key) deleteKeys.push(department.heroImage.key);
    if (department.hodImage?.key) deleteKeys.push(department.hodImage.key);

    if (Array.isArray(department.labs)) {
      department.labs.forEach((lab: any) => {
        if (lab.image?.key) deleteKeys.push(lab.image.key);
      });
    }

    if (Array.isArray(department.clubs)) {
      department.clubs.forEach((club: any) => {
        if (club.image?.key) deleteKeys.push(club.image.key);
      });
    }

    // 3. Delete images from S3
    for (const key of deleteKeys) {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.SPACES_BUCKET!,
          Key: key,
        })
      );
    }

    // 4. Delete department record from DB
    await department.deleteOne();

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error deleting department:", err);
    res
      .status(500)
      .json({ error: err.message || "Server error while deleting department" });
  }
};





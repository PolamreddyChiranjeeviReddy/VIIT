"use strict";
// import departmentModel from '../models/departmentModel';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartmentByCode = exports.createDepartment = exports.getDepartmentByCode = exports.getDepartment = void 0;
const departmentModel_1 = __importDefault(require("../models/departmentModel"));
// -----------------------------
// Get all departments
// -----------------------------
const getDepartment = async (_req, res) => {
    try {
        const department = await departmentModel_1.default.find();
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
            faculty: img.faculty.map((f) => ({
                sno: f.sno,
                name: f.name,
                designation: f.designation
            }))
            //   number: img.number,
            //   image: `data:${img.contentType};base64,${img.image.toString("base64")}`
        }));
        res.status(200).json(formatted);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching department" });
    }
};
exports.getDepartment = getDepartment;
// -----------------------------
// Get department by code
// -----------------------------
const getDepartmentByCode = async (req, res) => {
    try {
        const { code } = req.params;
        const img = await departmentModel_1.default.find({ code });
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
            faculty: img.faculty.map((f) => ({
                sno: f.sno,
                name: f.name,
                designation: f.designation
            }))
        }));
        res.status(200).json(department);
    }
    catch (err) {
        res.status(500).json({ error: "Error fetching department" });
    }
};
exports.getDepartmentByCode = getDepartmentByCode;
// -----------------------------
// Add new department
// -----------------------------
const createDepartment = async (req, res) => {
    try {
        const { code, name, about, hodMessage, hodName, vision, mission, faculty } = req.body;
        // const files = req.files as UploadedFiles;
        // console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        const heroImage = req.files?.heroImage[0]?.buffer;
        const hodImage = req.files?.hodImage[0]?.buffer;
        if (!code || !name) {
            return res.status(400).json({ error: "Code and name are required" });
        }
        if (!heroImage || !hodImage) {
            return res.status(400).json({ error: "Both heroImage and hodImage are required" });
        }
        // Safely parse JSON arrays
        let parsedMission = [];
        let parsedFaculty = [];
        try {
            parsedMission = typeof mission === "string" ? JSON.parse(mission) : mission;
            parsedFaculty = typeof faculty === "string" ? JSON.parse(faculty) : faculty;
        }
        catch (err) {
            return res.status(400).json({ error: "Invalid mission or faculty format" });
        }
        const department = new departmentModel_1.default({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            error: "Server error while creating department",
            details: err.message,
        });
    }
};
exports.createDepartment = createDepartment;
// -----------------------------
// Update department by _id
// -----------------------------
const updateDepartmentByCode = async (req, res) => {
    try {
        const { _id } = req.params;
        const { code, name, about, hodName, hodMessage, vision, mission, faculty } = req.body;
        // const files = req.files as UploadedFiles;
        console.log(req.files);
        const department = await departmentModel_1.default.findById(_id);
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
        if (req.files?.heroImage?.[0]) {
            department.heroImage = req.files.heroImage[0].buffer;
        }
        if (req.files?.hodImage?.[0]) {
            department.hodImage = req.files.hodImage[0].buffer;
        }
        // Parse arrays if provided
        try {
            department.mission = mission ? JSON.parse(mission) : department.mission;
            department.faculty = faculty ? JSON.parse(faculty) : department.faculty;
        }
        catch (err) {
            const e = err;
            return res.status(400).json({ error: "Invalid mission/faculty format", details: e.message });
        }
        const updated = await department.save();
        return res.status(200).json(updated);
    }
    catch (err) {
        // const err = error as Error;
        console.error("Update error:", err);
        return res.status(500).json({ error: err.message || "Something went wrong while updating" });
    }
};
exports.updateDepartmentByCode = updateDepartmentByCode;
// -----------------------------
// Delete department by _id
// -----------------------------
const deleteDepartment = async (req, res) => {
    try {
        const { _id } = req.params;
        const department = await departmentModel_1.default.findByIdAndDelete(_id);
        if (!department) {
            return res.status(404).json({ error: "Department not found" });
        }
        res.status(200).json({ message: "Department deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message || "Server error while deleting department" });
    }
};
exports.deleteDepartment = deleteDepartment;
//# sourceMappingURL=departmentController.js.map
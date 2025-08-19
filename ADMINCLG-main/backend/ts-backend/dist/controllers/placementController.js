"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlacement = exports.updatePlacement = exports.getAllPlacements = exports.createPlacement = void 0;
const placementModel_1 = __importDefault(require("../models/placementModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createPlacement = async (req, res) => {
    try {
        const { student, company, package: pkg } = req.body;
        // const image = req.files && (req.files as any).image ? (req.files as any).image[0].filename : '';
        // const companyLogo = req.files && (req.files as any).companyLogo ? (req.files as any).companyLogo[0].filename : '';
        const files = req.files;
        const image = files?.image?.[0];
        const companyLogo = files?.companyLogo?.[0];
        const newPlacement = await placementModel_1.default.create({
            student,
            company,
            package: pkg,
            image: {
                url: image?.path || '',
                public_id: image?.filename || '',
            },
            companyLogo: {
                url: companyLogo?.path || '',
                public_id: companyLogo?.filename || '',
            },
        });
        res.status(201).json(newPlacement);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.createPlacement = createPlacement;
const getAllPlacements = async (_req, res) => {
    try {
        const placements = await placementModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(placements);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.getAllPlacements = getAllPlacements;
const updatePlacement = async (req, res) => {
    try {
        const { _id } = req.params;
        const { student, company, package: pkg } = req.body;
        const files = req.files;
        const image = files?.desktopImage?.[0];
        const companyLogo = files?.mobileImage?.[0];
        const placement = await placementModel_1.default.findById(_id);
        if (!placement) {
            return res.status(404).json({ error: 'Placement not found' });
        }
        // Update text fields
        placement.student = student || placement.student;
        placement.company = company || placement.company;
        placement.package = pkg || placement.package;
        // Replace image if uploaded
        // Replace desktop image
        if (image) {
            // remove old from cloudinary
            await cloudinary_1.default.uploader.destroy(placement.image.public_id);
            placement.image = {
                url: image.path,
                public_id: image.filename,
            };
        }
        // Replace mobile image
        if (companyLogo) {
            await cloudinary_1.default.uploader.destroy(placement.companyLogo.public_id);
            placement.companyLogo = {
                url: companyLogo.path,
                public_id: companyLogo.filename,
            };
        }
        const updatedPlacement = await placement.save();
        return res.status(200).json(updatedPlacement);
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
};
exports.updatePlacement = updatePlacement;
const deletePlacement = async (req, res) => {
    try {
        const { _id } = req.params;
        const placement = await placementModel_1.default.findById(_id);
        if (!placement) {
            return res.status(404).json({ message: 'Placement not found' });
        }
        // Delete from cloudinary
        await cloudinary_1.default.uploader.destroy(placement.image.public_id);
        await cloudinary_1.default.uploader.destroy(placement.companyLogo.public_id);
        await placement.deleteOne();
        res.status(200).json({ message: 'Placement deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
exports.deletePlacement = deletePlacement;
//# sourceMappingURL=placementController.js.map
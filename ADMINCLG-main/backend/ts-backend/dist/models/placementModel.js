"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PlacementSchema = new mongoose_1.default.Schema({
    student: { type: String, required: false },
    company: { type: String, required: false },
    package: { type: String, required: false },
    image: {
        url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false },
    }, // Uploaded student image
    companyLogo: {
        url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false },
    }, // Uploaded company logo
}, { timestamps: true });
const placementModel = mongoose_1.default.models.Placement || mongoose_1.default.model('Placement', PlacementSchema);
exports.default = placementModel;
//# sourceMappingURL=placementModel.js.map
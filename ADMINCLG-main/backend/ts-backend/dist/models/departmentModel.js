"use strict";
// import mongoose, { Schema, Document } from 'mongoose';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// interface FacultyMember {
//   sno: number;
//   name: string;
//   designation: string;
// }
// export interface DepartmentDocument extends Document {
//   code: string; // like 'cse', 'ece', etc.
//   name: string;
//   heroImage: string;
//   about: string;
//   hodMessage: string;
//   hodName: string;
//   hodImage: string;
//   vision: string;
//   mission: string[];
//   faculty: FacultyMember[];
// }
// const FacultySchema: Schema = new Schema({
//   sno: { type: Number, required: true },
//   name: { type: String, required: true },
//   designation: { type: String, required: true }
// });
// const DepartmentSchema: Schema = new Schema({
//   code: { type: String, required: true, unique: true }, // e.g., 'cse', 'ece'
//   name: { type: String, required: true },
//   heroImage: { type: String, required: true },
//   about: { type: String, required: true },
//   hodMessage: { type: String, required: true },
//   hodName: { type: String, required: true },
//   hodImage: { type: String, required: true },
//   vision: { type: String, required: true },
//   mission: { type: [String], required: true },
//   faculty: { type: [FacultySchema], required: true }
// });
// const departmentModel = (mongoose.models.department as mongoose.Model<DepartmentDocument>) 
//   || mongoose.model<DepartmentDocument>("department", DepartmentSchema);
// export default departmentModel;
// import mongoose, { Schema, Document } from 'mongoose';
// interface FacultyMember {
//   sno: number;
//   name: string;
//   designation: string;
// }
// export interface DepartmentDocument extends Document {
//   code: string;
//   name: string;
//   heroImage: string;
//   about: string;
//   hodMessage: string;
//   hodName: string;
//   hodImage: string;
//   vision: string;
//   mission: string[];
//   faculty: FacultyMember[];
// }
// const FacultySchema: Schema = new Schema({
//   sno: { type: Number, required: true },
//   name: { type: String, required: true },
//   designation: { type: String, required: true }
// });
// // const DepartmentSchema: Schema = new Schema({
// //   code: { type: String, required: true, unique: true },
// //   name: { type: String, required: true },
// //   heroImage: { type: String, required: true },
// //   about: { type: String, required: true },
// //   hodMessage: { type: String, required: true },
// //   hodName: { type: String, required: true },
// //   hodImage: { type: String, required: true },
// //   vision: { type: String, required: true },
// //   mission: { type: [String], required: true },
// //   faculty: { type: [FacultySchema], required: true }
// // });
// const DepartmentSchema: Schema = new Schema({
//   code: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   heroImage: {
//     url: { type: String, required: true },
//     public_id: { type: String, required: true },
//   },
//   about: { type: String, required: true },
//   hodMessage: { type: String, required: true },
//   hodName: { type: String, required: true },
//   hodImage: {
//     url: { type: String, required: true },
//     public_id: { type: String, required: true },
//   },
//   vision: { type: String, required: true },
//   mission: { type: [String], required: true },
//   faculty: { type: [FacultySchema], required: true },
// });
// const departmentModel = mongoose.models.department || mongoose.model<DepartmentDocument>("department", DepartmentSchema);
// export default departmentModel;
const mongoose_1 = __importStar(require("mongoose"));
//Schema Definitions..................................
const FacultySchema = new mongoose_1.Schema({
    sno: { type: Number },
    name: { type: String },
    designation: { type: String }
});
const PlacementStatSchema = new mongoose_1.Schema({
    overallPlacementPercentage: { type: String },
    highestPackage: { type: String },
    averagePackage: { type: String },
    recruiters: { type: [String] },
});
const LabsSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    image: { url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false }
    },
    // image: { type: Buffer, required: false },
});
const EventsOrganizedSchema = new mongoose_1.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
});
const SponsoredProjectsSchema = new mongoose_1.Schema({
    principalInvestigator: { type: String, required: false },
    researchProjectName: { type: String, required: false },
    FundingAgency: { type: String, required: false },
});
const FacultyAwardsSchema = new mongoose_1.Schema({
    sno: { type: Number },
    name: { type: String },
    count: { type: Number },
});
const StudentAwardsSchema = new mongoose_1.Schema({
    sno: { type: Number },
    awardName: { type: String },
    studentsCount: { type: Number },
});
const CertificationsSchema = new mongoose_1.Schema({
    title: { type: String },
    count: { type: Number },
});
const ClubsSchema = new mongoose_1.Schema({
    clubName: { type: String, required: false },
    description: { type: String, required: false },
    image: {
        url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false }
    },
    studentCoordinator: { type: String, required: false },
});
const ResearchSchema = new mongoose_1.Schema({
    sno: { type: Number },
    patentTitle: { type: String },
    agency: { type: String },
    year: { type: String },
    status: { type: String },
});
const ContactSchema = new mongoose_1.Schema({
    email: { type: String, required: false },
    phone: { type: String, required: false },
    location: { type: String, required: false },
});
const DepartmentSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: false },
    heroImage: {
        url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false }
    },
    about: { type: String, required: false },
    hodMessage: { type: String, required: false },
    hodName: { type: String, required: false },
    hodImage: {
        url: { type: String, required: false },
        key: { type: String, required: false },
        contentType: { type: String, required: false }
    },
    vision: { type: String, required: false },
    mission: { type: [String], required: false },
    faculty: { type: [FacultySchema] },
    peos: { type: [String], required: false },
    pos: { type: [String], required: false },
    placementStats: { type: [PlacementStatSchema] },
    careerSupport: { type: [String], required: false },
    labs: { type: [LabsSchema], required: false },
    eventsOrganized: { type: [EventsOrganizedSchema], required: false },
    sponsoredProjects: { type: [SponsoredProjectsSchema], required: false },
    facultyAwards: { type: [FacultyAwardsSchema], required: false },
    studentAwards: { type: [StudentAwardsSchema], required: false },
    certifications: { type: [CertificationsSchema], required: false },
    clubs: { type: [ClubsSchema], required: false },
    research: { type: [ResearchSchema], required: false },
    contact: { type: ContactSchema, required: false },
});
const departmentModel = mongoose_1.default.models.department || mongoose_1.default.model("department", DepartmentSchema);
exports.default = departmentModel;
//# sourceMappingURL=departmentModel.js.map
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
exports.HeroImage = void 0;
// export interface HeroImageDocument extends Document {
//   title: string;
//   desktopImage: string;
//   mobileImage: string;
// }
// const HeroImageSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   desktopImage: { type: String, required: true },
//   mobileImage: { type: String, required: true },
// },
// { timestamps: true }
// );
// const heroImageModel =
//   mongoose.models.heroImage ||
//   mongoose.model<HeroImageDocument>('heroImage', HeroImageSchema);
// export default heroImageModel;
// import mongoose, { Schema, Document } from 'mongoose';
// export interface HeroImageDocument extends Document {
//   title: string;
//   desktopImage: { url: string; public_id: string };
//   mobileImage: { url: string; public_id: string };
// }
// const HeroImageSchema: Schema = new Schema(
//   {
//     title: { type: String, required: true },
//     desktopImage: {
//       url: { type: String, required: true },
//       public_id: { type: String, required: true },
//     },
//     mobileImage: {
//       url: { type: String, required: true },
//       public_id: { type: String, required: true },
//     },
//   },
//   { timestamps: true }
// );
// const heroImageModel =
//   mongoose.models.heroImage ||
//   mongoose.model<HeroImageDocument>('heroImage', HeroImageSchema);
// export default heroImageModel;
// import mongoose, { Document, Schema } from "mongoose";
// export interface HeroImageDoc extends Document {
//   number: number;
//   image: Buffer;
//   contentType: string;
// }
// const heroImageSchema = new Schema<HeroImageDoc>({
//   number: { type: Number, required: true },
//   image: { type: Buffer, required: true },
//   contentType: { type: String, required: true },
// });
// export const HeroImage = mongoose.models.heroImage || mongoose.model<HeroImageDoc>("HeroImage", heroImageSchema);
// import mongoose, { Document, Schema } from "mongoose";
// export interface HeroImageDoc extends Document {
//   number: number;
//   url: string;
//   key: string; // file path inside Spaces
//   contentType: string;
// }
// const heroImageSchema = new Schema<HeroImageDoc>(
//   {
//     number: { type: Number, required: true },
//     url: { type: String, required: true },
//     key: { type: String, required: true },
//     contentType: { type: String, required: true },
//   },
//   { timestamps: true }
// );
// export const HeroImage =
//   mongoose.models.HeroImage ||
//   mongoose.model<HeroImageDoc>("HeroImage", heroImageSchema);
const mongoose_1 = __importStar(require("mongoose"));
const heroImageSchema = new mongoose_1.Schema({
    number: { type: Number, required: true },
    url: { type: String, required: true },
    key: { type: String, required: true },
    contentType: { type: String, required: true },
}, { timestamps: true });
exports.HeroImage = mongoose_1.default.models.HeroImage ||
    mongoose_1.default.model("HeroImage", heroImageSchema);
//# sourceMappingURL=heroImageModel.js.map
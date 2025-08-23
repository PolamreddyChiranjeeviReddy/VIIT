// import mongoose, { Schema, Document } from 'mongoose';

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





import mongoose, { Document, Schema } from "mongoose";

export interface HeroImageDoc extends Document {
  number: number;
  image: Buffer;
  contentType: string;
}

const heroImageSchema = new Schema<HeroImageDoc>({
  number: { type: Number, required: true },
  image: { type: Buffer, required: true },
  contentType: { type: String, required: true },
});

export const HeroImage = mongoose.models.heroImage || mongoose.model<HeroImageDoc>("HeroImage", heroImageSchema);

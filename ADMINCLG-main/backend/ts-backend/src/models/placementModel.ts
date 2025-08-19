import mongoose from 'mongoose';

export interface IPlacement extends mongoose.Document {
  student: string;
  company: string;
  package: string;
  image: {url: string; public_id: string}; // Uploaded student image
  companyLogo: {url: string; public_id: string}; // Uploaded company logo
}

const PlacementSchema = new mongoose.Schema<IPlacement>(
  {
    student: { type: String, required: true },
    company: { type: String, required: true },
    package: { type: String, required: true },
    image: {
      url:{type: String, required:true},
      public_id:{type: String, required:true},
    },        // Uploaded student image
    companyLogo: {
      url: { type: String, required: true },  // URL of the uploaded company logo
      public_id: { type: String, required: true}
    },  // Uploaded company logo
  },
  { timestamps: true }
);

const placementModel =
  mongoose.models.Placement || mongoose.model<IPlacement>('Placement', PlacementSchema);

export default placementModel;

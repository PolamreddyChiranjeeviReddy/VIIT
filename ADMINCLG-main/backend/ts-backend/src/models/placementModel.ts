import mongoose from 'mongoose';

export interface IPlacement extends mongoose.Document {
  student: string;
  company: string;
  package: string;
  image:{
    url: string;
    key: string;
    contentType: string;
  } // Uploaded student image
  companyLogo: {
    url: string;
    key: string;
    contentType: string;
  }; // Uploaded company logo
}

const PlacementSchema = new mongoose.Schema<IPlacement>(
  {
    student: { type: String, required: false },
    company: { type: String, required: false },
    package: { type: String, required: false },
    image:   {
      url: { type: String, required: false },
      key: { type: String, required: false },
      contentType: { type: String, required: false },
    },        // Uploaded student image
    companyLogo: {
      url: { type: String, required: false },
      key: { type: String, required: false },
      contentType: { type: String, required: false },
    },  // Uploaded company logo
  },
  { timestamps: true }
);

const placementModel =
  mongoose.models.Placement || mongoose.model<IPlacement>('Placement', PlacementSchema);

export default placementModel;

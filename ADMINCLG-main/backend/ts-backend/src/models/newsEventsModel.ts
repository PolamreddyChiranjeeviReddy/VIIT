import mongoose, {Schema, Document} from 'mongoose';

export interface INewsEvent extends Document {
  type: string;
  title: string;
  date: string;
  description: string;
  pathlink: string;
  // image: Buffer;
  image:{
    url: string;
    key: string;
    contentType: string;
  }
  bgColor: string;
}

const NewsEventSchema = new mongoose.Schema<INewsEvent>(
  {
    type: { type: String, required: false },
    title: { type: String, required: false },
    date: { type: String, required: false },
    description: { type: String, required: false },
    pathlink: {type: String, required: false},
    image: {
      url: { type: String, required: false },
      key: { type: String, required: false },
      contentType: { type: String, required: false }
    },
    bgColor: { type: String, required: false }
  },
  { timestamps: true }
);

// export default mongoose.model<INewsEvent>('NewsEvent', NewsEventSchema);

const newEventsModel = mongoose.models.NewsEvent || mongoose.model<INewsEvent>("NewsEvent", NewsEventSchema);
export default newEventsModel;

import mongoose, {Schema, Document} from 'mongoose';

export interface INewsEvent extends Document {
  type: string;
  title: string;
  date: string;
  description: string;
  pathlink: string;
  image: {url: string; public_id: string};
  bgColor: string;
}

const NewsEventSchema = new mongoose.Schema<INewsEvent>(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    pathlink: {type: String, required: true},
    image: { url: { type: String, required: true },
             public_id: { type: String, required: true } 
        },
    bgColor: { type: String, required: true }
  },
  { timestamps: true }
);

// export default mongoose.model<INewsEvent>('NewsEvent', NewsEventSchema);

const newEventsModel = mongoose.models.NewsEvent || mongoose.model<INewsEvent>("NewsEvent", NewsEventSchema);
export default newEventsModel;

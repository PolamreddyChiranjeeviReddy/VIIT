import mongoose, { Document } from 'mongoose';
export interface INewsEvent extends Document {
    type: string;
    title: string;
    date: string;
    description: string;
    pathlink: string;
    image: {
        url: string;
        public_id: string;
    };
    bgColor: string;
}
declare const newEventsModel: mongoose.Model<any, {}, {}, {}, any, any>;
export default newEventsModel;
//# sourceMappingURL=newsEventsModel.d.ts.map
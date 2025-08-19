import mongoose, { Document } from 'mongoose';
export interface HeroImageDocument extends Document {
    title: string;
    desktopImage: {
        url: string;
        public_id: string;
    };
    mobileImage: {
        url: string;
        public_id: string;
    };
}
declare const heroImageModel: mongoose.Model<any, {}, {}, {}, any, any>;
export default heroImageModel;
//# sourceMappingURL=heroImageModel.d.ts.map
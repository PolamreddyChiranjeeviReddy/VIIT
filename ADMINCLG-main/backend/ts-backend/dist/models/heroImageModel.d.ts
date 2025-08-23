import mongoose, { Document } from "mongoose";
export interface HeroImageDoc extends Document {
    number: number;
    image: Buffer;
    contentType: string;
}
export declare const HeroImage: mongoose.Model<any, {}, {}, {}, any, any>;
//# sourceMappingURL=heroImageModel.d.ts.map
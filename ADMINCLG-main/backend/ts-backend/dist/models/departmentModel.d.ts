import mongoose, { Document } from 'mongoose';
interface FacultyMember {
    sno: number;
    name: string;
    designation: string;
}
interface ImageData {
    url: string;
    public_id: string;
}
export interface DepartmentDocument extends Document {
    code: string;
    name: string;
    heroImage: ImageData;
    about: string;
    hodMessage: string;
    hodName: string;
    hodImage: ImageData;
    vision: string;
    mission: string[];
    faculty: FacultyMember[];
}
declare const departmentModel: mongoose.Model<any, {}, {}, {}, any, any>;
export default departmentModel;
//# sourceMappingURL=departmentModel.d.ts.map
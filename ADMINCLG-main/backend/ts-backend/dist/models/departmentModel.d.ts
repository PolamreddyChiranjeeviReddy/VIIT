import mongoose, { Document } from 'mongoose';
interface FacultyMember {
    sno: number;
    name: string;
    designation: string;
}
interface Placementstat {
    overallPlacementPercentage: String;
    highestPackage: String;
    averagePackage: String;
    recruiters: String[];
}
interface labs {
    name: String;
    image: {
        url: string;
        key: string;
        contentType: string;
    };
}
interface EventsOrganized {
    title: String;
    description: String;
}
interface SponsoredProjects {
    principalInvestigator: String;
    researchProjectName: String;
    fundingAgency: String;
}
interface FacultyAwards {
    sno: number;
    name: string;
    count: number;
}
interface StudentAwards {
    sno: number;
    awardName: string;
    studentsCount: number;
}
interface Certifications {
    title: string;
    count: number;
}
interface clubs {
    clubName: string;
    description: string;
    image: {
        url: string;
        key: string;
        contentType: string;
    };
    studentCoordinator: string;
}
interface research {
    sno: number;
    patentTitle: string;
    agency: string;
    year: string;
    status: string;
}
interface contact {
    email: string;
    phone: string;
    location: string;
}
export interface DepartmentDocument extends Document {
    code: string;
    name: string;
    heroImage: {
        url: string;
        key: string;
        contentType: string;
    };
    about: string;
    hodMessage: string;
    hodName: string;
    hodImage: {
        url: string;
        key: string;
        contentType: string;
    };
    vision: string;
    mission: string[];
    faculty: FacultyMember[];
    peos: string[];
    pos: string[];
    placementStats: Placementstat[];
    careerSupport: string[];
    labs: labs[];
    eventsOrganized: EventsOrganized[];
    sponsoredProjects: SponsoredProjects[];
    facultyAwards: FacultyAwards[];
    studentAwards: StudentAwards[];
    certifications: Certifications[];
    clubs: clubs[];
    research: research[];
    contact: contact;
}
declare const departmentModel: mongoose.Model<any, {}, {}, {}, any, any>;
export default departmentModel;
//# sourceMappingURL=departmentModel.d.ts.map
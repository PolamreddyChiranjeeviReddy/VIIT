// import mongoose, { Schema, Document } from 'mongoose';

// interface FacultyMember {
//   sno: number;
//   name: string;
//   designation: string;
// }

// export interface DepartmentDocument extends Document {
//   code: string; // like 'cse', 'ece', etc.
//   name: string;
//   heroImage: string;
//   about: string;
//   hodMessage: string;
//   hodName: string;
//   hodImage: string;
//   vision: string;
//   mission: string[];
//   faculty: FacultyMember[];
// }

// const FacultySchema: Schema = new Schema({
//   sno: { type: Number, required: true },
//   name: { type: String, required: true },
//   designation: { type: String, required: true }
// });

// const DepartmentSchema: Schema = new Schema({
//   code: { type: String, required: true, unique: true }, // e.g., 'cse', 'ece'
//   name: { type: String, required: true },
//   heroImage: { type: String, required: true },
//   about: { type: String, required: true },
//   hodMessage: { type: String, required: true },
//   hodName: { type: String, required: true },
//   hodImage: { type: String, required: true },
//   vision: { type: String, required: true },
//   mission: { type: [String], required: true },
//   faculty: { type: [FacultySchema], required: true }
// });

// const departmentModel = (mongoose.models.department as mongoose.Model<DepartmentDocument>) 
//   || mongoose.model<DepartmentDocument>("department", DepartmentSchema);

// export default departmentModel;


// import mongoose, { Schema, Document } from 'mongoose';

// interface FacultyMember {
//   sno: number;
//   name: string;
//   designation: string;
// }

// export interface DepartmentDocument extends Document {
//   code: string;
//   name: string;
//   heroImage: string;
//   about: string;
//   hodMessage: string;
//   hodName: string;
//   hodImage: string;
//   vision: string;
//   mission: string[];
//   faculty: FacultyMember[];
// }

// const FacultySchema: Schema = new Schema({
//   sno: { type: Number, required: true },
//   name: { type: String, required: true },
//   designation: { type: String, required: true }
// });

// // const DepartmentSchema: Schema = new Schema({
// //   code: { type: String, required: true, unique: true },
// //   name: { type: String, required: true },
// //   heroImage: { type: String, required: true },
// //   about: { type: String, required: true },
// //   hodMessage: { type: String, required: true },
// //   hodName: { type: String, required: true },
// //   hodImage: { type: String, required: true },
// //   vision: { type: String, required: true },
// //   mission: { type: [String], required: true },
// //   faculty: { type: [FacultySchema], required: true }
// // });

// const DepartmentSchema: Schema = new Schema({
//   code: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   heroImage: {
//     url: { type: String, required: true },
//     public_id: { type: String, required: true },
//   },
//   about: { type: String, required: true },
//   hodMessage: { type: String, required: true },
//   hodName: { type: String, required: true },
//   hodImage: {
//     url: { type: String, required: true },
//     public_id: { type: String, required: true },
//   },
//   vision: { type: String, required: true },
//   mission: { type: [String], required: true },
//   faculty: { type: [FacultySchema], required: true },
// });

// const departmentModel = mongoose.models.department || mongoose.model<DepartmentDocument>("department", DepartmentSchema);

// export default departmentModel;


import mongoose, { Schema, Document } from 'mongoose';


//Interface Definitions.................................
interface FacultyMember {
  sno: number;
  name: string;
  designation: string;
}

interface RecruiterImage {
  url: string;
  key: string;
  contentType: string;
}

interface Placementstat {
  overallPlacementPercentage: String;
  highestPackage: String;
  averagePackage: String;
  // recruiters: {
  //   url: string;
  //   key: string;
  //   contentType: string;
  // }[];
}

interface labs {
  name: String;
  image: {
    url: string;
    key: string;
    contentType: string;
  };
}

interface TeachingAndLearning {
  TALImages: {
    url: string;
    key: string;
    contentType: string;
  };
  TALDescription: String;
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

interface clubs{
  clubName: string;
  description: string;
  image: {
    url: string;
    key: string;
    contentType: string;
  };
  studentCoordinator: string;
}

interface DDCMinute {
  name: string;
  pdf: {
    url: string;
    key: string;
    contentType: string;
  };
}

interface BOSMinute {
  name: string;
  pdf: {
    url: string;
    key: string;
    contentType: string;
  };
}

interface BOSMember {
  BosMemberName: string;
  Designation: string;
  memberStatus: string;
}

interface research{
  sno: number;
  patentTitle: string;
  agency: string;
  year: string;
  status: string;
}

interface contact{
  email: string;
  phone: string;
  location: string;
}
// interface ImageData {
//   url: string;
//   public_id: string;


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
  psos: string[];
  teachingAndLearning: TeachingAndLearning[];
  placementStats: Placementstat[];
  recruiters: RecruiterImage[];
  careerSupport: string[];
  labs: labs[];
  eventsOrganized: EventsOrganized[];
  sponsoredProjects: SponsoredProjects[];
  facultyAwards: FacultyAwards[];
  studentAwards: StudentAwards[];
  certifications: Certifications[];
  clubs: clubs[];
  ddcMinutes: DDCMinute[];
  bosMinutes: BOSMinute[];
  bosMinutesMembers: BOSMember[];
  PAQIC?: string[];
  research: research[];
  contact: contact;
}


//Schema Definitions..................................


const FacultySchema: Schema = new Schema({
  sno: { type: Number},
  name: { type: String },
  designation: { type: String }
});


const RecruiterImageSchema: Schema = new Schema({
  url: { type: String, required: false },
  key: { type: String, required: false },
  contentType: { type: String, required: false }
});

const PlacementStatSchema: Schema = new Schema({
  overallPlacementPercentage: { type: String },
  highestPackage: { type: String },
  averagePackage: { type: String },
  // recruiters: { type: [RecruiterImageSchema], required: false },
}); 

const LabsSchema: Schema = new Schema({
  name: { type: String, required: false },
  image: { url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false } 
  },
  // image: { type: Buffer, required: false },
});

const EventsOrganizedSchema: Schema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
});

const SponsoredProjectsSchema: Schema = new Schema({
  principalInvestigator: { type: String, required: false },
  researchProjectName: { type: String, required: false }, 
  FundingAgency: { type: String, required: false },
});

const FacultyAwardsSchema: Schema = new Schema({
  sno: { type: Number },
  name: { type: String },
  count: { type: Number },
});
const StudentAwardsSchema: Schema = new Schema({
  sno: { type: Number },
  awardName: { type: String },
  studentsCount: { type: Number },
});

const TeachingAndLearningSchema: Schema = new Schema({
  TALImages: {
    url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false }
  },
  TALDescription: { type: String, required: false },
});

const CertificationsSchema: Schema = new Schema({
  title: { type: String },
  count: { type: Number },
});

const ClubsSchema: Schema = new Schema({
  clubName: { type: String, required: false },
  description: { type: String, required: false },
  image: {
    url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false }
  },
  studentCoordinator: { type: String, required: false },
});

const DDCMinuteSchema: Schema = new Schema({
  name: { type: String, required: false },
  pdf: {
    url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false }
  },
});

const BOSMinuteSchema: Schema = new Schema({
  name: { type: String, required: false },
  pdf: {
    url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false }
  },
});

const ResearchSchema: Schema = new Schema({
  sno: { type: Number },
  patentTitle: { type: String },
  agency: { type: String },
  year: { type: String },
  status: { type: String },
});

const ContactSchema: Schema = new Schema({
  email: { type: String, required: false },
  phone: { type: String, required: false },
  location: { type: String, required: false },
});


const DepartmentSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  heroImage: {
    url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false }
  },
  about: { type: String, required: false },
  hodMessage: { type: String, required: false },
  hodName: { type: String, required: false },
  hodImage: {
    url: { type: String, required: false },
    key: { type: String, required: false },
    contentType: { type: String, required: false }
  },
  vision: { type: String, required: false },
  mission: { type: [String], required: false },
  faculty: { type: [FacultySchema] },
  peos: { type: [String], required: false  },
  pos: { type: [String], required: false  },
  psos: { type: [String], required: false  },
  teachingAndLearning: { type: [TeachingAndLearningSchema], required: false  },
  placementStats: { type: [PlacementStatSchema] },
  recruiters: { type: [RecruiterImageSchema], required: false },
  careerSupport: { type: [String], required: false  },
  labs: { type: [LabsSchema], required: false  },
  eventsOrganized: { type: [EventsOrganizedSchema], required: false  },
  sponsoredProjects: { type: [SponsoredProjectsSchema], required: false  },
  facultyAwards: { type: [FacultyAwardsSchema], required: false  },
  studentAwards: { type: [StudentAwardsSchema], required: false  },
  certifications: { type: [CertificationsSchema], required: false  },
  clubs: { type: [ClubsSchema], required: false  },
  ddcMinutes: { type: [DDCMinuteSchema], required: false  },
  bosMinutesMembers: { type: [{ BosMemberName: String, Designation: String, memberStatus: String }], required: false },
  bosMinutes: { type: [BOSMinuteSchema], required: false  },
  PAQIC: { type: [String], required: false },
  research: { type: [ResearchSchema], required: false  },
  contact: { type: ContactSchema, required: false  },
});

const departmentModel = 
  mongoose.models.department || mongoose.model<DepartmentDocument>("department", DepartmentSchema);

export default departmentModel;

// // import React, { useState, useEffect, useCallback, CSSProperties, useRef } from 'react';
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import type { CSSProperties } from 'react';
// // import ReactDOM from 'react-dom';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { StoreContext } from '../context/StoreContext';
// import { TbRun } from 'react-icons/tb';
// // import AdminLogin from './AdminLogin';
// // const isDepartment = (item: any): item is Department => {
// //     return 'code' in item && 'mission' in item && 'faculty' in item;
// // };
// // --- API Configuration ---
// const API_BASE_URL = import.meta.env.VITE_API_URL; // IMPORTANT: Change to your backend URL

// // --- SVG Icons ---
// const Logo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Vignan_logo.png" alt="Vignan's Logo" style={{ height: '45px', width: 'auto' }} />;
// const UserProfileIcon = () => <img src="https://i.imgur.com/6VBx3io.png" alt="User Profile" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />;
// const CrossIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
// const EditIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
// const MenuIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
// const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
// const UploadCloudIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
// const MobileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
// const DesktopIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
// const PlusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
// const MinusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>;


// // --- Helper Components ---
// const LoadingSpinner = () => <div style={styles.spinner}></div>;
// const ErrorMessage = ({ message }: { message: string }) => <div style={styles.errorBanner}>{message}</div>;

// // --- Custom Form Controls ---
// const ImageUpload = ({ label, name, icon, initialImage, isRequired }: { label: string; name: string; icon?: React.ReactNode; initialImage?: string | null; isRequired?: boolean; }) => {
//     const [preview, setPreview] = useState<string | null>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     useEffect(() => { setPreview(initialImage || null); }, [initialImage]);

//     return (
//         <div style={styles.formGroup}>
//             <label style={styles.label}>{label} {icon}</label>
//             <div className="upload-box" style={styles.uploadBox} onClick={() => inputRef.current?.click()}>
//                 <input ref={inputRef} type="file" name={name} accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if(file) { setPreview(URL.createObjectURL(file));}}} style={{ display: 'none' }} required={!initialImage && isRequired}/>
//                 {preview ? (<>
//                     <img src={preview} alt="Preview" style={styles.uploadPreview} />
//                     <div className="upload-overlay" style={styles.uploadOverlay}><span>Change Image</span></div>
//                 </>) : (
//                 <div style={styles.uploadPlaceholder}><UploadCloudIcon /><span>Upload</span></div>)}
//             </div>
//         </div>
//     );
// };

// const ColorPicker = ({ name, initialValue = '#3498db' }: { name: string; initialValue?: string }) => {
//     const [color, setColor] = useState(initialValue);
//     const colorInputRef = useRef<HTMLInputElement>(null);
//     useEffect(() => { setColor(initialValue) }, [initialValue]);

//     return (
//         <div>
//             <label style={styles.label}>Background Color</label>
//             <div style={styles.colorPickerWrapper} onClick={() => colorInputRef.current?.click()}>
//                 <div style={{...styles.colorPickerSwatch, backgroundColor: color }}></div>
//                 <span style={styles.colorPickerValue}>{color}</span>
//                 <input ref={colorInputRef} type="color" name={name} value={color} onChange={(e) => setColor(e.target.value)} style={{ display: 'none' }} />
//             </div>
//         </div>
//     );
// }

// // --- TYPE DEFINITIONS ---
// interface FacultyMember { sno: number; name: string; designation: string; }
// // interface DesktopImage { url: string; public_id: string; }
// // interface HodImage { url: string; public_id: string; }
// // interface HerImage { url: string; public_id: string; }
// // interface ImageFile { url: string; public_id: string; }
// interface Department { _id: string; code: string; name: string; about: string; hodMessage: string; hodName: string; hodImage: Buffer; heroImage: Buffer; vision: string; mission: string[]; faculty: FacultyMember[]; }
// interface NewsEvent { _id: string; type: string; title: string; date: string; description: string; pathlink: string; image: Buffer; bgColor: string; }
// interface HeroImage { number: string; image: Buffer }
// interface Announcement {_id: string; date: string; title: string; path: string; description: string;}
// interface Placement {_id:string; student: string; company: string; package: string; image: Buffer; companyLogo: Buffer;}

// // --- FORM COMPONENTS ---


// interface DepartmentFormProps {
//   onFormSubmit: (data: FormData) => void;
//   initialData?: Department;
//   onCancel: () => void;
// }

// // Type guard
// const isDepartment = (data: any): data is Department => {
//   return 'code' in data && 'mission' in data && 'faculty' in data;
// };

// const DepartmentForm = ({ onFormSubmit, initialData, onCancel }: DepartmentFormProps) => {
//   const [missionPoints, setMissionPoints] = useState<string[]>(['']);
//   const [faculty, setFaculty] = useState<FacultyMember[]>([
//     { sno: 1, name: '', designation: '' }
//   ]);

//   // Initialize form data when editing
//   useEffect(() => {
//     if (initialData && isDepartment(initialData)) {
//       setMissionPoints(initialData.mission || ['']);
//       setFaculty(initialData.faculty || [{ sno: 1, name: '', designation: '' }]);
//     } else {
//       setMissionPoints(['']);
//       setFaculty([{ sno: 1, name: '', designation: '' }]);
//     }
//   }, [initialData]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     // Add mission points if not empty
//     const validMissionPoints = missionPoints.filter(point => point.trim());
//     if (validMissionPoints.length > 0) {
//       formData.set('mission', JSON.stringify(validMissionPoints));
//     }

//     // Add faculty entries with valid name & designation
//     const validFaculty = faculty.filter(f => f.name.trim() && f.designation.trim());
//     if (validFaculty.length > 0) {
//       formData.set('faculty', JSON.stringify(validFaculty));
//     }

//     onFormSubmit(formData);
//   };

//   const handleFacultyChange = (index: number, field: keyof FacultyMember, value: string | number) => {
//     setFaculty(faculty.map((f, i) => 
//       i === index ? { ...f, [field]: value } : f
//     ));
//   };

//   const addFaculty = () => {
//     setFaculty([
//       ...faculty,
//       { sno: faculty.length + 1, name: '', designation: '' }
//     ]);
//   };

//   const removeFaculty = (index: number) => {
//     setFaculty(faculty.filter((_, i) => i !== index));
//   };

//   const addMissionPoint = () => {
//     setMissionPoints([...missionPoints, '']);
//   };

//   const removeMissionPoint = (index: number) => {
//     setMissionPoints(missionPoints.filter((_, i) => i !== index));
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <div style={styles.formRow}>
//         <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//           <label style={styles.label}>Department Code</label>
//           <input 
//             name="code"
//             defaultValue={initialData?.code}
//             style={styles.input}
//             required
//             // disabled={!!initialData}
//             placeholder="e.g., cse"
//           />
//         </div>
//         <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//           <label style={styles.label}>Department Name</label>
//           <input 
//             name="name"
//             defaultValue={initialData?.name}
//             style={styles.input}
//             required
//             placeholder="e.g., Computer Science and Engineering"
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>About Department</label>
//         <textarea 
//           name="about"
//           defaultValue={initialData?.about}
//           style={styles.textarea}
//           required
//           placeholder="Enter department description..."
//         />
//       </div>

//       <div style={styles.formRow}>
//         <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//           <label style={styles.label}>HOD Name</label>
//           <input 
//             name="hodName"
//             defaultValue={initialData?.hodName}
//             style={styles.input}
//             required
//             placeholder="Enter HOD name"
//           />
//         </div>
//         <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//           <label style={styles.label}>Vision</label>
//           <textarea 
//             name="vision"
//             defaultValue={initialData?.vision}
//             style={{...styles.textarea, minHeight: '52px'}}
//             required
//             placeholder="Enter department vision..."
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>HOD Message</label>
//         <textarea 
//           name="hodMessage"
//           defaultValue={initialData?.hodMessage}
//           style={styles.textarea}
//           required
//           placeholder="Enter HOD's message..."
//         />
//       </div>

//       <div style={styles.formRow}>
//         <div style={{flex: 1, marginRight: '10px'}}>
//           <ImageUpload 
//             label="HOD Image"
//             name="hodImage"
//             initialImage={initialData?.hodImage}
//             isRequired={!initialData}
//           />
//         </div>
//         <div style={{flex: 1, marginLeft: '10px'}}>
//           <ImageUpload 
//             label="Department Hero Image"
//             name="heroImage"
//             initialImage={initialData?.heroImage}
//             isRequired={!initialData}
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Mission Points</label>
//         {missionPoints.map((point, index) => (
//           <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
//             <input 
//               value={point}
//               onChange={(e) => {
//                 const newPoints = [...missionPoints];
//                 newPoints[index] = e.target.value;
//                 setMissionPoints(newPoints);
//               }}
//               style={{...styles.input, flex: 1}}
//               placeholder={`Mission Point ${index + 1}`}
//             />
//             <button 
//               type="button"
//               onClick={() => removeMissionPoint(index)}
//               style={styles.removeButton}
//               title="Delete Point"
//             >
//               <TrashIcon />
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={addMissionPoint} style={styles.addButton}>
//           Add Mission Point
//         </button>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Faculty Members</label>
//         {faculty.map((member, index) => (
//           <div key={index} style={{...styles.formRow, marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px'}}>
//             <input 
//               type="number"
//               value={member.sno}
//               onChange={(e) => handleFacultyChange(index, 'sno', parseInt(e.target.value))}
//               style={{...styles.input, flex: 0.5, marginRight: '10px'}}
//               placeholder="S.No"
//             />
//             <input 
//               value={member.name}
//               onChange={(e) => handleFacultyChange(index, 'name', e.target.value)}
//               style={{...styles.input, flex: 2, marginRight: '10px'}}
//               placeholder="Faculty Name"
//             />
//             <input 
//               value={member.designation}
//               onChange={(e) => handleFacultyChange(index, 'designation', e.target.value)}
//               style={{...styles.input, flex: 2}}
//               placeholder="Designation"
//             />
//             <button 
//               type="button"
//               onClick={() => removeFaculty(index)}
//               style={styles.removeButton}
//               title="Delete Member"
//             >
//               <TrashIcon />
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={addFaculty} style={styles.addButton}>
//           Add Faculty Member
//         </button>
//       </div>

//       <div style={styles.formActions}>
//         <button type="submit" style={styles.submitButton}>
//           {initialData ? 'Update Department' : 'Add Department'}
//         </button>
//         <button type="button" onClick={onCancel} style={styles.cancelButton}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import type { CSSProperties } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { StoreContext } from '../context/StoreContext';
// import { TbRun } from 'react-icons/tb';

// // --- API Configuration ---
// const API_BASE_URL = import.meta.env.VITE_API_URL; // IMPORTANT: Change to your backend URL

// // --- SVG Icons ---
// const Logo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Vignan_logo.png" alt="Vignan's Logo" style={{ height: '45px', width: 'auto' }} />;
// const UserProfileIcon = () => <img src="https://i.imgur.com/6VBx3io.png" alt="User Profile" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />;
// const CrossIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
// const EditIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
// const MenuIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
// const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
// const UploadCloudIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
// const MobileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
// const DesktopIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
// const PlusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
// const MinusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>;


// // --- Helper Components ---
// const LoadingSpinner = () => <div style={styles.spinner}></div>;
// const ErrorMessage = ({ message }: { message: string }) => <div style={styles.errorBanner}>{message}</div>;

// // --- Custom Form Controls ---
// const ImageUpload = ({ label, name, icon, initialImage, isRequired, multiple = false, onChange }: 
//   { label: string; name: string; icon?: React.ReactNode; initialImage?: string | null; isRequired?: boolean; multiple?: boolean; onChange?: (file: File | null) => void; }) => {
//     const [preview, setPreview] = useState<string | null>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     useEffect(() => { setPreview(initialImage || null); }, [initialImage]);

//     return (
//         <div style={styles.formGroup}>
//             <label style={styles.label}>{label} {icon}</label>
//             <div className="upload-box" style={styles.uploadBox} onClick={() => inputRef.current?.click()}>
//                 <input 
//                   ref={inputRef} 
//                   type="file" 
//                   name={name} 
//                   accept="image/*" 
//                   onChange={(e) => { 
//                     const file = e.target.files?.[0]; 
//                     if(file) { 
//                       setPreview(URL.createObjectURL(file));
//                       onChange && onChange(file);
//                     } else if (!multiple) { // Clear preview if single upload and no file selected
//                       setPreview(null);
//                       onChange && onChange(null);
//                     }
//                   }} 
//                   style={{ display: 'none' }} 
//                   required={!initialImage && isRequired}
//                   multiple={multiple}
//                 />
//                 {preview ? (<>
//                     <img src={preview} alt="Preview" style={styles.uploadPreview} />
//                     <div className="upload-overlay" style={styles.uploadOverlay}><span>Change Image</span></div>
//                 </>) : (
//                 <div style={styles.uploadPlaceholder}><UploadCloudIcon /><span>Upload</span></div>)}
//             </div>
//         </div>
//     );
// };

// const ColorPicker = ({ name, initialValue = '#3498db' }: { name: string; initialValue?: string }) => {
//     const [color, setColor] = useState(initialValue);
//     const colorInputRef = useRef<HTMLInputElement>(null);
//     useEffect(() => { setColor(initialValue) }, [initialValue]);

//     return (
//         <div>
//             <label style={styles.label}>Background Color</label>
//             <div style={styles.colorPickerWrapper} onClick={() => colorInputRef.current?.click()}>
//                 <div style={{...styles.colorPickerSwatch, backgroundColor: color }}></div>
//                 <span style={styles.colorPickerValue}>{color}</span>
//                 <input ref={colorInputRef} type="color" name={name} value={color} onChange={(e) => setColor(e.target.value)} style={{ display: 'none' }} />
//             </div>
//         </div>
//     );
// }

// // --- TYPE DEFINITIONS ---
// interface FacultyMember { sno: number; name: string; designation: string; }
// interface PlacementStat {
//     overallPlacementPercentage: string;
//     highestPackage: string;
//     averagePackage: string;
//     recruiters: string[];
// }
// interface Lab { name: string; image: string | ArrayBuffer | null; file?: File; }
// interface EventOrganized { title: string; description: string; }
// interface SponsoredProject { principalInvestigator: string; researchProjectName: string; fundingAgency: string; }
// interface FacultyAward { sno: number; name: string; count: number; }
// interface StudentAward { sno: number; awardName: string; studentsCount: number; }
// interface Certification { title: string; count: number; }
// interface Club { clubName: string; description: string; image: string | ArrayBuffer | null; studentCoordinator: string; file?: File; }
// interface Research { sno: number; patentTitle: string; agency: string; year: string; status: string; }
// interface Contact { email: string; phone: string; location: string; }


// interface Department { 
//   _id: string; 
//   code: string; 
//   name: string; 
//   about: string; 
//   hodMessage: string; 
//   hodName: string; 
//   hodImage: string; // Base64 string
//   heroImage: string; // Base64 string
//   vision: string; 
//   mission: string[]; 
//   faculty: FacultyMember[]; 
//   placementStats: PlacementStat[];
//   careerSupport: string[];
//   labs: Lab[];
//   eventsOrganized: EventOrganized[];
//   sponsoredProjects: SponsoredProject[];
//   facultyAwards: FacultyAward[];
//   studentAwards: StudentAward[];
//   certifications: Certification[];
//   clubs: Club[];
//   research: Research[];
//   contact: Contact;
// }

// // Type guard
// const isDepartment = (data: any): data is Department => {
//   return 'code' in data && 'mission' in data && 'faculty' in data;
// };


// interface DepartmentFormProps {
//   onFormSubmit: (data: FormData) => void;
//   initialData?: Department;
//   onCancel: () => void;
// }

// const DepartmentForm = ({ onFormSubmit, initialData, onCancel }: DepartmentFormProps) => {
//   const [missionPoints, setMissionPoints] = useState<string[]>(['']);
//   const [faculty, setFaculty] = useState<FacultyMember[]>([{ sno: 1, name: '', designation: '' }]);
//   const [placementStats, setPlacementStats] = useState<PlacementStat[]>([{ overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] }]);
//   const [careerSupport, setCareerSupport] = useState<string[]>(['']);
//   const [labs, setLabs] = useState<Lab[]>([{ name: '', image: null }]);
//   const [eventsOrganized, setEventsOrganized] = useState<EventOrganized[]>([{ title: '', description: '' }]);
//   const [sponsoredProjects, setSponsoredProjects] = useState<SponsoredProject[]>([{ principalInvestigator: '', researchProjectName: '', fundingAgency: '' }]);
//   const [facultyAwards, setFacultyAwards] = useState<FacultyAward[]>([{ sno: 1, name: '', count: 0 }]);
//   const [studentAwards, setStudentAwards] = useState<StudentAward[]>([{ sno: 1, awardName: '', studentsCount: 0 }]);
//   const [certifications, setCertifications] = useState<Certification[]>([{ title: '', count: 0 }]);
//   const [clubs, setClubs] = useState<Club[]>([{ clubName: '', description: '', image: null, studentCoordinator: '' }]);
//   const [research, setResearch] = useState<Research[]>([{ sno: 1, patentTitle: '', agency: '', year: '', status: '' }]);
//   const [contact, setContact] = useState<Contact>({ email: '', phone: '', location: '' });

//   // Refs for image inputs to manually clear them if needed
//   const hodImageRef = useRef<HTMLInputElement>(null);
//   const heroImageRef = useRef<HTMLInputElement>(null);
//   // Using an array of refs for dynamic image inputs
//   const labImageRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
//   const clubImageRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);

//   // Initialize form data when editing
//   useEffect(() => {
//     if (initialData && isDepartment(initialData)) {
//       setMissionPoints(initialData.mission && initialData.mission.length > 0 ? initialData.mission : ['']);
//       setFaculty(initialData.faculty && initialData.faculty.length > 0 ? initialData.faculty : [{ sno: 1, name: '', designation: '' }]);
//       setPlacementStats(initialData.placementStats && initialData.placementStats.length > 0 ? initialData.placementStats.map(ps => ({...ps, recruiters: ps.recruiters && ps.recruiters.length > 0 ? ps.recruiters : ['']})) : [{ overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] }]);
//       setCareerSupport(initialData.careerSupport && initialData.careerSupport.length > 0 ? initialData.careerSupport : ['']);
//       setLabs(initialData.labs && initialData.labs.length > 0 ? initialData.labs.map(lab => ({...lab, image: lab.image as string})) : [{ name: '', image: null }]);
//       setEventsOrganized(initialData.eventsOrganized && initialData.eventsOrganized.length > 0 ? initialData.eventsOrganized : [{ title: '', description: '' }]);
//       setSponsoredProjects(initialData.sponsoredProjects && initialData.sponsoredProjects.length > 0 ? initialData.sponsoredProjects : [{ principalInvestigator: '', researchProjectName: '', fundingAgency: '' }]);
//       setFacultyAwards(initialData.facultyAwards && initialData.facultyAwards.length > 0 ? initialData.facultyAwards : [{ sno: 1, name: '', count: 0 }]);
//       setStudentAwards(initialData.studentAwards && initialData.studentAwards.length > 0 ? initialData.studentAwards : [{ sno: 1, awardName: '', studentsCount: 0 }]);
//       setCertifications(initialData.certifications && initialData.certifications.length > 0 ? initialData.certifications : [{ title: '', count: 0 }]);
//       setClubs(initialData.clubs && initialData.clubs.length > 0 ? initialData.clubs.map(club => ({...club, image: club.image as string})) : [{ clubName: '', description: '', image: null, studentCoordinator: '' }]);
//       setResearch(initialData.research && initialData.research.length > 0 ? initialData.research : [{ sno: 1, patentTitle: '', agency: '', year: '', status: '' }]);
//       setContact(initialData.contact || { email: '', phone: '', location: '' });
//     } else {
//       setMissionPoints(['']);
//       setFaculty([{ sno: 1, name: '', designation: '' }]);
//       setPlacementStats([{ overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] }]);
//       setCareerSupport(['']);
//       setLabs([{ name: '', image: null }]);
//       setEventsOrganized([{ title: '', description: '' }]);
//       setSponsoredProjects([{ principalInvestigator: '', researchProjectName: '', fundingAgency: '' }]);
//       setFacultyAwards([{ sno: 1, name: '', count: 0 }]);
//       setStudentAwards([{ sno: 1, awardName: '', studentsCount: 0 }]);
//       setCertifications([{ title: '', count: 0 }]);
//       setClubs([{ clubName: '', description: '', image: null, studentCoordinator: '' }]);
//       setResearch([{ sno: 1, patentTitle: '', agency: '', year: '', status: '' }]);
//       setContact({ email: '', phone: '', location: '' });
//     }
//     // Update labImageRefs and clubImageRefs arrays based on initialData
//     labImageRefs.current = labs.map((_, i) => labImageRefs.current[i] || React.createRef());
//     clubImageRefs.current = clubs.map((_, i) => clubImageRefs.current[i] || React.createRef());

//   }, [initialData]);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);

//     // Filter and stringify array fields
//     formData.set('mission', JSON.stringify(missionPoints.filter(point => point.trim())));
//     formData.set('faculty', JSON.stringify(faculty.filter(f => f.name.trim() && f.designation.trim())));
    
//     // Placement Stats
//     const validPlacementStats = placementStats.filter(ps => ps.overallPlacementPercentage.trim() || ps.highestPackage.trim() || ps.averagePackage.trim() || ps.recruiters.some(r => r.trim()));
//     if (validPlacementStats.length > 0) {
//         formData.set('placementStats', JSON.stringify(validPlacementStats.map(ps => ({
//             ...ps,
//             recruiters: ps.recruiters.filter(r => r.trim())
//         }))));
//     } else {
//         formData.delete('placementStats'); // Ensure empty array is not sent if no data
//     }

//     formData.set('careerSupport', JSON.stringify(careerSupport.filter(point => point.trim())));
//     formData.set('eventsOrganized', JSON.stringify(eventsOrganized.filter(e => e.title.trim() || e.description.trim())));
//     formData.set('sponsoredProjects', JSON.stringify(sponsoredProjects.filter(p => p.principalInvestigator.trim() || p.researchProjectName.trim() || p.fundingAgency.trim())));
//     formData.set('facultyAwards', JSON.stringify(facultyAwards.filter(a => a.name.trim() || a.count > 0)));
//     formData.set('studentAwards', JSON.stringify(studentAwards.filter(a => a.awardName.trim() || a.studentsCount > 0)));
//     formData.set('certifications', JSON.stringify(certifications.filter(c => c.title.trim() || c.count > 0)));
//     formData.set('research', JSON.stringify(research.filter(r => r.patentTitle.trim() || r.agency.trim() || r.year.trim() || r.status.trim())));
    
//     // Contact
//     if (contact.email.trim() || contact.phone.trim() || contact.location.trim()) {
//         formData.set('contact', JSON.stringify(contact));
//     } else {
//         formData.delete('contact'); // Ensure empty object is not sent if no data
//     }


//     // Handle lab images
//     labs.forEach((lab, index) => {
//       // Only append file if it's a new selection (i.e., not a base64 string from initialData)
//       if (lab.file) { 
//         formData.append(`labImages`, lab.file, lab.name || `lab-${index}.jpg`); // Provide a filename
//         formData.append(`labNames`, lab.name);
//       } else if (typeof lab.image === 'string' && lab.name) {
//         // If it's an existing image (base64 string) and has a name, we might want to resend its name to link with potential updates
//         // For existing images without new files, the backend logic should handle it.
//         // If you need to explicitly tell backend "keep this old image", you might need a hidden field
//         // or a different API approach. For now, we only send files if they are newly selected.
//         formData.append(`existingLabNames`, lab.name); // Send existing lab names to help backend identify updates
//       }
//     });
//     // For labs that existed but whose image was removed, or for new labs with no image selected,
//     // the backend needs to handle this by checking if `labImages` are present for each `labName`.


//     // Handle club images
//     clubs.forEach((club, index) => {
//       if (club.file) {
//         formData.append(`clubImages`, club.file, club.clubName || `club-${index}.jpg`); // Provide a filename
//         formData.append(`clubNames`, club.clubName);
//         formData.append(`clubDescriptions`, club.description);
//         formData.append(`clubCoordinators`, club.studentCoordinator);
//       } else if (typeof club.image === 'string' && club.clubName) {
//         formData.append(`existingClubNames`, club.clubName); // Similar to labs, send existing club names
//       }
//     });

//     onFormSubmit(formData);
//   };

//   // Generic handler for array fields
//   const handleArrayChange = <T, K extends keyof T>(
//     setter: React.Dispatch<React.SetStateAction<T[]>>,
//     array: T[],
//     index: number,
//     field: K,
//     value: T[K]
//   ) => {
//     setter(array.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
//   };

//   const addArrayItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, newItem: T) => {
//     setter(prev => [...prev, newItem]);
//   };

//   const removeArrayItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, array: T[], index: number) => {
//     setter(array.filter((_, i) => i !== index));
//   };

//   // Specific handlers for nested arrays (e.g., recruiters within placementStats)
//   const handleRecruiterChange = (placementIndex: number, recruiterIndex: number, value: string) => {
//     setPlacementStats(prevStats => prevStats.map((stat, sIdx) => {
//       if (sIdx === placementIndex) {
//         const newRecruiters = [...stat.recruiters];
//         newRecruiters[recruiterIndex] = value;
//         return { ...stat, recruiters: newRecruiters };
//       }
//       return stat;
//     }));
//   };

//   const addRecruiter = (placementIndex: number) => {
//     setPlacementStats(prevStats => prevStats.map((stat, sIdx) => {
//       if (sIdx === placementIndex) {
//         return { ...stat, recruiters: [...stat.recruiters, ''] };
//       }
//       return stat;
//     }));
//   };

//   const removeRecruiter = (placementIndex: number, recruiterIndex: number) => {
//     setPlacementStats(prevStats => prevStats.map((stat, sIdx) => {
//       if (sIdx === placementIndex) {
//         return { ...stat, recruiters: stat.recruiters.filter((_, rIdx) => rIdx !== recruiterIndex) };
//       }
//       return stat;
//     }));
//   };

//   // Image file change handlers for labs and clubs
//   const handleLabImageChange = (index: number, file: File | null) => {
//     setLabs(prevLabs => prevLabs.map((lab, i) => 
//       i === index ? { ...lab, image: file ? URL.createObjectURL(file) : null, file: file || undefined } : lab
//     ));
//   };

//   const handleClubImageChange = (index: number, file: File | null) => {
//     setClubs(prevClubs => prevClubs.map((club, i) => 
//       i === index ? { ...club, image: file ? URL.createObjectURL(file) : null, file: file || undefined } : club
//     ));
//   };


//   return (
//     <form onSubmit={handleSubmit} style={styles.form}>
//       <h3>Department Details</h3>
//       <div style={styles.formRow}>
//         <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//           <label style={styles.label}>Department Code</label>
//           <input 
//             name="code"
//             defaultValue={initialData?.code}
//             style={styles.input}
//             required
//             placeholder="e.g., cse"
//           />
//         </div>
//         <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//           <label style={styles.label}>Department Name</label>
//           <input 
//             name="name"
//             defaultValue={initialData?.name}
//             style={styles.input}
//             required
//             placeholder="e.g., Computer Science and Engineering"
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>About Department</label>
//         <textarea 
//           name="about"
//           defaultValue={initialData?.about}
//           style={styles.textarea}
//           required
//           placeholder="Enter department description..."
//         />
//       </div>

//       <h3>HOD & Vision/Mission</h3>
//       <div style={styles.formRow}>
//         <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//           <label style={styles.label}>HOD Name</label>
//           <input 
//             name="hodName"
//             defaultValue={initialData?.hodName}
//             style={styles.input}
//             required
//             placeholder="Enter HOD name"
//           />
//         </div>
//         <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//           <label style={styles.label}>Vision</label>
//           <textarea 
//             name="vision"
//             defaultValue={initialData?.vision}
//             style={{...styles.textarea, minHeight: '52px'}}
//             required
//             placeholder="Enter department vision..."
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>HOD Message</label>
//         <textarea 
//           name="hodMessage"
//           defaultValue={initialData?.hodMessage}
//           style={styles.textarea}
//           required
//           placeholder="Enter HOD's message..."
//         />
//       </div>

//       <div style={styles.formRow}>
//         <div style={{flex: 1, marginRight: '10px'}}>
//           <ImageUpload 
//             label="HOD Image"
//             name="hodImage"
//             initialImage={initialData?.hodImage}
//             isRequired={!initialData}
//           />
//         </div>
//         <div style={{flex: 1, marginLeft: '10px'}}>
//           <ImageUpload 
//             label="Department Hero Image"
//             name="heroImage"
//             initialImage={initialData?.heroImage}
//             isRequired={!initialData}
//           />
//         </div>
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Mission Points</label>
//         {missionPoints.map((point, index) => (
//           <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
//             <input 
//               value={point}
//               onChange={(e) => handleArrayChange(setMissionPoints, missionPoints, index, null as any, e.target.value)}
//               style={{...styles.input, flex: 1}}
//               placeholder={`Mission Point ${index + 1}`}
//             />
//             <button 
//               type="button"
//               onClick={() => removeArrayItem(setMissionPoints, missionPoints, index)}
//               style={styles.removeButton}
//               title="Delete Point"
//             >
//               <TrashIcon />
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setMissionPoints, '')} style={styles.addButton}>
//           Add Mission Point
//         </button>
//       </div>

//       <h3>Faculty Members</h3>
//       <div style={styles.formGroup}>
//         {faculty.map((member, index) => (
//           <div key={index} style={{...styles.formRow, marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px'}}>
//             <input 
//               type="number"
//               value={member.sno}
//               onChange={(e) => handleArrayChange(setFaculty, faculty, index, 'sno', parseInt(e.target.value))}
//               style={{...styles.input, flex: 0.5, marginRight: '10px'}}
//               placeholder="S.No"
//             />
//             <input 
//               value={member.name}
//               onChange={(e) => handleArrayChange(setFaculty, faculty, index, 'name', e.target.value)}
//               style={{...styles.input, flex: 2, marginRight: '10px'}}
//               placeholder="Faculty Name"
//             />
//             <input 
//               value={member.designation}
//               onChange={(e) => handleArrayChange(setFaculty, faculty, index, 'designation', e.target.value)}
//               style={{...styles.input, flex: 2}}
//               placeholder="Designation"
//             />
//             <button 
//               type="button"
//               onClick={() => removeArrayItem(setFaculty, faculty, index)}
//               style={styles.removeButton}
//               title="Delete Member"
//             >
//               <TrashIcon />
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setFaculty, { sno: faculty.length + 1, name: '', designation: '' })} style={styles.addButton}>
//           Add Faculty Member
//         </button>
//       </div>

//       <h3>Placement Statistics</h3>
//       <div style={styles.formGroup}>
//         {placementStats.map((stat, statIndex) => (
//           <div key={statIndex} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Overall Placement Percentage</label>
//                 <input 
//                   type="text"
//                   value={stat.overallPlacementPercentage}
//                   onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'overallPlacementPercentage', e.target.value)}
//                   style={styles.input}
//                   placeholder="e.g., 90%"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//                 <label style={styles.label}>Highest Package</label>
//                 <input 
//                   type="text"
//                   value={stat.highestPackage}
//                   onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'highestPackage', e.target.value)}
//                   style={styles.input}
//                   placeholder="e.g., 20 LPA"
//                 />
//               </div>
//             </div>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Average Package</label>
//                 <input 
//                   type="text"
//                   value={stat.averagePackage}
//                   onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'averagePackage', e.target.value)}
//                   style={styles.input}
//                   placeholder="e.g., 7 LPA"
//                 />
//               </div>
//             </div>

//             <div style={styles.formGroup}>
//               <label style={styles.label}>Recruiters</label>
//               {stat.recruiters.map((recruiter, recIndex) => (
//                 <div key={recIndex} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
//                   <input 
//                     type="text"
//                     value={recruiter}
//                     onChange={(e) => handleRecruiterChange(statIndex, recIndex, e.target.value)}
//                     style={{...styles.input, flex: 1}}
//                     placeholder={`Recruiter Name ${recIndex + 1}`}
//                   />
//                   <button 
//                     type="button"
//                     onClick={() => removeRecruiter(statIndex, recIndex)}
//                     style={styles.removeButton}
//                     title="Delete Recruiter"
//                   >
//                     <TrashIcon />
//                   </button>
//                 </div>
//               ))}
//               <button type="button" onClick={() => addRecruiter(statIndex)} style={styles.addButton}>
//                 Add Recruiter
//               </button>
//             </div>
//             {placementStats.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setPlacementStats, placementStats, statIndex)} style={styles.removeSectionButton}>
//                     Remove Placement Stat Section
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setPlacementStats, { overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] })} style={styles.addButton}>
//           Add Placement Stat Section
//         </button>
//       </div>

//       <h3>Career Support</h3>
//       <div style={styles.formGroup}>
//         {careerSupport.map((item, index) => (
//           <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
//             <input 
//               value={item}
//               onChange={(e) => handleArrayChange(setCareerSupport, careerSupport, index, null as any, e.target.value)}
//               style={{...styles.input, flex: 1}}
//               placeholder={`Career Support Point ${index + 1}`}
//             />
//                         <button 
//               type="button"
//               onClick={() => removeArrayItem(setCareerSupport, careerSupport, index)}
//               style={styles.removeButton}
//               title="Delete Point"
//             >
//               <TrashIcon />
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setCareerSupport, '')} style={styles.addButton}>
//           Add Career Support Point
//         </button>
//       </div>

//       <h3>Labs</h3>
//       <div style={styles.formGroup}>
//         {labs.map((lab, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Lab Name</label>
//                 <input 
//                   type="text"
//                   value={lab.name}
//                   onChange={(e) => handleArrayChange(setLabs, labs, index, 'name', e.target.value)}
//                   style={styles.input}
//                   placeholder={`Lab Name ${index + 1}`}
//                 />
//               </div>
//               <div style={{flex: 1, marginLeft: '10px'}}>
//                 <ImageUpload 
//                   label="Lab Image"
//                   name={`labImages-${index}`} // Unique name for each lab image
//                   initialImage={lab.image as string}
//                   onChange={(file) => handleLabImageChange(index, file)}
//                 />
//               </div>
//             </div>
//             {labs.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setLabs, labs, index)} style={styles.removeSectionButton}>
//                     Remove Lab
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setLabs, { name: '', image: null })} style={styles.addButton}>
//           Add Lab
//         </button>
//       </div>

//       <h3>Events Organized</h3>
//       <div style={styles.formGroup}>
//         {eventsOrganized.map((event, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Event Title</label>
//                 <input 
//                   type="text"
//                   value={event.title}
//                   onChange={(e) => handleArrayChange(setEventsOrganized, eventsOrganized, index, 'title', e.target.value)}
//                   style={styles.input}
//                   placeholder={`Event Title ${index + 1}`}
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//                 <label style={styles.label}>Event Description</label>
//                 <textarea 
//                   value={event.description}
//                   onChange={(e) => handleArrayChange(setEventsOrganized, eventsOrganized, index, 'description', e.target.value)}
//                   style={styles.textarea}
//                   placeholder="Enter event description..."
//                 />
//               </div>
//             </div>
//             {eventsOrganized.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setEventsOrganized, eventsOrganized, index)} style={styles.removeSectionButton}>
//                     Remove Event
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setEventsOrganized, { title: '', description: '' })} style={styles.addButton}>
//           Add Event
//         </button>
//       </div>

//       <h3>Sponsored Projects</h3>
//       <div style={styles.formGroup}>
//         {sponsoredProjects.map((project, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Principal Investigator</label>
//                 <input 
//                   type="text"
//                   value={project.principalInvestigator}
//                   onChange={(e) => handleArrayChange(setSponsoredProjects, sponsoredProjects, index, 'principalInvestigator', e.target.value)}
//                   style={styles.input}
//                   placeholder="Principal Investigator's Name"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//                 <label style={styles.label}>Research Project Name</label>
//                 <input 
//                   type="text"
//                   value={project.researchProjectName}
//                   onChange={(e) => handleArrayChange(setSponsoredProjects, sponsoredProjects, index, 'researchProjectName', e.target.value)}
//                   style={styles.input}
//                   placeholder="Project Name"
//                 />
//               </div>
//             </div>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1}}>
//                 <label style={styles.label}>Funding Agency</label>
//                 <input 
//                   type="text"
//                   value={project.fundingAgency}
//                   onChange={(e) => handleArrayChange(setSponsoredProjects, sponsoredProjects, index, 'fundingAgency', e.target.value)}
//                   style={styles.input}
//                   placeholder="Funding Agency"
//                 />
//               </div>
//             </div>
//             {sponsoredProjects.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setSponsoredProjects, sponsoredProjects, index)} style={styles.removeSectionButton}>
//                     Remove Project
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setSponsoredProjects, { principalInvestigator: '', researchProjectName: '', fundingAgency: '' })} style={styles.addButton}>
//           Add Sponsored Project
//         </button>
//       </div>

//       <h3>Faculty Awards</h3>
//       <div style={styles.formGroup}>
//         {facultyAwards.map((award, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 0.5, marginRight: '10px'}}>
//                 <label style={styles.label}>S.No</label>
//                 <input 
//                   type="number"
//                   value={award.sno}
//                   onChange={(e) => handleArrayChange(setFacultyAwards, facultyAwards, index, 'sno', parseInt(e.target.value))}
//                   style={styles.input}
//                   placeholder="S.No"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
//                 <label style={styles.label}>Award Name</label>
//                 <input 
//                   type="text"
//                   value={award.name}
//                   onChange={(e) => handleArrayChange(setFacultyAwards, facultyAwards, index, 'name', e.target.value)}
//                   style={styles.input}
//                   placeholder="Award Name / Faculty Name"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1}}>
//                 <label style={styles.label}>Count</label>
//                 <input 
//                   type="number"
//                   value={award.count}
//                   onChange={(e) => handleArrayChange(setFacultyAwards, facultyAwards, index, 'count', parseInt(e.target.value))}
//                   style={styles.input}
//                   placeholder="Count"
//                 />
//               </div>
//             </div>
//             {facultyAwards.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setFacultyAwards, facultyAwards, index)} style={styles.removeSectionButton}>
//                     Remove Award
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setFacultyAwards, { sno: facultyAwards.length + 1, name: '', count: 0 })} style={styles.addButton}>
//           Add Faculty Award
//         </button>
//       </div>

//       <h3>Student Awards</h3>
//       <div style={styles.formGroup}>
//         {studentAwards.map((award, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 0.5, marginRight: '10px'}}>
//                 <label style={styles.label}>S.No</label>
//                 <input 
//                   type="number"
//                   value={award.sno}
//                   onChange={(e) => handleArrayChange(setStudentAwards, studentAwards, index, 'sno', parseInt(e.target.value))}
//                   style={styles.input}
//                   placeholder="S.No"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
//                 <label style={styles.label}>Award Name</label>
//                 <input 
//                   type="text"
//                   value={award.awardName}
//                   onChange={(e) => handleArrayChange(setStudentAwards, studentAwards, index, 'awardName', e.target.value)}
//                   style={styles.input}
//                   placeholder="Award Name"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1}}>
//                 <label style={styles.label}>Students Count</label>
//                 <input 
//                   type="number"
//                   value={award.studentsCount}
//                   onChange={(e) => handleArrayChange(setStudentAwards, studentAwards, index, 'studentsCount', parseInt(e.target.value))}
//                   style={styles.input}
//                   placeholder="Count"
//                 />
//               </div>
//             </div>
//             {studentAwards.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setStudentAwards, studentAwards, index)} style={styles.removeSectionButton}>
//                     Remove Student Award
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setStudentAwards, { sno: studentAwards.length + 1, awardName: '', studentsCount: 0 })} style={styles.addButton}>
//           Add Student Award
//         </button>
//       </div>

//       <h3>Certifications</h3>
//       <div style={styles.formGroup}>
//         {certifications.map((cert, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
//                 <label style={styles.label}>Certification Title</label>
//                 <input 
//                   type="text"
//                   value={cert.title}
//                   onChange={(e) => handleArrayChange(setCertifications, certifications, index, 'title', e.target.value)}
//                   style={styles.input}
//                   placeholder="Certification Title"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1}}>
//                 <label style={styles.label}>Count</label>
//                 <input 
//                   type="number"
//                   value={cert.count}
//                   onChange={(e) => handleArrayChange(setCertifications, certifications, index, 'count', parseInt(e.target.value))}
//                   style={styles.input}
//                   placeholder="Count"
//                 />
//               </div>
//             </div>
//             {certifications.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setCertifications, certifications, index)} style={styles.removeSectionButton}>
//                     Remove Certification
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setCertifications, { title: '', count: 0 })} style={styles.addButton}>
//           Add Certification
//         </button>
//       </div>

//       <h3>Clubs</h3>
//       <div style={styles.formGroup}>
//         {clubs.map((club, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Club Name</label>
//                 <input 
//                   type="text"
//                   value={club.clubName}
//                   onChange={(e) => handleArrayChange(setClubs, clubs, index, 'clubName', e.target.value)}
//                   style={styles.input}
//                   placeholder={`Club Name ${index + 1}`}
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
//                 <label style={styles.label}>Student Coordinator</label>
//                 <input 
//                   type="text"
//                   value={club.studentCoordinator}
//                   onChange={(e) => handleArrayChange(setClubs, clubs, index, 'studentCoordinator', e.target.value)}
//                   style={styles.input}
//                   placeholder="Student Coordinator"
//                 />
//               </div>
//             </div>
//             <div style={styles.formGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea 
//                 value={club.description}
//                 onChange={(e) => handleArrayChange(setClubs, clubs, index, 'description', e.target.value)}
//                 style={styles.textarea}
//                 placeholder="Enter club description..."
//               />
//             </div>
//             <div style={{flex: 1}}>
//               <ImageUpload 
//                 label="Club Image"
//                 name={`clubImages-${index}`} // Unique name for each club image
//                 initialImage={club.image as string}
//                 onChange={(file) => handleClubImageChange(index, file)}
//               />
//             </div>
//             {clubs.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setClubs, clubs, index)} style={styles.removeSectionButton}>
//                     Remove Club
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setClubs, { clubName: '', description: '', image: null, studentCoordinator: '' })} style={styles.addButton}>
//           Add Club
//         </button>
//       </div>

//       <h3>Research & Patents</h3>
//       <div style={styles.formGroup}>
//         {research.map((item, index) => (
//           <div key={index} style={{...styles.section, marginBottom: '20px'}}>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 0.5, marginRight: '10px'}}>
//                 <label style={styles.label}>S.No</label>
//                 <input 
//                   type="number"
//                   value={item.sno}
//                   onChange={(e) => handleArrayChange(setResearch, research, index, 'sno', parseInt(e.target.value))}
//                   style={styles.input}
//                   placeholder="S.No"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
//                 <label style={styles.label}>Patent/Research Title</label>
//                 <input 
//                   type="text"
//                   value={item.patentTitle}
//                   onChange={(e) => handleArrayChange(setResearch, research, index, 'patentTitle', e.target.value)}
//                   style={styles.input}
//                   placeholder="Patent or Research Title"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1}}>
//                 <label style={styles.label}>Agency</label>
//                 <input 
//                   type="text"
//                   value={item.agency}
//                   onChange={(e) => handleArrayChange(setResearch, research, index, 'agency', e.target.value)}
//                   style={styles.input}
//                   placeholder="Agency"
//                 />
//               </div>
//             </div>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//                 <label style={styles.label}>Year</label>
//                 <input 
//                   type="text"
//                   value={item.year}
//                   onChange={(e) => handleArrayChange(setResearch, research, index, 'year', e.target.value)}
//                   style={styles.input}
//                   placeholder="e.g., 2023"
//                 />
//               </div>
//               <div style={{...styles.formGroup, flex: 1}}>
//                 <label style={styles.label}>Status</label>
//                 <input 
//                   type="text"
//                   value={item.status}
//                   onChange={(e) => handleArrayChange(setResearch, research, index, 'status', e.target.value)}
//                   style={styles.input}
//                   placeholder="e.g., Granted, Pending"
//                 />
//               </div>
//             </div>
//             {research.length > 1 && (
//                 <button type="button" onClick={() => removeArrayItem(setResearch, research, index)} style={styles.removeSectionButton}>
//                     Remove Research Entry
//                 </button>
//             )}
//           </div>
//         ))}
//         <button type="button" onClick={() => addArrayItem(setResearch, { sno: research.length + 1, patentTitle: '', agency: '', year: '', status: '' })} style={styles.addButton}>
//           Add Research Entry
//         </button>
//       </div>

//       <h3>Contact Information</h3>
//       <div style={styles.formGroup}>
//         <div style={styles.formRow}>
//           <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
//             <label style={styles.label}>Email</label>
//             <input 
//               type="email"
//               value={contact.email}
//               onChange={(e) => setContact(prev => ({...prev, email: e.target.value}))}
//               style={styles.input}
//               placeholder="department@example.com"
//             />
//           </div>
//           <div style={{...styles.formGroup, flex: 1}}>
//             <label style={styles.label}>Phone</label>
//             <input 
//               type="text"
//               value={contact.phone}
//               onChange={(e) => setContact(prev => ({...prev, phone: e.target.value}))}
//               style={styles.input}
//               placeholder="+91-1234567890"
//             />
//           </div>
//         </div>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Location</label>
//           <textarea 
//             value={contact.location}
//             onChange={(e) => setContact(prev => ({...prev, location: e.target.value}))}
//             style={styles.textarea}
//             placeholder="Room No, Building, Campus Address"
//           />
//         </div>
//       </div>

//       <div style={styles.formActions}>
//         <button type="submit" style={styles.submitButton}>
//           {initialData ? 'Update Department' : 'Add Department'}
//         </button>
//         <button type="button" onClick={onCancel} style={styles.cancelButton}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// // export default DepartmentForm;

// // --- Inline Styles ---
// // const styles: { [key: string]: CSSProperties } = {
// //   form: {
// //     padding: '20px',
// //     backgroundColor: 'var(--white)',
// //     borderRadius: '8px',
// //     boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
// //     maxWidth: '800px',
// //     margin: '20px auto',
// //     color: 'var(--text-primary)',
// //   },
// //   formRow: {
// //     display: 'flex',
// //     gap: '20px',
// //     marginBottom: '15px',
// //   },
// //   formGroup: {
// //     marginBottom: '15px',
// //     flexDirection: 'column',
// //     display: 'flex',
// //     flex: '1',
// //   },
// //   label: {
// //     display: 'block',
// //     marginBottom: '8px',
// //     fontWeight: '600',
// //     fontSize: '0.9em',
// //     color: 'var(--text-secondary)',
// //   },
// //   input: {
// //     width: '100%',
// //     padding: '10px 12px',
// //     border: '1px solid var(--border-color)',
// //     borderRadius: '5px',
// //     fontSize: '1em',
// //     color: 'var(--text-primary)',
// //     backgroundColor: 'var(--input-bg)',
// //     transition: 'border-color 0.2s',
// //     boxSizing: 'border-box',
// //   },
// //   textarea: {
// //     width: '100%',
// //     padding: '10px 12px',
// //     border: '1px solid var(--border-color)',
// //     borderRadius: '5px',
// //     fontSize: '1em',
// //     color: 'var(--text-primary)',
// //     backgroundColor: 'var(--input-bg)',
// //     transition: 'border-color 0.2s',
// //     minHeight: '80px',
// //     resize: 'vertical',
// //     boxSizing: 'border-box',
// //   },
// //   uploadBox: {
// //     border: '2px dashed var(--border-color)',
// //     borderRadius: '8px',
// //     height: '120px',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     cursor: 'pointer',
// //     backgroundColor: 'var(--input-bg)',
// //     position: 'relative',
// //     overflow: 'hidden',
// //   },
// //   uploadPreview: {
// //     maxWidth: '100%',
// //     maxHeight: '100%',
// //     objectFit: 'contain',
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     width: '100%',
// //     height: '100%',
// //   },
// //   uploadOverlay: {
// //     position: 'absolute',
// //     top: 0,
// //     left: 0,
// //     width: '100%',
// //     height: '100%',
// //     backgroundColor: 'rgba(0,0,0,0.5)',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     color: 'white',
// //     opacity: 0,
// //     transition: 'opacity 0.2s',
// //   },
// //   uploadPlaceholder: {
// //     textAlign: 'center',
// //     color: 'var(--text-secondary)',
// //   },
// //   colorPickerWrapper: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     border: '1px solid var(--border-color)',
// //     borderRadius: '5px',
// //     padding: '5px',
// //     cursor: 'pointer',
// //     backgroundColor: 'var(--input-bg)',
// //   },
// //   colorPickerSwatch: {
// //     width: '30px',
// //     height: '30px',
// //     borderRadius: '3px',
// //     border: '1px solid var(--border-color)',
// //     marginRight: '10px',
// //   },
// //   colorPickerValue: {
// //     color: 'var(--text-primary)',
// //     fontWeight: '500',
// //   },
// //   addButton: {
// //     backgroundColor: 'var(--primary-color)',
// //     color: 'white',
// //     border: 'none',
// //     padding: '10px 15px',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     fontSize: '0.9em',
// //     fontWeight: '500',
// //     marginTop: '10px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '5px',
// //     justifyContent: 'center',
// //   },
// //   removeButton: {
// //     backgroundColor: 'transparent',
// //     color: 'var(--red-color)',
// //     border: 'none',
// //     padding: '5px',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     marginLeft: '10px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   removeSectionButton: {
// //     backgroundColor: 'var(--red-color)',
// //     color: 'white',
// //     border: 'none',
// //     padding: '8px 12px',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     fontSize: '0.85em',
// //     fontWeight: '500',
// //     marginTop: '10px',
// //     display: 'block',
// //     width: 'fit-content',
// //   },
// //   submitButton: {
// //     backgroundColor: 'var(--green-color)',
// //     color: 'white',
// //     border: 'none',
// //     padding: '12px 20px',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     fontSize: '1em',
// //     fontWeight: '600',
// //     marginRight: '10px',
// //   },
// //   cancelButton: {
// //     backgroundColor: 'var(--gray-color)',
// //     color: 'var(--text-primary)',
// //     border: 'none',
// //     padding: '12px 20px',
// //     borderRadius: '5px',
// //     cursor: 'pointer',
// //     fontSize: '1em',
// //     fontWeight: '600',
// //   },
// //   formActions: {
// //     marginTop: '30px',
// //     textAlign: 'right',
// //     borderTop: '1px solid var(--border-color)',
// //     paddingTop: '20px',
// //   },
// //   section: {
// //     border: '1px solid var(--border-color)',
// //     borderRadius: '8px',
// //     padding: '15px',
// //     backgroundColor: 'var(--light-bg)',
// //     position: 'relative',
// //   },
// //   spinner: {
// //     border: '4px solid rgba(0, 0, 0, 0.1)',
// //     borderTop: '4px solid var(--primary-color)',
// //     borderRadius: '50%',
// //     width: '24px',
// //     height: '24px',
// //     animation: 'spin 1s linear infinite',
// //     margin: '20px auto',
// //   },
// //   errorBanner: {
// //     backgroundColor: 'var(--red-color-light)',
// //     color: 'var(--red-color-dark)',
// //     padding: '10px',
// //     borderRadius: '5px',
// //     marginBottom: '15px',
// //     textAlign: 'center',
// //     fontWeight: '500',
// //   }
// // };

// // // Add a keyframes for the spinner animation (if not already defined globally)
// // const styleSheet = document.createElement("style");
// // styleSheet.type = "text/css";
// // styleSheet.innerText = `
// // @keyframes spin {
// //   0% { transform: rotate(0deg); }
// //   100% { transform: rotate(360deg); }
// // }
// // `;
// // document.head.appendChild(styleSheet);



































import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { TbRun } from 'react-icons/tb';

// --- API Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_URL; // IMPORTANT: Change to your backend URL

// --- SVG Icons ---
const Logo = () => <img src="https://upload.wikimedia.org/wikipedia/commons/a/ae/Vignan_logo.png" alt="Vignan's Logo" style={{ height: '45px', width: 'auto' }} />;
const UserProfileIcon = () => <img src="https://i.imgur.com/6VBx3io.png" alt="User Profile" style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer' }} />;
const CrossIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
const EditIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>;
const MenuIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const UploadCloudIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;
const MobileIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
const DesktopIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const PlusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const MinusSquareIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>;


// --- Helper Components ---
const LoadingSpinner = () => <div style={styles.spinner}></div>;
const ErrorMessage = ({ message }: { message: string }) => <div style={styles.errorBanner}>{message}</div>;

// --- Custom Form Controls ---
const ImageUpload = ({ label, name, icon, initialImage, isRequired, multiple = false, onChange }: 
  { label: string; name: string; icon?: React.ReactNode; initialImage?: string | null; isRequired?: boolean; multiple?: boolean; onChange?: (file: File | null) => void; }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { setPreview(initialImage || null); }, [initialImage]);

    return (
        <div style={styles.formGroup}>
            <label style={styles.label}>{label} {icon}</label>
            <div className="upload-box" style={styles.uploadBox} onClick={() => inputRef.current?.click()}>
                <input 
                  ref={inputRef} 
                  type="file" 
                  name={name} 
                  accept="image/*" 
                  onChange={(e) => { 
                    const file = e.target.files?.[0]; 
                    if(file) { 
                      setPreview(URL.createObjectURL(file));
                      onChange && onChange(file);
                    } else if (!multiple) { // Clear preview if single upload and no file selected
                      setPreview(null);
                      onChange && onChange(null);
                    }
                  }} 
                  style={{ display: 'none' }} 
                  required={!initialImage && isRequired}
                  multiple={multiple}
                />
                {preview ? (<>
                    <img src={preview} alt="Preview" style={styles.uploadPreview} />
                    <div className="upload-overlay" style={styles.uploadOverlay}><span>Change Image</span></div>
                </>) : (
                <div style={styles.uploadPlaceholder}><UploadCloudIcon /><span>Upload</span></div>)}
            </div>
        </div>
    );
};

const ColorPicker = ({ name, initialValue = '#3498db' }: { name: string; initialValue?: string }) => {
    const [color, setColor] = useState(initialValue);
    const colorInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => { setColor(initialValue) }, [initialValue]);

    return (
        <div>
            <label style={styles.label}>Background Color</label>
            <div style={styles.colorPickerWrapper} onClick={() => colorInputRef.current?.click()}>
                <div style={{...styles.colorPickerSwatch, backgroundColor: color }}></div>
                <span style={styles.colorPickerValue}>{color}</span>
                <input ref={colorInputRef} type="color" name={name} value={color} onChange={(e) => setColor(e.target.value)} style={{ display: 'none' }} />
            </div>
        </div>
    );
}

const PDFUpload = ({ label, name, initialPDF, onChange }: 
  { label: string; name: string; initialPDF?: string | null; onChange?: (file: File | null) => void; }) => {
    const [pdfName, setPdfName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
      if (initialPDF) {
        // Extract filename from URL or use a default name
        const filename = initialPDF.split('/').pop() || 'existing.pdf';
        setPdfName(filename);
      } else {
        setPdfName(null);
      }
    }, [initialPDF]);

    return (
        <div style={styles.formGroup}>
            <label style={styles.label}>{label}</label>
            <div className="upload-box" style={styles.uploadBox} onClick={() => inputRef.current?.click()}>
                <input 
                  ref={inputRef} 
                  type="file" 
                  name={name} 
                  accept="application/pdf" 
                  onChange={(e) => { 
                    const file = e.target.files?.[0]; 
                    if(file) { 
                      setPdfName(file.name);
                      onChange && onChange(file);
                    } else {
                      setPdfName(null);
                      onChange && onChange(null);
                    }
                  }} 
                  style={{ display: 'none' }} 
                />
                {pdfName ? (
                  <div style={{padding: '20px', textAlign: 'center'}}>
                    <div style={{fontSize: '40px', marginBottom: '10px'}}>📄</div>
                    <div style={{fontSize: '14px', color: 'var(--text-primary)', wordBreak: 'break-word'}}>{pdfName}</div>
                    <div style={{fontSize: '12px', color: 'var(--text-secondary)', marginTop: '5px'}}>Click to change PDF</div>
                  </div>
                ) : (
                  <div style={styles.uploadPlaceholder}><UploadCloudIcon /><span>Upload PDF</span></div>
                )}
            </div>
        </div>
    );
};

// --- TYPE DEFINITIONS ---
interface ImageFile { url: string; key: string; contentType: string; }
interface FacultyMember { sno: number; name: string; designation: string; }
interface RecruiterImage { url: string; key: string; contentType: string; file?: File; }
interface PlacementStat {
    overallPlacementPercentage: string;
    highestPackage: string;
    averagePackage: string;
    recruiters: string[];
}
interface Lab { name: string; image: ImageFile; file?: File; }
interface TeachingAndLearning {
  TALImages: ImageFile;
  TALDescription: string;
  file?: File; // For frontend state management only
}
interface DDCMinute { name: string; pdf: ImageFile; file?: File; }
interface BOSMinute { name: string; pdf: ImageFile; file?: File; }
interface BOSMember { BosMemberName: string; Designation: string; memberStatus: string; }
interface EventOrganized { title: string; description: string; }
interface SponsoredProject { principalInvestigator: string; researchProjectName: string; fundingAgency: string; }
interface FacultyAward { sno: number; name: string; count: number; }
interface StudentAward { sno: number; awardName: string; studentsCount: number; }
interface Certification { title: string; count: number; }
interface Club { clubName: string; description: string; image: ImageFile; studentCoordinator: string; file?: File; }
interface Research { sno: number; patentTitle: string; agency: string; year: string; status: string; }
interface Contact { email: string; phone: string; location: string; }


interface Department { 
  _id: string; 
  code: string; 
  name: string; 
  about: string; 
  hodMessage: string; 
  hodName: string;  
  hodImage: ImageFile; // Base64 string
  heroImage: ImageFile; // Base64 string
  vision: string; 
  mission: string[]; 
  peos: string[]; 
  pos: string[];
  psos: string[];
  teachingAndLearning: TeachingAndLearning[];
  ddcMinutes: DDCMinute[];
  bosMinutes: BOSMinute[];
  bosMinutesMembers: BOSMember[];
  PAQIC?: string;
  faculty: FacultyMember[]; 
  placementStats: PlacementStat[];
  recruiters: RecruiterImage[];
  careerSupport: string[];
  labs: Lab[];
  eventsOrganized: EventOrganized[];
  sponsoredProjects: SponsoredProject[];
  facultyAwards: FacultyAward[];
  studentAwards: StudentAward[];
  certifications: Certification[];
  clubs: Club[];
  research: Research[];
  contact: Contact;
}

// interface ImageFile { url: string; key: string; contentType: string; }
interface NewsEvent { _id: string; type: string; title: string; date: string; description: string; pathlink: string; location: string; image: ImageFile; bgColor: string; }
interface HeroImage { _id: string; number: number; url: string; key: string; contentType: string; }
interface Announcement {_id: string; date: string; title: string; path: string; description: string;}
interface Placement {_id:string; student: string; company: string; package: string; image: ImageFile; companyLogo: ImageFile;}


// Type guard
const isDepartment = (data: any): data is Department => {
  return 'code' in data && 'mission' in data && 'faculty' in data && 'peos' in data && 'pos' in data;
};


interface DepartmentFormProps {
  onFormSubmit: (data: FormData) => void;
  initialData?: Department;
  onCancel: () => void;
}

const DepartmentForm = ({ onFormSubmit, initialData, onCancel }: DepartmentFormProps) => {
  const [missionPoints, setMissionPoints] = useState<string[]>(['']);
  const [peos, setPeos] = useState<string[]>(['']);
  const [pos, setPos] = useState<string[]>(['']);
  const [psos, setPsos] = useState<string[]>(['']);
  const [teachingAndLearning, setTeachingAndLearning] = useState<TeachingAndLearning[]>([{ TALDescription: '', TALImages: { url: '', key: '', contentType: '' } }]);
  const [ddcMinutes, setDdcMinutes] = useState<DDCMinute[]>([{ name: '', pdf: { url: '', key: '', contentType: '' } }]);
  const [bosMinutes, setBosMinutes] = useState<BOSMinute[]>([{ name: '', pdf: { url: '', key: '', contentType: '' } }]);
  const [bosMinutesMembers, setBosMinutesMembers] = useState<BOSMember[]>([{ BosMemberName: '', Designation: '', memberStatus: '' }]);
  const [PAQIC, setPAQIC] = useState<string>('');
  const [faculty, setFaculty] = useState<FacultyMember[]>([{ sno: 1, name: '', designation: '' }]);
  const [recruiters, setRecruiters] = useState<RecruiterImage[]>([]);
  const [placementStats, setPlacementStats] = useState<PlacementStat[]>([{ overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] }]);
  const [careerSupport, setCareerSupport] = useState<string[]>(['']);
  const [labs, setLabs] = useState<Lab[]>([{ name: '', image: null }]);
  const [eventsOrganized, setEventsOrganized] = useState<EventOrganized[]>([{ title: '', description: '' }]);
  const [sponsoredProjects, setSponsoredProjects] = useState<SponsoredProject[]>([{ principalInvestigator: '', researchProjectName: '', fundingAgency: '' }]);
  const [facultyAwards, setFacultyAwards] = useState<FacultyAward[]>([{ sno: 1, name: '', count: 0 }]);
  const [studentAwards, setStudentAwards] = useState<StudentAward[]>([{ sno: 1, awardName: '', studentsCount: 0 }]);
  const [certifications, setCertifications] = useState<Certification[]>([{ title: '', count: 0 }]);
  const [clubs, setClubs] = useState<Club[]>([{ clubName: '', description: '', image: null, studentCoordinator: '' }]);
  const [research, setResearch] = useState<Research[]>([{ sno: 1, patentTitle: '', agency: '', year: '', status: '' }]);
  const [contact, setContact] = useState<Contact>({ email: '', phone: '', location: '' });

  // Refs for image inputs to manually clear them if needed
  const recruiterInputRef = useRef<HTMLInputElement>(null);
  const hodImageRef = useRef<HTMLInputElement>(null);
  const heroImageRef = useRef<HTMLInputElement>(null);
  // Using an array of refs for dynamic image inputs
  const labImageRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const clubImageRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);
  const talImageRefs = useRef<Array<React.RefObject<HTMLInputElement>>>([]);

  // Initialize form data when editing
  useEffect(() => {
    if (initialData && isDepartment(initialData)) {
      setMissionPoints(initialData.mission && initialData.mission.length > 0 ? initialData.mission : ['']);
      setPeos(initialData.peos && initialData.peos.length > 0 ? initialData.peos : ['']);
      setPos(initialData.pos && initialData.pos.length > 0 ? initialData.pos : ['']);
      setPsos(initialData.psos && initialData.psos.length > 0 ? initialData.psos : ['']);
      // ✅ ADD THIS LINE to populate the new state
      setTeachingAndLearning(initialData.teachingAndLearning?.length > 0 ? initialData.teachingAndLearning.map(tal => ({...tal, TALImages: tal.TALImages || {url:'', key:'', contentType:''}})) : [{ TALDescription: '', TALImages: { url: '', key: '', contentType: '' } }]);
      setDdcMinutes(initialData.ddcMinutes?.length > 0 ? initialData.ddcMinutes.map(ddc => ({...ddc, pdf: ddc.pdf || {url:'', key:'', contentType:''}})) : [{ name: '', pdf: { url: '', key: '', contentType: '' } }]);
  setBosMinutes(initialData.bosMinutes?.length > 0 ? initialData.bosMinutes.map(bos => ({...bos, pdf: bos.pdf || {url:'', key:'', contentType:''}})) : [{ name: '', pdf: { url: '', key: '', contentType: '' } }]);
  setBosMinutesMembers(initialData.bosMinutesMembers?.length > 0 ? initialData.bosMinutesMembers : [{ BosMemberName: '', Designation: '', memberStatus: '' }]);
  setPAQIC(initialData.PAQIC || '');
      setFaculty(initialData.faculty && initialData.faculty.length > 0 ? initialData.faculty : [{ sno: 1, name: '', designation: '' }]);
      setPlacementStats(initialData.placementStats?.length > 0 ? initialData.placementStats : [{ overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] }]);
            setRecruiters(initialData.recruiters || []);
      setCareerSupport(initialData.careerSupport && initialData.careerSupport.length > 0 ? initialData.careerSupport : ['']);
      setLabs(initialData.labs && initialData.labs.length > 0 ? initialData.labs.map(lab => ({...lab, image: lab.image as ImageFile})) : [{ name: '', image: { url: '', key: '', contentType: '' } }]);
      setEventsOrganized(initialData.eventsOrganized && initialData.eventsOrganized.length > 0 ? initialData.eventsOrganized : [{ title: '', description: '' }]);
      setSponsoredProjects(initialData.sponsoredProjects && initialData.sponsoredProjects.length > 0 ? initialData.sponsoredProjects : [{ principalInvestigator: '', researchProjectName: '', fundingAgency: '' }]);
      setFacultyAwards(initialData.facultyAwards && initialData.facultyAwards.length > 0 ? initialData.facultyAwards : [{ sno: 1, name: '', count: 0 }]);
      setStudentAwards(initialData.studentAwards && initialData.studentAwards.length > 0 ? initialData.studentAwards : [{ sno: 1, awardName: '', studentsCount: 0 }]);
      setCertifications(initialData.certifications && initialData.certifications.length > 0 ? initialData.certifications : [{ title: '', count: 0 }]);
      setClubs(initialData.clubs && initialData.clubs.length > 0 ? initialData.clubs.map(club => ({...club, image: club.image as ImageFile})) : [{ clubName: '', description: '', image: { url: '', key: '', contentType: '' }, studentCoordinator: '' }]);
      setResearch(initialData.research && initialData.research.length > 0 ? initialData.research : [{ sno: 1, patentTitle: '', agency: '', year: '', status: '' }]);
      setContact(initialData.contact || { email: '', phone: '', location: '' });
    } else {
      setMissionPoints(['']);
      setPeos(['']);
      setPos(['']);
      setPsos(['']);
      setTeachingAndLearning([{ TALDescription: '', TALImages: { url: '', key: '', contentType: '' } }]);
      setDdcMinutes([{ name: '', pdf: { url: '', key: '', contentType: '' } }]);
  setBosMinutes([{ name: '', pdf: { url: '', key: '', contentType: '' } }]);
  setBosMinutesMembers([{ BosMemberName: '', Designation: '', memberStatus: '' }]);
  setPAQIC('');
      setFaculty([{ sno: 1, name: '', designation: '' }]);
      setPlacementStats([{ overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] }]);
      setRecruiters([]);
      setCareerSupport(['']);
      setLabs([{ name: '', image: { url: '', key: '', contentType: '' } }]);
      setEventsOrganized([{ title: '', description: '' }]);
      setSponsoredProjects([{ principalInvestigator: '', researchProjectName: '', fundingAgency: '' }]);
      setFacultyAwards([{ sno: 1, name: '', count: 0 }]);
      setStudentAwards([{ sno: 1, awardName: '', studentsCount: 0 }]);
      setCertifications([{ title: '', count: 0 }]);
      setClubs([{ clubName: '', description: '', image: { url: '', key: '', contentType: '' }, studentCoordinator: '' }]);
      setResearch([{ sno: 1, patentTitle: '', agency: '', year: '', status: '' }]);
      setContact({ email: '', phone: '', location: '' });
    }
    // Update labImageRefs and clubImageRefs arrays based on initialData
    labImageRefs.current = labs.map((_, i) => labImageRefs.current[i] || React.createRef());
    clubImageRefs.current = clubs.map((_, i) => clubImageRefs.current[i] || React.createRef());
    talImageRefs.current = teachingAndLearning.map((_, i) => talImageRefs.current[i] || React.createRef());
  }, [initialData]);

  const safeParseInt = (val: string, fallback = 0) => {
  const n = parseInt(val as string, 10);
  return Number.isNaN(n) ? fallback : n;
  };



  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   // Filter and stringify array fields
  //   formData.set('mission', JSON.stringify(missionPoints.filter(point => point.trim())));
  //   formData.set('peos', JSON.stringify(peos.filter(point => point.trim())));
  //   formData.set('pos', JSON.stringify(pos.filter(point => point.trim())));
  //   formData.set('faculty', JSON.stringify(faculty.filter(f => f.name.trim() && f.designation.trim())));
    
    
  //   // Placement Stats
  //   const validPlacementStats = placementStats.filter(ps => ps.overallPlacementPercentage.trim() || ps.highestPackage.trim() || ps.averagePackage.trim() || ps.recruiters.some(r => r.trim()));
  //   if (validPlacementStats.length > 0) {
  //       formData.set('placementStats', JSON.stringify(validPlacementStats.map(ps => ({
  //           ...ps,
  //           recruiters: ps.recruiters.filter(r => r.trim())
  //       }))));
  //   } else {
  //       formData.delete('placementStats'); // Ensure empty array is not sent if no data
  //   }

  //   formData.set('careerSupport', JSON.stringify(careerSupport.filter(point => point.trim())));
  //   formData.set('eventsOrganized', JSON.stringify(eventsOrganized.filter(e => e.title.trim() || e.description.trim())));
  //   formData.set('sponsoredProjects', JSON.stringify(sponsoredProjects.filter(p => p.principalInvestigator.trim() || p.researchProjectName.trim() || p.fundingAgency.trim())));
  //   formData.set('facultyAwards', JSON.stringify(facultyAwards.filter(a => a.name.trim() || a.count > 0)));
  //   formData.set('studentAwards', JSON.stringify(studentAwards.filter(a => a.awardName.trim() || a.studentsCount > 0)));
  //   formData.set('certifications', JSON.stringify(certifications.filter(c => c.title.trim() || c.count > 0)));
  //   formData.set('research', JSON.stringify(research.filter(r => r.patentTitle.trim() || r.agency.trim() || r.year.trim() || r.status.trim())));
    
  //   // Contact
  //   if (contact.email.trim() || contact.phone.trim() || contact.location.trim()) {
  //       formData.set('contact', JSON.stringify(contact));
  //   } else {
  //       formData.delete('contact'); // Ensure empty object is not sent if no data
  //   }


  //   // Handle lab images
  //   labs.forEach((lab, index) => {
  //     // Only append file if it's a new selection (i.e., not a base64 string from initialData)
  //     if (lab.file) { 
  //       formData.append(`labImages`, lab.file, lab.name || `lab-${index}.jpg`); // Provide a filename
  //       formData.append(`labNames`, lab.name);
  //     } else if (typeof lab.image === 'string' && lab.name) {
  //       // If it's an existing image (base64 string) and has a name, we might want to resend its name to link with potential updates
  //       // For existing images without new files, the backend logic should handle it.
  //       // If you need to explicitly tell backend "keep this old image", you might need a hidden field
  //       // or a different API approach. For now, we only send files if they are newly selected.
  //       formData.append(`existingLabNames`, lab.name); // Send existing lab names to help backend identify updates
  //     }
  //   });
  //   // For labs that existed but whose image was removed, or for new labs with no image selected,
  //   // the backend needs to handle this by checking if `labImages` are present for each `labName`.


  //   // Handle club images
  //   clubs.forEach((club, index) => {
  //     if (club.file) {
  //       formData.append(`clubImages`, club.file, club.clubName || `club-${index}.jpg`); // Provide a filename
  //       formData.append(`clubNames`, club.clubName);
  //       formData.append(`clubDescriptions`, club.description);
  //       formData.append(`clubCoordinators`, club.studentCoordinator);
  //     } else if (typeof club.image === 'string' && club.clubName) {
  //       formData.append(`existingClubNames`, club.clubName); // Similar to labs, send existing club names
  //     }
  //   });

  //   onFormSubmit(formData);
  // };


  // ✅ FIX START: Replace your entire existing handleSubmit function with this one.

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Use the FormData from the event to get the simple text fields like code, name, HOD name, etc.
    const formData = new FormData(e.currentTarget);

    // --- Part 1: Handle all simple and complex array fields by reading directly from STATE ---
    // This is the crucial step. It ensures that any additions or removals you made in the UI
    // are reflected in the data being sent.
    formData.set('mission', JSON.stringify(missionPoints.filter(p => p.trim())));
    formData.set('peos', JSON.stringify(peos.filter(p => p.trim())));
    formData.set('pos', JSON.stringify(pos.filter(p => p.trim())));
    formData.set('psos', JSON.stringify(psos.filter(p => p.trim())));
    // PAQIC (single string)
    if (PAQIC && PAQIC.trim()) {
      formData.set('PAQIC', PAQIC.trim());
    }
    formData.set('faculty', JSON.stringify(faculty.filter(f => f.name.trim() && f.designation.trim())));
    formData.set('careerSupport', JSON.stringify(careerSupport.filter(p => p.trim())));
    formData.set('eventsOrganized', JSON.stringify(eventsOrganized.filter(e => e.title.trim() || e.description.trim())));
    formData.set('sponsoredProjects', JSON.stringify(sponsoredProjects.filter(p => p.principalInvestigator.trim() || p.researchProjectName.trim())));
    formData.set('facultyAwards', JSON.stringify(facultyAwards.filter(a => a.name.trim())));
    formData.set('studentAwards', JSON.stringify(studentAwards.filter(a => a.awardName.trim())));
    formData.set('certifications', JSON.stringify(certifications.filter(c => c.title.trim())));
    formData.set('research', JSON.stringify(research.filter(r => r.patentTitle.trim())));
    formData.set('contact', JSON.stringify(contact));

    // Handle nested arrays within placementStats
    // const validPlacementStats = placementStats.map(ps => ({
    //     ...ps,
    //     recruiters: ps.recruiters.filter(r => r.trim())
    // })).filter(ps => ps.overallPlacementPercentage.trim() || ps.highestPackage.trim() || ps.averagePackage.trim() || ps.recruiters.length > 0);
    // formData.set('placementStats', JSON.stringify(validPlacementStats));

    const validPlacementStats = placementStats.filter(ps => ps.overallPlacementPercentage.trim() || ps.highestPackage.trim() || ps.averagePackage.trim());
    formData.set('placementStats', JSON.stringify(validPlacementStats));


        // ✅ NEW: Synchronize Recruiters with the special signal
    const recruitersData = recruiters.map(rec => {
        // ✅ FIX: If it's a new file (has a .file property), send a special signal.
        if (rec.file) {
            // This tells the backend: "This is a new image. Find the uploaded file with this name."
            return { newImageName: rec.file.name };
        }
        // If it's an existing image, just send its metadata back.
        const { file, ...metadata } = rec; // Exclude the frontend-only 'file' property
        return metadata;
    });
    formData.set('recruiters', JSON.stringify(recruitersData));

    // Append only the new recruiter image files to the FormData object
    recruiters.forEach(rec => {
        if (rec.file) {
            // The third argument (filename) is CRITICAL for the backend to map the file.
            formData.append('recruiterImages', rec.file, rec.file.name);
        }
    });
    //     const recruitersData = recruiters.map(({ file, ...metadata }) => metadata);
    // formData.set('recruiters', JSON.stringify(recruitersData));

    // recruiters.forEach(rec => {
    //     if (rec.file) {
    //         formData.append('recruiterImages', rec.file, rec.file.name);
    //     }
    // });

    // --- Part 2: Handle Labs and Clubs for full synchronization ---
    // This logic precisely matches what your new backend update function expects.

    // Create a clean list of lab metadata from the state, excluding the temporary 'file' property.
    // This gives the backend the full, final list of labs that should exist.
    const labsData = labs
        .filter(lab => lab.name.trim()) // Ignore any empty rows the user might have added
        .map(({ file, ...metadata }) => metadata); // The 'file' property is for frontend use only
    formData.set('labs', JSON.stringify(labsData));

    // Now, attach only the NEW image files. The backend will map them by name.
    labs.forEach(lab => {
        if (lab.file && lab.name.trim()) {
            // The third argument (the filename) is critical. We use the lab name
            // so the backend can correctly map the image file to its metadata.
            formData.append('labImages', lab.file, lab.name);
        }
    });

    // Repeat the exact same logic for clubs
    const clubsData = clubs
        .filter(club => club.clubName.trim())
        .map(({ file, ...metadata }) => metadata);
    formData.set('clubs', JSON.stringify(clubsData));

    clubs.forEach(club => {
        if (club.file && club.clubName.trim()) {
            formData.append('clubImages', club.file, club.clubName);
        }
    });

    const talData = teachingAndLearning
      .filter(item => item.TALDescription.trim()) // Ignore empty rows
      .map(({ file, ...metadata }) => {
        // If a new file was selected for this item...
        if (file) {
          // ...add a special 'newImageName' property to its metadata.
          // This tells the backend to find the uploaded file with this exact name.
          return { ...metadata, newImageName: file.name };
        }
        // If it's an existing item with no new file, just send its old metadata back.
        return metadata;
      });
    // Send the complete, final state of the T&L metadata to the backend.
    formData.set('teachingAndLearning', JSON.stringify(talData));

    // Now, loop again and append ONLY the new image files.
    teachingAndLearning.forEach(item => {
      if (item.file) {
          // The key MUST be 'TALImages' (plural) to match the backend filter.
          // The third argument (the filename) is CRITICAL for the backend to map the file.
          formData.append('TALImages', item.file, item.file.name);
      }
    });

    // DDC Minutes handling
    const ddcData = ddcMinutes
      .filter(item => item.name.trim())
      .map(({ file, ...metadata }) => {
        if (file) {
          return { ...metadata, newPDFName: file.name };
        }
        return metadata;
      });
    formData.set('ddcMinutes', JSON.stringify(ddcData));
    ddcMinutes.forEach(item => {
      if (item.file) {
        formData.append('ddcMinutePDFs', item.file, item.name);
      }
    });

    // BOS Minutes handling
    // BOS Minutes Members (metadata only)
    const bosMembersData = bosMinutesMembers
      .filter(m => m.BosMemberName.trim() || m.Designation.trim() || m.memberStatus.trim());
    if (bosMembersData.length > 0) {
      formData.set('bosMinutesMembers', JSON.stringify(bosMembersData));
    }
    
    const bosData = bosMinutes
      .filter(item => item.name.trim())
      .map(({ file, ...metadata }) => {
        if (file) {
          return { ...metadata, newPDFName: file.name };
        }
        return metadata;
      });
    formData.set('bosMinutes', JSON.stringify(bosData));
    bosMinutes.forEach(item => {
      if (item.file) {
        formData.append('bosMinutePDFs', item.file, item.name);
      }
    });

    // Finally, submit the fully prepared FormData object
    onFormSubmit(formData);
};

// ✅ FIX END

  // Generic handler for array fields
  const handleArrayChange = <T, K extends keyof T>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    array: T[],
    index: number,
    field: K,
    value: T[K]
  ) => {
    setter(array.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const addArrayItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, newItem: T) => {
    setter(prev => [...prev, newItem]);
  };

  const removeArrayItem = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, array: T[], index: number) => {
    setter(array.filter((_, i) => i !== index));
  };

  // Specific handlers for nested arrays (e.g., recruiters within placementStats)
  // const handleRecruiterChange = (placementIndex: number, recruiterIndex: number, value: string) => {
  //   setPlacementStats(prevStats => prevStats.map((stat, sIdx) => {
  //     if (sIdx === placementIndex) {
  //       const newRecruiters = [...stat.recruiters];
  //       newRecruiters[recruiterIndex] = value;
  //       return { ...stat, recruiters: newRecruiters };
  //     }
  //     return stat;
  //   }));
  // };

  // const addRecruiter = (placementIndex: number) => {
  //   setPlacementStats(prevStats => prevStats.map((stat, sIdx) => {
  //     if (sIdx === placementIndex) {
  //       return { ...stat, recruiters: [...stat.recruiters, ''] };
  //     }
  //     return stat;
  //   }));
  // };

  // const removeRecruiter = (placementIndex: number, recruiterIndex: number) => {
  //   setPlacementStats(prevStats => prevStats.map((stat, sIdx) => {
  //     if (sIdx === placementIndex) {
  //       return { ...stat, recruiters: stat.recruiters.filter((_, rIdx) => rIdx !== recruiterIndex) };
  //     }
  //     return stat;
  //   }));
  // };

    const handleAddRecruiterImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newRecruiters: RecruiterImage[] = files.map(file => ({
        file: file,
        url: URL.createObjectURL(file), // Temporary preview URL
        key: '', 
        contentType: file.type,
      }));
      setRecruiters(prev => [...prev, ...newRecruiters]);
    }
  };

    const handleRemoveRecruiter = (indexToRemove: number) => {
    setRecruiters(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  // Image file change handlers for labs and clubs

      const handleLabImageChange = (index: number, file: File | null) => {
    setLabs(prevLabs =>
      prevLabs.map((lab, i) => {
        if (i === index) {
          if (file) {
            // Create a preview URL and store the file for submission
            return {
              ...lab,
              image: { ...lab.image, url: URL.createObjectURL(file) },
              file: file,
            };
          } else {
            // If the file is cleared, reset the image and file properties
            return {
              ...lab,
              image: { url: '', key: '', contentType: '' },
              file: undefined,
            };
          }
        }
        return lab;
      })
    );
  };


  // const handleLabImageChange = (index: number, file: File | null) => {
  //   setLabs(prevLabs => prevLabs.map((lab, i) => 
  //     i === index ? { ...lab, image: file ? URL.createObjectURL(file) : null, file: file || undefined } : lab
  //   ));
  // };

  // const handleClubImageChange = (index: number, file: File | null) => {
  //   setClubs(prevClubs => prevClubs.map((club, i) => 
  //     i === index ? { ...club, image: file ? URL.createObjectURL(file) : null, file: file || undefined } : club
  //   ));
  // };


    const handleClubImageChange = (index: number, file: File | null) => {
    setClubs(prevClubs =>
      prevClubs.map((club, i) => {
        if (i === index) {
          if (file) {
            // Create a preview URL and store the file for submission
            return {
              ...club,
              image: { ...club.image, url: URL.createObjectURL(file) },
              file: file,
            };
          } else {
            // If the file is cleared, reset the image and file properties
            return {
              ...club,
              image: { url: '', key: '', contentType: '' },
              file: undefined,
            };
          }
        }
        return club;
      })
    );
  };


  const handleTALImageChange = (index: number, file: File | null) => {
    setTeachingAndLearning(prevTAL =>
      prevTAL.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            TALImages: file ? { ...item.TALImages, url: URL.createObjectURL(file) } : { url: '', key: '', contentType: '' },
            file: file || undefined,
          };
        }
        return item;
      })
    );
  };

  const handleDDCPDFChange = (index: number, file: File | null) => {
    setDdcMinutes(prevDDC =>
      prevDDC.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            pdf: file ? { ...item.pdf, url: URL.createObjectURL(file) } : { url: '', key: '', contentType: '' },
            file: file || undefined,
          };
        }
        return item;
      })
    );
  };

  const handleBOSPDFChange = (index: number, file: File | null) => {
    setBosMinutes(prevBOS =>
      prevBOS.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            pdf: file ? { ...item.pdf, url: URL.createObjectURL(file) } : { url: '', key: '', contentType: '' },
            file: file || undefined,
          };
        }
        return item;
      })
    );
  };


  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Department Details</h3>
      <div style={styles.formRow}>
        <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
          <label style={styles.label}>Department Code</label>
          <input 
            name="code"
            defaultValue={initialData?.code}
            style={styles.input}
            required
            placeholder="e.g., cse"
          />
        </div>
        <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
          <label style={styles.label}>Department Name</label>
          <input 
            name="name"
            defaultValue={initialData?.name}
            style={styles.input}
            required
            placeholder="e.g., Computer Science and Engineering"
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>About Department</label>
        <textarea 
          name="about"
          defaultValue={initialData?.about}
          style={styles.textarea}
          required
          placeholder="Enter department description..."
        />
      </div>

      <h3>HOD & Vision/Mission</h3>
      <div style={styles.formRow}>
        <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
          <label style={styles.label}>HOD Name</label>
          <input 
            name="hodName"
            defaultValue={initialData?.hodName}
            style={styles.input}
            required
            placeholder="Enter HOD name"
          />
        </div>
        <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
          <label style={styles.label}>Vision</label>
          <textarea 
            name="vision"
            defaultValue={initialData?.vision}
            style={{...styles.textarea, minHeight: '52px'}}
            required
            placeholder="Enter department vision..."
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>HOD Message</label>
        <textarea 
          name="hodMessage"
          defaultValue={initialData?.hodMessage}
          style={styles.textarea}
          required
          placeholder="Enter HOD's message..."
        />
      </div>

      <div style={styles.formRow}>
        <div style={{flex: 1, marginRight: '10px'}}>
          <ImageUpload 
            label="HOD Image"
            name="hodImage"
            initialImage={initialData?.hodImage?.url}
            isRequired={!initialData}
          />
        </div>
        <div style={{flex: 1, marginLeft: '10px'}}>
          <ImageUpload 
            label="Department Hero Image"
            name="heroImage"
            initialImage={initialData?.heroImage?.url}
            isRequired={!initialData}
          />
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Mission Points</label>
        {missionPoints.map((point, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <input 
              value={point}
              // FIX START: Directly update the string array for missionPoints
              onChange={(e) => {
                const newMissionPoints = [...missionPoints];
                newMissionPoints[index] = e.target.value;
                setMissionPoints(newMissionPoints);
              }}
              // FIX END
              style={{...styles.input, flex: 1}}
              placeholder={`Mission Point ${index + 1}`}
            />
            <button 
              type="button"
              onClick={() => removeArrayItem(setMissionPoints, missionPoints, index)}
              style={styles.removeButton}
              title="Delete Point"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setMissionPoints, '')} style={styles.addButton}>
          Add Mission Point
        </button>
      </div>


      <div style={styles.formGroup}>
        <label style={styles.label}>PEOs</label>
        {peos.map((point, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <input 
              value={point}
              onChange={(e) => {
                const newPeos = [...peos];
                newPeos[index] = e.target.value;
                setPeos(newPeos);
              }}
              style={{...styles.input, flex: 1}}
              placeholder={`PEO ${index + 1}`}
            />
            <button 
              type="button"
              onClick={() => removeArrayItem(setPeos, peos, index)}
              style={styles.removeButton}
              title="Delete Point"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setPeos, '')} style={styles.addButton}>
          Add PEO
        </button>
      </div>


      <div style={styles.formGroup}>
        <label style={styles.label}>PSOs</label>
        {pos.map((point, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <input 
              value={point}
              onChange={(e) => {
                const newPos = [...pos];
                newPos[index] = e.target.value;
                setPos(newPos);
              }}
              style={{...styles.input, flex: 1}}
              placeholder={`PSO ${index + 1}`}
            />
            <button 
              type="button"
              onClick={() => removeArrayItem(setPos, pos, index)}
              style={styles.removeButton}
              title="Delete Point"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setPos, '')} style={styles.addButton}>
          Add PSO
        </button>
      </div>


            <div style={styles.formGroup}>
        <label style={styles.label}>POs</label>
        {psos.map((point, index) => (
          <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
            <input 
              value={point}
              onChange={(e) => {
                const newPsos = [...psos];
                newPsos[index] = e.target.value;
                setPsos(newPsos);
              }}
              style={{...styles.input, flex: 1}}
              placeholder={`PO ${index + 1}`}
            />
            <button 
              type="button"
              onClick={() => removeArrayItem(setPsos, psos, index)}
              style={styles.removeButton}
              title="Delete Point"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setPsos, '')} style={styles.addButton}>
          Add PO
        </button>
      </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>PAQIC</label>
          <input
            type="text"
            value={PAQIC}
            onChange={(e) => setPAQIC(e.target.value)}
            style={styles.input}
            placeholder="Enter PAQIC"
          />
        </div>


      <h3>Teaching & Learning</h3>
      <div style={styles.formGroup}>
        {teachingAndLearning.map((item, index) => (
          <div key={index} style={{...styles.section, marginBottom: '20px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea 
                value={item.TALDescription}
                onChange={(e) => handleArrayChange(setTeachingAndLearning, teachingAndLearning, index, 'TALDescription', e.target.value)}
                style={styles.textarea}
                placeholder="Enter a description for the image..."
              />
            </div>
            <div style={{flex: 1}}>
              <ImageUpload 
                label="Image"
                name={`TALImages-${index}`} // Unique name for each image
                initialImage={item.TALImages?.url}
                onChange={(file) => handleTALImageChange(index, file)}
              />
            </div>
            {teachingAndLearning.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setTeachingAndLearning, teachingAndLearning, index)} style={styles.removeSectionButton}>
                  Remove Entry
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setTeachingAndLearning, { TALDescription: '', TALImages: { url: '', key: '', contentType: '' } })} style={styles.addButton}>
          Add Teaching & Learning Entry
        </button>
      </div>  

      <h3>DDC Minutes</h3>
      <div style={styles.formGroup}>
        {ddcMinutes.map((item, index) => (
          <div key={index} style={{...styles.section, marginBottom: '20px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Minute Name</label>
              <input 
                value={item.name}
                onChange={(e) => handleArrayChange(setDdcMinutes, ddcMinutes, index, 'name', e.target.value)}
                style={styles.input}
                placeholder="Enter DDC minute name..."
              />
            </div>
            <div style={{flex: 1}}>
              <PDFUpload 
                label="PDF File"
                name={`ddcPDF-${index}`}
                initialPDF={item.pdf?.url}
                onChange={(file) => handleDDCPDFChange(index, file)}
              />
            </div>
            {ddcMinutes.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setDdcMinutes, ddcMinutes, index)} style={styles.removeSectionButton}>
                  Remove DDC Minute
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setDdcMinutes, { name: '', pdf: { url: '', key: '', contentType: '' } })} style={styles.addButton}>
          Add DDC Minute
        </button>
      </div>

      <h3>BOS Members</h3>
      <div style={styles.formGroup}>
        {bosMinutesMembers.map((member, index) => (
          <div key={index} style={{...styles.section, marginBottom: '12px'}}>
            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
                <label style={styles.label}>Member Name</label>
                <input
                  value={member.BosMemberName}
                  onChange={(e) => handleArrayChange(setBosMinutesMembers, bosMinutesMembers, index, 'BosMemberName', e.target.value)}
                  style={styles.input}
                  placeholder="Enter member name"
                />
              </div>
              <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
                <label style={styles.label}>Designation</label>
                <input
                  value={member.Designation}
                  onChange={(e) => handleArrayChange(setBosMinutesMembers, bosMinutesMembers, index, 'Designation', e.target.value)}
                  style={styles.input}
                  placeholder="Enter designation"
                />
              </div>
              <div style={{...styles.formGroup, flex: 1}}>
                <label style={styles.label}>Member Status</label>
                <input
                  value={member.memberStatus}
                  onChange={(e) => handleArrayChange(setBosMinutesMembers, bosMinutesMembers, index, 'memberStatus', e.target.value)}
                  style={styles.input}
                  placeholder="Enter member status"
                />
              </div>
            </div>
            {bosMinutesMembers.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setBosMinutesMembers, bosMinutesMembers, index)} style={styles.removeSectionButton}>
                Remove Member
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setBosMinutesMembers, { BosMemberName: '', Designation: '', memberStatus: '' })} style={styles.addButton}>
          Add BOS Member
        </button>
      </div>

      <h3>BOS Minutes</h3>
      <div style={styles.formGroup}>
        {bosMinutes.map((item, index) => (
          <div key={index} style={{...styles.section, marginBottom: '20px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Minute Name</label>
              <input 
                value={item.name}
                onChange={(e) => handleArrayChange(setBosMinutes, bosMinutes, index, 'name', e.target.value)}
                style={styles.input}
                placeholder="Enter BOS minute name..."
              />
            </div>
            <div style={{flex: 1}}>
              <PDFUpload 
                label="PDF File"
                name={`bosPDF-${index}`}
                initialPDF={item.pdf?.url}
                onChange={(file) => handleBOSPDFChange(index, file)}
              />
            </div>
            {bosMinutes.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setBosMinutes, bosMinutes, index)} style={styles.removeSectionButton}>
                  Remove BOS Minute
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setBosMinutes, { name: '', pdf: { url: '', key: '', contentType: '' } })} style={styles.addButton}>
          Add BOS Minute
        </button>
      </div>


      <h3>Faculty Members</h3>
      <div style={styles.formGroup}>
        {faculty.map((member, index) => (
          <div key={index} style={{...styles.formRow, marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px'}}>
            <input 
              type="number"
              value={member.sno ?? ''}
              onChange={(e) => handleArrayChange(setFaculty, faculty, index, 'sno', safeParseInt(e.target.value))}
              style={{...styles.input, flex: 0.5, marginRight: '10px'}}
              placeholder="S.No"
            />
            <input 
              value={member.name}
              onChange={(e) => handleArrayChange(setFaculty, faculty, index, 'name', e.target.value)}
              style={{...styles.input, flex: 2, marginRight: '10px'}}
              placeholder="Faculty Name"
            />
            <input 
              value={member.designation}
              onChange={(e) => handleArrayChange(setFaculty, faculty, index, 'designation', e.target.value)}
              style={{...styles.input, flex: 2}}
              placeholder="Designation"
            />
            <button 
              type="button"
              onClick={() => removeArrayItem(setFaculty, faculty, index)}
              style={styles.removeButton}
              title="Delete Member"
            >
              <TrashIcon />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setFaculty, { sno: faculty.length + 1, name: '', designation: '' })} style={styles.addButton}>
          Add Faculty Member
        </button>
      </div>

      {/* <h3>Placement Statistics</h3>
      <div style={styles.formGroup}>
        {placementStats.map((stat, statIndex) => (
          <div key={statIndex} style={{...styles.section, marginBottom: '20px'}}>
            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                <label style={styles.label}>Overall Placement Percentage</label>
                <input 
                  type="text"
                  value={stat.overallPlacementPercentage}
                  onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'overallPlacementPercentage', e.target.value)}
                  style={styles.input}
                  placeholder="e.g., 90%"
                />
              </div>
              <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
                <label style={styles.label}>Highest Package</label>
                <input 
                  type="text"
                  value={stat.highestPackage}
                  onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'highestPackage', e.target.value)}
                  style={styles.input}
                  placeholder="e.g., 20 LPA"
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                <label style={styles.label}>Average Package</label>
                <input 
                  type="text"
                  value={stat.averagePackage}
                  onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'averagePackage', e.target.value)}
                  style={styles.input}
                  placeholder="e.g., 7 LPA"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Recruiters</label>
              {stat.recruiters.map((recruiter, recIndex) => (
                <div key={recIndex} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                  <input 
                    type="text"
                  value={recruiter}
                  onChange={(e) => handleRecruiterChange(statIndex, recIndex, e.target.value)}
                  style={{...styles.input, flex: 1}}
                  placeholder={`Recruiter Name ${recIndex + 1}`}
                />
                <button 
                  type="button"
                  onClick={() => removeRecruiter(statIndex, recIndex)}
                  style={styles.removeButton}
                  title="Delete Recruiter"
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addRecruiter(statIndex)} style={styles.addButton}>
              Add Recruiter
            </button>
          </div>
          {placementStats.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setPlacementStats, placementStats, statIndex)} style={styles.removeSectionButton}>
                  Remove Placement Stat Section
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setPlacementStats, { overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] })} style={styles.addButton}>
        Add Placement Stat Section
      </button>
    </div> */}

          <h3>Placement Statistics</h3>
      <div style={styles.formGroup}>
        {placementStats.map((stat, statIndex) => (
          <div key={statIndex} style={{...styles.section, marginBottom: '20px'}}>
            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                <label style={styles.label}>Overall Placement Percentage</label>
                <input type="text" value={stat.overallPlacementPercentage} onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'overallPlacementPercentage', e.target.value)} style={styles.input} placeholder="e.g., 90%" />
              </div>
              <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
                <label style={styles.label}>Highest Package</label>
                <input type="text" value={stat.highestPackage} onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'highestPackage', e.target.value)} style={styles.input} placeholder="e.g., 20 LPA"/>
              </div>
            </div>
             <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                <label style={styles.label}>Average Package</label>
                <input type="text" value={stat.averagePackage} onChange={(e) => handleArrayChange(setPlacementStats, placementStats, statIndex, 'averagePackage', e.target.value)} style={styles.input} placeholder="e.g., 7 LPA"/>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setPlacementStats, { overallPlacementPercentage: '', highestPackage: '', averagePackage: '', recruiters: [''] })} style={styles.addButton}>
          Add Placement Stat Section
        </button>
      </div>

      {/* ✅ NEW: Dedicated section for Recruiter Images */}
      <h3>Recruiters</h3>
      <div style={styles.formGroup}>
        <div style={recruiterStyles.grid}>
          {recruiters.map((recruiter, index) => (
            <div key={index} style={recruiterStyles.card}>
              <img src={recruiter.url} alt="Recruiter logo" style={recruiterStyles.image} />
              <button
                type="button"
                onClick={() => handleRemoveRecruiter(index)}
                style={recruiterStyles.deleteButton}
                title="Remove Recruiter"
              >
                <CrossIcon />
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={recruiterInputRef}
          onChange={handleAddRecruiterImages}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => recruiterInputRef.current?.click()}
          style={styles.addButton}
        >
          Add Recruiter Images
        </button>
      </div>

    <h3>Career Support</h3>
    <div style={styles.formGroup}>
      {careerSupport.map((item, index) => (
        <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
          <input 
            value={item}
            // FIX START: Directly update the string array for careerSupport
            onChange={(e) => {
              const newCareerSupport = [...careerSupport];
              newCareerSupport[index] = e.target.value;
              setCareerSupport(newCareerSupport);
            }}
            // FIX END
            style={{...styles.input, flex: 1}}
            placeholder={`Career Support Point ${index + 1}`}
          />
                      <button 
            type="button"
            onClick={() => removeArrayItem(setCareerSupport, careerSupport, index)}
            style={styles.removeButton}
            title="Delete Point"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setCareerSupport, '')} style={styles.addButton}>
        Add Career Support Point
      </button>
    </div>

    {/* <h3>Labs</h3>
    <div style={styles.formGroup}>
      {labs.map((lab, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
              <label style={styles.label}>Lab Name</label>
              <input 
                type="text"
                value={lab.name}
                onChange={(e) => handleArrayChange(setLabs, labs, index, 'name', e.target.value)}
                style={styles.input}
                placeholder={`Lab Name ${index + 1}`}
              />
            </div>
            <div style={{flex: 1, marginLeft: '10px'}}>
              <ImageUpload 
                label="Lab Image"
                name={`labImages-${index}`} // Unique name for each lab image
                initialImage={lab.image.url || (typeof lab.image === 'string' ? lab.image : '')}
                onChange={(file) => handleLabImageChange(index, file)}
              />
            </div>
          </div>
          {labs.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setLabs, labs, index)} style={styles.removeSectionButton}>
                  Remove Lab
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setLabs, { name: '', image: null })} style={styles.addButton}>
        Add Lab
      </button>
    </div> */}

    <h3>Labs</h3>
      <div style={styles.formGroup}>
        {labs.map((lab, index) => (
          <div key={index} style={{...styles.section, marginBottom: '20px'}}>
            <div style={styles.formRow}>
              <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                <label style={styles.label}>Lab Name</label>
                <input
                  type="text"
                  value={lab.name}
                  onChange={(e) => handleArrayChange(setLabs, labs, index, 'name', e.target.value)}
                  style={styles.input}
                  placeholder={`Lab Name ${index + 1}`}
                />
              </div>
              <div style={{flex: 1, marginLeft: '10px'}}>
                <ImageUpload
                  label="Lab Image"
                  name={`labImages-${index}`} // Unique name for each lab image
                  initialImage={lab.image ? lab.image.url : ''}
                  onChange={(file) => handleLabImageChange(index, file)}
                />
              </div>
            </div>
            {labs.length > 1 && (
                <button type="button" onClick={() => removeArrayItem(setLabs, labs, index)} style={styles.removeSectionButton}>
                    Remove Lab
                </button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem(setLabs, { name: '', image: { url: '', key: '', contentType: '' } })} style={styles.addButton}>
          Add Lab
        </button>
      </div>



    <h3>Events Organized</h3>
    <div style={styles.formGroup}>
      {eventsOrganized.map((event, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
              <label style={styles.label}>Event Title</label>
              <input 
                type="text"
                value={event.title}
                onChange={(e) => handleArrayChange(setEventsOrganized, eventsOrganized, index, 'title', e.target.value)}
                style={styles.input}
                placeholder={`Event Title ${index + 1}`}
              />
            </div>
            <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
              <label style={styles.label}>Event Description</label>
              <textarea 
                value={event.description}
                onChange={(e) => handleArrayChange(setEventsOrganized, eventsOrganized, index, 'description', e.target.value)}
                style={styles.textarea}
                placeholder="Enter event description..."
              />
            </div>
          </div>
          {eventsOrganized.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setEventsOrganized, eventsOrganized, index)} style={styles.removeSectionButton}>
                  Remove Event
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setEventsOrganized, { title: '', description: '' })} style={styles.addButton}>
        Add Event
      </button>
    </div>

    <h3>Sponsored Projects</h3>
    <div style={styles.formGroup}>
      {sponsoredProjects.map((project, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
              <label style={styles.label}>Principal Investigator</label>
              <input 
                type="text"
                value={project.principalInvestigator}
                onChange={(e) => handleArrayChange(setSponsoredProjects, sponsoredProjects, index, 'principalInvestigator', e.target.value)}
                style={styles.input}
                placeholder="Principal Investigator's Name"
              />
            </div>
            <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
              <label style={styles.label}>Research Project Name</label>
              <input 
                type="text"
                value={project.researchProjectName}
                onChange={(e) => handleArrayChange(setSponsoredProjects, sponsoredProjects, index, 'researchProjectName', e.target.value)}
                style={styles.input}
                placeholder="Project Name"
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Funding Agency</label>
              <input 
                type="text"
                value={project.fundingAgency}
                onChange={(e) => handleArrayChange(setSponsoredProjects, sponsoredProjects, index, 'fundingAgency', e.target.value)}
                style={styles.input}
                placeholder="Funding Agency"
              />
            </div>
          </div>
          {sponsoredProjects.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setSponsoredProjects, sponsoredProjects, index)} style={styles.removeSectionButton}>
                  Remove Project
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setSponsoredProjects, { principalInvestigator: '', researchProjectName: '', fundingAgency: '' })} style={styles.addButton}>
        Add Sponsored Project
      </button>
    </div>

    <h3>Faculty Awards</h3>
    <div style={styles.formGroup}>
      {facultyAwards.map((award, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            
            <div style={{...styles.formGroup, flex: 0.5, marginRight: '10px'}}>
              <label style={styles.label}>S.No</label>
              <input 
                type="number"
                value={award.sno ?? ''}
                onChange={(e) => handleArrayChange(setFacultyAwards, facultyAwards, index, 'sno', safeParseInt(e.target.value))}
                style={styles.input}
                placeholder="S.No"
              />
            </div>
            <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
              <label style={styles.label}>Award Name</label>
              <input 
                type="text"
                value={award.name}
                onChange={(e) => handleArrayChange(setFacultyAwards, facultyAwards, index, 'name', e.target.value)}
                style={styles.input}
                placeholder="Award Name / Faculty Name"
              />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Count</label>
              <input 
                type="number"
                value={award.count ?? ''}
                onChange={(e) => handleArrayChange(setFacultyAwards, facultyAwards, index, 'count', safeParseInt(e.target.value))}
                style={styles.input}
                placeholder="Count"
              />
            </div>
          </div>
          {facultyAwards.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setFacultyAwards, facultyAwards, index)} style={styles.removeSectionButton}>
                  Remove Award
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setFacultyAwards, { sno: facultyAwards.length + 1, name: '', count: 0 })} style={styles.addButton}>
        Add Faculty Award
      </button>
    </div>

    <h3>Student Awards</h3>
    <div style={styles.formGroup}>
      {studentAwards.map((award, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 0.5, marginRight: '10px'}}>
              <label style={styles.label}>S.No</label>
              <input 
                type="number"
                value={award.sno ?? ''}
                onChange={(e) => handleArrayChange(setStudentAwards, studentAwards, index, 'sno', safeParseInt(e.target.value))}
                style={styles.input}
                placeholder="S.No"
              />
            </div>
            <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
              <label style={styles.label}>Award Name</label>
              <input 
                type="text"
                value={award.awardName}
                onChange={(e) => handleArrayChange(setStudentAwards, studentAwards, index, 'awardName', e.target.value)}
                style={styles.input}
                placeholder="Award Name"
              />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Students Count</label>
              <input 
                type="number"
                value={award.studentsCount ?? ''}
                onChange={(e) => handleArrayChange(setStudentAwards, studentAwards, index, 'studentsCount', safeParseInt(e.target.value))}
                style={styles.input}
                placeholder="Count"
              />
            </div>
          </div>
          {studentAwards.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setStudentAwards, studentAwards, index)} style={styles.removeSectionButton}>
                  Remove Student Award
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setStudentAwards, { sno: studentAwards.length + 1, awardName: '', studentsCount: 0 })} style={styles.addButton}>
        Add Student Award
      </button>
    </div>

    <h3>Certifications</h3>
    <div style={styles.formGroup}>
      {certifications.map((cert, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
              <label style={styles.label}>Certification Title</label>
              <input 
                type="text"
                value={cert.title}
                onChange={(e) => handleArrayChange(setCertifications, certifications, index, 'title', e.target.value)}
                style={styles.input}
                placeholder="Certification Title"
              />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Count</label>
              <input 
                type="number"
                value={cert.count ?? ''}
                onChange={(e) => handleArrayChange(setCertifications, certifications, index, 'count', safeParseInt(e.target.value))}
                style={styles.input}
                placeholder="Count"
              />
            </div>
          </div>
          {certifications.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setCertifications, certifications, index)} style={styles.removeSectionButton}>
                  Remove Certification
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setCertifications, { title: '', count: 0 })} style={styles.addButton}>
        Add Certification
      </button>
    </div>

    {/* <h3>Clubs</h3>
    <div style={styles.formGroup}>
      {clubs.map((club, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
              <label style={styles.label}>Club Name</label>
              <input 
                type="text"
                value={club.clubName}
                onChange={(e) => handleArrayChange(setClubs, clubs, index, 'clubName', e.target.value)}
                style={styles.input}
                placeholder={`Club Name ${index + 1}`}
              />
            </div>
            <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
              <label style={styles.label}>Student Coordinator</label>
              <input 
                type="text"
                value={club.studentCoordinator}
                onChange={(e) => handleArrayChange(setClubs, clubs, index, 'studentCoordinator', e.target.value)}
                style={styles.input}
                placeholder="Student Coordinator"
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea 
              value={club.description}
              onChange={(e) => handleArrayChange(setClubs, clubs, index, 'description', e.target.value)}
              style={styles.textarea}
              placeholder="Enter club description..."
            />
          </div>
          <div style={{flex: 1}}>
            <ImageUpload 
              label="Club Image"
              name={`clubImages-${index}`} // Unique name for each club image
              initialImage={club.image.url as string}
              onChange={(file) => handleClubImageChange(index, file)}
            />
          </div>
          {clubs.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setClubs, clubs, index)} style={styles.removeSectionButton}>
                  Remove Club
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setClubs, { clubName: '', description: '', image: null, studentCoordinator: '' })} style={styles.addButton}>
        Add Club
      </button>
    </div> */}


      <h3>Clubs</h3>
<div style={styles.formGroup}>
  {clubs.map((club, index) => (
    <div key={index} style={{...styles.section, marginBottom: '20px'}}>
      {/* ... other club fields ... */}
      <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
              <label style={styles.label}>Club Name</label>
              <input 
                type="text"
                value={club.clubName}
                onChange={(e) => handleArrayChange(setClubs, clubs, index, 'clubName', e.target.value)}
                style={styles.input}
                placeholder={`Club Name ${index + 1}`}
              />
            </div>
            <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
              <label style={styles.label}>Student Coordinator</label>
              <input 
                type="text"
                value={club.studentCoordinator}
                onChange={(e) => handleArrayChange(setClubs, clubs, index, 'studentCoordinator', e.target.value)}
                style={styles.input}
                placeholder="Student Coordinator"
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea 
              value={club.description}
              onChange={(e) => handleArrayChange(setClubs, clubs, index, 'description', e.target.value)}
              style={styles.textarea}
              placeholder="Enter club description..."
            />
          </div>
      <div style={{flex: 1}}>
        <ImageUpload
          label="Club Image"
          name={`clubImages-${index}`} // Unique name for each club image
          initialImage={club.image ? club.image.url : ''}
          onChange={(file) => handleClubImageChange(index, file)}
        />
      </div>
      {clubs.length > 1 && (
          <button type="button" onClick={() => removeArrayItem(setClubs, clubs, index)} style={styles.removeSectionButton}>
              Remove Club
          </button>
      )}
    </div>
  ))}
  <button type="button" onClick={() => addArrayItem(setClubs, { clubName: '', description: '', image: { url: '', key: '', contentType: '' }, studentCoordinator: '' })} style={styles.addButton}>
    Add Club
  </button>
</div>




    <h3>Research & Patents</h3>
    <div style={styles.formGroup}>
      {research.map((item, index) => (
        <div key={index} style={{...styles.section, marginBottom: '20px'}}>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 0.5, marginRight: '10px'}}>
              <label style={styles.label}>S.No</label>
              <input 
                type="number"
                value={item.sno ?? ''}
                onChange={(e) => handleArrayChange(setResearch, research, index, 'sno', safeParseInt(e.target.value))}
                style={styles.input}
                placeholder="S.No"
              />
            </div>
            <div style={{...styles.formGroup, flex: 2, marginRight: '10px'}}>
              <label style={styles.label}>Patent/Research Title</label>
              <input 
                type="text"
                value={item.patentTitle}
                onChange={(e) => handleArrayChange(setResearch, research, index, 'patentTitle', e.target.value)}
                style={styles.input}
                placeholder="Patent or Research Title"
              />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Agency</label>
              <input 
                type="text"
                value={item.agency}
                onChange={(e) => handleArrayChange(setResearch, research, index, 'agency', e.target.value)}
                style={styles.input}
                placeholder="Agency"
              />
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
              <label style={styles.label}>Year</label>
              <input 
                type="text"
                value={item.year}
                onChange={(e) => handleArrayChange(setResearch, research, index, 'year', e.target.value)}
                style={styles.input}
                placeholder="e.g., 2023"
              />
            </div>
            <div style={{...styles.formGroup, flex: 1}}>
              <label style={styles.label}>Status</label>
              <input 
                type="text"
                value={item.status}
                onChange={(e) => handleArrayChange(setResearch, research, index, 'status', e.target.value)}
                style={styles.input}
                placeholder="e.g., Granted, Pending"
              />
            </div>
          </div>
          {research.length > 1 && (
              <button type="button" onClick={() => removeArrayItem(setResearch, research, index)} style={styles.removeSectionButton}>
                  Remove Research Entry
              </button>
          )}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem(setResearch, { sno: research.length + 1, patentTitle: '', agency: '', year: '', status: '' })} style={styles.addButton}>
        Add Research Entry
      </button>
    </div>

    <h3>Contact Information</h3>
    <div style={styles.formGroup}>
      <div style={styles.formRow}>
        <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
          <label style={styles.label}>Email</label>
          <input 
            type="email"
            value={contact.email}
            onChange={(e) => setContact(prev => ({...prev, email: e.target.value}))}
            style={styles.input}
            placeholder="department@example.com"
          />
        </div>
        <div style={{...styles.formGroup, flex: 1}}>
          <label style={styles.label}>Phone</label>
          <input 
            type="text"
            value={contact.phone}
            onChange={(e) => setContact(prev => ({...prev, phone: e.target.value}))}
            style={styles.input}
            placeholder="+91-1234567890"
          />
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Location</label>
        <textarea 
          value={contact.location}
          onChange={(e) => setContact(prev => ({...prev, location: e.target.value}))}
          style={styles.textarea}
          placeholder="Room No, Building, Campus Address"
        />
      </div>
    </div>

    <div style={styles.formActions}>
      <button type="submit" style={styles.submitButton}>
        {initialData ? 'Update Department' : 'Add Department'}
      </button>
      <button type="button" onClick={onCancel} style={styles.cancelButton}>
        Cancel
      </button>
    </div>
  </form>
);
};






















const NewsEventForm = ({ onFormSubmit, initialData, onCancel }: { onFormSubmit: (data: FormData) => void; initialData?: NewsEvent | null; onCancel: () => void }) => {
    return (
         <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget)); }} style={styles.form}>
            <div style={styles.formRow}>
                <div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}>
                    <label style={styles.label}>Title</label>
                    <input name="title" defaultValue={initialData?.title} style={styles.input} required />
                </div>
                <div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}>
                    <label style={styles.label}>Type</label>
                    {/* <select name="type" defaultValue={initialData?.type || "News"} style={styles.input}>
                        <option value="News">News</option>
                        <option value="Event">Event</option>
                    </select> */}
                    <input name="type" defaultValue={initialData?.type} style={styles.input} required />
                </div>
            </div>
            <div style={styles.formRow}><div style={{...styles.formGroup, flex: 1, marginRight: '10px'}}><label style={styles.label}>Date</label><input name="date" type="date" defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : ''} style={styles.input} required /></div><div style={{...styles.formGroup, flex: 1, marginLeft: '10px'}}><ColorPicker name="bgColor" initialValue={initialData?.bgColor} /></div></div>
            <ImageUpload label="Event/News Image" name="image" initialImage={initialData?.image?.url}  isRequired={!initialData} />
            <div style={styles.formGroup}><label style={styles.label}>Description</label><textarea name="description" defaultValue={initialData?.description} style={styles.textarea} required /></div>
        <div style={styles.formGroup}>
        <label style={styles.label}>Path (URL)</label>
        <input
          type="url"
          name="pathlink"
          style={styles.input}
          defaultValue={initialData?.pathlink}
          placeholder="e.g., https://example.com"
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Location</label>
        <input
          type="text"
          name="location"
          style={styles.input}
          defaultValue={initialData?.location}
          placeholder="e.g., Room No, Building, Campus Address"
          required
        />
      </div>
      <div style={styles.formActions}>
        <button type="submit" style={styles.submitButton}>{initialData ? 'Update Item' : 'Create Item'}</button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
      </div>
    </form>
  );
};


const PlacementForm = ({ onFormSubmit, initialData, onCancel }: { onFormSubmit: (data: FormData) => void; initialData?: Placement | null; onCancel: () => void }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget)); }} style={styles.form}>
            <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1, marginRight: '10px' }}>
                    <label style={styles.label}>Student Name</label>
                    <input name="student" defaultValue={initialData?.student} style={styles.input} required />
                </div>
                <div style={{ ...styles.formGroup, flex: 1, marginLeft: '10px' }}>
                    <label style={styles.label}>Company</label>
                    <input name="company" defaultValue={initialData?.company} style={styles.input} required />
                </div>
            </div>

            <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1, marginRight: '10px' }}>
                    <label style={styles.label}>Package</label>
                    <input name="package" defaultValue={initialData?.package} style={styles.input} required />
                </div>
            </div>

            <ImageUpload
                label="Student Image"
                name="image"
                initialImage={initialData?.image ? `${initialData.image.url}` : undefined}
                isRequired={!initialData}
            />

            <ImageUpload
                label="Company Logo"
                name="companyLogo"
                initialImage={initialData?.companyLogo ? `${initialData.companyLogo.url}` : undefined}
                isRequired={!initialData}
            />

            <div style={styles.formActions}>
                <button type="submit" style={styles.submitButton}>{initialData ? 'Update Placement' : 'Create Placement'}</button>
                <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
            </div>
        </form>
    );
};



const HeroImageForm = ({ onFormSubmit, initialData , onCancel }: { onFormSubmit: (data: FormData) => void; initialData?:HeroImage | null; onCancel: () => void }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget)); }} style={styles.form}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Number</label>
                <input name="number" style={styles.input} defaultValue={initialData?.number} placeholder="e.g., Main Campus View" required />
            </div>
            <div style={styles.formRow}>
                {/* <div style={{flex: 1, marginRight: '10px'}}>
                    <ImageUpload label="image" name="image" initialImage={initialData?.image} icon={<DesktopIcon />} isRequired={true} />
                </div> */}
                <div style={{flex: 1, marginLeft: '10px'}}>
                    <ImageUpload label="Image" name="image" initialImage={initialData?.url ? `${initialData.url}` : undefined} icon={<DesktopIcon />} isRequired={true} />
                </div>
            </div>
            <div style={styles.formActions}><button type="submit" style={styles.submitButton}>{initialData ? 'Update Hero Image' : 'CreateNew Hero Image'}</button><button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button></div>
        </form>
    );
};


const AnnouncementForm = ({ onFormSubmit, initialData, onCancel}: { onFormSubmit: (data: FormData) => void; initialData?: Announcement | null; onCancel: () => void; }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onFormSubmit(new FormData(e.currentTarget));}} style={styles.form}>
      {/* Date Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Date</label>
        {/* <input type="date" name="date" style={styles.input} defaultValue={initialData?.date} required/> */}
        <input name="date" type="date" defaultValue={initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : ''} style={styles.input} required />
      </div>

      {/* Title Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Title</label>
        <input
          name="title"
          style={styles.input}
          defaultValue={initialData?.title}
          placeholder="e.g., Republic Day Celebration"
          required
        />
      </div>

      {/* Path Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Path (URL)</label>
        <input
          type="url"
          name="path"
          style={styles.input}
          defaultValue={initialData?.path}
          placeholder="e.g., https://example.com"
          required
        />
      </div>

      {/* Description Field */}
      <div style={styles.formGroup}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          style={styles.textarea}
          defaultValue={initialData?.description}
          placeholder="Enter announcement details..."
          required
        />
      </div>

      {/* Form Actions */}
      <div style={styles.formActions}>
        <button type="submit" style={styles.submitButton}>
          {initialData ? "Update Announcement" : "Create Announcement"}
        </button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};




// --- LIST COMPONENT ---
const ItemsList = ({ items, onEditItem, onDeleteItem, columns }: { items: any[], onEditItem: (item: any) => void, onDeleteItem: (id: string, code?:string) => void, columns: { header: string, accessor: (item: any) => React.ReactNode }[] }) => (
    <div style={styles.contentCard}>
        <div className="table-container" style={styles.tableContainer}>
            <table style={styles.table}>
                <thead><tr>{columns.map(c => <th key={c.header} style={styles.th}>{c.header}</th>)}<th style={styles.th}>Actions</th></tr></thead>
                <tbody>
                    {items.length > 0 ? items.map(item => (
                        <tr key={item._id} className="table-row">{columns.map((c, i) => 
                            <td key={i} style={c.truncate ? styles.tdTruncated : styles.td}>{c.accessor(item)}
                                </td>)}<td style={styles.td}>
                                <div style={styles.actionButtonContainer}>
                                    <button onClick={() => onEditItem(item)} style={{...styles.actionButton, color: 'var(--primary-color)'}} title="Edit"><EditIcon /></button>
                                    <button onClick={() => onDeleteItem(item._id, item.code)} style={{...styles.actionButton, color: 'var(--danger-color)'}} title="Delete"><CrossIcon /></button>
                                </div>
                            </td>
                        </tr>)) : 
                        <tr>
                            <td colSpan={columns.length + 1} style={{textAlign: 'center', padding: '40px'}}>No items to display.</td>
                        </tr>}
                </tbody>
            </table>
        </div>
    </div>
);


// --- Main AdminDashboard Component ---
const AdminDashboard = () => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState('Departments');
    const [activeView, setActiveView] = useState('Departments > List');
    const [items, setItems] = useState<any[]>([]);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { loginEmail,setLoginEmail,setRender,setToken,logoutUser } = useContext(StoreContext);
    const navigate = useNavigate();
    // const menuConfig = {
    //     'Departments': { endpoint: 'department', 
    //         listColumns: [{ header: 'Code', 
    //             accessor: (item: Department) => item.code }, 
    //             { header: 'BackGround IMG', accessor: (item: Department) => <img src={`${item.heroImage.url}`} alt={item.code} style={styles.tableImage} /> },
    //             { header: 'HOD Image', accessor: (item: Department) => <img src={`${item.hodImage.url}`} alt={item.hodName} style={styles.tableImage} /> },
    //             { header: 'Name', accessor: (item: Department) => item.name }, 
    //             { header: 'HOD', accessor: (item: Department) => item.hodName },
    //             // { header: 'Message', accessor: (item: Department) => item.hodMessage},
    //             // { header: 'About', accessor: (item: Department) => item.about},
    //             // { header: 'Vision', accessor: (item: Department) => item.vision},
    //             // { header: 'Mission', accessor: (item: Department) => item.mission},
    //             // { header: 'Faculty', accessor: (item: Department) => item.faculty},
    //             ] },
        
    //     'News & Events': { endpoint: 'newsEvents', 
    //         listColumns: [ { header: 'Image', 
    //             accessor: (item: NewsEvent) => <img src={`${item.image.url}`} alt={item.title} style={styles.tableImage} />}, 
    //             { header: 'Title', accessor: (item: NewsEvent) => item.title }, 
    //             // { header: 'Type', accessor: (item: NewsEvent) => <span style={item.type === 'Event' ? styles.eventBadge : styles.newsBadge}>{item.type}</span> }, 
    //             { header: 'Type', accessor: (item: NewsEvent) => <span style={styles.eventBadge}>{item.type}</span> }, 
    //             { header: 'BG Color', accessor: (item: NewsEvent) => <div style={{...styles.colorSwatch, backgroundColor: item.bgColor}}></div> }, 
    //             { header: 'Date', accessor: (item: NewsEvent) => new Date(item.date).toLocaleDateString() }
    //              ] },
    //     'Hero Images': { endpoint: 'heroImage', 
    //         listColumns: [{ 
    //             header: 'Desktop', accessor: (item: HeroImage) => <img src={`${item.desktopImage.url}`} alt={item.title} style={styles.tableImage} /> }, 
    //             { header: 'Mobile', accessor: (item: HeroImage) => <img src={`${item.mobileImage.url}`} alt={item.title} style={styles.tableImage} /> }, 
    //             { header: 'Title', accessor: (item: HeroImage) => item.title 
    //             }] },
    //     'Announcements': { endpoint: 'announcement', 
    //         listColumns: [
    //             { header: 'Date', accessor: (item: Announcement) => new Date(item.date).toLocaleDateString()}, 
    //             { header: 'Title', accessor: (item: Announcement) => item.title },
    //             { header: 'Path', accessor: (item: Announcement) => item.path },
    //             { header: 'Description', accessor: (item: Announcement) => item.description },
    //             ] },

    //     'Placements': { endpoint: 'placement', 
    //         listColumns: [ 
    //             { header: 'Student Name', accessor: (item: Placement) => item.student}, 
    //             { header: 'Company', accessor: (item: Placement) => item.company}, 
    //             { header: 'Package', accessor: (item: Placement) => item.package},
    //             { header: 'image', accessor: (item: Placement) => <img src={`${item.image.url}`} alt={item.student} style={styles.tableImage} />}, 
    //             { header: 'Company Logo', accessor: (item: Placement) => <img src={`${item.companyLogo.url}`} alt={item.student} style={styles.tableImage} />}, 
    //              ] },
    // };

    const menuConfig = {
        'Departments': { endpoint: 'department', 
            listColumns: [{ header: 'Code', 
                accessor: (item: Department) => item?.code || 'N/A' }, 
                { header: 'BackGround IMG', accessor: (item: Department) => item?.heroImage? <img src={`${item.heroImage.url}`} alt={item.code} style={styles.tableImage} /> : 'No Image', truncate: false },
                { header: 'HOD Image', accessor: (item: Department) => item?.hodImage? <img src={`${item.hodImage.url}`} alt={item.hodName} style={styles.tableImage} /> : 'No Image', truncate: false },
                { header: 'Name', accessor: (item: Department) => item?.name || 'N/A', truncate: false }, 
                { header: 'HOD', accessor: (item: Department) => item?.hodName || 'N/A', truncate: false },
                // { header: 'Message', accessor: (item: Department) => item.hodMessage},
                // { header: 'About', accessor: (item: Department) => item.about},
                // { header: 'Vision', accessor: (item: Department) => item.vision},
                // { header: 'Mission', accessor: (item: Department) => item.mission},
                // { header: 'Faculty', accessor: (item: Department) => item.faculty},
                ] },
        
        'News & Events': { endpoint: 'newsEvents', 
            listColumns: [ { header: 'Image', 
                accessor: (item: NewsEvent) => item?.image ? <img src={`${item.image.url}`} alt={item.title} style={styles.tableImage} /> : 'No Image', truncate: false}, 
                { header: 'Title', accessor: (item: NewsEvent) => item?.title || 'N/A', truncate: false }, 
                // { header: 'Type', accessor: (item: NewsEvent) => <span style={item.type === 'Event' ? styles.eventBadge : styles.newsBadge}>{item.type}</span> }, 
                { header: 'Type', accessor: (item: NewsEvent) => <span style={styles.eventBadge}>{item?.type || 'N/A'}</span> , truncate: false }, 
                { header: 'BG Color', accessor: (item: NewsEvent) => item?.bgColor ? <div style={{...styles.colorSwatch, backgroundColor: item.bgColor}}></div> : 'N/A' , truncate: false}, 
                { header: 'Date', accessor: (item: NewsEvent) => item?.date ? new Date(item.date).toLocaleDateString() : 'N/A', truncate: false},
                { header: 'Location', accessor: (item: NewsEvent) => item?.location || 'N/A', truncate: false}
                 ] },
        'Hero Images': { endpoint: 'heroImage', 
            listColumns: [{ 
                  header: 'Image', accessor: (item: HeroImage) => item?.url ? <img src={`${item.url}`} alt={item.number} style={styles.tableImage} /> : 'No Image', truncate: false }, 
                // { header: 'Mobile', accessor: (item: HeroImage) => item?.mobileImage?.url ? <img src={`${item.mobileImage.url}`} alt={item.title} style={styles.tableImage} /> : 'No Image' }, 
                { header: 'Number', accessor: (item: HeroImage) => item?.number || 'N/A', truncate: false 
                }] },
        'Announcements': { endpoint: 'announcement', 
            listColumns: [
                { header: 'Date', accessor: (item: Announcement) => item?.date ? new Date(item.date).toLocaleDateString() : 'N/A', truncate: false}, 
                { header: 'Title', accessor: (item: Announcement) => item?.title || 'N/A', truncate: false },
                { header: 'Path', accessor: (item: Announcement) => item?.path || 'N/A', truncate: false },
                { header: 'Description', accessor: (item: Announcement) => item?.description || 'N/A', truncate: true},
                ] },

        'Placements': { endpoint: 'placement', 
            listColumns: [ 
                { header: 'Student Name', accessor: (item: Placement) => item?.student || 'N/A', truncate: false}, 
                { header: 'Company', accessor: (item: Placement) => item?.company || 'N/A', truncate: false}, 
                { header: 'Package', accessor: (item: Placement) => item?.package || 'N/A', truncate: false},
                { header: 'image', accessor: (item: Placement) => item?.image ? <img src={`${item.image.url}`} alt={item.student} style={styles.tableImage} /> : 'No Image', truncate: false}, 
                { header: 'Company Logo', accessor: (item: Placement) => item?.companyLogo ? <img src={`${item.companyLogo.url}`} alt={item.student} style={styles.tableImage} /> : 'No Image', truncate: false}, 
                 ] },

                }

    const fetchData = useCallback(async () => {
        const [menu] = activeView.split(' > ');
        const config = menuConfig[menu as keyof typeof menuConfig];
        if (!config) return; setLoading(true); setError(null);
        try {
            const listRoute = config.endpoint === 'department' ? 'list' : 'list';
            const response = await fetch(`${API_BASE_URL}/api/${config.endpoint}/${listRoute}`);
            // if (!response.ok) throw new Error(`Failed to fetch ${menu}`);
            const data = await response.json();
            // console.log(data);
            setItems(Array.isArray(data) ? data : []);
            // console.log("here    ",items);
        } catch (err: any) { setError(err.message); setItems([]); } finally { setLoading(false); }
    }, [activeView]);

    useEffect(() => { if (activeView.endsWith(' > List')) { fetchData(); } }, [activeView, fetchData]);

    const handleFormSubmit = async (formData: FormData) => {
        const [menu] = activeView.split(' > ');
        const config = menuConfig[menu as keyof typeof menuConfig];
        if (!config) return;
        const isUpdating = !!editingItem; 
        const _id = isUpdating ? editingItem._id : ''; 
        // const code = isUpdating ? editingItem.code : (formData.get('code') as string); 
        const method = isUpdating ? 'PUT' : 'POST';
        let endpoint: string;
        if (config.endpoint === 'department') { 
            endpoint = isUpdating ? `${API_BASE_URL}/api/department/update/${_id}` : `${API_BASE_URL}/api/department/add`; 
        } 
        else {
             endpoint = isUpdating ? `${API_BASE_URL}/api/${config.endpoint}/update/${_id}` : `${API_BASE_URL}/api/${config.endpoint}/add`; }
        setLoading(true); setError(null);
        try {
            // console.log('Submitting Department Form:', Object.fromEntries(formData.entries()));
            // console.log(endpoint,formData);
            const response = await fetch(endpoint, { method, body: formData });
            
            // Check content type to avoid JSON parsing errors
            const contentType = response.headers.get('content-type') || '';
            let result: any = null;
            
            if (contentType.includes('application/json')) {
                result = await response.json();
            } else {
                // Server returned HTML/text (likely an error page)
                const text = await response.text();
                result = { text };
            }
            
            if (!response.ok) {
                const errorMsg = result && (result.message || result.error) 
                    ? (result.message || result.error) 
                    : `${response.status} ${response.statusText}: ${result?.text?.slice?.(0,300) || 'no body'}`;
                throw new Error(errorMsg);
            }
            
            alert(`Item ${isUpdating ? 'updated' : 'added'} successfully!`);
            setEditingItem(null); setActiveView(`${menu} > List`);
        } catch (err: any) { 
            // This will now show server error details instead of "Unexpected token '<'"
            setError(err.message || String(err)); 
        } finally { setLoading(false); }
    };
    
    const handleDeleteItem = async (_id: string, code?: string) => {
        const [menu] = activeView.split(' > ');
        const config = menuConfig[menu as keyof typeof menuConfig];
        if (!config || !window.confirm('Are you sure you want to delete this item?')) return;
        const endpoint = `${API_BASE_URL}/api/${config.endpoint}/delete/${_id}`;
        // const endpoint = config.endpoint === 'department' && code ? `${API_BASE_URL}/api/department/delete/code/${code}` : `${API_BASE_URL}/api/${config.endpoint}/delete/${id}`;
        setLoading(true); setError(null);
        try {
            const response = await fetch(endpoint, { method: 'DELETE' });
            if (!response.ok) { const result = await response.json(); throw new Error(result.message || result.error || 'Failed to delete.'); }
            alert('Item deleted successfully!'); fetchData();
        } catch (err: any) { setError(err.message); } finally { setLoading(false); }
    };

    const handleEditItem = (item: any) => { 
        const [menu] = activeView.split(' > ');
        // console.log(menu);
        // console.log(item);
         setEditingItem(item); 
         setActiveView(`${menu} > Add/Edit`); 
        //  console.log(activeView);
        //  console.log(editingItem);
        };
    const handleCancel = () => { const [menu] = activeView.split(' > '); setEditingItem(null); setActiveView(`${menu} > List`); };

    const renderContent = () => {
        const [menu, subMenu] = activeView.split(' > ');
        const content = () => {
             if (subMenu === 'List') { 
                // console.log(subMenu,menu,items);
                // console.log(menuConfig[menu as keyof typeof menuConfig].listColumns);
                return loading ? <LoadingSpinner /> : <ItemsList items={items} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} columns={menuConfig[menu as keyof typeof menuConfig].listColumns} />; }
             if (subMenu === 'Add/Edit') {
                if (loading && !editingItem) return <LoadingSpinner />;
                switch (menu) {
                    case 'Departments': return <DepartmentForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    case 'News & Events': return <NewsEventForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel}/>;
                    case 'Hero Images': return <HeroImageForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    case 'Announcements': return <AnnouncementForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    case 'Placements': return <PlacementForm onFormSubmit={handleFormSubmit} initialData={editingItem} onCancel={handleCancel} />;
                    default: return <div>Form not found.</div>;
                }
            }
            return <div>Select an option from the sidebar.</div>;
        };
        return (
            <div>
                 <h2 style={styles.contentTitle}>{menu}<span style={{color: 'var(--text-secondary)'}}> / {subMenu === 'Add/Edit' ? (editingItem ? `Edit` : 'Add New') : 'List'}</span></h2>
                 {error && <ErrorMessage message={error} />}
                 {subMenu.includes('Add') ? <div style={styles.contentCard}>{content()}</div> : content()}
            </div>
        );
    };
    
    const menuItems = { 'Departments': ['Add/Edit', 'List'], 'News & Events': ['Add/Edit', 'List'], 'Hero Images': ['Add/Edit', 'List'], 'Announcements':['Add/Edit', 'List'], 'Placements':['Add/Edit', 'List'], };
    // const logout = () => {
    // localStorage.removeItem("token");
    // setToken("");
    // setLoginEmail("");
    // setRender(false);
    // navigate('/');
    // }
    return (
        <>
        {/* // ReactDOM.createPortal(
        //     <div className="fixed inset-0 bg-white z-50 overflow-y-auto"> */}
            <div style={styles.dashboardContainer} onClick={() => { if (profileOpen) setProfileOpen(false); }}>
                <header style={styles.header}>
                    <div style={styles.headerLeft}>
                        <button className="hamburger-menu" style={styles.hamburgerMenu} onClick={() => setSidebarOpen(!sidebarOpen)}><MenuIcon/></button>
                        <div className="desktop-logo"><Logo/></div>
                    </div>
                    <div style={styles.headerTitle}>Admin Dashboard</div>
                    <div style={styles.headerRight}>
                        <div style={{position: 'relative'}} onClick={() => setProfileOpen(!profileOpen)}>
                            <UserProfileIcon />
                            {profileOpen && (<div style={styles.profileDropdown}>
                                <div style={styles.dropdownItem}>{loginEmail}</div>
                            <div onClick={logoutUser} style={{...styles.dropdownItem, ...styles.logoutButton}}>Logout</div></div>)}
                        </div>
                    </div>
                </header>
                <div style={styles.dashboardBody}>
                    {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
                    <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                        <nav>
                            <ul>{Object.keys(menuItems).map(menuName => 
                                (<li key={menuName} style={styles.menuItem}>
                                    <div onClick={() => setOpenMenu(openMenu === menuName ? null : menuName)} style={styles.menuTitle}>
                                        <span>{menuName}</span>
                                        <span style={styles.menuIconContainer}>{openMenu === menuName ? <MinusSquareIcon /> : <PlusSquareIcon />}</span>
                                    </div>
                                    <ul className="submenu" style={openMenu === menuName ? {...styles.subMenu, ...styles.subMenuOpen} : styles.subMenu}>
                                        {menuItems[menuName as keyof typeof menuItems].map(subItem =>
                                            (<li key={subItem} onClick={() => { setActiveView(`${menuName} > ${subItem}`); setSidebarOpen(false); setEditingItem(null); }} className={activeView.startsWith(`${menuName} > ${subItem}`) ? 'submenu-item-active' : 'submenu-item'}>
                                                {subItem === 'Add/Edit' ? 'Add / Edit' : subItem}
                                            </li>)
                                        )}
                                    </ul>
                                </li>))}
                            </ul>
                        </nav>
                    </aside>
                    <main className="main-content" style={styles.mainContent}>{renderContent()}</main>
                </div>
            </div>
            <style>{`
                /* --- THEME & FONT DEFINITIONS --- */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                :root {
                    --primary-color: #0052cc;
                    --primary-color-light: #deebff;
                    --accent-color: #00b8d9;
                    --danger-color: #de350b;
                    --success-color: #00875a;
                    --text-primary: #172b4d;
                    --text-secondary: #5e6c84;
                    --background-light: #f4f5f7;
                    --surface-color: #ffffff;
                    --border-color: #dfe1e6;
                }

                /* --- GENERAL STYLES --- */
                body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
                .sidebar { position: relative; transition: transform 0.3s ease-in-out; background-color: #172B4D; color: #ffffff; width: 260px; border-right: none; padding: 20px; overflow-y: auto; flex-shrink: 0; }
                .main-content { transition: margin-left 0.3s ease-in-out; }
                .hamburger-menu { display: none; background: none; border: none; cursor: pointer; padding: 5px; z-index: 1002; }
                .sidebar-overlay { display: none; }
                .submenu-item, .submenu-item-active { padding: 10px 15px; cursor: pointer; border-radius: 6px; font-size: 0.95rem; margin-bottom: 5px; transition: background-color 0.2s, color 0.2s; position: relative; }
                .submenu-item { color: #B3BAC5; }
                .submenu-item:hover { background-color: rgba(255, 255, 255, 0.1); color: #ffffff; }
                .submenu-item-active { background-color: var(--primary-color); color: #ffffff; font-weight: 500; }
                .table-row:hover { background-color: var(--primary-color-light); }
                .upload-box:hover .upload-overlay { opacity: 1; }
                input:focus, textarea:focus, select:focus { border-color: var(--primary-color) !important; box-shadow: 0 0 0 3px var(--primary-color-light) !important; outline: none; }

                /* --- MOBILE-SPECIFIC STYLES --- */
                @media (max-width: 768px) {
                    .sidebar-overlay { display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1000; }
                    .sidebar { position: fixed; transform: translateX(-100%); height: 100%; z-index: 1001; box-shadow: 4px 0 15px rgba(0,0,0,0.2); }
                    .sidebar.open { transform: translateX(0); }
                    .main-content { margin-left: 0 !important; }
                    .hamburger-menu { display: block; }
                    .desktop-logo { display: none; }
                    .header-title { font-size: 1.2rem; }
                    .form-row { flex-direction: column; }
                    .form-row > div { margin: 0 0 20px 0 !important; }
                    .table-container { overflow-x: auto; }
                }
            `}</style>
        {/* </div>,document.body) */}
        </>
    );
};

// --- Centralized & Enhanced Styles ---
// ✅ ADD THIS ENTIRE OBJECT at the end of your file

const recruiterStyles: { [key: string]: CSSProperties } = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '16px',
    marginBottom: '16px',
  },
  card: {
    position: 'relative',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    overflow: 'hidden',
    aspectRatio: '1 / 1',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '8px',
  },
  deleteButton: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    background: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '0',
  },
};
const styles: { [key: string]: CSSProperties } = {

  // ADD THESE TO YOUR EXISTING styles OBJECT

  dashboardContainer: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: 'var(--background-light)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', backgroundColor: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', zIndex: 999, flexShrink: 0 },
  headerLeft: { flex: 1, display: 'flex', alignItems: 'center' },
  headerTitle: { flex: 2, textAlign: 'center', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' },
  headerRight: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  dashboardBody: { display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' },
  mainContent: { flex: 1, padding: '32px', overflowY: 'auto', backgroundColor: 'var(--background-light)' },
  profileDropdown: { position: 'absolute', top: '55px', right: 0, backgroundColor: 'var(--surface-color)', borderRadius: '8px', boxShadow: '0 8px 16px -4px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)', border: '1px solid var(--border-color)', width: 'auto', overflow: 'hidden', zIndex: 1002, color: 'var(--text-primary)', maxWidth: '250px' },
  dropdownItem: { padding: '12px 20px', borderBottom: '1px solid var(--border-color)', fontSize: '0.95rem', cursor: 'pointer', transition: 'background-color 0.2s, color 0.2s', overflowWrap: 'break-word'  },
  logoutButton: { color: 'var(--danger-color)', fontWeight: 500, borderBottom: 'none' },
  menuItem: { listStyle: 'none', marginBottom: '5px' },
  menuTitle: { fontSize: '1.05rem', fontWeight: 600, padding: '12px 10px', cursor: 'pointer', borderRadius: '6px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  menuIconContainer: { display: 'flex', alignItems: 'center', transition: 'transform 0.3s ease' },
  subMenu: { listStyle: 'none', paddingLeft: '15px', overflow: 'hidden', maxHeight: '0', transition: 'max-height 0.3s ease-out' },
  subMenuOpen: { maxHeight: '500px', transition: 'max-height 0.4s ease-in' },
  contentCard: { backgroundColor: 'var(--surface-color)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px 0 rgba(9,30,66,0.15), 0 0 1px 0 rgba(9,30,66,0.31)', transition: 'box-shadow 0.3s ease' },
  contentTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '25px', color: 'var(--text-primary)' },
  form: { display: 'flex', flexDirection: 'column' },
  formGroup: { marginBottom: '24px' },
  formRow: { display: 'flex', marginBottom: '0' },
  label: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' },
  input: { width: '100%', padding: '12px 15px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '1rem', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s' },
  textarea: { width: '100%', padding: '12px 15px', border: '1px solid var(--border-color)', borderRadius: '6px', minHeight: '120px', fontSize: '1rem', transition: 'border-color 0.2s, box-shadow 0.2s' },
  uploadBox: { cursor: 'pointer', border: '2px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '150px', backgroundColor: '#fafbfc', position: 'relative', overflow: 'hidden', transition: 'border-color 0.2s' },
  uploadPlaceholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-secondary)', fontWeight: 500 },
  uploadPreview: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' },
  uploadOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(9, 30, 66, 0.5)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s ease', fontWeight: 600 },
  formActions: { display: 'flex', gap: '10px', marginTop: '20px' },
  submitButton: { padding: '12px 30px', backgroundColor: 'var(--primary-color)', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, transition: 'background-color 0.2s, box-shadow 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cancelButton: { padding: '12px 30px', backgroundColor: 'var(--text-secondary)', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, transition: 'background-color 0.2s' },
  addButton: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', padding: '8px 15px', backgroundColor: 'var(--primary-color-light)', color: 'var(--primary-color)', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '5px', alignSelf: 'flex-start', fontWeight: 600, transition: 'background-color 0.2s' },
  removeButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginLeft: '10px', color: 'red', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s, color 0.2s' },
  tableContainer: { overflowX: 'auto'},
  table: { width: '100%', borderCollapse: 'collapse', minWidth: '600px' },
//   table: { width: '100%', borderCollapse: 'collapse', minWidth: '1100px' },
  th: { padding: '15px', textAlign: 'left', borderBottom: '2px solid var(--border-color)', fontWeight: 600, color: 'var(--text-secondary)', backgroundColor: 'var(--background-light)' },
  td: { padding: '15px', textAlign: 'left', borderBottom: '1px solid var(--border-color)', overflow:'hidden', textOverflow:'ellipsis',verticalAlign: 'middle', color: 'var(--text-primary)', maxWidth: '100px' },
  tdTruncated: {
    // First, include all the properties of your original 'td' style
    padding: '15px',
    textAlign: 'left',
    // borderBottom: '1px solid var(--border-color)',
    verticalAlign: 'middle',
    color: 'var(--text-primary)',

    // Now, add the special properties for truncation
    maxWidth: '200px', // CRITICAL: Set a max-width. Adjust this value as needed.
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2, // This sets the number of lines to 2
    WebkitBoxOrient: 'vertical',
  },
  tableImage: { width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' },
  actionButtonContainer: { display: 'flex', alignItems: 'center' },
  actionButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '5px', marginLeft: '5px' },
  spinner: { border: '5px solid var(--primary-color-light)', borderTop: '5px solid var(--primary-color)', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite', margin: '50px auto' },
  errorBanner: { padding: '15px', backgroundColor: '#ffebe6', color: '#bf2600', border: '1px solid #ffbdad', borderRadius: '8px', marginBottom: '20px' },
  colorPickerWrapper: { display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '6px', cursor: 'pointer' },
  colorPickerSwatch: { width: '40px', height: '40px', borderRadius: '4px', border: '1px solid var(--border-color)' },
  colorPickerValue: { marginLeft: '10px', fontSize: '1rem', color: 'var(--text-secondary)'},
  newsBadge: { backgroundColor: 'var(--success-color)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 },
  eventBadge: { backgroundColor: 'var(--accent-color)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600 },
  colorSwatch: { width: '25px', height: '25px', borderRadius: '50%', border: '1px solid var(--border-color)' },









// form: {
//     padding: '20px',
//     borderRadius: '8px',
//     backgroundColor: 'var(--card-background)',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//     maxWidth: '900px',
//     margin: '20px auto',
//   },
//   formGroup: {
//     marginBottom: '15px',
//   },
//   formRow: {
//     display: 'flex',
//     gap: '20px',
//     marginBottom: '15px',
//     alignItems: 'flex-start', // Align items at the start to prevent stretching
//   },
//   label: {
//     display: 'block',
//     marginBottom: '8px',
//     fontWeight: '600',
//     color: 'var(--text-primary)',
//     fontSize: '0.9rem',
//   },
//   input: {
//     width: '100%',
//     padding: '10px 12px',
//     border: '1px solid var(--border-color)',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     color: 'var(--text-primary)',
//     backgroundColor: 'var(--input-background)',
//     transition: 'border-color 0.2s ease',
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px 12px',
//     border: '1px solid var(--border-color)',
//     borderRadius: '5px',
//     fontSize: '1rem',
//     color: 'var(--text-primary)',
//     backgroundColor: 'var(--input-background)',
//     resize: 'vertical',
//     minHeight: '80px',
//     transition: 'border-color 0.2s ease',
//   },
//   addButton: {
//     backgroundColor: 'var(--primary-color)',
//     color: 'white',
//     border: 'none',
//     padding: '8px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '5px',
//     marginTop: '10px',
//     transition: 'background-color 0.2s ease',
//   },
//   removeButton: {
//     backgroundColor: 'transparent',
//     color: 'var(--danger-color)',
//     border: 'none',
//     padding: '5px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     marginLeft: '10px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'color 0.2s ease',
//   },
//   removeSectionButton: {
//     backgroundColor: 'var(--danger-color)',
//     color: 'white',
//     border: 'none',
//     padding: '8px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '0.9rem',
//     marginTop: '15px',
//     transition: 'background-color 0.2s ease',
//   },
//   section: {
//     border: '1px solid var(--border-color-light)',
//     borderRadius: '8px',
//     padding: '15px',
//     marginBottom: '15px',
//     backgroundColor: 'var(--background-light)',
//   },
//   uploadBox: {
//     width: '100%',
//     height: '150px',
//     border: '2px dashed var(--border-color)',
//     borderRadius: '8px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     cursor: 'pointer',
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: 'var(--input-background)',
//     transition: 'border-color 0.2s ease, background-color 0.2s ease',
//   },
//   uploadPlaceholder: {
//     textAlign: 'center',
//     color: 'var(--text-secondary)',
//     fontSize: '0.9rem',
//   },
//   uploadPreview: {
//     width: '100%',
//     height: '100%',
//     objectFit: 'cover',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     zIndex: 1,
//   },
//   uploadOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     color: 'white',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     opacity: 0,
//     transition: 'opacity 0.2s ease',
//     zIndex: 2,
//   },
//   // Add hover effects for uploadBox
//   '@media (hover: hover)': {
//     uploadBox: {
//       '&:hover': {
//         borderColor: 'var(--primary-color)',
//         backgroundColor: 'var(--hover-background)',
//       },
//       '&:hover .upload-overlay': {
//         opacity: 1,
//       },
//     },
//     addButton: {
//       '&:hover': {
//         backgroundColor: 'var(--primary-color-dark)',
//       },
//     },
//     removeButton: {
//       '&:hover': {
//         color: 'var(--danger-color-dark)',
//       },
//     },
//     removeSectionButton: {
//       '&:hover': {
//         backgroundColor: 'var(--danger-color-dark)',
//       },
//     },
//     input: {
//       '&:focus': {
//         borderColor: 'var(--primary-color)',
//         outline: 'none',
//       },
//     },
//     textarea: {
//       '&:focus': {
//         borderColor: 'var(--primary-color)',
//         outline: 'none',
//       },
//     },
//   },
//   colorPickerWrapper: {
//     display: 'flex',
//     alignItems: 'center',
//     border: '1px solid var(--border-color)',
//     borderRadius: '5px',
//     padding: '5px',
//     cursor: 'pointer',
//     backgroundColor: 'var(--input-background)',
//   },
//   colorPickerSwatch: {
//     width: '30px',
//     height: '30px',
//     borderRadius: '3px',
//     marginRight: '10px',
//     border: '1px solid var(--border-color-light)',
//   },
//   colorPickerValue: {
//     color: 'var(--text-primary)',
//     flexGrow: 1,
//   },
//   formActions: {
//     marginTop: '30px',
//     display: 'flex',
//     justifyContent: 'flex-end',
//     gap: '15px',
//   },
//   submitButton: {
//     backgroundColor: 'var(--success-color)',
//     color: 'white',
//     border: 'none',
//     padding: '12px 25px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     fontWeight: '600',
//     transition: 'background-color 0.2s ease',
//   },
//   cancelButton: {
//     backgroundColor: 'var(--secondary-color)',
//     color: 'white',
//     border: 'none',
//     padding: '12px 25px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     fontWeight: '600',
//     transition: 'background-color 0.2s ease',
//   },
//   // Dark mode specific styles (assuming you have a way to toggle a 'dark-mode' class on body or root)
//   // This is a placeholder; you'd typically handle this with CSS variables or a theming solution.
//   body: {
//     '--background-color': '#f4f7f6',
//     '--card-background': '#ffffff',
//     '--input-background': '#ffffff',
//     '--border-color': '#e0e0e0',
//     '--border-color-light': '#f0f0f0',
//     '--text-primary': '#333333',
//     '--text-secondary': '#666666',
//     '--primary-color': '#007bff',
//     '--primary-color-dark': '#0056b3',
//     '--secondary-color': '#6c757d',
//     '--secondary-color-dark': '#5a6268',
//     '--success-color': '#28a745',
//     '--success-color-dark': '#218838',
//     '--danger-color': '#dc3545',
//     '--danger-color-dark': '#c82333',
//     '--hover-background': '#f8f9fa',
//     '--background-light': '#fefefe',
//   },
//   '.dark-mode': {
//     '--background-color': '#2c2c2c',
//     '--card-background': '#3c3c3c',
//     '--input-background': '#4c4c4c',
//     '--border-color': '#5c5c5c',
//     '--border-color-light': '#4c4c4c',
//     '--text-primary': '#e0e0e0',
//     '--text-secondary': '#b0b0b0',
//     '--primary-color': '#66aaff',
//     '--primary-color-dark': '#4488dd',
//     '--secondary-color': '#909090',
//     '--secondary-color-dark': '#707070',
//     '--success-color': '#5cb85c',
//     '--success-color-dark': '#4cae4c',
//     '--danger-color': '#d9534f',
//     '--danger-color-dark': '#c9302c',
//     '--hover-background': '#444444',
//     '--background-light': '#383838',
//   },
//   spinner: {
//     border: '4px solid rgba(0, 0, 0, 0.1)',
//     width: '36px',
//     height: '36px',
//     borderRadius: '50%',
//     borderLeftColor: 'var(--primary-color)',
//     animation: 'spin 1s ease infinite',
//     margin: '20px auto',
//   },
//   errorBanner: {
//     backgroundColor: 'var(--danger-color)',
//     color: 'white',
//     padding: '10px',
//     borderRadius: '5px',
//     textAlign: 'center',
//     marginBottom: '20px',
//   },
//   // Keyframe for spinner animation
//   '@keyframes spin': {
//     '0%': { transform: 'rotate(0deg)' },
//     '100%': { transform: 'rotate(360deg)' },
//   },





};

export default AdminDashboard;
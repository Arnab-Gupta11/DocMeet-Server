import mongoose from 'mongoose';

interface IExperience {
  title: string;
  institution: string;
  startDate: number;
  endDate: number;
}

interface IEducation {
  degree: string;
  institution?: string;
  startDate: number;
  endDate: number;
}
interface IAwards {
  awardName: string;
  date: Date;
  description: string;
}

export interface IVerfication {
  bmdcNumber: string;
  doctorType: 'MBBS' | 'BDS';
  certificateImage: string;
  credentialsUrl: string;
  nationalId?: string;
  workplace: string;
  status: 'pending' | 'approved' | 'rejected';
  verifiedBy?: mongoose.Types.ObjectId;
  submittedAt: Date;
  verifiedAt?: Date;
  adminRemarks?: string;
}
export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  bio?: string;
  phone: string;
  experienceYears: number;
  department: string;
  designation: string;
  specialties: string;
  qualifications: string;
  languages: string;
  consultationFee: number;

  education: IEducation[];
  experiences: IExperience[];
  awards: IAwards[];
  services: string[];

  clinicLocation: {
    address: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    landmark?: string;
  };

  
  isVerifiedDoctor: boolean;
  profileCompletion: number;

  ratings: {
    average: number;
    totalRatings: number;
  };

  verification: IVerfication;

  createdAt: Date;
  updatedAt: Date;
}

// availability: {
//   day: string; // e.g., Monday
//   slots: {
//     start: string; // '09:00'
//     end: string;   // '12:00'
//   }[];
// }[];

// Subscription info
// subscription: {
//   planId: mongoose.Types.ObjectId;
//   startDate: Date;
//   endDate: Date;
//   isActive: boolean;
// };

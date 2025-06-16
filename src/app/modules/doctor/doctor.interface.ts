import mongoose from "mongoose";

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId;
  phone: string;
  profilePicture?: string;
  specialization: string;
  qualifications: string;
  experience: number; // in years
  languages: string[];
  consultationFee: number;


  
  clinicAddress: string;
  // availability: {
  //   day: string; // e.g., Monday
  //   slots: {
  //     start: string; // '09:00'
  //     end: string;   // '12:00'
  //   }[];
  // }[];
  isVerified: boolean;
  isblocked: boolean;

  // Optional for video consultation
  supportsVideoConsultation: boolean;

  // Documents & Certifications
  certifications?: string[]; // Array of file URLs

  // Subscription info
  subscription: {
    planId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  };

  ratings: {
    average: number;
    totalRatings: number;
  };

  createdAt: Date;
  updatedAt: Date;
}


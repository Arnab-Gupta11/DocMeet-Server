import mongoose, { Schema, model } from 'mongoose';
import { IDoctor } from './doctor.interface';

const DoctorSchema = new Schema<IDoctor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bio: { type: String, default: '' },
    phone: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    department: { type: String, required: true },
    designation: { type: String, default: '' },
    specialties: { type: String, default: '' },
    qualifications: { type: String, default: '' },
    languages: { type: String, default: '' },
    consultationFee: { type: Number, default: 0 },

    education: {
      type: [
        {
          degree: String,
          institution: String,
          startDate: Number,
          endDate: Number,
        },
      ],
      default: [],
    },

    experiences: {
      type: [
        {
          title: String,
          institution: String,
          startDate: Number,
          endDate: Number,
        },
      ],
      default: [],
    },

    awards: {
      type: [
        {
          awardName: String,
          date: Date,
          description: String,
        },
      ],
      default: [],
    },

    services: { type: [String], default: [] },

    clinicLocation: {
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: '' },
      zip: { type: String, default: '' },
      landmark: { type: String, default: '' },
    },

    isVerifiedDoctor: { type: Boolean, default: false },
    profileCompletion: { type: Number, default: 0 },

    ratings: {
      average: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
    },

    verification: {
      bmdcNumber: { type: String, required: true },
      doctorType: { type: String, enum: ['MBBS', 'BDS'], required: true },
      certificateImage: { type: String, required: true },
      credentialsUrl: { type: String, required: true },
      nationalId: { type: String, required: true },
      workplace: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
      },
      verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      submittedAt: { type: Date, default: Date.now },
      verifiedAt: { type: Date },
      adminRemarks: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  },
);

export const Doctor = model<IDoctor>('Doctor', DoctorSchema);

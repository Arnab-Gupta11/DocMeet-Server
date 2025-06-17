import { z } from 'zod';

const doctorValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),

    bio: z.string().optional(),
    phone: z.string().optional(),
    profilePicture: z.string().optional(),

    experienceYears: z.number().optional(),
    department: z.string().optional(),
    designation: z.string().optional(),
    specialties: z.string().optional(),
    qualifications: z.string().optional(),

    languages: z.union([z.string(), z.array(z.string())]).optional(),
    consultationFee: z.number().optional(),

    education: z
      .array(
        z.object({
          degree: z.string().optional(),
          institution: z.string().optional(),
          startDate: z.number().optional(),
          endDate: z.number().optional(),
        }),
      )
      .optional(),

    experiences: z
      .array(
        z.object({
          title: z.string().optional(),
          institution: z.string().optional(),
          startDate: z.number().optional(),
          endDate: z.number().optional(),
        }),
      )
      .optional(),

    awards: z
      .array(
        z.object({
          awardName: z.string().optional(),
          date: z.date().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),

    services: z.array(z.string()).optional(),

    clinicLocation: z
      .object({
        address: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        country: z.string().optional(),
        zip: z.string().optional(),
        landmark: z.string().optional(),
      })
      .optional(),

    isblocked: z.boolean().optional(),
    isVerifiedDoctor: z.boolean().optional(),

    ratings: z
      .object({
        average: z.number().optional(),
        totalRatings: z.number().optional(),
      })
      .optional(),

    verification: z
      .object({
        bmdcNumber: z.string().optional(),
        doctorType: z.enum(['MBBS', 'BDS']).optional(),
        certificateImage: z.string().optional(),
        credentialsUrl: z.string().optional(),
        nationalId: z.string().optional(),
        workplace: z.string().optional(),
        status: z.enum(['pending', 'approved', 'rejected']).optional(),
        verifiedBy: z.string().optional(),
        submittedAt: z.date().optional(),
        verifiedAt: z.date().optional(),
        adminRemarks: z.string().optional(),
      })
      .optional(),
  }),
});

export const DoctorValidations = {
  doctorValidationSchema,
};

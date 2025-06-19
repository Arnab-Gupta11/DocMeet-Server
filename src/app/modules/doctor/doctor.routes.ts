import { Router } from 'express';
import { doctorControllers } from './doctor.controller';
import auth from '../../middlewares/auth';

const router = Router();

// Define routes
router.get('/verify-doctor', auth('doctor'), doctorControllers.verifyDoctor);
router.get('/doctor-status/:id', doctorControllers.getDoctorVerificationStatus);

export const DoctorRoutes = router;

import { Router } from 'express';
import { doctorController } from './doctor.controller';

const router = Router();

// Define routes
router.get('/', doctorController.getAll);

export default router;

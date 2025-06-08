import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = Router();

// Define routes
router.post(
  '/',
  validateRequest(createUserValidationSchema),
  userControllers.createUser,
);
router.route('/verify-email/:id').post(userControllers.verifyUserEmail);

export const UserRoutes = router;

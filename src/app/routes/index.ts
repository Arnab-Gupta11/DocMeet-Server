import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { DoctorRoutes } from '../modules/doctor/doctor.routes';
const router = Router();
const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;

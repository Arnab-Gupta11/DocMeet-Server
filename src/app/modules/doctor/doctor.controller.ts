import { Request, Response } from 'express';
import { doctorServices } from './doctor.service';

const verifyDoctor = async (req: Request, res: Response) => {
  const result = await doctorServices.verifyDoctor(req.body, req.user);
};

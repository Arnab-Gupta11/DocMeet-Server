import { Request, Response } from 'express';
import { doctorService } from './doctor.service';

export const doctorController = {
  async getAll(req: Request, res: Response) {
    const data = await doctorService.getAll();
    res.json(data);
  },
};

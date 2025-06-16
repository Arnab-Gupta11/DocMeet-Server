import { Schema, model, Document } from 'mongoose';

export interface IDoctorModel extends Document {
  name: string;
  // add more fields here
}

const doctorSchema = new Schema<IDoctorModel>({
  name: { type: String, required: true },
  // add more fields here
});

const doctorModel = model<IDoctorModel>('Doctor', doctorSchema);

export default doctorModel;

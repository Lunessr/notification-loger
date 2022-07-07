import { model, Schema } from "mongoose";

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spec: {
    type: String,
    required: true,
  },
  slots: {
    type: Array<Date>,
    required: true
  },
});

export const DoctorSchema = model("Doctors", doctorSchema);

import { DoctorSchema } from "../../collections/doctors";
import { DoctorWithoutId, Doctor } from "../interfaces/doctor";

class DoctorsRepository {
  async createDoctor(doctor: DoctorWithoutId): Promise<any> {
    const createdDoctors = await DoctorSchema.insertMany([doctor]);
    return createdDoctors[0];
  }
  async getDoctorById(id: Doctor["id"]): Promise<Doctor> {
    return await DoctorSchema.findById(id);
  }

  async getDoctorSlots(id: Doctor["id"]): Promise<Doctor["slots"]> {
    const existingDoctor = await DoctorSchema.findOne({ id });
    return existingDoctor.slots;
  }
}
const doctorsRepository = new DoctorsRepository();
export { doctorsRepository };

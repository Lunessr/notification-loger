import { DoctorSchema } from "../../collections/doctors";
import { ReceptionSchema } from "../../collections/receptions";
import { UserSchema } from "../../collections/users";
import { Doctor, DoctorWithoutId } from "../interfaces/doctor";
import { Reception, ReceptionWithoutId } from "../interfaces/reception";
import { User, UserWithoutId } from "../interfaces/user";

export class ApiRepository {
  async createUser(user: UserWithoutId): Promise<any> {
    const createdUsers = await UserSchema.insertMany([user]);
    return createdUsers[0];
  }

  async createDoctor(doctor: DoctorWithoutId): Promise<any> {
    const createdDoctors = await DoctorSchema.insertMany([doctor]);
    return createdDoctors[0];
  }

  async createReception(reception: ReceptionWithoutId): Promise<any> {
    const createdReceptions = await ReceptionSchema.insertMany([reception]);
    return createdReceptions[0];
  }

  async getUserByPhone(phone: User["phone"]): Promise<User> {
    return await UserSchema.findOne({
      phone: phone,
    });
  }

  async getDoctorById(id: Doctor["id"]): Promise<Doctor> {
    return await DoctorSchema.findById(id);
  }

  async getDoctorSlots(id: Doctor["id"]): Promise<Doctor["slots"]> {
    const existingDoctor = await DoctorSchema.findOne({ id });
    return existingDoctor.slots;
  }

  async getReceptionBySlot(slot: Reception["slot"]): Promise<Reception> {
    return await ReceptionSchema.findOne({
      slot: slot,
    });
  }
}

const apiRepository = new ApiRepository();
export { apiRepository };

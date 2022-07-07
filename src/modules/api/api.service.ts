import { DoctorWithoutId, Doctor } from "../interfaces/doctor";
import { ReceptionWithoutId } from "../interfaces/reception";
import { UserWithoutId } from "../interfaces/user";
import { apiRepository } from "./api.repository";

export class ApiService {
  async createUser(user: UserWithoutId): Promise<any> {
    const existingUser = apiRepository.getUserByPhone(user.phone);
    if (existingUser !== null) {
      throw new Error("User already exist");
    }
    return apiRepository.createUser(user);
  }

  async createDoctor(doctor: DoctorWithoutId): Promise<any> {
    const slots = [];
    doctor.slots.forEach((item) => {
      const date = new Date(Date.parse(item));
      slots.push(date);
    });
    return apiRepository.createDoctor({
      name: doctor.name,
      spec: doctor.spec,
      slots: slots,
    });
  }

  async createReception(reception: ReceptionWithoutId): Promise<any> {
    const doctorSlots: Doctor["slots"] = await apiRepository.getDoctorSlots(
      reception.doctor_id
    );

    const slots = [];
    doctorSlots.forEach((slot) => {
      slots.push(Date.parse(slot));
    });
    const receptionSlot = Date.parse(reception.slot);
    const valideSlot = slots.includes(receptionSlot);
    if (valideSlot === false) {
      throw new Error("Data-time is not exist");
    }

    const currentReception = await apiRepository.getReceptionBySlot(
      reception.slot
    );
    if (currentReception !== null) {
      throw new Error("Data-time is occupied");
    }

    return apiRepository.createReception(reception);
  }
}

const apiService = new ApiService();
export { apiService };

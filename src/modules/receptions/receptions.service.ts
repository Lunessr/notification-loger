import { doctorsRepository } from "../doctors/doctors.reposytory";
import { Doctor } from "../interfaces/doctor";
import { ReceptionWithoutId } from "../interfaces/reception";
import { receptionsRepository } from "./receptions.repository";

class ReceptionsService {
  async createReception(reception: ReceptionWithoutId): Promise<any> {
    const doctorSlots: Doctor["slots"] = await doctorsRepository.getDoctorSlots(
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

    const currentReception = await receptionsRepository.getReceptionBySlot(
      reception.slot
    );
    if (currentReception !== null) {
      throw new Error("Data-time is occupied");
    }

    return receptionsRepository.createReception(reception);
  }
}

const receptionsService = new ReceptionsService();
export { receptionsService };

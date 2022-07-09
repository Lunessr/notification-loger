import { DoctorWithoutId } from "../../interfaces/doctor";
import { doctorsRepository } from "./doctors.reposytory";

class DoctorsService {
  async createDoctor(doctor: DoctorWithoutId): Promise<any> {
    const slots = [];
    doctor.slots.forEach((item) => {
      const date = new Date(Date.parse(item));
      slots.push(date);
    });
    return doctorsRepository.createDoctor({
      name: doctor.name,
      spec: doctor.spec,
      slots: slots,
    });
  }
}
const doctorsService = new DoctorsService();
export { doctorsService };

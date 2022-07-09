import { doctorsService } from "./doctors.service";

class DoctorsController {
  async createDoctor(req, res): Promise<any> {
    const { name, spec, slots } = req.body;
    try {
      const createdDoctor = await doctorsService.createDoctor({
        name,
        spec,
        slots,
      });
      console.log(`Doctor ${createdDoctor} was created`);
      return createdDoctor;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const doctorsController = new DoctorsController();
export { doctorsController };

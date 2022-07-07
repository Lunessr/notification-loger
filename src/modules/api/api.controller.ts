import { ReceptionWithoutId } from "../interfaces/reception";
import { apiService } from "./api.service";

export class ApiController {
  async createUser(req, res): Promise<any> {
    const { name, phone } = req.body;
    try {
      const createdUser = await apiService.createUser({ name, phone });
      return createdUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createDoctor(req, res): Promise<any> {
    const { name, spec, slots } = req.body;
    try {
      const createdDoctor = await apiService.createDoctor({
        name,
        spec,
        slots,
      });
      return createdDoctor;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createReception(req, res): Promise<any> {
    const { user_id, doctor_id, slot } = req.body;
    try {
      const createdReception: ReceptionWithoutId =
        await apiService.createReception({
          user_id: user_id,
          doctor_id: doctor_id,
          slot: slot,
        });
      return createdReception;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const apiController = new ApiController();
export { apiController };

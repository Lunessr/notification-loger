import { ReceptionWithoutId } from "../interfaces/reception";
import { receptionsService } from "./receptions.service";

class ReceptionsController {
  async createReception(req, res): Promise<any> {
    const { user_id, doctor_id, slot } = req.body;
    try {
      const createdReception: ReceptionWithoutId =
        await receptionsService.createReception({
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
const receptionsController = new ReceptionsController();
export { receptionsController };

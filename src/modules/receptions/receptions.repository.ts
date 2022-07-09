import { ReceptionSchema } from "../../collections/receptions";
import { ReceptionWithoutId, Reception } from "../../interfaces/reception";

export class ReceptionsRepository {
  async createReception(reception: ReceptionWithoutId): Promise<any> {
    const createdReceptions = await ReceptionSchema.insertMany([reception]);
    return createdReceptions[0];
  }

  async getReceptionBySlot(slot: Reception["slot"]): Promise<Reception> {
    return await ReceptionSchema.findOne({
      slot: slot,
    });
  }
}

const receptionsRepository = new ReceptionsRepository();
export { receptionsRepository };

import { model, Schema } from "mongoose";

const receptionSchema = new Schema({
  user_id: {
    type: String,
  },
  doctor_id: {
    type: String,
  },
  slot: {
    type: Date,
  },
});

export const ReceptionSchema = model("Receptions", receptionSchema);

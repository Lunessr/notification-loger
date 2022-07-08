import * as cron from "cron";
import { ReceptionSchema } from "../collections/receptions";
import { UserSchema } from "../collections/users";
import { DoctorSchema } from "../collections/doctors";
import { logger } from "./logger";

const CronJob = cron.CronJob;
export const notificationSchedule = new CronJob(
  "0 * * * * *",
  async function () {
    console.time("cron job");
    const dateNow = new Date(Date.now()).setSeconds(0, 0);
    const twoHoursFromNow = dateNow + 7200000;
    const oneDayFromNow = dateNow + 172800000;

    const twoHoursReceptions = await ReceptionSchema.find({
      slot: { $gte: twoHoursFromNow - 1, $lte: twoHoursFromNow + 1 },
    });

    twoHoursReceptions.forEach(async (reception) => {
      const receptionDate = Date.parse(reception.slot.toString());
      const user = await UserSchema.findById(reception.user_id);
      const doctor = await DoctorSchema.findById(reception.doctor_id);
      const twoHoursNotification = receptionDate - 7200000;

      if (dateNow === twoHoursNotification) {
        const date = new Date(Date.now());
        logger.log(
          `${date} || Hello ${user.name}! We remind you that you have reception with ${doctor.spec} on this date in 2 hours`
        );
      }
    });

    const oneDayReceptions = await ReceptionSchema.find({
      slot: { $gte: oneDayFromNow - 1, $lte: oneDayFromNow + 1 },
    });

    oneDayReceptions.forEach(async (reception) => {
      const receptionDate = Date.parse(reception.slot.toString());
      const user = await UserSchema.findById(reception.user_id);
      const doctor = await DoctorSchema.findById(reception.doctor_id);
      const oneDayNotification = receptionDate - 172800000;

      if (dateNow === oneDayNotification) {
        const date = new Date(Date.now());
        logger.log(
          `${date} || Hello ${user.name}! We remind you that you have reception with ${doctor.spec} tomorrow on ${reception.slot}`
        );
      }
    });

    console.timeEnd("cron job");
  },
  null,
  true
);

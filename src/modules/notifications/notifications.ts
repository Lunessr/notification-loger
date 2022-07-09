import * as cron from "cron";
import { ReceptionSchema } from "../../collections/receptions";
import { UserSchema } from "../../collections/users";
import { DoctorSchema } from "../../collections/doctors";
import { logger } from "./logger";

const CronJob = cron.CronJob;
export const notificationSchedule = new CronJob(
  "0 0,5,10,15,20,25,30,35,40,45,50,55 * * * *",
  async function () {
    console.time("cron job");
    const dateNow = new Date(Date.now()).setSeconds(0, 0);
    const twoHoursFromNow = dateNow + 7200000;
    const oneDayFromNow = dateNow + 172800000;
    const date = new Date(Date.now());

    const twoHoursReceptions = await ReceptionSchema.find({
      slot: {
        $gte: twoHoursFromNow - 300000,
        $lte: twoHoursFromNow,
      },
    });

    twoHoursReceptions.forEach(async (reception) => {
      const user = await UserSchema.findById(reception.user_id);
      const doctor = await DoctorSchema.findById(reception.doctor_id);

      logger.log(
        `${date} || Hello ${user.name}! We remind you that you have reception with ${doctor.spec} on this date in 2 hours`
      );
    });

    const oneDayReceptions = await ReceptionSchema.find({
      slot: { $gte: oneDayFromNow - 300000, $lte: oneDayFromNow },
    });

    oneDayReceptions.forEach(async (reception) => {
      const user = await UserSchema.findById(reception.user_id);
      const doctor = await DoctorSchema.findById(reception.doctor_id);

      logger.log(
        `${date} || Hello ${user.name}! We remind you that you have reception with ${doctor.spec} tomorrow on ${reception.slot}`
      );
    });

    console.timeEnd("cron job");
    console.log(`Notofications was send`);
  },
  null,
  true
);

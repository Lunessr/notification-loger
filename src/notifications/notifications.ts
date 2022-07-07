import * as cron from "cron";
import { ReceptionSchema } from "../collections/receptions";
import { UserSchema } from "../collections/users";
import { DoctorSchema } from "../collections/doctors";
import { logger } from "./logger";

const CronJob = cron.CronJob;
export const notificationSchedule = new CronJob(
  "0 0 * * * *",
  async function () {
    const dateNow = new Date(Date.now()).setSeconds(0, 0);

    const receptions = await ReceptionSchema.find({
      slot: { $gt: dateNow },
    });

    receptions.forEach(async (reception) => {
      const receptionDate = new Date(
        new Date(Date.parse(reception.slot.toString()))
      );
      const user = await UserSchema.findById(reception.user_id);
      const doctor = await DoctorSchema.findById(reception.doctor_id);
      const twoHoursNotification =
        Date.parse(receptionDate.toDateString()) - 7200000;
      const oneDayNotification =
        Date.parse(receptionDate.toDateString()) - 172800000;
      // const someDate = Date.parse(receptionDate.toString()) - 1680000;

      if (dateNow === twoHoursNotification) {
        const date = new Date(Date.now());
        logger.log(
          `${date} || Hello ${user.name}! We remind you that you have reception with ${doctor.spec} tomorrow on ${reception.slot}`
        );
      }
      if (dateNow === oneDayNotification) {
        logger.log(
          `${Date.now()} || Hello ${
            user.name
          }! We remind you that you have reception with ${
            doctor.spec
          } on this date in 2 hours`
        );
      }
      // if (dateNow === someDate) {
      //   const date = new Date(Date.now());
      //   logger.log(
      //     `${date} || Hello ${user.name}! We remind you that you have reception with ${doctor.spec} tomorrow on ${reception.slot}`
      //   );
      // }
    });
  },
  null,
  true
);

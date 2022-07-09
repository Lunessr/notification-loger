import * as Koa from "koa";
import mongoose from "mongoose";
import * as koaBody from "koa-body";
import * as dotenv from "dotenv";
import { router } from "./routes";
import { notificationSchedule } from "./modules/notifications/notifications";

const app = new Koa();
dotenv.config();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

notificationSchedule.start();

const startingServer = async function () {
  try {
    app.listen(Number(process.env.SERVER_PORT), () => {
      console.log(`App is started`);
    });
  } catch (error) {
    console.log(error);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log(error);
  }
};

startingServer();

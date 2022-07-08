import * as Router from "koa-router";
import { doctorsController } from "./modules/doctors/doctors.controller";
import { receptionsController } from "./modules/receptions/receptions.controller";
import { usersController } from "./modules/users/users.cotroller";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = "Reception API";
});
router.post("/user", async (ctx) => {
  try {
    const result = await usersController.createUser(ctx.request, ctx.response);
    ctx.body = result;
  } catch (error) {
    console.log(error);
    ctx.body = error.status;
  }
});
router.post("/doctor", async (ctx) => {
  try {
    const result = await doctorsController.createDoctor(
      ctx.request,
      ctx.response
    );
    ctx.body = result;
  } catch (error) {
    console.log(error);
    ctx.body = error.status;
  }
});
router.post("/reception", async (ctx) => {
  try {
    const result = await receptionsController.createReception(
      ctx.request,
      ctx.response
    );
    ctx.body = result;
  } catch (error) {
    console.log(error);
    ctx.body = error.status;
  }
});

export { router };

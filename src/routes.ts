import * as Router from "koa-router";
import { apiController } from "./modules/api/api.controller";

const router = new Router();

router.get("/", async (ctx, next) => {
  ctx.body = "Reception API";
});
router.post("/user", async (ctx) => {
  try {
    const result = await apiController.createUser(ctx.request, ctx.response);
    ctx.body = result;
  } catch (error) {
    console.log(error);
    ctx.body = error.status;
  }
});
router.post("/doctor", async (ctx) => {
  try {
    const result = await apiController.createDoctor(ctx.request, ctx.response);
    ctx.body = result;
  } catch (error) {
    console.log(error);
    ctx.body = error.status;
  }
});
router.post("/reception", async (ctx) => {
  try {
    const result = await apiController.createReception(
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

import koaBody from "koa-body";
import Router from "koa-router";

import CardController from "./controllers/card";

const router = new Router();

router.get("/", async (ctx) => {
    ctx.status = 200;
    ctx.render("index");
});

router.get("/all", async (ctx) => {
    await CardController.all(ctx);
});

router.get("/random", async (ctx) => {
    await CardController.random(ctx);
});

router.post("/new", koaBody(), async (ctx) => {
    await CardController.newCard(ctx);
});

export = router.routes();

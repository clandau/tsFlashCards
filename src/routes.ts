import koaBody from "koa-body";
import Router from "koa-router";

import CardController from "./controllers/card";

const router = new Router();

router.get("/", async (ctx) => {
    ctx.status = 200;
    ctx.render("index");
});

router.get("/all", CardController.all);

router.get("/random", CardController.random);

// router.post("/new", koaBody(), async (ctx) => {
//     await CardController.newCard(ctx);
// });
router.post("/new", CardController.newCard);

export = router.routes();

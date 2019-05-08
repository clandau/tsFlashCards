"use strict";

import Koa from "koa";
import Pug from "koa-pug";
import Router from "koa-router";
import serve from "koa-static";

import koaBody = require("koa-body");
import routes = require("./routes");

const app = new Koa();
const router = new Router();

const pug = new Pug({
    app,
    basedir: "./views",
    viewPath: "./views",
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = 400;
        ctx.body = `oh noes! ${err.message}`;
    }
});

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve("."));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

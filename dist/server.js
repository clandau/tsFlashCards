"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_pug_1 = __importDefault(require("koa-pug"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_static_1 = __importDefault(require("koa-static"));
const koaBody = require("koa-body");
const routes = require("./routes");
const app = new koa_1.default();
const router = new koa_router_1.default();
const pug = new koa_pug_1.default({
    app,
    basedir: "./views",
    viewPath: "./views",
});
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        ctx.status = 400;
        ctx.body = `oh noes! ${err.message}`;
    }
}));
// logging url
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(`${new Date().toLocaleTimeString()} url ${ctx.url}`);
    yield next();
}));
app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(koa_static_1.default("."));
app.use(routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

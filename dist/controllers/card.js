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
const db_1 = __importDefault(require("../db"));
const queries_1 = __importDefault(require("../queries/queries"));
class CardController {
    all(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = queries_1.default.getAllCards;
            try {
                const data = yield db_1.default.query(sql);
                ctx.render("allCards", { cardList: data });
            }
            catch (err) {
                ctx.throw(400, `${err}`);
            }
        });
    }
    random(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql;
            const category = ctx.query.category;
            if (!category) {
                sql = queries_1.default.getRandomCard;
            }
            else {
                sql = queries_1.default.getRandomCardWithCategory;
            }
            try {
                const data = yield db_1.default.query(sql, category);
                ctx.render("card", { cardData: data });
            }
            catch (err) {
                ctx.throw(400, `${err}`);
            }
        });
    }
    newCard(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = ctx.request.body;
            try {
                const sql = queries_1.default.addNewCard;
                yield db_1.default.query(sql, [request]);
                ctx.render("index", { message: "Sucessfully added new card to database." });
            }
            catch (err) {
                ctx.throw(400, `post error: ${err}`);
            }
        });
    }
}
exports.default = new CardController();

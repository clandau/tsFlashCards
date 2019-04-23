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
class CardController {
    all(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM card ORDER BY category";
            try {
                const data = yield db_1.default.query(sql);
                ctx.status = 200;
                ctx.body = data;
            }
            catch (err) {
                ctx.throw(400, `${err}`);
            }
        });
    }
    random(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql;
            let category = ctx.params.category;
            if (!category) {
                sql = "SELECT category, sideA, sideB FROM card ORDER BY RAND() LIMIT 1";
            }
            else {
                sql = "SELECT category, sideA, sideB FROM card WHERE category=? ORDER BY RAND() LIMIT 1";
            }
            try {
                const data = yield db_1.default.query(sql);
                category = data[0].category;
                ctx.render("card", { cardData: data, category });
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
                const sql = `INSERT INTO card set ?`;
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

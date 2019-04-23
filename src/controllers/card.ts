import {BaseContext} from "koa";
import pool from "../db";

class CardController {
    public async all(ctx: BaseContext) {
        const sql = "SELECT * FROM card ORDER BY category";
        try {
            const data = await pool.query(sql);
            ctx.status = 200;
            ctx.body = data;
        } catch (err) {
            ctx.throw(400, `${err}`);
        }
    }

    public async random(ctx: BaseContext) {
        let sql;
        let category = ctx.params.category;

        if (!category) {
            sql = "SELECT category, sideA, sideB FROM card ORDER BY RAND() LIMIT 1";
        } else {
            sql = "SELECT category, sideA, sideB FROM card WHERE category=? ORDER BY RAND() LIMIT 1";
        }
        try {
            const data = await pool.query(sql);
            category = data[0].category;
            ctx.render("card", { cardData : data, category });
        } catch (err) {
            ctx.throw(400, `${err}`);
        }
    }

    public async newCard(ctx: BaseContext) {
        const request = ctx.request.body;
        try {
            const sql = `INSERT INTO card set ?`;
            await pool.query(sql, [request]);
            ctx.render("index", { message: "Sucessfully added new card to database." });
        } catch (err) {
            ctx.throw(400, `post error: ${err}`);
        }
    }
}

export default new CardController();

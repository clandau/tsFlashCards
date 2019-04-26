import {BaseContext} from "koa";
import pool from "../db";
import queries from "../queries/queries";

class CardController {
    public async all(ctx: BaseContext) {
        const sql = queries.getAllCards;
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
            sql = queries.getRandomCard;
        } else {
            sql = queries.getRandomCardWithCategory;
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
            const sql = queries.addNewCard;
            await pool.query(sql, [request]);
            ctx.render("index", { message: "Sucessfully added new card to database." });
        } catch (err) {
            ctx.throw(400, `post error: ${err}`);
        }
    }
}

export default new CardController();

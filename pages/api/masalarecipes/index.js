import nc from "next-connect";
import db from "../../../utils/db"
import MasalaRecipe from "../../../models/masalarecipe";

const handler = nc();

handler.get(async(req,res) => {
    await db.connect();
    const masalaRecipes = await MasalaRecipe.find({});
    await db.disconnect();
    res.send(masalaRecipes)
})

export default handler;
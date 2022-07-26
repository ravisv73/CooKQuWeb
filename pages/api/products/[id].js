import nc from "next-connect";
import db from "../../../utils/db"
import Product from "../../../models/product";

const handler = nc();

handler.get(async(req,res) => {
    await db.connect();
    const product = await Product.findById(req.query.id, {_id: 1, createdAt: 0, updatedAt: 0, __v: 0 });
    await db.disconnect();
    res.send(product)
})

export default handler;
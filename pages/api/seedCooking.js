import nc from "next-connect";
import db from "../../utils/db";
import cookingData from '../../utils/cookingData';
import Cooking from "../../models/cooking";


const handler = nc();

handler.get(async(req,res) => {
    await db.connect();
    await Cooking.deleteMany();
    await Cooking.insertMany(cookingData.cooking);
    await db.disconnect();
    res.send({message: 'seeded successfully'})
})

export default handler;
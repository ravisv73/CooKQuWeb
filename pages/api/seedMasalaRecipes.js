import nc from "next-connect";
import db from "../../utils/db";
import masalaRecipeData from '../../utils/masalaRecipeData';
import MasalaRecipe from "../../models/masalarecipe";


const handler = nc();

handler.get(async(req,res) => {
    await db.connect();
    console.log('step1');
    console.log(masalaRecipeData);
    await MasalaRecipe.deleteMany();
    console.log('step2');
    await MasalaRecipe.insertMany(masalaRecipeData.masalaRecipes);
    console.log('step3');
    await db.disconnect();
    res.send({message: 'seeded successfully'})
})

export default handler;
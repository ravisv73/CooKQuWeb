import nc from "next-connect";
import db from "../../utils/db";
import masalaRecipeData from "../../utils/masalaRecipeData";
import MasalaRecipe from "../../models/masalarecipe";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  //await MasalaRecipe.deleteMany();
  await MasalaRecipe.insertMany(masalaRecipeData.masalaRecipes);
  await db.disconnect();
  res.send({ message: "seeded successfully" });
});

export default handler;

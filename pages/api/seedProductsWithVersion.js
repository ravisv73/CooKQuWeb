import nc from "next-connect";
import db from "../../utils/db";
import productData from "../../utils/productData";
import Product from "../../models/product";
import release from "../../config/release";

const handler = nc();

handler.get(async (req, res) => {
  let archivedProducts = [];
  let newProducts = [];
  await db.connect();
  var currentRelease = release.find((item) => item.status === "Current");

  console.log(
    "Current Relase..",
    currentRelease.release,
    currentRelease.status
  );

  //await Product.deleteMany();

  let currentProducts = await Product.find(
    { releaseStatus: "Current" },
    { _id: 0 }
  );

  await Product.updateMany(
    { releaseStatus: "Current" },
    { $set: { releaseStatus: "Archived" } }
  );

  console.log("New Products before..", newProducts);
  currentProducts.forEach((currentProduct) => {
    let newProduct = JSON.parse(JSON.stringify(currentProduct));
    newProduct.version = newProduct.version + 1;
    newProduct.release = currentRelease.release;
    newProduct.releaseStatus = currentRelease.status;
    newProducts.push(newProduct);
  });
  console.log("New Products after..", newProducts);

  await Product.insertMany(newProducts);
  await db.disconnect();
  res.send({ message: "Product Data is seeded successfully" });
});

export default handler;

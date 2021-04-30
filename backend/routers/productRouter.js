import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import data from "../data.js";

const productRouter = express.Router();
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    //the below line returns all products
    const products = await Product.find({});
    res.send(products);
  })
);
productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products);
    res.send(createdProducts);
  })
);
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.send(product);
    }
    return res.status(404).send({ message: "Product Not Found" });
  })
);

export default productRouter;

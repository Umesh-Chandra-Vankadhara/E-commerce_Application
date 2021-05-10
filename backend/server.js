import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const url = `mongodb://umeshchandra:umesh36@cluster0-shard-00-00.41mlf.mongodb.net:27017,cluster0-shard-00-01.41mlf.mongodb.net:27017,cluster0-shard-00-02.41mlf.mongodb.net:27017/amazona?authSource=admin&replicaSet=atlas-10fd6h-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;
mongoose
  .connect(process.env.MONGODB_URL || url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`connected to database successfully`))
  .catch((error) => console.log(error.message));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal",(req,res)=>{
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
app.get("/", (req, res) => {
  res.send("Heartbeat check successful");
});

//error catcher middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

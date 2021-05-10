import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();
orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = req.body;
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Care is empty" });
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id,
      });
      const createOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      return res.send(order);
    }
    return res.status(404).send({ message: "Order Not Found" });
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const { id, status, update_time, email_address } = req.body;
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = { id, status, update_time, email_address };
      const updatedOrder = await order.save();

      return res.send(updatedOrder);
    }

    return res.status(404).send({ message: "Order Not Found" });
  })
);
export default orderRouter;

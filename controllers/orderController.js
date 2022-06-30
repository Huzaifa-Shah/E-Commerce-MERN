const Order = require("../models/orderModel");

module.exports.addOrderItems = async (req, res) => {
  const {
    userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ errors: [{ msg: "No Order Items" }] });
  } else {
    try {
      const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      return res.status(201).json(createdOrder);
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (order) {
      return res.status(201).json(order);
    } else {
      return res.status(400).json({ errors: [{ msg: "No Order Found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports.updateOrderToPaid = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = order.save();
    return res.status(201).json(updatedOrder);
  } else {
    return res.status(400).json({ errors: [{ msg: "No Order Found" }] });
  }
};

module.exports.getMyOrders = async (req, res) => {
  const id = req.params.id;
  const orders = await Order.find({ user: id });
  if (orders) {
    return res.status(201).json(orders);
  } else {
    return res.status(400).json({ errors: [{ msg: "No Orders Found" }] });
  }
};

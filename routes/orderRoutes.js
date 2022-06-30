const app = require("express");
const router = app.Router();
const auth = require("../middleware/authMiddlerware");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require("../controllers/orderController");

router.post("/user/orders", auth, addOrderItems);
router.get("/user/orders/:id", auth, getOrderById);
router.get("/user/orders/myorders/:id", auth, getMyOrders);
router.post("/user/orders/:id/paid", auth, updateOrderToPaid);

module.exports = router;

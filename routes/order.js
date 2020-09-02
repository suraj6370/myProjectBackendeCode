const express = require("express");
const router = express.Router();



const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getOrder
} = require("../controllers/order");


router.param("userID", getOrderById);



router.post("/order/create",createOrder);
router.get("/order/:userID", getOrder);


module.exports = router;

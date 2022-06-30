const app = require("express");
const router = app.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  getUserProducts,
  deleteUserProduct,
  updateUserProduct
} = require("../controllers/productController");

//Middlewares
const auth = require("../middleware/authMiddlerware");

router.get("/home/:page", getProducts);
router.get("/details/:id", getProduct);
router.post("/user/createProduct", auth, createProduct)
router.get("/user/products/:id", auth, getUserProducts)
router.delete('/user/deleteProduct/:id', auth, deleteUserProduct)
router.post('/user/updateProduct', auth, updateUserProduct)

module.exports = router;

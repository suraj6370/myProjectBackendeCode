const express = require("express");
const router = express.Router();
var multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })

const {
  getProductById,
  createProduct,
  getAllproduct,
  getProduct,
  updateProduct,
  deleteProduct
  
} = require("../controllers/product");



router.param("productId", getProductById);




router.post("/product/create",upload.array('productImage',3),createProduct);

router.get("/product",getAllproduct);


router.get("/product/:productId", getProduct);


router.put("/product/:productId",updateProduct);


router.delete("/product/:productId",deleteProduct);




module.exports = router;

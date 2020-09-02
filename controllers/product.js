const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer  = require('multer');
const category = require("../models/category");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

var upload = multer({ storage: storage })

exports.createProduct = 
(req, res) =>
 {  
     const product = new Product(req.body);

     for(var i=0; i<(req.files).length;  i++)
     {
          product.fProductImagePath.push(req.files[i].path)
     }
  
     product.save((err, product) => 
     {
         if (err) 
         {

                   if(err.code === 11000 || err.code === 11001)
                   {
                         return res.status(400).json({
                                          error: "Duplicate Value " +req.body.name +",Value must be unique",
         
                                                   });
                   }
                   else
                   {
                         return res.status(400).json({
                                        error: "NOT able to save category in DBs",
                                              messgae : err
         
                                                           });
                   }
           }

     
    res.json({ product });
  });
};




exports.getAllproduct =
   (req, res) => 
  {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO Products  found"
        });
      }
      res.json(product);
    });
  };




exports.getProductById = (req, res, next, id) => {
  Product.findById(id).populate("category")
    .populate("subCategory")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};




exports.getProduct = (req, res) => {
    return res.json(req.product);
};


exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
};




exports.updateProduct = (req, res) => {
    
  const product = req.product;
 
  product.name = req.body.name;
  product.description = req.body.description;
  product.price  = req.body.price;
  product.mrp = req.body.mrp;
  product.category = req.body.category;
  product.subCategory = req.body.subCategory;
  product.stock = req.body.stock;
  product.sold = req.body.sold;
  product.companyName = req.body.companyName;
  product.fProductImagePath = req.body.fimagePath;
  product.bProductImagePath = req.body.bimagePath;
  


  product.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category"
      });
    }
    res.json(updatedCategory);
  });
};









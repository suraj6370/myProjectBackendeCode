const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;  //for key

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    mrp: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required : true
    },
    subCategory: {
      type: ObjectId,
      ref: "SubCategory"
    },
    stock: {
      type: Number,
      trim:true
    },
    sold: {
      type: Number,
      trim:true,
      default: 0
    },
    companyName:{
          type:String,
          trim:true,
          maxlength:100
    },
    fProductImagePath:{
      type:[String],
       required : true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
